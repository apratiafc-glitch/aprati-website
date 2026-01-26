<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AboutContentController extends Controller
{
    /**
     * Display a listing of about contents.
     */
    public function index()
    {
        try {
            $contents = AboutContent::ordered()->get();

            return response()->json([
                'success' => true,
                'data' => $contents
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to load about contents'
            ], 500);
        }
    }

    /**
     * Store a newly created about content.
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'key' => 'required|string|max:255|unique:about_contents,key',
                'title' => 'required|string|max:255',
                'content' => 'nullable|string',
                'metadata' => 'nullable|array',
                'is_active' => 'boolean',
                'sort_order' => 'integer|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'error' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $content = AboutContent::create($validator->validated());

            return response()->json([
                'success' => true,
                'message' => 'About content created successfully',
                'data' => $content
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to create about content'
            ], 500);
        }
    }

    /**
     * Display the specified about content.
     */
    public function show($id)
    {
        try {
            $content = AboutContent::findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $content
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'About content not found'
            ], 404);
        }
    }

    /**
     * Update the specified about content.
     */
    public function update(Request $request, $id)
    {
        try {
            $content = AboutContent::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'key' => 'required|string|max:255|unique:about_contents,key,' . $id,
                'title' => 'required|string|max:255',
                'content' => 'nullable|string',
                'metadata' => 'nullable|array',
                'is_active' => 'boolean',
                'sort_order' => 'integer|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'error' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $content->update($validator->validated());

            return response()->json([
                'success' => true,
                'message' => 'About content updated successfully',
                'data' => $content->fresh()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to update about content'
            ], 500);
        }
    }

    /**
     * Remove the specified about content.
     */
    public function destroy($id)
    {
        try {
            $content = AboutContent::findOrFail($id);
            $content->delete();

            return response()->json([
                'success' => true,
                'message' => 'About content deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to delete about content'
            ], 500);
        }
    }

    /**
     * Initialize default about content sections.
     */
    public function initializeDefaults()
    {
        try {
            $defaults = [
                [
                    'key' => 'page_title',
                    'title' => 'About Aprati Food Company',
                    'content' => 'Learn more about our company, mission, and values',
                    'sort_order' => 1
                ],
                [
                    'key' => 'company_overview',
                    'title' => 'Our Story',
                    'content' => 'Founded in 2015, Aprati Food Company has grown from a small local business into a leading food company with three distinct brands serving customers worldwide. Our commitment to quality, innovation, and customer satisfaction has driven our success and continues to guide our future growth. Today, we operate state-of-the-art facilities and employ hundreds of dedicated professionals who share our passion for excellence in food production.',
                    'metadata' => [
                        'stats' => [
                            ['label' => 'Years Experience', 'value' => '10+'],
                            ['label' => 'Brands', 'value' => '3'],
                            ['label' => 'Products', 'value' => '100+'],
                            ['label' => 'Countries', 'value' => '50+']
                        ]
                    ],
                    'sort_order' => 2
                ],
                [
                    'key' => 'mission',
                    'title' => 'Our Mission',
                    'content' => 'To provide high-quality, innovative food products that bring joy and nutrition to families around the world while maintaining sustainable and ethical business practices.',
                    'sort_order' => 3
                ],
                [
                    'key' => 'vision',
                    'title' => 'Our Vision',
                    'content' => 'To be the leading food company recognized globally for our commitment to quality, innovation, and customer satisfaction across all our brand portfolios.',
                    'sort_order' => 4
                ],
                [
                    'key' => 'values_title',
                    'title' => 'Our Values',
                    'content' => 'The principles that guide everything we do',
                    'sort_order' => 5
                ],
                [
                    'key' => 'value_quality',
                    'title' => 'Quality',
                    'content' => 'We never compromise on the quality of our products',
                    'metadata' => ['icon' => 'check-circle'],
                    'sort_order' => 6
                ],
                [
                    'key' => 'value_innovation',
                    'title' => 'Innovation',
                    'content' => 'Continuously improving and creating new solutions',
                    'metadata' => ['icon' => 'lightning-bolt'],
                    'sort_order' => 7
                ],
                [
                    'key' => 'value_care',
                    'title' => 'Care',
                    'content' => 'We care about our customers, employees, and community',
                    'metadata' => ['icon' => 'heart'],
                    'sort_order' => 8
                ],
                [
                    'key' => 'value_sustainability',
                    'title' => 'Sustainability',
                    'content' => 'Committed to sustainable practices and environmental responsibility',
                    'metadata' => ['icon' => 'globe'],
                    'sort_order' => 9
                ]
            ];

            foreach ($defaults as $default) {
                AboutContent::updateOrCreate(
                    ['key' => $default['key']],
                    $default
                );
            }

            return response()->json([
                'success' => true,
                'message' => 'Default about content initialized successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to initialize default content'
            ], 500);
        }
    }

    /**
     * Upload image for about content.
     */
    public function uploadImage(Request $request, $aboutContent)
    {
        try {
            \Log::info('Upload image request started', [
                'aboutContent_id' => $aboutContent,
                'has_file' => $request->hasFile('image'),
                'files' => $request->allFiles()
            ]);

            // Find the about content
            $content = AboutContent::findOrFail($aboutContent);
            \Log::info('Found about content', ['content_id' => $content->id, 'title' => $content->title]);

            $validator = Validator::make($request->all(), [
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            if ($validator->fails()) {
                \Log::error('Validation failed', ['errors' => $validator->errors()]);
                return response()->json([
                    'success' => false,
                    'error' => 'Invalid image file',
                    'errors' => $validator->errors()
                ], 422);
            }

            \Log::info('Validation passed');

            $image = $request->file('image');
            \Log::info('Got image file', [
                'original_name' => $image->getClientOriginalName(),
                'size' => $image->getSize(),
                'mime_type' => $image->getMimeType()
            ]);

            $imageName = time() . '_' . $image->getClientOriginalName();
            \Log::info('Generated image name', ['image_name' => $imageName]);

            // Try to store the image
            $imagePath = $image->storeAs('about-content', $imageName, 'public');
            \Log::info('Image stored', ['path' => $imagePath]);
            
            // Create the full URL for the image
            $imageUrl = asset('storage/' . $imagePath);
            \Log::info('Created image URL', ['url' => $imageUrl]);
            
            // Update the content with the new image URL
            $updateResult = $content->update([
                'image_url' => $imageUrl
            ]);
            \Log::info('Content updated', ['result' => $updateResult]);
            
            return response()->json([
                'success' => true,
                'message' => 'Image uploaded successfully',
                'data' => [
                    'url' => $imageUrl,
                    'path' => $imagePath,
                    'content' => $content->fresh()
                ]
            ]);

        } catch (\Exception $e) {
            \Log::error('Image upload error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]);
            
            return response()->json([
                'success' => false,
                'error' => 'Failed to upload image: ' . $e->getMessage()
            ], 500);
        }
    }
}
