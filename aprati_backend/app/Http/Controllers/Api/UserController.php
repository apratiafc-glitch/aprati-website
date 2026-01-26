<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    /**
     * Get all users (Admin only)
     */
    public function index(Request $request)
    {
        $query = User::with('brand');

        // Filter by role
        if ($request->has('role')) {
            $query->where('role', $request->role);
        }

        // Filter by status
        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        // Search by name or email
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users = $query->paginate($request->get('per_page', 15));

        return response()->json([
            'status' => 'success',
            'data' => [
                'users' => $users,
            ],
        ]);
    }

    /**
     * Create a new user (Admin only)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', Password::defaults()],
            'role' => ['required', 'in:admin,brand_admin,user'],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string'],
            'is_active' => ['boolean'],
            'brand_id' => ['nullable', 'exists:brands,id'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // If role is brand_admin, brand_id is required
        if ($request->role === 'brand_admin' && !$request->brand_id) {
            return response()->json([
                'status' => 'error',
                'message' => 'Brand ID is required for brand admin role',
            ], 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'phone' => $request->phone,
            'address' => $request->address,
            'is_active' => $request->get('is_active', true),
            'brand_id' => $request->brand_id,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'data' => [
                'user' => $user->load('brand'),
            ],
        ], 201);
    }

    /**
     * Show user details
     */
    public function show($id)
    {
        $user = User::with('brand')->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => [
                'user' => $user,
            ],
        ]);
    }

    /**
     * Update user (Admin only)
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'string', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'role' => ['sometimes', 'in:admin,brand_admin,user'],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string'],
            'is_active' => ['boolean'],
            'brand_id' => ['nullable', 'exists:brands,id'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // If role is brand_admin, brand_id is required
        if ($request->has('role') && $request->role === 'brand_admin' && !$request->brand_id && !$user->brand_id) {
            return response()->json([
                'status' => 'error',
                'message' => 'Brand ID is required for brand admin role',
            ], 400);
        }

        $user->update($request->only(['name', 'email', 'role', 'phone', 'address', 'profile_image', 'is_active', 'brand_id']));

        return response()->json([
            'status' => 'success',
            'message' => 'User updated successfully',
            'data' => [
                'user' => $user->fresh()->load('brand'),
            ],
        ]);
    }

    /**
     * Delete user (Admin only)
     */
    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            $currentUser = auth()->user();

            // Prevent users from deleting themselves
            if ($currentUser && $currentUser->id == $user->id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'You cannot delete your own account',
                ], 400);
            }

            // Prevent deleting the last admin
            if ($user->isAdmin()) {
                $adminCount = User::where('role', User::ROLE_ADMIN)->count();
                if ($adminCount <= 1) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Cannot delete the last admin user',
                    ], 400);
                }
            }

            // Check for related data that might prevent deletion
            $hasJobApplications = $user->jobApplications()->count() > 0;
            
            if ($hasJobApplications) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Cannot delete user with existing job applications. Please archive the user instead.',
                ], 400);
            }

            // Delete profile image if exists
            if ($user->profile_image && $user->profile_image !== '/images/default-avatar.png') {
                $imagePath = str_replace('/storage/', '', $user->profile_image);
                if (\Storage::disk('public')->exists($imagePath)) {
                    \Storage::disk('public')->delete($imagePath);
                }
            }

            $user->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'User deleted successfully',
            ]);

        } catch (\Exception $e) {
            \Log::error('User deletion error: ' . $e->getMessage(), [
                'user_id' => $id,
                'current_user' => auth()->id(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete user: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get available roles
     */
    public function roles()
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                'roles' => User::getAvailableRoles(),
            ],
        ]);
    }

    /**
     * Get users by role
     */
    public function getUsersByRole($role)
    {
        if (!in_array($role, [User::ROLE_ADMIN, User::ROLE_BRAND_ADMIN, User::ROLE_USER])) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid role specified',
            ], 400);
        }

        $users = User::with('brand')
            ->where('role', $role)
            ->where('is_active', true)
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'users' => $users,
                'role' => $role,
            ],
        ]);
    }

    /**
     * Toggle user status (Admin only)
     */
    public function toggleStatus($id)
    {
        $user = User::findOrFail($id);

        // Prevent deactivating the last admin
        if ($user->isAdmin() && $user->is_active) {
            $activeAdminCount = User::where('role', User::ROLE_ADMIN)
                ->where('is_active', true)
                ->count();
            if ($activeAdminCount <= 1) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Cannot deactivate the last active admin user',
                ], 400);
            }
        }

        $user->update(['is_active' => !$user->is_active]);

        return response()->json([
            'status' => 'success',
            'message' => 'User status updated successfully',
            'data' => [
                'user' => $user->fresh(),
            ],
        ]);
    }

    /**
     * Reset user password (Admin only)
     */
    public function resetPassword(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'password' => ['required', Password::defaults()],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Password reset successfully',
        ]);
    }

    /**
     * Get dashboard statistics (Admin only)
     */
    public function dashboardStats()
    {
        $stats = [
            'total_users' => User::count(),
            'active_users' => User::where('is_active', true)->count(),
            'admin_users' => User::where('role', User::ROLE_ADMIN)->count(),
            'brand_admin_users' => User::where('role', User::ROLE_BRAND_ADMIN)->count(),
            'regular_users' => User::where('role', User::ROLE_USER)->count(),
            'recent_users' => User::with('brand')
                ->latest()
                ->take(5)
                ->get(),
        ];

        return response()->json([
            'status' => 'success',
            'data' => $stats,
        ]);
    }

    /**
     * Upload profile image for user
     */
    public function uploadProfileImage(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'profile_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        try {
            // Delete old profile image if exists
            if ($user->profile_image && $user->profile_image !== '/images/default-avatar.png') {
                $oldImagePath = str_replace('/storage/', '', $user->profile_image);
                if (Storage::disk('public')->exists($oldImagePath)) {
                    Storage::disk('public')->delete($oldImagePath);
                }
            }

            // Store new image
            $image = $request->file('profile_image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $imagePath = $image->storeAs('profile_images', $imageName, 'public');

            // Update user
            $user->update([
                'profile_image' => '/storage/' . $imagePath
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Profile image uploaded successfully',
                'data' => [
                    'user' => $user->fresh()->load('brand'),
                    'image_url' => asset('storage/' . $imagePath)
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to upload profile image: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove profile image for user
     */
    public function removeProfileImage($id)
    {
        $user = User::findOrFail($id);

        try {
            // Delete profile image if exists
            if ($user->profile_image && $user->profile_image !== '/images/default-avatar.png') {
                $imagePath = str_replace('/storage/', '', $user->profile_image);
                if (Storage::disk('public')->exists($imagePath)) {
                    Storage::disk('public')->delete($imagePath);
                }
            }

            // Update user
            $user->update([
                'profile_image' => null
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Profile image removed successfully',
                'data' => [
                    'user' => $user->fresh()->load('brand')
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to remove profile image: ' . $e->getMessage()
            ], 500);
        }
    }
}
