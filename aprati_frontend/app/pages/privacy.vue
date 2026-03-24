<template>
  <div class="min-h-screen bg-gray-50 relative overflow-hidden">
    <!-- Elite Hero Section -->
    <section class="bg-[#0a0e27] relative overflow-hidden py-40">
      <!-- Sophisticated Background Elements -->
      <div class="absolute inset-0">
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-corporate-emerald/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 40px 40px;"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center">
          <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-corporate-gold/10 border border-corporate-gold/20 text-corporate-gold mb-10 translate-y-4 animate-fade-in-up">
            <span class="text-[10px] font-black tracking-[0.4em] uppercase">Enterprise Compliance</span>
          </div>
          
          <h1 class="text-5xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tight drop-shadow-2xl animate-slide-up">
            {{ currentLanguage === 'km' ? 'គោលការណ៍ភាពឯកជន' : 'Privacy Policy' }}
          </h1>
          <p class="text-xl lg:text-3xl text-white/95 max-w-5xl mx-auto font-medium leading-relaxed animate-fade-in animation-delay-300">
            {{ currentLanguage === 'km' 
              ? 'ភាពឯកជនរបស់អ្នកមានសារៈសំខាន់បំផុតសម្រាប់យើង។ គោលការណ៍នេះពន្យល់អំពីស្តង់ដារដ៏តឹងរឹងរបស់យើងក្នុងការការពារទិន្នន័យ។'
              : 'Your privacy is premium to us. This policy outlines our rigorous standards for data protection and ethical information management.'
            }}
          </p>

          <!-- Language Selector -->
          <div class="mt-8 flex justify-center gap-3">
            <button 
              @click="switchLanguage('en')"
              :class="currentLanguage === 'en' ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/40' : 'bg-white/5 text-blue-100/60 border-white/10 hover:bg-white/10'"
              class="px-6 py-2 rounded-xl text-xs font-black tracking-widest uppercase border transition-all duration-300"
            >
              English
            </button>
            <button 
              @click="switchLanguage('km')"
              :class="currentLanguage === 'km' ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/40' : 'bg-white/5 text-blue-100/60 border-white/10 hover:bg-white/10'"
              class="px-6 py-2 rounded-xl text-xs font-black tracking-widest uppercase border transition-all duration-300"
            >
              ខ្មែរ (Khmer)
            </button>
          </div>
        </div>
      </div>
    </section>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 -mt-10">
      <div class="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 space-y-12 border border-gray-100">
        
        

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p class="mt-2 text-gray-600">Loading privacy policy...</p>
        </div>

        <!-- Error State -->
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {{ error }}
        </div>

        <!-- Dynamic Sections -->
        <section v-for="section in sections" :key="section.id">
          <h2 class="text-3xl font-black text-corporate-dark mb-8 border-b-2 border-corporate-gold/30 pb-3 inline-block">{{ section.title }}</h2>
          <div class="prose prose-gray max-w-none">
            <div class="text-gray-700 whitespace-pre-line" v-html="formatContent(section.content)"></div>
          </div>
        </section>

        <!-- Default Content (Official Policy) -->
        <div v-if="!loading && !error && sections.length === 0" class="space-y-12">
          <!-- Introduction -->
          <section>
            <p class="text-gray-700 leading-relaxed italic border-l-4 border-corporate-gold pl-6 py-2 bg-gray-50 rounded-r-xl">
              <template v-if="currentLanguage === 'en'">
                This Privacy Policy is issued by APRATI FOODS (CAMBODIA) LTD, a private limited company duly established and construed under the laws of the Kingdom of Cambodia with commercial registration No. 00001616 dated 23rd April 2015 (hereinafter called "AFC"). Our website is <a href="http://www.apratifoods.asia" class="text-blue-600 hover:underline">www.apratifoods.asia</a>. By using our website, applications, social media, and other means, you consent to the collection, use, and disclose of your Personal Data according to the terms and conditions of this Privacy Policy.
              </template>
              <template v-else>
                គោលការណ៍ឯកជនភាពនេះចេញដោយក្រុមហ៊ុន APRATI FOODS (CAMBODIA) LTD ដែលជាក្រុមហ៊ុនឯកជនមានកំណត់ដែលត្រូវបានបង្កើតឡើង និងបកស្រាយយ៉ាងត្រឹមត្រូវតាមច្បាប់នៃព្រះរាជាណាចក្រកម្ពុជា ដោយមានការចុះបញ្ជីពាណិជ្ជកម្មលេខ 00001616 ចុះថ្ងៃទី 23 ខែមេសា ឆ្នាំ 2015 (តទៅហៅថា "AFC")។ គេហទំព័ររបស់យើងគឺ <a href="http://www.apratifoods.asia" class="text-blue-600 hover:underline">www.apratifoods.asia</a>។ ដោយប្រើគេហទំព័រ កម្មវិធី បណ្តាញសង្គម និងមធ្យោបាយផ្សេងទៀតរបស់យើង អ្នក យល់ព្រម ចំពោះការប្រមូល ប្រើប្រាស់ និងបង្ហាញទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នក ស្របតាមលក្ខខណ្ឌនៃគោលការណ៍ឯកជនភាពនេះ។
              </template>
            </p>
          </section>

          <!-- Types of Personal Data -->
          <section>
            <h2 class="text-3xl font-black text-corporate-dark mb-8 border-b-2 border-corporate-gold/30 pb-3 inline-block">
              {{ currentLanguage === 'en' ? 'Types of Personal Data' : 'ប្រភេទនៃទិន្នន័យផ្ទាល់ខ្លួន' }}
            </h2>
            <div class="prose prose-gray max-w-none text-gray-700">
              <p class="mb-4">
                {{ currentLanguage === 'en' 
                  ? 'The term "Personal Data" is defined as any information related to a natural person by which the types of Personal Data depend on the interactions you have with AFC and the products/services you use so that the Personal Data may include:'
                  : 'ពាក្យ "ទិន្នន័យផ្ទាល់ខ្លួន" ត្រូវបានកំណត់ថាជាព័ត៌មានណាមួយដែលទាក់ទងនឹងធម្មជាតិរបស់បុគ្គល ដែលប្រភេទនៃទិន្នន័យផ្ទាល់ខ្លួនអាស្រ័យលើអន្តរកម្មដែលអ្នកមានជាមួយ AFC និងផលិតផល/សេវាកម្មដែលអ្នកប្រើ ដូច្នេះទិន្នន័យផ្ទាល់ខ្លួនអាចរួមបញ្ចូលៈ'
                }}
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <template v-if="currentLanguage === 'en'">
                  <li>Personal information such as name, date of birth, address, zip code, telephone number, email address, age, personal identification number.</li>
                  <li>Personal-identifiable image or information.</li>
                  <li>Certain sensitive personal data such as race, religion, health data, biometric data, disability information or other sensitive personal data subjected to voluntarily disclosure.</li>
                  <li>Technical information such as web browsing and searching.</li>
                  <li>Information related to marketing and communication such as registration to receive updates including communications with AFC via social media.</li>
                </template>
                <template v-else>
                  <li>ព័ត៌មានផ្ទាល់ខ្លួនដូចជា ឈ្មោះ ថ្ងៃខែឆ្នាំកំណើត អាស័យដ្ឋាន លេខកូដតំបន់ លេខទូរស័ព្ទ អាសយដ្ឋានអ៊ីមែល អាយុ លេខអត្តសញ្ញាណផ្ទាល់ខ្លួន។</li>
                  <li>រូបភាព ឬព័ត៌មានដែលអាចកំណត់អត្តសញ្ញាណផ្ទាល់ខ្លួន។</li>
                  <li>ទិន្នន័យផ្ទាល់ខ្លួនដ៏រសើបមួយចំនួនដូចជា ពូជសាសន៍ សាសនា ទិន្នន័យសុខភាព ទិន្នន័យជីវមាត្រ ព័ត៌មានពិការភាព ឬទិន្នន័យផ្ទាល់ខ្លួនដ៏រសើបផ្សេងទៀត ដែលទទួលរង ការបង្ហាញដោយស្ម័គ្រចិត្ត។</li>
                  <li>ព័ត៌មានបច្ចេកទេសដូចជាការរុករកគេហទំព័រ និងការស្វែងរក។</li>
                  <li>ព័ត៌មានទាក់ទងនឹងទីផ្សារ និងការទំនាក់ទំនង ដូចជាការចុះឈ្មោះដើម្បីទទួលបានព័ត៌មានថ្មីៗ រួមទាំងការទំនាក់ទំនងជាមួយ AFC តាមរយៈប្រព័ន្ធផ្សព្វផ្សាយសង្គម។</li>
                </template>
              </ul>
            </div>
          </section>

          <!-- Collection -->
          <section>
            <h2 class="text-3xl font-black text-corporate-dark mb-8 border-b-2 border-corporate-gold/30 pb-3 inline-block">
              {{ currentLanguage === 'en' ? 'Collection of Personal Data' : 'ការប្រមូលទិន្នន័យផ្ទាល់ខ្លួន' }}
            </h2>
            <div class="prose prose-gray max-w-none text-gray-700">
              <p>
                {{ currentLanguage === 'en'
                  ? 'AFC will collects your Personal Data on our website, applications, social media including but not limited to when you provide your information in your registration to receive our products or services or job applications, membership registration, user account registration or update, or when you are our customers to providing your information through your communication with us, our staff or our retailers, information relating to user account, use of our products and/or services through contact, visit or search on our website, email or other means.'
                  : 'AFC នឹងប្រមូលទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នកនៅលើគេហទំព័ររបស់យើង កម្មវិធី ប្រព័ន្ធផ្សព្វផ្សាយសង្គម រួមទាំង ប៉ុន្តែមិនកំណត់ចំពោះពេលដែលអ្នកផ្តល់ព័ត៌មានរបស់អ្នកក្នុងការចុះឈ្មោះរបស់អ្នក ដើម្បីទទួលបានផលិតផល ឬសេវាកម្មរបស់យើង ឬកម្មវិធីការងារ ការចុះឈ្មោះសមាជិកភាព ការចុះឈ្មោះគណនីអ្នកប្រើប្រាស់ ឬការធ្វើបច្ចុប្បន្នភាព ឬនៅពេលដែលអ្នកមាន។ អតិថិជនរបស់យើងក្នុងការផ្តល់ព័ត៌មានរបស់អ្នកតាមរយៈការទំនាក់ទំនងរបស់អ្នកជាមួយយើង បុគ្គលិករបស់យើង ឬអ្នកលក់រាយរបស់យើង ព័ត៌មានទាក់ទងនឹងគណនីអ្នកប្រើប្រាស់ ការប្រើប្រាស់ផលិតផល និង/ឬសេវាកម្មរបស់យើង តាមរយៈទំនាក់ទំនង ចូលមើល ឬស្វែងរកនៅលើគេហទំព័ររបស់យើង អ៊ីមែល ឬមធ្យោបាយផ្សេងទៀត។'
                }}
              </p>
            </div>
          </section>

          <!-- Use -->
          <section>
            <h2 class="text-3xl font-black text-corporate-dark mb-8 border-b-2 border-corporate-gold/30 pb-3 inline-block">
              {{ currentLanguage === 'en' ? 'Use of Personal Data' : 'ការប្រើប្រាស់ទិន្នន័យផ្ទាល់ខ្លួន' }}
            </h2>
            <div class="prose prose-gray max-w-none text-gray-700">
              <p>
                {{ currentLanguage === 'en'
                  ? 'AFC will only collect your personal data in order to provide you with our products/services and to process your order, respond to your requests, manage your customer relationship with you, send you relevant marketing materials, invite you for an event and/or online survey, provide you with our media and investor relationship information, prevent fraud or illegal activities, conduct our legitimate interests, and comply with legal obligations.'
                  : 'AFC នឹងប្រមូលទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នកតែប៉ុណ្ណោះ ដើម្បីផ្តល់ឱ្យអ្នកនូវផលិតផល/សេវាកម្មរបស់យើង និងដើម្បីដំណើរការការបញ្ជាទិញរបស់អ្នក ឆ្លើយតបទៅនឹងសំណើរបស់អ្នក គ្រប់គ្រងទំនាក់ទំនងអតិថិជនរបស់អ្នកជាមួយអ្នក ផ្ញើសម្ភារៈទីផ្សារដែលពាក់ព័ន្ធមកអ្នក អញ្ជើញអ្នកសម្រាប់ព្រឹត្តិការណ៍ និង/ឬតាមអ៊ីនធឺណិត។ ការស្ទង់មតិ ផ្តល់ឱ្យអ្នកនូវប្រព័ន្ធផ្សព្វផ្សាយ និងព័ត៌មានទំនាក់ទំនងវិនិយោគិនរបស់យើង ការពារការក្លែងបន្លំ ឬសកម្មភាពខុសច្បាប់ ធ្វើសកម្មភាពផលប្រយោជន៍ស្របច្បាប់របស់យើង និងគោរពតាមកាតព្វកិច្ចផ្លូវច្បាប់។'
                }}
              </p>
            </div>
          </section>

          <!-- Disclosure -->
          <section>
            <h2 class="text-3xl font-black text-corporate-dark mb-8 border-b-2 border-corporate-gold/30 pb-3 inline-block">
              {{ currentLanguage === 'en' ? 'Disclosure of Personal Data' : 'ការបង្ហាញទិន្នន័យផ្ទាល់ខ្លួន' }}
            </h2>
            <div class="prose prose-gray max-w-none text-gray-700">
              <p class="mb-4">
                {{ currentLanguage === 'en'
                  ? 'AFC will not disclose your Personal Data without your prior consent unless it is to improve the quality of our products/services or to comply with our legitimate interests and legal obligations. AFC may disclose your Personal Data to our affiliates, our business partners, our data processors, public authorities having competence according to the laws and regulations of Cambodia.'
                  : 'AFC នឹងមិនបង្ហាញទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នកដោយគ្មានការយល់ព្រមជាមុនរបស់អ្នកទេ លុះត្រាតែវាជាការកែលម្អគុណភាពនៃផលិតផល/សេវាកម្មរបស់យើង ឬដើម្បីអនុវត្តតាមផលប្រយោជន៍ស្របច្បាប់ និងកាតព្វកិច្ចផ្លូវច្បាប់របស់យើង។ AFC អាចបង្ហាញទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នកទៅកាន់សាខារបស់យើង ដៃគូអាជីវកម្មរបស់យើង អ្នកដំណើរការទិន្នន័យរបស់យើង អាជ្ញាធរសាធារណៈដែលមានសមត្ថកិច្ចស្របតាមច្បាប់ និងបទប្បញ្ញត្តនៃប្រទេសកម្ពុជា។'
                }}
              </p>
              <p>
                {{ currentLanguage === 'en'
                  ? 'However, if you believe that any person to whom AFC discloses your Personal Data uses your Personal Data for any purpose other than specified in this Privacy Policy, you may notify AFC through the contact details provided herein so that AFC will take appropriate action accordingly.'
                  : 'ទោះជាយ៉ាងណាក៏ដោយ ប្រសិនបើអ្នកជឿថាបុគ្គលណាម្នាក់ដែល AFC បង្ហាញទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នកប្រើប្រាស់ទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នកសម្រាប់គោលបំណងណាមួយក្រៅពីបានបញ្ជាក់នៅក្នុងគោលការណ៍ឯកជនភាពនេះ អ្នកអាចជូនដំណឹងដល់ AFC តាមរយៈព័ត៌មានលម្អិតទំនាក់ទំនងដែលបានផ្ដល់ជូននៅទីនេះ ដូច្នេះ AFC នឹងចាត់វិធានការសមស្របទៅតាមនោះ។'
                }}
              </p>
            </div>
          </section>

          <!-- Rights -->
          <section>
            <h2 class="text-3xl font-black text-corporate-dark mb-8 border-b-2 border-corporate-gold/30 pb-3 inline-block">
              {{ currentLanguage === 'en' ? 'Your Rights Related to Personal Data' : 'សិទ្ធិរបស់អ្នកទាក់ទងនឹងទិន្នន័យផ្ទាល់ខ្លួន' }}
            </h2>
            <div class="prose prose-gray max-w-none text-gray-700">
              <p class="mb-4">
                {{ currentLanguage === 'en'
                  ? 'According to the terms and conditions of the Privacy Policy, you expressly give your consent to AFC for the collection, use and disclosure of your Personal Data. However, you reserve rights to:'
                  : 'យោងតាមលក្ខខណ្ឌនៃគោលការណ៍ឯកជនភាព អ្នកផ្តល់ការយល់ព្រមរបស់អ្នកយ៉ាងច្បាស់លាស់ទៅ AFC សម្រាប់ការប្រមូល ការប្រើប្រាស់ និងការបង្ហាញទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នក។ ទោះយ៉ាងណាក៏ដោយ អ្នករក្សាសិទ្ធិក្នុង៖'
                }}
              </p>
              <ul class="list-disc pl-6 space-y-2">
                <template v-if="currentLanguage === 'en'">
                  <li>Update or delete your Personal Data by connecting to your user account or sending a written request to AFC.</li>
                  <li>Object to the collection, use and disclosure of your Personal Data, except where it outweighs your right, or it is required by laws and regulations of Cambodia.</li>
                  <li>Access and request an electronic copy of your Personal Data. And</li>
                  <li>Withdraw your consent of use and disclosure of your Personal Data, at any time in written with valid reason(s).</li>
                </template>
                <template v-else>
                  <li>ធ្វើបច្ចុប្បន្នភាព ឬលុបទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នកដោយភ្ជាប់ទៅគណនីអ្នកប្រើប្រាស់របស់អ្នក ឬផ្ញើសំណើជាលាយលក្ខណ៍អក្សរទៅកាន់ AFC។</li>
                  <li>ជំទាស់នឹងការប្រមូល ប្រើប្រាស់ និងការបង្ហាញទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នក លើកលែងតែកន្លែងដែលវាលើសពីសិទ្ធិរបស់អ្នក ឬវាត្រូវបានទាមទារដោយច្បាប់ និងបទប្បញ្ញត្តិនៃប្រទេសកម្ពុជា។</li>
                  <li>ចូលប្រើ និងស្នើសុំច្បាប់ចម្លងអេឡិចត្រូនិចនៃទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នក។ និង</li>
                  <li>ដកការយល់ព្រមរបស់អ្នកក្នុងការប្រើប្រាស់ និងការបង្ហាញទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នក នៅពេលណាមួយជាលាយលក្ខណ៍អក្សរដោយមានហេតុផលត្រឹមត្រូវ។</li>
                </template>
              </ul>
            </div>
          </section>

          <!-- Contact Details -->
          <section>
            <h2 class="text-3xl font-black text-corporate-dark mb-8 border-b-2 border-corporate-gold/30 pb-3 inline-block">
              {{ currentLanguage === 'en' ? "AFC's Contact Details" : 'ព័ត៌មានលម្អិតសម្រាប់ទំនាក់ទំនងរបស់ AFC' }}
            </h2>
            <div class="prose prose-gray max-w-none text-gray-700">
              <p class="mb-6">
                {{ currentLanguage === 'en'
                  ? 'If you wish to exercise your rights related to the processing of your Personal Data, or have any questions or complaints, you may contact AFC at:'
                  : 'ប្រសិនបើអ្នកចង់អនុវត្តសិទ្ធិរបស់អ្នកទាក់ទងនឹងដំណើរការទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នក ឬមានសំណួរ ឬការត្អូញត្អែរណាមួយ អ្នកអាចទាក់ទង AFC តាមរយៈ៖'
                }}
              </p>
              <div class="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-inner">
                <p class="text-xl font-black text-corporate-dark mb-4">
                  {{ currentLanguage === 'en' ? 'APRATI FOODS (CAMBODIA) LTD' : 'អេប្រាធី ហ្វ៊ូដ (ខេមបូឌា)' }}
                </p>
                <div class="space-y-3 font-medium">
                  <div class="flex items-start">
                    <span class="w-24 text-gray-400 uppercase text-[10px] pt-1 tracking-widest">{{ currentLanguage === 'en' ? 'Address' : 'អាស័យដ្ឋាន' }}:</span>
                    <span>{{ currentLanguage === 'en' ? '#P2-100, Royal Group Special Economic Zone, Sangkat Phleung Chheh Roteh, Khan Kambol, Phnom Penh.' : '#P2-100, Royal Group Special Economic Zone, សង្កាត់ ភ្លើងឆេះរទេះ ខណ្ឌកំបូល រាជធានីភ្នំពេញ' }}</span>
                  </div>
                  <div class="flex items-center">
                    <span class="w-24 text-gray-400 uppercase text-[10px] tracking-widest">{{ currentLanguage === 'en' ? 'Tel' : 'លេខទូរស័ព្ទ' }}:</span>
                    <a href="tel:+85587300040" class="text-blue-600 hover:underline tracking-wider font-bold">(+855) 87 300 040</a>
                  </div>
                  <div class="flex items-center">
                    <span class="w-24 text-gray-400 uppercase text-[10px] tracking-widest">{{ currentLanguage === 'en' ? 'Email' : 'អ៊ីម៉ែល' }}:</span>
                    <a href="mailto:info@apratifoods.asia" class="text-blue-600 hover:underline font-bold">info@apratifoods.asia</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Back to Site -->
        <div class="pt-8 border-t">
          <NuxtLink 
            to="/" 
            class="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black tracking-widest uppercase rounded-xl transition-all duration-300 shadow-lg shadow-blue-900/20"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Return to Homepage
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// State
const sections = ref([])
const loading = ref(true)
const error = ref(null)
const currentLanguage = ref('en')

