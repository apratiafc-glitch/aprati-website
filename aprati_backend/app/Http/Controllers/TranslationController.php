<?php

namespace App\Http\Controllers;

use App\Models\Translation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class TranslationController extends Controller
{
    /**
     * Display a listing of translations.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Translation::query();

        // Filter by locale
        if ($request->has('locale') && $request->locale) {
            $query->where('locale', $request->locale);
        }

        // Filter by group
        if ($request->has('group') && $request->group) {
            $query->where('group', $request->group);
        }

        // Filter by search term
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('key', 'like', "%{$search}%")
                  ->orWhere('value', 'like', "%{$search}%");
            });
        }

        // Filter by active status
        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        $translations = $query->orderBy('group')
                              ->orderBy('key')
                              ->paginate(50);

        return response()->json([
            'success' => true,
            'data' => $translations,
            'message' => 'Translations retrieved successfully'
        ]);
    }

    /**
     * Store a newly created translation.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'key' => 'required|string|max:255|unique:translations,key,NULL,id,locale,' . $request->locale,
            'value' => 'required|string',
            'locale' => 'required|string|size:2',
            'group' => 'required|string|max:100',
            'is_active' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        $translation = Translation::create([
            'key' => $request->key,
            'value' => $request->value,
            'locale' => $request->locale,
            'group' => $request->group,
            'is_active' => $request->boolean('is_active', true)
        ]);

        return response()->json([
            'success' => true,
            'data' => $translation,
            'message' => 'Translation created successfully'
        ], 201);
    }

    /**
     * Display the specified translation.
     */
    public function show(Translation $translation): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $translation,
            'message' => 'Translation retrieved successfully'
        ]);
    }

    /**
     * Update the specified translation.
     */
    public function update(Request $request, Translation $translation): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'key' => 'required|string|max:255|unique:translations,key,' . $translation->id . ',id,locale,' . ($request->locale ?: $translation->locale),
            'value' => 'required|string',
            'locale' => 'required|string|size:2',
            'group' => 'required|string|max:100',
            'is_active' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        $translation->update([
            'key' => $request->key,
            'value' => $request->value,
            'locale' => $request->locale,
            'group' => $request->group,
            'is_active' => $request->boolean('is_active', $translation->is_active)
        ]);

        return response()->json([
            'success' => true,
            'data' => $translation,
            'message' => 'Translation updated successfully'
        ]);
    }

    /**
     * Remove the specified translation.
     */
    public function destroy(Translation $translation): JsonResponse
    {
        $translation->delete();

        return response()->json([
            'success' => true,
            'message' => 'Translation deleted successfully'
        ]);
    }

    /**
     * Get translations for frontend consumption.
     */
    public function getTranslations(Request $request): JsonResponse
    {
        $locale = $request->get('locale', 'en');
        $group = $request->get('group');

        $query = Translation::where('locale', $locale)
                           ->where('is_active', true);

        if ($group) {
            $query->where('group', $group);
        }

        $translations = $query->get(['key', 'value', 'group']);

        // Group translations by group for easier frontend consumption
        $grouped = [];
        foreach ($translations as $translation) {
            $grouped[$translation->group][$translation->key] = $translation->value;
        }

        return response()->json([
            'success' => true,
            'data' => $grouped,
            'locale' => $locale,
            'message' => 'Translations retrieved successfully'
        ]);
    }

    /**
     * Get available locales.
     */
    public function getLocales(): JsonResponse
    {
        $locales = Translation::distinct('locale')
                             ->pluck('locale')
                             ->toArray();

        return response()->json([
            'success' => true,
            'data' => $locales,
            'message' => 'Locales retrieved successfully'
        ]);
    }

    /**
     * Get available groups.
     */
    public function getGroups(): JsonResponse
    {
        $groups = Translation::distinct('group')
                            ->pluck('group')
                            ->toArray();

        return response()->json([
            'success' => true,
            'data' => $groups,
            'message' => 'Groups retrieved successfully'
        ]);
    }

    /**
     * Bulk update translations.
     */
    public function bulkUpdate(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'translations' => 'required|array',
            'translations.*.id' => 'required|integer|exists:translations,id',
            'translations.*.value' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        $updated = [];
        foreach ($request->translations as $translationData) {
            $translation = Translation::find($translationData['id']);
            if ($translation) {
                $translation->update(['value' => $translationData['value']]);
                $updated[] = $translation;
            }
        }

        return response()->json([
            'success' => true,
            'data' => $updated,
            'message' => 'Translations updated successfully'
        ]);
    }
}
