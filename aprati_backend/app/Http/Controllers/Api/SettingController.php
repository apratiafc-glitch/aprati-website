<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SettingController extends Controller
{
    /**
     * Get all settings.
     */
    public function index(Request $request)
    {
        $settings = Setting::all();
        
        // Admin: Grouped format (for settings.vue)
        if ($request->is('api/admin/settings')) {
            $allowedGroups = ['site_info', 'contact_info', 'social_links'];
            $filteredSettings = $settings->whereIn('group', $allowedGroups);
            return response()->json([
                'success' => true,
                'data' => $this->formatGrouped($filteredSettings)
            ]);
        }

        // Admin: Footer structure (for footer-settings.vue)
        if ($request->is('api/admin/footer-settings')) {
            $grouped = $settings->groupBy('group');
            return response()->json([
                'status' => 'success',
                'data' => [
                    'contact' => $grouped->get('contact', []),
                    'social' => $grouped->get('social', []),
                    'company' => $grouped->get('company', [])
                ]
            ]);
        }

        // PUBLIC: Flat key-value map (for AppFooter.vue and contact.vue)
        // We include both flat and grouped formats to satisfy different composables
        $flat = [];
        $grouped = [];
        foreach ($settings as $s) {
            $flat[$s->key] = $s->value;
            if (!isset($grouped[$s->group])) $grouped[$s->group] = [];
            $grouped[$s->group][$s->key] = $s->value;
        }

        return response()->json([
            'success' => true,
            'status' => 'success',
            'data' => array_merge($flat, $grouped, [
                'social_links' => $grouped['social_links'] ?? [] // For AppFooter.vue
            ])
        ]);
    }

    /**
     * Get header settings specifically.
     */
    public function headerSettings()
    {
        $settings = Setting::whereIn('group', ['header', 'branding', 'search'])->get();
        $grouped = $this->formatGrouped($settings);
        
        return response()->json([
            'success' => true,
            'data' => [
                'branding' => $grouped['branding'] ?? [],
                'search' => $grouped['search'] ?? []
            ]
        ]);
    }

    /**
     * Bulk update settings.
     */
    public function update(Request $request)
    {
        $data = $request->all();
        
        // Handle nested update (from settings.vue)
        if (isset($data['site_info']) || isset($data['contact_info']) || isset($data['social_links'])) {
            $this->updateNested($data);
        } 
        // Handle flat bulk update (from footer-settings bulk-update)
        else if (isset($data['settings']) && is_array($data['settings'])) {
            foreach ($data['settings'] as $item) {
                $key = $item['key'] ?? null;
                $value = $item['value'] ?? '';
                
                if (isset($item['id'])) {
                    $setting = Setting::find($item['id']);
                    if ($setting) {
                        $setting->update(['value' => $value]);
                        $this->syncBuddies($setting->key, $value);
                    }
                } else if ($key) {
                    Setting::where('key', $key)->update(['value' => $value]);
                    $this->syncBuddies($key, $value);
                }
            }
        }
        // Handle single value update
        else if ($request->has('value')) {
            $key = $request->route('key');
            if ($key) {
                Setting::updateOrCreate(['key' => $key], ['value' => $request->value]);
                $this->syncBuddies($key, $request->value);
            }
        }

        return response()->json([
            'success' => true,
            'status' => 'success',
            'message' => 'Settings updated successfully'
        ]);
    }

    /**
     * Upload image for setting.
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048',
            'key' => 'required|string'
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('settings', $filename, 'public');
            $url = '/storage/' . $path;

            $setting = Setting::updateOrCreate(
                ['key' => $request->key],
                ['value' => $url, 'type' => 'image']
            );

            // Sync buddies for images too (logo)
            $this->syncBuddies($request->key, $url);

            return response()->json([
                'success' => true,
                'status' => 'success',
                'data' => [
                    'url' => $url,
                    'setting' => $setting
                ]
            ]);
        }

        return response()->json(['success' => false, 'message' => 'No image uploaded'], 400);
    }

    /**
     * Initialize default settings.
     */
    public function initializeDefaults()
    {
        $defaults = [
            // Site Info
            ['key' => 'site_name', 'value' => 'Aprati Foods Cambodia', 'group' => 'site_info', 'label' => 'Site Name'],
            ['key' => 'site_description', 'value' => 'Premium Quality Food Products', 'group' => 'site_info', 'label' => 'Site Description', 'type' => 'textarea'],
            ['key' => 'meta_title', 'value' => 'Aprati Foods - Welcome', 'group' => 'site_info', 'label' => 'Meta Title'],
            
            // Contact Info (General Settings)
            ['key' => 'phone', 'value' => '+855 12 345 678', 'group' => 'contact_info', 'label' => 'Phone', 'type' => 'phone'],
            ['key' => 'email', 'value' => 'info@apratifoods.asia', 'group' => 'contact_info', 'label' => 'Email', 'type' => 'email'],
            ['key' => 'address', 'value' => 'Phnom Penh, Cambodia', 'group' => 'contact_info', 'label' => 'Address', 'type' => 'textarea'],
            ['key' => 'google_maps_url', 'value' => '', 'group' => 'contact_info', 'label' => 'Google Maps URL', 'type' => 'url'],
            
            // Contact Page Keys (expected by useContact.ts)
            ['key' => 'contact_phone', 'value' => '+855 12 345 678', 'group' => 'contact', 'label' => 'Contact Phone'],
            ['key' => 'contact_email', 'value' => 'info@apratifoods.asia', 'group' => 'contact', 'label' => 'Contact Email'],
            ['key' => 'contact_address_line1', 'value' => 'Phnom Penh, Cambodia', 'group' => 'contact', 'label' => 'Address Line 1'],
            ['key' => 'business_hours_monday_friday', 'value' => '8:00 AM - 6:00 PM', 'group' => 'contact', 'label' => 'Hours Mon-Fri'],
            ['key' => 'business_hours_saturday', 'value' => '9:00 AM - 4:00 PM', 'group' => 'contact', 'label' => 'Hours Saturday'],
            ['key' => 'business_hours_sunday', 'value' => 'Closed', 'group' => 'contact', 'label' => 'Hours Sunday'],
            
            // New Admin Keys for Business Hours
            ['key' => 'business_hours_mon_fri', 'value' => '8:00 AM - 6:00 PM', 'group' => 'contact_info', 'label' => 'Business Hours Mon-Fri'],
            ['key' => 'business_hours_sat', 'value' => '9:00 AM - 4:00 PM', 'group' => 'contact_info', 'label' => 'Business Hours Sat'],
            ['key' => 'business_hours_sun', 'value' => 'Closed', 'group' => 'contact_info', 'label' => 'Business Hours Sun'],
            
            // Social Links (General)
            ['key' => 'facebook', 'value' => 'https://facebook.com/apratifoods', 'group' => 'social_links', 'label' => 'Facebook', 'type' => 'url'],
            ['key' => 'instagram', 'value' => 'https://instagram.com/apratifoods', 'group' => 'social_links', 'label' => 'Instagram', 'type' => 'url'],
            ['key' => 'linkedin', 'value' => '', 'group' => 'social_links', 'label' => 'LinkedIn', 'type' => 'url'],
            
            // Social Links (expected by useContact.ts)
            ['key' => 'social_facebook', 'value' => 'https://facebook.com/apratifoods', 'group' => 'social', 'label' => 'Facebook URL'],
            ['key' => 'social_instagram', 'value' => 'https://instagram.com/apratifoods', 'group' => 'social', 'label' => 'Instagram URL'],
            ['key' => 'social_linkedin', 'value' => '', 'group' => 'social', 'label' => 'LinkedIn URL'],
            ['key' => 'company_description', 'value' => 'Premium Quality Food Products - Bringing authentic taste to your table.', 'group' => 'company', 'label' => 'Company Bio', 'type' => 'textarea'],
            
            // Branding (Header)
            ['key' => 'header_logo', 'value' => '/images/Company Logo-01.png', 'group' => 'branding', 'label' => 'Header Logo', 'type' => 'image'],
            ['key' => 'company_name', 'value' => 'Aprati Foods', 'group' => 'branding', 'label' => 'Company Name'],
            ['key' => 'tagline', 'value' => 'Premium Quality', 'group' => 'branding', 'label' => 'Tagline'],
            
            // Search (Header)
            ['key' => 'enable_search', 'value' => 'true', 'group' => 'search', 'label' => 'Enable Search', 'type' => 'boolean'],
            ['key' => 'search_placeholder', 'value' => 'Search products...', 'group' => 'search', 'label' => 'Search Placeholder'],

            // Footer Specific
            ['key' => 'footer_logo', 'value' => '/images/Company Logo-01.png', 'group' => 'company', 'label' => 'Footer Logo', 'type' => 'image'],
            ['key' => 'footer_description', 'value' => 'Premium Quality Food Products - Bringing authentic taste to your table.', 'group' => 'company', 'label' => 'Footer Description', 'type' => 'textarea'],
        ];

        foreach ($defaults as $default) {
            Setting::updateOrCreate(['key' => $default['key']], $default);
        }

        return response()->json([
            'success' => true,
            'status' => 'success',
            'message' => 'Default settings initialized'
        ]);
    }

    /**
     * Format settings into nested groups for the frontend.
     */
    private function formatGrouped($settings)
    {
        $result = [];
        foreach ($settings as $setting) {
            if (!isset($result[$setting->group])) {
                $result[$setting->group] = [];
            }
            $result[$setting->group][$setting->key] = $setting->value;
        }
        return $result;
    }

    /**
     * Update nested settings structure.
     */
    private function updateNested($data)
    {
        foreach ($data as $group => $values) {
            if (is_array($values)) {
                foreach ($values as $key => $value) {
                    Setting::where('key', $key)->update(['value' => $value ?? '']);
                    $this->syncBuddies($key, $value);
                }
            }
        }
    }

    /**
     * Synchronize redundant keys.
     */
    private function syncBuddies($key, $value)
    {
        $buddyMap = [
            'phone' => ['contact_phone', 'footer_phone'],
            'contact_phone' => ['phone', 'footer_phone'],
            
            'email' => ['contact_email', 'footer_email'],
            'contact_email' => ['email', 'footer_email'],
            
            'address' => ['contact_address_line1', 'footer_address'],
            'contact_address_line1' => ['address', 'footer_address'],
            
            'business_hours_mon_fri' => ['business_hours_monday_friday'],
            'business_hours_monday_friday' => ['business_hours_mon_fri'],
            
            'business_hours_sat' => ['business_hours_saturday'],
            'business_hours_saturday' => ['business_hours_sat'],
            
            'business_hours_sun' => ['business_hours_sunday'],
            'business_hours_sunday' => ['business_hours_sun'],
            
            'facebook' => ['social_facebook', 'footer_facebook'],
            'social_facebook' => ['facebook', 'footer_facebook'],
            
            'instagram' => ['social_instagram', 'footer_instagram'],
            'social_instagram' => ['instagram', 'footer_instagram'],
            
            'header_logo' => ['footer_logo'],
            'footer_logo' => ['header_logo'],
            
            'site_description' => ['footer_description', 'company_description'],
            'footer_description' => ['site_description', 'company_description'],
            'company_description' => ['site_description', 'footer_description'],
        ];

        if (isset($buddyMap[$key])) {
            foreach ($buddyMap[$key] as $buddy) {
                Setting::where('key', $buddy)->update(['value' => $value ?? '']);
            }
        }
    }
}
