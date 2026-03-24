$path = "d:\Xammp\htdocs\aprati-website\aprati_frontend\app\pages\index.vue"
$content = Get-Content $path
$startLine = 526
$endLine = 618

$newContent = @(
    "    <!-- Our Portfolio Section - Professional Corporate Style -->",
    "    <section id=`"brands`" class=`"relative py-24 sm:py-32 bg-white overflow-hidden scroll-smooth`">",
    "      <div class=`"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10`">",
    "        <!-- Section Header -->",
    "        <div class=`"text-center mb-20 animate-fade-in text-corporate-dark`">",
    "          <div class=`"inline-block mb-6`">",
    "            <span class=`"inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black tracking-widest uppercase`">",
    "              Brand Integrity",
    "            </span>",
    "          </div>",
    "          <h2 class=`"text-4xl sm:text-6xl font-black mb-6 tracking-tight leading-none`">",
    "            Our <span class=`"text-emerald-500 font-light italic text-5xl`">Professional</span> Portfolio",
    "          </h2>",
    "          <div class=`"w-16 h-1 bg-emerald-500 mx-auto mb-8 rounded-full`"></div>",
    "          <p class=`"text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed`">",
    "            Discover our diverse range of snacks and health products, developed with a commitment to quality and consumer wellbeing.",
    "          </p>",
    "        </div>",
    "",
    "        <!-- Brands Grid -->",
    "        <div class=`"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`">",
    "          <!-- Loading State Component -->",
    "          <div v-if=`"loading`" class=`"col-span-full text-center py-20`">",
    "            <div class=`"flex justify-center mb-6`">",
    "              <div class=`"relative w-12 h-12`">",
    "                <div class=`"absolute inset-0 rounded-full border-4 border-emerald-100`"></div>",
    "                <div class=`"absolute inset-0 rounded-full border-4 border-t-emerald-600 animate-spin`"></div>",
    "              </div>",
    "            </div>",
    "            <p class=`"text-slate-600 font-bold tracking-widest uppercase text-xs`">Accessing Portfolio...</p>",
    "          </div>"
)

$before = $content[0..($startLine - 2)]
$after = $content[($endLine - 1)..($content.Length - 1)]

$final = $before + $newContent + $after
$final | Set-Content $path