// Get API instance
const api = useApi()

// Methods
const switchLanguage = (lang) => {
  currentLanguage.value = lang
  loadSections()
}

const loadSections = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await api.privacyContent.getAll()
    
    if (response.success && response.data) {
      // Filter by language and active status, then sort by order
      sections.value = response.data
        .filter(section => section.is_active && (section.language === currentLanguage.value || !section.language))
        .sort((a, b) => a.sort_order - b.sort_order)
    } else {
      sections.value = []
    }
  } catch (err) {
    console.error('Error loading privacy sections:', err)
    error.value = 'Failed to load privacy policy content.'
    sections.value = []
  } finally {
    loading.value = false
  }
}

const formatContent = (content) => {
  // Simple formatting: convert line breaks to <br> and handle basic lists
  return content
    .replace(/\n/g, '<br>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
}

const lastUpdated = computed(() => {
  if (sections.value.length > 0) {
    const latest = sections.value.reduce((latest, section) => {
      return new Date(section.updated_at) > new Date(latest.updated_at) ? section : latest
    })
    return new Date(latest.updated_at).toLocaleDateString()
  }
  return new Date().toLocaleDateString()
})

// Lifecycle
onMounted(() => {
  loadSections()
})

// Page meta
useSeoMeta({
  title: 'Privacy Policy - Aprati Foods Cambodia',
  description: 'Privacy policy for Aprati Foods Cambodia. Learn how we collect, use, and protect your personal information.',
  ogTitle: 'Privacy Policy - Aprati Foods Cambodia',
  ogDescription: 'Privacy policy for Aprati Foods Cambodia. Learn how we collect, use, and protect your personal information.',
  ogType: 'website'
})

// Page layout
definePageMeta({
  layout: 'default'
})
</script>
