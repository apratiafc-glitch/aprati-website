<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Career;
use Illuminate\Http\Request;

class CareerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Career::query();

        // If it's a public request, only show active careers
        if (!$request->bearerToken()) {
            $query->where('status', 'active');
        }

        $careers = $query->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $careers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_job' => 'required|string|max:255',
            'career_information' => 'required|string',
            'job_description' => 'required|string',
            'job_requirements' => 'required|string',
            'salary_range' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'job_type' => 'nullable|string|max:255',
            'department' => 'nullable|string|max:255',
            'status' => 'nullable|string|in:active,inactive,closed'
        ]);

        $career = Career::create($validated);

        return response()->json([
            'success' => true,
            'data' => $career,
            'message' => 'Career opportunity created successfully'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Career $career)
    {
        return response()->json([
            'success' => true,
            'data' => $career
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Career $career)
    {
        $validated = $request->validate([
            'title_job' => 'sometimes|required|string|max:255',
            'career_information' => 'sometimes|required|string',
            'job_description' => 'sometimes|required|string',
            'job_requirements' => 'sometimes|required|string',
            'salary_range' => 'sometimes|required|string|max:255',
            'position' => 'sometimes|required|string|max:255',
            'location' => 'nullable|string|max:255',
            'job_type' => 'nullable|string|max:255',
            'department' => 'nullable|string|max:255',
            'status' => 'nullable|string|in:active,inactive,closed'
        ]);

        $career->update($validated);

        return response()->json([
            'success' => true,
            'data' => $career,
            'message' => 'Career opportunity updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Career $career)
    {
        $career->delete();

        return response()->json([
            'success' => true,
            'message' => 'Career opportunity deleted successfully'
        ]);
    }
}
