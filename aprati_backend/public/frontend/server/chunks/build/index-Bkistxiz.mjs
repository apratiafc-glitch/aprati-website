import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, openBlock, createCommentVNode, toDisplayString, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _imports_12, a as _imports_13, b as _imports_14, c as _imports_15, d as _imports_10, e as _imports_11 } from './virtual_public-B_jtVuV9.mjs';
import { ArrowRightIcon } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/@heroicons/vue/24/outline/esm/index.js';
import { a as useSeoMeta, b as useRuntimeConfig } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/ufo/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/h3/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/destr/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/hookable/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/ofetch/dist/node.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/klona/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/defu/dist/defu.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/scule/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/pathe/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/ipx/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/unstorage/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/unstorage/drivers/fs.mjs';
import 'file:///D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/ohash/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/unctx/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/pinia/dist/pinia.prod.cjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue-router/dist/vue-router.node.mjs';
import '../_/renderer.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/unhead/dist/server.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/devalue/index.js';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/unhead/dist/plugins.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/unhead/dist/utils.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const runtimeConfig = useRuntimeConfig();
    useSeoMeta({
      title: "Home - Welcome to Aprati Foods Cambodia",
      description: "Enhanced introduction website with advanced product search, career management, and comprehensive inventory system."
    });
    ref([]);
    ref([]);
    const dynamicBrands = ref([]);
    const brandProducts = ref({});
    const loading = ref(true);
    const informationSections = ref([]);
    const informationLoading = ref(false);
    const showInfoModal = ref(false);
    const selectedInfo = ref(null);
    const featuredProducts = ref([]);
    const heroImage = ref("/images/default-hero.svg");
    const heroImageAlt = ref("Aprati Food Company");
    ref("");
    ref("");
    const heroContent = ref({
      title: 'Welcome to <span class="text-orange-400">Aprati</span> Food Company',
      subtitle: "Enhanced introduction website with advanced product search, career management, and comprehensive inventory system.",
      primary_button_text: "Explore Our Brands",
      primary_button_link: "/brands",
      secondary_button_text: "Join Our Team",
      secondary_button_link: "/careers"
    });
    const getBrandGradient = (slug) => {
      const gradients = {
        "aprati": "bg-gradient-to-br from-blue-600 to-blue-800",
        "frutati": "bg-gradient-to-br from-green-600 to-green-800",
        "mocati": "bg-gradient-to-br from-orange-600 to-orange-800"
      };
      return gradients[slug] || "bg-gradient-to-br from-red-600 to-red-800";
    };
    const handleBrandLogoError = (event) => {
      console.warn("Brand logo failed to load:", event.target.src);
      const logoContainer = event.target.closest(".relative");
      if (logoContainer) {
        logoContainer.style.display = "none";
      }
    };
    const handleBrandLogoLoad = (event) => {
    };
    const getImageUrl = (imagePath) => {
      if (!imagePath) return "/images/default-info.jpg";
      if (imagePath.startsWith("data:")) return imagePath;
      if (imagePath.startsWith("http")) {
        return `${imagePath}${imagePath.includes("?") ? "&" : "?"}t=${Date.now()}`;
      }
      if (imagePath.startsWith("/storage/")) {
        return `${runtimeConfig.public.apiBaseUrl}${imagePath}?t=${Date.now()}`;
      }
      return `${imagePath}${imagePath.includes("?") ? "&" : "?"}t=${Date.now()}`;
    };
    const closeInfoModal = () => {
      showInfoModal.value = false;
      selectedInfo.value = null;
      (void 0).body.style.overflow = "auto";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-green-50" }, _attrs))} data-v-b6c2660a><section class="relative h-screen overflow-hidden" data-v-b6c2660a><div class="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 animate-pulse z-10" data-v-b6c2660a></div><div class="absolute inset-0" data-v-b6c2660a><img${ssrRenderAttr("src", unref(heroImage) || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjNjM2NmYxIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkFwcmF0aSBGb29kIENvbXBhbnk8L3RleHQ+Cjwvc3ZnPgo=")}${ssrRenderAttr("alt", unref(heroImageAlt) || "Aprati Foods")} loading="eager" fetchpriority="high" class="w-full h-full object-cover" data-v-b6c2660a><div class="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-blue-500/20 to-blue-600/30" data-v-b6c2660a></div><div class="absolute inset-0 overflow-hidden pointer-events-none" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-1/4 left-1/6 w-20 h-20 object-contain opacity-20 animate-float" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute bottom-1/4 right-1/6 w-20 h-20 object-contain opacity-20 animate-float-delayed" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-1/3 right-1/4 w-16 h-16 object-contain opacity-15 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.5s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute bottom-1/3 left-1/4 w-16 h-16 object-contain opacity-18 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-1/6 right-1/6 w-14 h-14 object-contain opacity-12 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.5s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute bottom-1/6 left-1/3 w-16 h-16 object-contain opacity-16 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "2s" })}" data-v-b6c2660a></div></div><div class="relative z-10 h-full flex items-center" data-v-b6c2660a><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full" data-v-b6c2660a><div class="text-center max-w-5xl mx-auto" data-v-b6c2660a><div class="inline-block mb-8 animate-fade-in relative" data-v-b6c2660a><div class="relative px-8 py-4 text-xs font-black tracking-[0.3em] uppercase bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-full shadow-2xl shadow-blue-500/50 ring-4 ring-white/50" data-v-b6c2660a><span class="relative z-10" data-v-b6c2660a>🍬 Welcome to Aprati Foods (Cambodia) Ltd 🍬</span><div class="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full pointer-events-none" data-v-b6c2660a></div><div class="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full animate-ping" data-v-b6c2660a></div></div></div><h1 class="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 leading-none tracking-tighter animate-slide-up drop-shadow-2xl text-white" data-v-b6c2660a> Welcome to <span class="font-black" data-v-b6c2660a>Aprati</span> Food Company </h1><p class="text-lg sm:text-xl lg:text-2xl text-white mb-12 max-w-3xl mx-auto font-medium animate-fade-in animation-delay-500 drop-shadow-lg" data-v-b6c2660a> 🌈 Enhanced introduction website with advanced product search, career management, and comprehensive inventory system 🌈 </p><div class="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in animation-delay-1000" data-v-b6c2660a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(heroContent).primary_button_link || "/brands",
        class: "group relative px-12 py-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-black text-sm tracking-wider uppercase transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/60 rounded-full ring-4 ring-white/50 overflow-hidden"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="relative z-10" data-v-b6c2660a${_scopeId}>🍭 Explore Our Brands</span>`);
            _push2(ssrRenderComponent(unref(ArrowRightIcon), { class: "inline-block ml-3 w-5 h-5 transition-transform group-hover:translate-x-2 relative z-10" }, null, _parent2, _scopeId));
            _push2(`<div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" data-v-b6c2660a${_scopeId}></div><div class="absolute inset-0 bg-gradient-to-br from-blue-300/30 to-blue-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full animate-pulse" data-v-b6c2660a${_scopeId}></div>`);
          } else {
            return [
              createVNode("span", { class: "relative z-10" }, "🍭 Explore Our Brands"),
              createVNode(unref(ArrowRightIcon), { class: "inline-block ml-3 w-5 h-5 transition-transform group-hover:translate-x-2 relative z-10" }),
              createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" }),
              createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-blue-300/30 to-blue-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full animate-pulse" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(heroContent).secondary_button_link || "/careers",
        class: "group relative px-12 py-6 bg-gradient-to-r from-white to-blue-100 text-blue-700 font-black text-sm tracking-wider uppercase transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-white/60 rounded-full ring-4 ring-blue-200 overflow-hidden"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="relative z-10" data-v-b6c2660a${_scopeId}>💼 Join Our Team</span><div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" data-v-b6c2660a${_scopeId}></div><div class="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-blue-300/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full animate-pulse" data-v-b6c2660a${_scopeId}></div>`);
          } else {
            return [
              createVNode("span", { class: "relative z-10" }, "💼 Join Our Team"),
              createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" }),
              createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-blue-200/30 to-blue-300/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full animate-pulse" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></section><section class="relative py-8 bg-gradient-to-b from-blue-50 to-orange-50 overflow-hidden" data-v-b6c2660a><div class="absolute inset-0 pointer-events-none" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-1/4 left-1/6 w-20 h-20 object-contain opacity-25 animate-float" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute bottom-1/4 right-1/6 w-20 h-20 object-contain opacity-25 animate-float-delayed" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-1/2 left-1/4 w-16 h-16 object-contain opacity-20 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.7s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute bottom-1/3 right-1/4 w-16 h-16 object-contain opacity-22 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.2s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute top-1/6 right-1/3 w-14 h-14 object-contain opacity-18 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.4s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute bottom-1/6 left-1/3 w-16 h-16 object-contain opacity-20 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.8s" })}" data-v-b6c2660a></div><div class="flex justify-center animate-bounce" data-v-b6c2660a><div class="group relative cursor-pointer" data-v-b6c2660a><div class="flex flex-col items-center bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 px-8 py-4 rounded-full ring-4 ring-white shadow-2xl shadow-red-500/50 transform transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-[0_0_50px_rgba(239,68,68,0.6)] overflow-hidden" data-v-b6c2660a><span class="relative z-10 text-white text-xs tracking-widest uppercase mb-2 font-black" data-v-b6c2660a>🍬 Scroll Down 🍬</span><svg class="relative z-10 w-6 h-6 text-white transition-transform group-hover:translate-y-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b6c2660a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 14l-7 7m0 0l-7-7m7 7V3" data-v-b6c2660a></path></svg><div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" data-v-b6c2660a></div><div class="absolute inset-0 bg-gradient-to-br from-orange-300/30 to-red-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full animate-pulse" data-v-b6c2660a></div><div class="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" data-v-b6c2660a></div><div class="absolute -bottom-2 -left-2 w-4 h-4 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-300" data-v-b6c2660a></div></div></div></div></section><section class="relative py-24 lg:py-32 bg-gradient-to-b from-orange-50 via-red-50 to-blue-50 overflow-hidden" data-v-b6c2660a><div class="absolute inset-0 pointer-events-none" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute top-16 left-12 w-20 h-20 object-contain opacity-25 animate-float" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute bottom-16 right-16 w-20 h-20 object-contain opacity-25 animate-float-delayed" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-1/4 right-1/6 w-16 h-16 object-contain opacity-20 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.6s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute bottom-1/4 left-1/6 w-16 h-16 object-contain opacity-22 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.1s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-1/3 left-1/3 w-14 h-14 object-contain opacity-18 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.6s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute bottom-1/3 right-1/3 w-16 h-16 object-contain opacity-23 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "2.1s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-1/2 right-1/4 w-14 h-14 object-contain opacity-16 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.3s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute bottom-1/2 left-1/4 w-16 h-16 object-contain opacity-19 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.4s" })}" data-v-b6c2660a></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-v-b6c2660a><div class="mb-20 text-center relative" data-v-b6c2660a><div class="inline-block relative mb-6" data-v-b6c2660a><span class="inline-block px-8 py-3 text-xs font-black tracking-[0.3em] uppercase bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 text-white rounded-full shadow-2xl shadow-red-500/50 ring-4 ring-white/50" data-v-b6c2660a>🎉 OUR Information 🎉</span><div class="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full pointer-events-none" data-v-b6c2660a></div></div><h2 class="text-5xl lg:text-7xl xl:text-8xl font-black mb-6 tracking-tighter leading-none drop-shadow-xl" data-v-b6c2660a><span class="bg-gradient-to-r from-blue-600 via-red-500 to-green-700 bg-clip-text text-transparent" data-v-b6c2660a>LATEST</span> <span class="bg-gradient-to-r from-orange-500 via-red-500 to-red-600 bg-clip-text text-transparent" data-v-b6c2660a>NEWS</span></h2><div class="w-32 h-2 bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 mx-auto mb-8 rounded-full shadow-lg shadow-red-500/50" data-v-b6c2660a></div><p class="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto font-light" data-v-b6c2660a> Discover the latest updates, news, and innovations from our dynamic ecosystem </p></div>`);
      if (unref(informationLoading)) {
        _push(`<div class="text-center py-20" data-v-b6c2660a><div class="relative mx-auto w-20 h-20 mb-6" data-v-b6c2660a><div class="absolute inset-0 rounded-full border-4 border-orange-200" data-v-b6c2660a></div><div class="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 border-r-red-500 animate-spin" data-v-b6c2660a></div><div class="absolute inset-2 rounded-full border-4 border-transparent border-t-blue-600 animate-spin" style="${ssrRenderStyle({ "animation-duration": "1.5s", "animation-direction": "reverse" })}" data-v-b6c2660a></div></div><p class="mt-8 text-gray-700 text-lg font-black" data-v-b6c2660a>🍬 Loading sweet content... 🍬</p></div>`);
      } else if (unref(informationSections).length > 0) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-v-b6c2660a><!--[-->`);
        ssrRenderList(unref(informationSections), (section, index2) => {
          _push(`<div class="group relative" data-v-b6c2660a><div class="block cursor-pointer" data-v-b6c2660a><div class="relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_0_50px_rgba(239,68,68,0.4)] transition-all duration-700 group-hover:scale-[1.05] border-4 border-orange-200 hover:border-red-400 ring-4 ring-orange-100" data-v-b6c2660a><div class="relative h-80 overflow-hidden" data-v-b6c2660a>`);
          if (section.image_url) {
            _push(`<div class="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-125" style="${ssrRenderStyle(`background-image: url('${getImageUrl(section.image_url)}');`)}" data-v-b6c2660a></div>`);
          } else {
            _push(`<div class="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-400 to-blue-500" data-v-b6c2660a></div>`);
          }
          _push(`<div class="absolute inset-0 bg-gradient-to-t from-red-600/30 via-orange-500/20 to-transparent" data-v-b6c2660a></div><div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-red-400/20 to-orange-400/20 mix-blend-overlay opacity-40 group-hover:opacity-60 transition-opacity duration-700" data-v-b6c2660a></div><div class="absolute top-6 left-6 z-20" data-v-b6c2660a><div class="relative bg-gradient-to-r from-orange-500 via-red-500 to-red-600 text-white px-5 py-3 rounded-full font-black text-xs uppercase tracking-wider shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ring-4 ring-white/50" data-v-b6c2660a><span class="relative z-10" data-v-b6c2660a>📰 Information</span><div class="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full pointer-events-none" data-v-b6c2660a></div></div></div><div class="absolute bottom-0 left-0 right-0 p-8 z-10" data-v-b6c2660a><div class="transform transition-all duration-500 group-hover:translate-y-[-8px]" data-v-b6c2660a><h3 class="text-4xl lg:text-5xl font-black mb-3 tracking-tighter leading-none text-white" style="${ssrRenderStyle({ "text-shadow": "0 4px 12px rgba(59, 130, 246, 0.8), 0 2px 6px rgba(37, 99, 235, 0.6)" })}" data-v-b6c2660a>${ssrInterpolate(section.title)}</h3><div class="h-1.5 bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 rounded-full w-0 group-hover:w-32 transition-all duration-700 shadow-lg shadow-red-500/50" data-v-b6c2660a></div></div></div></div><div class="relative bg-gradient-to-br from-orange-100 via-red-50 to-blue-100 p-8" data-v-b6c2660a><div class="text-gray-700 text-base leading-relaxed mb-6 line-clamp-2 font-medium" data-v-b6c2660a><div data-v-b6c2660a>${section.description ?? ""}</div></div><div class="flex items-center justify-between pt-6 border-t-2 border-orange-200" data-v-b6c2660a><div class="flex items-center gap-4" data-v-b6c2660a><div class="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-full" data-v-b6c2660a><div class="w-3 h-3 bg-green-600 rounded-full animate-pulse shadow-lg shadow-green-600/50" data-v-b6c2660a></div><span class="text-xs font-black text-green-700 uppercase tracking-wider" data-v-b6c2660a>Active</span></div></div><div class="relative group/btn" data-v-b6c2660a><div class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 rounded-full font-black text-xs uppercase tracking-wider text-white shadow-2xl shadow-red-500/50 transform transition-all duration-500 group-hover:scale-110 ring-4 ring-white/50 overflow-hidden" data-v-b6c2660a><span class="relative z-10" data-v-b6c2660a>👁️ View Details</span>`);
          _push(ssrRenderComponent(unref(ArrowRightIcon), { class: "w-4 h-4 transition-transform group-hover:translate-x-2 relative z-10" }, null, _parent));
          _push(`<div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" data-v-b6c2660a></div></div></div></div></div><div class="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-500/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" data-v-b6c2660a></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-20" data-v-b6c2660a><div class="max-w-3xl mx-auto" data-v-b6c2660a><div class="relative mb-12" data-v-b6c2660a><div class="w-32 h-32 mx-auto relative" data-v-b6c2660a><div class="absolute inset-0 rounded-full bg-gray-200" data-v-b6c2660a></div><div class="absolute inset-2 rounded-full bg-white flex items-center justify-center shadow-lg" data-v-b6c2660a><svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b6c2660a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-b6c2660a></path></svg></div></div></div><h2 class="text-4xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight" data-v-b6c2660a> Coming <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-v-b6c2660a>Soon</span></h2><p class="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto" data-v-b6c2660a> We are preparing something special for you. Stay tuned for exciting updates, innovations, and announcements. </p><div class="flex flex-col sm:flex-row gap-6 justify-center" data-v-b6c2660a>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/contact",
          class: "group relative inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 transform hover:scale-105"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="relative z-10" data-v-b6c2660a${_scopeId}>Get Notified</span>`);
              _push2(ssrRenderComponent(unref(ArrowRightIcon), { class: "relative z-10 ml-3 w-6 h-6" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode("span", { class: "relative z-10" }, "Get Notified"),
                createVNode(unref(ArrowRightIcon), { class: "relative z-10 ml-3 w-6 h-6" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/about",
          class: "group inline-flex items-center px-8 py-4 rounded-2xl border-2 border-gray-300 text-gray-700 font-bold text-lg transition-all duration-300 hover:bg-gray-100 hover:border-gray-400"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Learn More <svg class="ml-3 w-6 h-6 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b6c2660a${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-v-b6c2660a${_scopeId}></path></svg>`);
            } else {
              return [
                createTextVNode(" Learn More "),
                (openBlock(), createBlock("svg", {
                  class: "ml-3 w-6 h-6 transition-transform group-hover:rotate-45",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      }
      _push(`</div></section><section class="relative py-24 lg:py-32 bg-gradient-to-b from-blue-50 via-green-50 to-blue-100 overflow-hidden" data-v-b6c2660a><div class="absolute inset-0 pointer-events-none" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-1/6 left-1/6 w-20 h-20 object-contain opacity-15 animate-float" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute bottom-1/6 right-1/6 w-20 h-20 object-contain opacity-15 animate-float-delayed" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-16 left-1/3 w-16 h-16 object-contain opacity-20 animate-float" style="${ssrRenderStyle({ "animation-delay": "1s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute bottom-16 right-1/3 w-16 h-16 object-contain opacity-20 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.5s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute top-1/4 right-1/5 w-16 h-16 object-contain opacity-18 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.5s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute bottom-1/4 left-1/5 w-16 h-16 object-contain opacity-17 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "2s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-1/3 left-1/2 w-14 h-14 object-contain opacity-14 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.8s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute bottom-1/3 right-1/2 w-14 h-14 object-contain opacity-16 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.3s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-1/2 left-1/4 w-14 h-14 object-contain opacity-12 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.8s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute bottom-1/2 right-1/4 w-14 h-14 object-contain opacity-13 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "2.3s" })}" data-v-b6c2660a></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-v-b6c2660a><div class="text-center mb-20 relative z-10" data-v-b6c2660a><div class="inline-block relative mb-6" data-v-b6c2660a><span class="inline-block px-8 py-3 text-xs font-black tracking-[0.3em] uppercase bg-gradient-to-r from-blue-600 via-green-700 to-green-800 text-white rounded-full shadow-2xl shadow-green-700/50 ring-4 ring-white/50" data-v-b6c2660a>🏆 OUR BRANDS 🏆</span><div class="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full pointer-events-none" data-v-b6c2660a></div></div><h2 class="text-5xl lg:text-7xl xl:text-8xl font-black mb-6 tracking-tighter leading-none drop-shadow-xl" data-v-b6c2660a><span class="bg-gradient-to-r from-blue-600 via-green-700 to-green-800 bg-clip-text text-transparent" data-v-b6c2660a>OUR <span class="bg-gradient-to-r from-orange-500 via-red-500 to-red-600 bg-clip-text text-transparent" data-v-b6c2660a>PREMIUM</span> BRANDS</span></h2><div class="w-32 h-2 bg-gradient-to-r from-blue-600 via-green-700 to-green-800 mx-auto mb-8 rounded-full shadow-lg shadow-green-700/50" data-v-b6c2660a></div><p class="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto font-light" data-v-b6c2660a> Discover our collection of premium quality food brand products </p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-v-b6c2660a>`);
      if (unref(loading)) {
        _push(`<div class="col-span-3 text-center py-12" data-v-b6c2660a><div class="relative mx-auto w-20 h-20 mb-6" data-v-b6c2660a><div class="absolute inset-0 rounded-full border-4 border-blue-200" data-v-b6c2660a></div><div class="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-green-700 animate-spin" data-v-b6c2660a></div><div class="absolute inset-2 rounded-full border-4 border-transparent border-t-orange-500 animate-spin" style="${ssrRenderStyle({ "animation-duration": "1.5s", "animation-direction": "reverse" })}" data-v-b6c2660a></div></div><p class="text-gray-700 text-lg font-black" data-v-b6c2660a>🎯 Loading awesome brands... 🎯</p></div>`);
      } else if (unref(dynamicBrands).length > 0) {
        _push(`<!--[-->`);
        ssrRenderList(unref(dynamicBrands), (brand, index2) => {
          _push(`<div class="group relative" data-v-b6c2660a>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/brands/${brand.slug}`,
            class: "block"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_0_50px_rgba(37,99,235,0.4)] transition-all duration-700 group-hover:scale-[1.05] border-4 border-blue-200 hover:border-blue-500 ring-4 ring-blue-100" data-v-b6c2660a${_scopeId}><div class="relative h-80 overflow-hidden" data-v-b6c2660a${_scopeId}>`);
                if (brand.cover_image_url) {
                  _push2(`<div class="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-125" style="${ssrRenderStyle(`background-image: url('${brand.cover_image_url}');`)}" data-v-b6c2660a${_scopeId}></div>`);
                } else {
                  _push2(`<div class="${ssrRenderClass([getBrandGradient(brand.slug), "absolute inset-0"])}" data-v-b6c2660a${_scopeId}></div>`);
                }
                _push2(`<div class="absolute inset-0 bg-gradient-to-t from-blue-700/90 via-green-600/50 to-transparent" data-v-b6c2660a${_scopeId}></div><div class="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-green-600/30 to-blue-600/30 mix-blend-overlay opacity-70 group-hover:opacity-90 transition-opacity duration-700" data-v-b6c2660a${_scopeId}></div>`);
                if (brand.logo_url) {
                  _push2(`<div class="absolute top-6 left-6 z-20" data-v-b6c2660a${_scopeId}><div class="relative bg-white rounded-2xl p-4 shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 border-4 border-white ring-4 ring-blue-200" data-v-b6c2660a${_scopeId}><img${ssrRenderAttr("src", brand.logo_url)}${ssrRenderAttr("alt", brand.name)} class="h-14 w-14 object-contain" data-v-b6c2660a${_scopeId}><div class="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent rounded-2xl pointer-events-none" data-v-b6c2660a${_scopeId}></div></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="absolute top-6 right-6 z-20" data-v-b6c2660a${_scopeId}><div class="relative bg-gradient-to-r from-orange-500 via-red-500 to-red-600 text-white px-5 py-3 rounded-full font-black text-xs uppercase tracking-wider shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 ring-4 ring-white/50" data-v-b6c2660a${_scopeId}><span class="relative z-10" data-v-b6c2660a${_scopeId}>🎯 ${ssrInterpolate(unref(brandProducts)[brand.id]?.length || 0)} Products</span><div class="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full pointer-events-none" data-v-b6c2660a${_scopeId}></div></div></div><div class="absolute bottom-0 left-0 right-0 p-8 z-10" data-v-b6c2660a${_scopeId}><div class="transform transition-all duration-500 group-hover:translate-y-[-8px]" data-v-b6c2660a${_scopeId}><h3 class="text-5xl lg:text-6xl font-black mb-3 tracking-tighter leading-none" data-v-b6c2660a${_scopeId}><span class="bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent drop-shadow-2xl" data-v-b6c2660a${_scopeId}>${ssrInterpolate(brand.name)}</span></h3><div class="h-1.5 bg-gradient-to-r from-blue-500 via-green-600 to-green-700 rounded-full w-0 group-hover:w-32 transition-all duration-700 shadow-lg shadow-green-600/50" data-v-b6c2660a${_scopeId}></div></div></div></div><div class="relative bg-gradient-to-br from-blue-100 via-green-50 to-green-100 p-8" data-v-b6c2660a${_scopeId}><p class="text-gray-700 text-base leading-relaxed mb-6 line-clamp-2 font-medium" data-v-b6c2660a${_scopeId}>${ssrInterpolate(brand.description || "Premium quality products with innovative solutions crafted with excellence.")}</p><div class="flex items-center justify-between pt-6 border-t-2 border-green-200" data-v-b6c2660a${_scopeId}><div class="flex items-center gap-4" data-v-b6c2660a${_scopeId}><div class="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-full" data-v-b6c2660a${_scopeId}><div class="w-3 h-3 bg-green-600 rounded-full animate-pulse shadow-lg shadow-green-600/50" data-v-b6c2660a${_scopeId}></div><span class="text-xs font-black text-green-700 uppercase tracking-wider" data-v-b6c2660a${_scopeId}>Active</span></div><div class="h-4 w-px bg-green-300" data-v-b6c2660a${_scopeId}></div><span class="text-xs font-black text-gray-600 uppercase tracking-wider bg-white/70 px-3 py-2 rounded-full" data-v-b6c2660a${_scopeId}> 🏭 Est. ${ssrInterpolate(brand.established_year || "2024")}</span></div><div class="relative" data-v-b6c2660a${_scopeId}><div class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-green-700 to-green-800 rounded-full font-black text-xs uppercase tracking-wider text-white shadow-2xl shadow-green-700/50 transform transition-all duration-500 group-hover:scale-110 ring-4 ring-white/50 overflow-hidden" data-v-b6c2660a${_scopeId}><span class="relative z-10" data-v-b6c2660a${_scopeId}>🚀 Explore</span>`);
                _push2(ssrRenderComponent(unref(ArrowRightIcon), { class: "w-4 h-4 transition-transform group-hover:translate-x-2 relative z-10" }, null, _parent2, _scopeId));
                _push2(`<div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" data-v-b6c2660a${_scopeId}></div></div></div></div></div><div class="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-green-600/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" data-v-b6c2660a${_scopeId}></div></div>`);
              } else {
                return [
                  createVNode("div", { class: "relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_0_50px_rgba(37,99,235,0.4)] transition-all duration-700 group-hover:scale-[1.05] border-4 border-blue-200 hover:border-blue-500 ring-4 ring-blue-100" }, [
                    createVNode("div", { class: "relative h-80 overflow-hidden" }, [
                      brand.cover_image_url ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-125",
                        style: `background-image: url('${brand.cover_image_url}');`
                      }, null, 4)) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: ["absolute inset-0", getBrandGradient(brand.slug)]
                      }, null, 2)),
                      createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-blue-700/90 via-green-600/50 to-transparent" }),
                      createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-blue-500/30 via-green-600/30 to-blue-600/30 mix-blend-overlay opacity-70 group-hover:opacity-90 transition-opacity duration-700" }),
                      brand.logo_url ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "absolute top-6 left-6 z-20"
                      }, [
                        createVNode("div", { class: "relative bg-white rounded-2xl p-4 shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 border-4 border-white ring-4 ring-blue-200" }, [
                          createVNode("img", {
                            src: brand.logo_url,
                            alt: brand.name,
                            class: "h-14 w-14 object-contain",
                            onError: handleBrandLogoError,
                            onLoad: handleBrandLogoLoad
                          }, null, 40, ["src", "alt"]),
                          createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent rounded-2xl pointer-events-none" })
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "absolute top-6 right-6 z-20" }, [
                        createVNode("div", { class: "relative bg-gradient-to-r from-orange-500 via-red-500 to-red-600 text-white px-5 py-3 rounded-full font-black text-xs uppercase tracking-wider shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 ring-4 ring-white/50" }, [
                          createVNode("span", { class: "relative z-10" }, "🎯 " + toDisplayString(unref(brandProducts)[brand.id]?.length || 0) + " Products", 1),
                          createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full pointer-events-none" })
                        ])
                      ]),
                      createVNode("div", { class: "absolute bottom-0 left-0 right-0 p-8 z-10" }, [
                        createVNode("div", { class: "transform transition-all duration-500 group-hover:translate-y-[-8px]" }, [
                          createVNode("h3", { class: "text-5xl lg:text-6xl font-black mb-3 tracking-tighter leading-none" }, [
                            createVNode("span", { class: "bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent drop-shadow-2xl" }, toDisplayString(brand.name), 1)
                          ]),
                          createVNode("div", { class: "h-1.5 bg-gradient-to-r from-blue-500 via-green-600 to-green-700 rounded-full w-0 group-hover:w-32 transition-all duration-700 shadow-lg shadow-green-600/50" })
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "relative bg-gradient-to-br from-blue-100 via-green-50 to-green-100 p-8" }, [
                      createVNode("p", { class: "text-gray-700 text-base leading-relaxed mb-6 line-clamp-2 font-medium" }, toDisplayString(brand.description || "Premium quality products with innovative solutions crafted with excellence."), 1),
                      createVNode("div", { class: "flex items-center justify-between pt-6 border-t-2 border-green-200" }, [
                        createVNode("div", { class: "flex items-center gap-4" }, [
                          createVNode("div", { class: "flex items-center gap-2 bg-white/70 px-3 py-2 rounded-full" }, [
                            createVNode("div", { class: "w-3 h-3 bg-green-600 rounded-full animate-pulse shadow-lg shadow-green-600/50" }),
                            createVNode("span", { class: "text-xs font-black text-green-700 uppercase tracking-wider" }, "Active")
                          ]),
                          createVNode("div", { class: "h-4 w-px bg-green-300" }),
                          createVNode("span", { class: "text-xs font-black text-gray-600 uppercase tracking-wider bg-white/70 px-3 py-2 rounded-full" }, " 🏭 Est. " + toDisplayString(brand.established_year || "2024"), 1)
                        ]),
                        createVNode("div", { class: "relative" }, [
                          createVNode("div", { class: "flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 via-green-700 to-green-800 rounded-full font-black text-xs uppercase tracking-wider text-white shadow-2xl shadow-green-700/50 transform transition-all duration-500 group-hover:scale-110 ring-4 ring-white/50 overflow-hidden" }, [
                            createVNode("span", { class: "relative z-10" }, "🚀 Explore"),
                            createVNode(unref(ArrowRightIcon), { class: "w-4 h-4 transition-transform group-hover:translate-x-2 relative z-10" }),
                            createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" })
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-green-600/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" })
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div class="col-span-3 text-center py-20" data-v-b6c2660a><div class="max-w-2xl mx-auto" data-v-b6c2660a><h3 class="text-4xl lg:text-5xl font-black text-white mb-4" data-v-b6c2660a>No Brands Available</h3><p class="text-lg text-gray-400 mb-12 font-light" data-v-b6c2660a> There are currently no active brands to display. Please check back later or contact the administrator. </p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/contact",
          class: "group px-10 py-5 bg-white text-black font-black text-sm tracking-wider uppercase transition-all duration-300 hover:bg-red-600 hover:text-white inline-block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Contact Administrator `);
              _push2(ssrRenderComponent(unref(ArrowRightIcon), { class: "inline-block ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" }, null, _parent2, _scopeId));
            } else {
              return [
                createTextVNode(" Contact Administrator "),
                createVNode(unref(ArrowRightIcon), { class: "inline-block ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      }
      _push(`</div></div></section><section class="relative py-24 lg:py-32 bg-gradient-to-b from-white via-blue-50 to-white overflow-hidden" data-v-b6c2660a><div class="absolute inset-0 pointer-events-none" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute top-1/6 left-1/6 w-20 h-20 object-contain opacity-12 animate-float" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute bottom-1/6 right-1/6 w-20 h-20 object-contain opacity-12 animate-float-delayed" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-16 left-12 w-16 h-16 object-contain opacity-15 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.5s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute bottom-16 right-12 w-16 h-16 object-contain opacity-15 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-1/4 right-1/5 w-16 h-16 object-contain opacity-13 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.5s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute bottom-1/4 left-1/5 w-16 h-16 object-contain opacity-14 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "2s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute top-1/3 left-1/3 w-14 h-14 object-contain opacity-11 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.7s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute bottom-1/3 right-1/3 w-14 h-14 object-contain opacity-12 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.2s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-1/2 right-1/4 w-14 h-14 object-contain opacity-10 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.7s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute bottom-1/2 left-1/4 w-14 h-14 object-contain opacity-11 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "2.2s" })}" data-v-b6c2660a></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-v-b6c2660a><div class="text-center mb-20 relative z-10" data-v-b6c2660a><div class="inline-block relative mb-6" data-v-b6c2660a><span class="inline-block px-8 py-3 text-xs font-black tracking-[0.3em] uppercase bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-full shadow-2xl shadow-black/50 ring-4 ring-white/50" data-v-b6c2660a>🌟 FEATURED PRODUCTS 🌟</span><div class="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full pointer-events-none" data-v-b6c2660a></div></div><h2 class="text-5xl lg:text-7xl xl:text-8xl font-black mb-6 tracking-tighter leading-none" style="${ssrRenderStyle({ "text-shadow": "3px 3px 6px rgba(0,0,0,0.4), 5px 5px 10px rgba(0,0,0,0.3), 7px 7px 15px rgba(0,0,0,0.2)" })}" data-v-b6c2660a><span class="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent" data-v-b6c2660a>DISCOVER OUR</span> <span class="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent" data-v-b6c2660a>PRODUCTS</span></h2><div class="w-32 h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 mx-auto mb-8 rounded-full shadow-lg shadow-black/50" data-v-b6c2660a></div><p class="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto font-light" data-v-b6c2660a> Explore our carefully curated selection of premium products </p></div>`);
      if (unref(featuredProducts).length > 0) {
        _push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" data-v-b6c2660a><!--[-->`);
        ssrRenderList(unref(featuredProducts), (product) => {
          _push(`<div class="group relative" data-v-b6c2660a><div class="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-500 group-hover:scale-[1.05] border-4 border-blue-100 hover:border-blue-300 ring-2 ring-blue-50" data-v-b6c2660a><div class="relative h-64 overflow-hidden bg-gradient-to-br from-blue-50 to-white" data-v-b6c2660a>`);
          if (product.images && product.images.length > 0) {
            _push(`<img${ssrRenderAttr("src", getImageUrl(product.images[0]))}${ssrRenderAttr("alt", product.name)} loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-v-b6c2660a>`);
          } else {
            _push(`<div class="absolute inset-0 flex items-center justify-center" data-v-b6c2660a><div class="text-6xl opacity-20" data-v-b6c2660a>📦</div></div>`);
          }
          _push(`<div class="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent" data-v-b6c2660a></div><div class="absolute top-4 right-4 z-10" data-v-b6c2660a><div class="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full font-black text-xs uppercase tracking-wider shadow-lg ring-2 ring-white/50" data-v-b6c2660a><span class="relative z-10" data-v-b6c2660a>New</span><div class="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-full pointer-events-none" data-v-b6c2660a></div></div></div></div><div class="p-6" data-v-b6c2660a><div class="text-xs font-black text-blue-600 uppercase tracking-wider mb-2" data-v-b6c2660a>${ssrInterpolate(product.brand_name || "Premium")}</div><h3 class="text-xl font-black text-gray-900 mb-2 line-clamp-2 leading-tight" data-v-b6c2660a>${ssrInterpolate(product.name)}</h3><p class="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed" data-v-b6c2660a>${ssrInterpolate(product.description || "High quality product crafted with excellence.")}</p><div class="flex flex-col gap-3" data-v-b6c2660a><a href="https://t.me/aprati_order_bot" target="_blank" rel="noopener noreferrer" class="group/btn relative inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black text-sm uppercase tracking-wider rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/50 transform hover:scale-105 ring-2 ring-orange-200 overflow-hidden" data-v-b6c2660a><svg class="mr-2 w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b6c2660a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" data-v-b6c2660a></path></svg><span class="relative z-10" data-v-b6c2660a>Order Now</span><div class="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-full pointer-events-none" data-v-b6c2660a></div></a>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/products/${product.slug}`,
            class: "group/btn relative inline-flex items-center justify-center w-full px-6 py-2.5 bg-white border-2 border-blue-500 text-blue-600 font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-300 hover:bg-blue-50 hover:shadow-lg transform hover:scale-105"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="relative z-10" data-v-b6c2660a${_scopeId}>View Details</span>`);
                _push2(ssrRenderComponent(unref(ArrowRightIcon), { class: "ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1 relative z-10" }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode("span", { class: "relative z-10" }, "View Details"),
                  createVNode(unref(ArrowRightIcon), { class: "ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1 relative z-10" })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(featuredProducts).length > 0) {
        _push(`<div class="text-center mt-16" data-v-b6c2660a>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/brands",
          class: "group relative inline-flex items-center px-12 py-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-black text-sm tracking-wider uppercase transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/60 rounded-full ring-4 ring-white/50 overflow-hidden"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="relative z-10" data-v-b6c2660a${_scopeId}>🔍 View All Products</span>`);
              _push2(ssrRenderComponent(unref(ArrowRightIcon), { class: "inline-block ml-3 w-5 h-5 transition-transform group-hover:translate-x-2 relative z-10" }, null, _parent2, _scopeId));
              _push2(`<div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" data-v-b6c2660a${_scopeId}></div>`);
            } else {
              return [
                createVNode("span", { class: "relative z-10" }, "🔍 View All Products"),
                createVNode(unref(ArrowRightIcon), { class: "inline-block ml-3 w-5 h-5 transition-transform group-hover:translate-x-2 relative z-10" }),
                createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section><section class="relative py-32 lg:py-40 bg-gradient-to-b from-orange-50 via-blue-50 to-green-50 overflow-hidden" data-v-b6c2660a><div class="absolute inset-0" data-v-b6c2660a><div class="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-orange-500 via-red-500 to-green-700 animate-pulse" data-v-b6c2660a></div><div class="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-green-700 via-blue-600 to-orange-500" data-v-b6c2660a></div></div><div class="absolute inset-0 pointer-events-none" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-1/6 left-1/6 w-20 h-20 object-contain opacity-15 animate-float" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute bottom-1/6 right-1/6 w-20 h-20 object-contain opacity-15 animate-float-delayed" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-1/4 right-1/5 w-16 h-16 object-contain opacity-18 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.5s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute bottom-1/4 left-1/5 w-16 h-16 object-contain opacity-17 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute top-1/3 left-1/3 w-14 h-14 object-contain opacity-14 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.5s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute bottom-1/3 right-1/3 w-14 h-14 object-contain opacity-16 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "2s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-1/2 right-1/4 w-14 h-14 object-contain opacity-12 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.8s" })}" data-v-b6c2660a><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute bottom-1/2 left-1/4 w-14 h-14 object-contain opacity-13 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.3s" })}" data-v-b6c2660a></div><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" data-v-b6c2660a><div class="inline-block relative mb-8" data-v-b6c2660a><span class="inline-block px-8 py-3 text-xs font-black tracking-[0.3em] uppercase bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 text-white rounded-full shadow-2xl shadow-red-500/50 ring-4 ring-white/50" data-v-b6c2660a>🚀 READY TO GET STARTED 🚀</span><div class="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full pointer-events-none" data-v-b6c2660a></div></div><h2 class="text-5xl lg:text-7xl xl:text-8xl font-black mb-8 leading-none tracking-tighter drop-shadow-xl" data-v-b6c2660a><span class="bg-gradient-to-r from-blue-600 via-green-700 to-green-800 bg-clip-text text-transparent" data-v-b6c2660a>Ready to Discover <span class="bg-gradient-to-r from-orange-500 via-red-500 to-red-600 bg-clip-text text-transparent" data-v-b6c2660a>Our Advanced Platform?</span></span></h2><div class="w-32 h-2 bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 mx-auto mb-12 rounded-full shadow-lg shadow-red-500/50" data-v-b6c2660a></div><p class="text-xl lg:text-2xl text-gray-600 mb-16 max-w-3xl mx-auto font-light" data-v-b6c2660a> Explore premium features and high-quality food products for the modern world </p><div class="flex flex-col sm:flex-row gap-6 justify-center mb-20" data-v-b6c2660a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/brands",
        class: "group relative px-12 py-6 bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 text-white font-black text-sm tracking-wider uppercase transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-red-500/60 rounded-full ring-4 ring-white/50 overflow-hidden"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="relative z-10" data-v-b6c2660a${_scopeId}>🍭 Explore Our Brands</span>`);
            _push2(ssrRenderComponent(unref(ArrowRightIcon), { class: "inline-block ml-3 w-5 h-5 transition-transform group-hover:translate-x-2 relative z-10" }, null, _parent2, _scopeId));
            _push2(`<div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" data-v-b6c2660a${_scopeId}></div><div class="absolute inset-0 bg-gradient-to-br from-orange-300/30 to-red-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full animate-pulse" data-v-b6c2660a${_scopeId}></div>`);
          } else {
            return [
              createVNode("span", { class: "relative z-10" }, "🍭 Explore Our Brands"),
              createVNode(unref(ArrowRightIcon), { class: "inline-block ml-3 w-5 h-5 transition-transform group-hover:translate-x-2 relative z-10" }),
              createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" }),
              createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-orange-300/30 to-red-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full animate-pulse" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact",
        class: "group relative px-12 py-6 bg-gradient-to-r from-green-700 to-green-900 text-white font-black text-sm tracking-wider uppercase transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-green-700/60 rounded-full ring-4 ring-white/50 overflow-hidden"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="relative z-10" data-v-b6c2660a${_scopeId}>📧 Contact Us</span><div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" data-v-b6c2660a${_scopeId}></div><div class="absolute inset-0 bg-gradient-to-br from-green-600/30 to-green-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full animate-pulse" data-v-b6c2660a${_scopeId}></div>`);
          } else {
            return [
              createVNode("span", { class: "relative z-10" }, "📧 Contact Us"),
              createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" }),
              createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-green-600/30 to-green-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full animate-pulse" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto" data-v-b6c2660a><div class="text-center" data-v-b6c2660a><div class="text-5xl lg:text-6xl font-black mb-3 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent" data-v-b6c2660a>${ssrInterpolate(unref(dynamicBrands).length)}</div><div class="text-xs font-bold tracking-widest text-gray-400 uppercase" data-v-b6c2660a>Premium Brands</div></div><div class="text-center" data-v-b6c2660a><div class="text-5xl lg:text-6xl font-black mb-3 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent" data-v-b6c2660a>24/7</div><div class="text-xs font-bold tracking-widest text-gray-400 uppercase" data-v-b6c2660a>Support</div></div><div class="text-center" data-v-b6c2660a><div class="text-5xl lg:text-6xl font-black mb-3 bg-gradient-to-r from-green-700 to-green-800 bg-clip-text text-transparent" data-v-b6c2660a>100%</div><div class="text-xs font-bold tracking-widest text-gray-400 uppercase" data-v-b6c2660a>Quality</div></div></div></div></section>`);
      if (unref(showInfoModal)) {
        _push(`<div class="fixed inset-0 z-50 overflow-y-auto" data-v-b6c2660a><div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" data-v-b6c2660a></div><div class="flex min-h-screen items-center justify-center p-4 sm:p-6" data-v-b6c2660a><div class="relative w-full max-w-5xl mx-auto" data-v-b6c2660a><div class="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-500 scale-100" data-v-b6c2660a><div class="relative bg-gradient-to-r from-orange-500 via-red-500 to-blue-600" data-v-b6c2660a><div class="relative z-10 p-8 lg:p-12" data-v-b6c2660a><button class="absolute top-8 right-8 w-14 h-14 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/50 transition-all duration-500 group border-4 border-white/40 hover:scale-110 hover:rotate-90 ring-4 ring-white/30" data-v-b6c2660a><svg class="w-7 h-7 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3" data-v-b6c2660a><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-b6c2660a></path></svg></button><div class="inline-flex items-center px-6 py-3 rounded-full bg-white/30 backdrop-blur-sm border-2 border-white/50 text-white text-sm font-black mb-6 ring-4 ring-white/20" data-v-b6c2660a><div class="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse shadow-lg shadow-green-400/50" data-v-b6c2660a></div><span class="uppercase tracking-wide" data-v-b6c2660a>📰 Information Details</span></div><h2 class="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight" data-v-b6c2660a>${ssrInterpolate(unref(selectedInfo)?.title)}</h2><div class="w-20 h-1 bg-white/30 rounded-full mb-4" data-v-b6c2660a></div><p class="text-lg text-white/90 font-medium max-w-2xl leading-relaxed" data-v-b6c2660a> Detailed information and insights </p></div></div><div class="relative bg-white" data-v-b6c2660a><div class="p-8 lg:p-12" data-v-b6c2660a>`);
        if (unref(selectedInfo)?.image_url) {
          _push(`<div class="mb-10" data-v-b6c2660a><div class="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100" data-v-b6c2660a><img${ssrRenderAttr("src", getImageUrl(unref(selectedInfo).image_url))}${ssrRenderAttr("alt", unref(selectedInfo).title)} class="w-full h-100 object-cover" data-v-b6c2660a><div class="absolute top-4 left-4" data-v-b6c2660a><div class="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm" data-v-b6c2660a><div class="w-2 h-2 bg-blue-500 rounded-full" data-v-b6c2660a></div><span class="text-sm font-medium text-gray-700" data-v-b6c2660a>Featured Image</span></div></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="prose prose-gray prose-lg max-w-none" data-v-b6c2660a><div class="space-y-4" data-v-b6c2660a><div class="text-gray-700 leading-relaxed text-lg" data-v-b6c2660a>${unref(selectedInfo)?.description ?? ""}</div></div></div><div class="mt-10 pt-8 border-t border-gray-100" data-v-b6c2660a><div class="flex flex-col lg:flex-row gap-4 items-center justify-between" data-v-b6c2660a><div class="flex flex-col sm:flex-row gap-4 w-full lg:w-auto" data-v-b6c2660a>`);
        if (unref(selectedInfo)?.button_text && unref(selectedInfo)?.button_link) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: unref(selectedInfo).button_link,
            onClick: closeInfoModal,
            class: "group relative inline-flex items-center px-10 py-5 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 text-white font-black text-lg transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/50 transform hover:scale-110 ring-4 ring-white/50 overflow-hidden"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="relative z-10" data-v-b6c2660a${_scopeId}>${ssrInterpolate(unref(selectedInfo).button_text)}</span>`);
                _push2(ssrRenderComponent(unref(ArrowRightIcon), { class: "ml-3 w-5 h-5 transition-transform group-hover:translate-x-2 relative z-10" }, null, _parent2, _scopeId));
                _push2(`<div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" data-v-b6c2660a${_scopeId}></div>`);
              } else {
                return [
                  createVNode("span", { class: "relative z-10" }, toDisplayString(unref(selectedInfo).button_text), 1),
                  createVNode(unref(ArrowRightIcon), { class: "ml-3 w-5 h-5 transition-transform group-hover:translate-x-2 relative z-10" }),
                  createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" })
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="group relative inline-flex items-center px-10 py-5 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 font-black text-lg transition-all duration-500 hover:shadow-xl transform hover:scale-110 border-4 border-gray-300 ring-4 ring-gray-200/50 overflow-hidden" data-v-b6c2660a><svg class="mr-3 w-5 h-5 transition-transform group-hover:rotate-180 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3" data-v-b6c2660a><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-b6c2660a></path></svg><span class="relative z-10" data-v-b6c2660a>Close</span><div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" data-v-b6c2660a></div></button></div><div class="flex items-center space-x-6 text-gray-500" data-v-b6c2660a><div class="flex items-center space-x-2" data-v-b6c2660a><div class="w-2 h-2 bg-blue-500 rounded-full" data-v-b6c2660a></div><span class="text-sm font-medium" data-v-b6c2660a>OUR Information</span></div><div class="flex items-center space-x-2" data-v-b6c2660a><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b6c2660a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-b6c2660a></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-b6c2660a></path></svg><span class="text-sm font-medium" data-v-b6c2660a>Detail View</span></div></div></div></div></div><div class="h-3 bg-gradient-to-r from-orange-500 via-red-500 to-green-700 animate-pulse" data-v-b6c2660a></div></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b6c2660a"]]);

export { index as default };
//# sourceMappingURL=index-Bkistxiz.mjs.map
