<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Translation;

class TranslationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $translations = [
            // English translations
            [
                'locale' => 'en',
                'group' => 'navigation',
                'translations' => [
                    'home' => 'Home',
                    'about' => 'About',
                    'contact' => 'Contact',
                    'products' => 'Products',
                    'careers' => 'Careers',
                    'welcome' => 'Welcome to Aprati Foods Cambodia',
                    'login' => 'Login',
                    'register' => 'Register',
                    'dashboard' => 'Dashboard',
                    'profile' => 'Profile',
                    'logout' => 'Logout'
                ]
            ],
            [
                'locale' => 'en',
                'group' => 'hero',
                'translations' => [
                    'hero.welcome_badge' => 'Welcome to Aprati Foods (Cambodia) Ltd',
                    'hero.title' => 'Welcome to <span class="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Aprati</span> Food Company',
                    'hero.subtitle' => 'Enhanced introduction website with advanced product search, career management, and comprehensive inventory system.',
                    'hero.primary_button' => 'Explore Our Brands',
                    'hero.secondary_button' => 'Join Our Team'
                ]
            ],
            [
                'locale' => 'en',
                'group' => 'information',
                'translations' => [
                    'information.section_title' => 'OUR Information',
                    'information.section_subtitle' => 'Discover the latest updates, news, and innovations from our dynamic ecosystem',
                    'information.loading' => 'Loading information content...',
                    'information.view_details' => 'View Details',
                    'information.coming_soon' => 'Coming Soon',
                    'information.coming_soon_desc' => 'We\'re preparing something extraordinary for you. Stay tuned for the latest updates, innovations, and exciting announcements.',
                    'information.get_notified' => 'Get Notified',
                    'information.learn_more' => 'Learn More'
                ]
            ],
            [
                'locale' => 'en',
                'group' => 'brands',
                'translations' => [
                    'brands.section_badge' => 'Our Brands',
                    'brands.section_title' => 'Featured <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Brands</span>',
                    'brands.section_subtitle' => 'Discover our premium food brand collection crafted with excellence',
                    'brands.explore_products' => 'Explore Products',
                    'brands.products_count' => 'Products',
                    'brands.featured_products' => 'Featured Products',
                    'brands.no_brands' => 'No Brands Available',
                    'brands.no_brands_desc' => 'Currently there are no active brands to display. Please check back later or contact the administrator.',
                    'brands.contact_admin' => 'Contact Admin'
                ]
            ],
            [
                'locale' => 'en',
                'group' => 'cta',
                'translations' => [
                    'cta.badge' => 'Ready to Start',
                    'cta.title' => 'Ready to Explore Our <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Enhanced Platform?</span>',
                    'cta.subtitle' => 'Discover our advanced features and premium food products designed for the modern world',
                    'cta.primary_button' => 'Explore Our Brands',
                    'cta.secondary_button' => 'Contact Us',
                    'cta.stats.brands' => 'Premium Brands',
                    'cta.stats.support' => 'Support',
                    'cta.stats.quality' => 'Quality'
                ]
            ],
            [
                'locale' => 'en',
                'group' => 'modal',
                'translations' => [
                    'modal.information_details' => 'Information Details',
                    'modal.detailed_info' => 'Detailed information and insights',
                    'modal.featured_image' => 'Featured Image',
                    'modal.detail_view' => 'Detail View',
                    'modal.close' => 'Close'
                ]
            ],

            // Khmer translations
            [
                'locale' => 'km',
                'group' => 'navigation',
                'translations' => [
                    'home' => 'ទំព័រដើម',
                    'about' => 'អំពីយើង',
                    'contact' => 'ទំនាក់ទំនង',
                    'products' => 'ផលិតផល',
                    'careers' => 'ឱកាសការងារ',
                    'welcome' => 'សូមស្វាគមន៍មកកាន់ Aprati Foods Cambodia',
                    'login' => 'ចូល',
                    'register' => 'ចុះឈ្មោះ',
                    'dashboard' => 'ផ្ទាំងគ្រប់គ្រង',
                    'profile' => 'ប្រវត្តិរូប',
                    'logout' => 'ចេញ'
                ]
            ],
            [
                'locale' => 'km',
                'group' => 'hero',
                'translations' => [
                    'hero.welcome_badge' => 'សូមស្វាគមន៍មកកាន់ Aprati Foods (កម្ពុជា) Ltd',
                    'hero.title' => 'សូមស្វាគមន៍មកកាន់ <span class="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Aprati</span> Food Company',
                    'hero.subtitle' => 'វេបសាយការណ៍ផ្តើមដ៏ទំនើបជាមួយនឹងការស្វែងរកផលិតផលកម្រិតខ្ពស់ ការគ្រប់គ្រងអាជីព និងប្រព័ន្ធគ្រប់គ្រងសារពើភ័ណ្ឌទូលំទូលាយ។',
                    'hero.primary_button' => 'រកមើលម៉ាករបស់យើង',
                    'hero.secondary_button' => 'ចូលរួមជាមួយយើង'
                ]
            ],
            [
                'locale' => 'km',
                'group' => 'information',
                'translations' => [
                    'information.section_title' => 'ព័ត៌មានរបស់យើង',
                    'information.section_subtitle' => 'រកឃើញព័ត៌មានថ្មីៗ ព័ត៌មាន និងការច្នៃប្រឌិតពីប្រព័ន្ធដ៏សកម្មរបស់យើង',
                    'information.loading' => 'កំពុងផ្ទុកមាតិកាព័ត៌មាន...',
                    'information.view_details' => 'មើលព័ត៌មានលម្អិត',
                    'information.coming_soon' => 'មកដល់ឆាប់ៗនេះ',
                    'information.coming_soon_desc' => 'យើងកំពុងត្រៀមអ្វីមួយដ៏ពិសេសសម្រាប់អ្នក។ សូមរង់ចាំព័ត៌មានថ្មីៗ ការច្នៃប្រឌិត និងសេចក្តីប្រកាសដ៏រំភើប។',
                    'information.get_notified' => 'ទទួលបានការជូនដំណឹង',
                    'information.learn_more' => 'ស្វែងយល់បន្ថែម'
                ]
            ],
            [
                'locale' => 'km',
                'group' => 'brands',
                'translations' => [
                    'brands.section_badge' => 'ម៉ាករបស់យើង',
                    'brands.section_title' => 'ម៉ាក <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">ពិសេស</span>',
                    'brands.section_subtitle' => 'រកឃើញកម្រងផលិតផលម៉ាកអាហារដែលមានគុណភាពខ្ពស់របស់យើង',
                    'brands.explore_products' => 'រកមើលផលិតផល',
                    'brands.products_count' => 'ផលិតផល',
                    'brands.featured_products' => 'ផលិតផលពិសេស',
                    'brands.no_brands' => 'មិនមានម៉ាកទេ',
                    'brands.no_brands_desc' => 'បច្ចុប្បន្នមិនមានម៉ាកសកម្មដើម្បីបង្ហាញទេ។ សូមត្រឡប់មកមើលពេលក្រោយ ឬទំនាក់ទំនងជាមួយអ្នកគ្រប់គ្រង។',
                    'brands.contact_admin' => 'ទំនាក់ទំនងអ្នកគ្រប់គ្រង'
                ]
            ],
            [
                'locale' => 'km',
                'group' => 'cta',
                'translations' => [
                    'cta.badge' => 'រួចរាល់ដើម្បីចាប់ផ្តើម',
                    'cta.title' => 'រួចរាល់ដើម្បីរកឃើញ <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">វេទិកាដ៏ទំនើបរបស់យើង?</span>',
                    'cta.subtitle' => 'រកឃើញលក្ខណៈពិសេសកម្រិតខ្ពស់ និងផលិតផលអាហារដែលមានគុណភាពខ្ពស់សម្រាប់ពិភពលោកទំនើប',
                    'cta.primary_button' => 'រកមើលម៉ាករបស់យើង',
                    'cta.secondary_button' => 'ទំនាក់ទំនងយើង',
                    'cta.stats.brands' => 'ម៉ាកខ្ពស់',
                    'cta.stats.support' => 'ការគាំទ្រ',
                    'cta.stats.quality' => 'គុណភាព'
                ]
            ],
            [
                'locale' => 'km',
                'group' => 'modal',
                'translations' => [
                    'modal.information_details' => 'ព័ត៌មានលម្អិត',
                    'modal.detailed_info' => 'ព័ត៌មានលម្អិត និងការយល់ដឹង',
                    'modal.featured_image' => 'រូបភាពពិសេស',
                    'modal.detail_view' => 'ទិដ្ឋភាពលម្អិត',
                    'modal.close' => 'បិទ'
                ]
            ]
        ];

        foreach ($translations as $groupData) {
            foreach ($groupData['translations'] as $key => $value) {
                Translation::updateOrCreate(
                    [
                        'key' => $key,
                        'locale' => $groupData['locale']
                    ],
                    [
                        'value' => $value,
                        'group' => $groupData['group'],
                        'is_active' => true
                    ]
                );
            }
        }
    }
}
