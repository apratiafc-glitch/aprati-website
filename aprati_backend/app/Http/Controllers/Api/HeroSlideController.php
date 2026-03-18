<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\Request;

class HeroSlideController extends Controller
{
    /**
     * Display a listing of the resource (Admin).
     */
    public function adminIndex()
    {
        $slides = \App\Models\HeroSlide::orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $slides
        ]);
    }

    /**
     * Display a listing of the resource (Public).
     */
    public function index()
    {
        $slides = \App\Models\HeroSlide::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $slides
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|image|max:10240', // 10MB
        ]);

        $path = $request->file('image')->store('hero-slides', 'public');

        $slide = \App\Models\HeroSlide::create([
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'image' => $path,
            'button_text' => $request->primary_button_text, // Mapping primary to single button
            'button_link' => $request->primary_button_link, // Mapping primary to single button
            'is_active' => $request->has('is_active') ? filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN) : true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Slide created successfully',
            'data' => $slide
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(HeroSlide $heroSlide)
    {
        return response()->json([
            'success' => true,
            'data' => $heroSlide
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HeroSlide $heroSlide)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|max:10240',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($heroSlide->image && \Illuminate\Support\Facades\Storage::disk('public')->exists($heroSlide->image)) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($heroSlide->image);
            }
            $heroSlide->image = $request->file('image')->store('hero-slides', 'public');
        }

        $heroSlide->title = $request->title;
        $heroSlide->subtitle = $request->subtitle;

        // Handle mapped fields
        if ($request->has('primary_button_text')) {
            $heroSlide->button_text = $request->primary_button_text;
        }
        if ($request->has('primary_button_link')) {
            $heroSlide->button_link = $request->primary_button_link;
        }

        if ($request->has('is_active')) {
            $heroSlide->is_active = filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN);
        }

        $heroSlide->save();

        return response()->json([
            'success' => true,
            'message' => 'Slide updated successfully',
            'data' => $heroSlide
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HeroSlide $heroSlide)
    {
        if ($heroSlide->image && \Illuminate\Support\Facades\Storage::disk('public')->exists($heroSlide->image)) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($heroSlide->image);
        }

        $heroSlide->delete();

        return response()->json([
            'success' => true,
            'message' => 'Slide deleted successfully'
        ]);
    }

    public function toggleActive(HeroSlide $heroSlide)
    {
        $heroSlide->is_active = !$heroSlide->is_active;
        $heroSlide->save();

        return response()->json([
            'success' => true,
            'message' => 'Slide status updated',
            'data' => $heroSlide
        ]);
    }
}
