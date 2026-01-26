import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, mergeProps, unref, withCtx, createVNode, createBlock, openBlock, toDisplayString, createTextVNode, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderClass } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _imports_12, a as _imports_13, b as _imports_14, c as _imports_15, d as _imports_10, e as _imports_11 } from './virtual_public-B_jtVuV9.mjs';
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
    const brands = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const handleLogoError = (event, brand) => {
      if (event.target.dataset.fallbackSet === "true") {
        console.warn(`Fallback image also failed for ${brand.name}, hiding image`);
        event.target.style.display = "none";
        return;
      }
      console.warn(`Brand logo failed to load for ${brand.name}, using fallback`);
      event.target.dataset.fallbackSet = "true";
      const svg = `data:image/svg+xml,${encodeURIComponent(`
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#6366f1"/>
      <text x="100" y="100" font-family="Arial, sans-serif" font-size="24" font-weight="bold" 
            text-anchor="middle" dominant-baseline="middle" fill="white">
        ${brand.name}
      </text>
    </svg>
  `)}`;
      event.target.src = svg;
    };
    const handleCoverError = (event, brand) => {
      console.warn(`Brand cover image failed to load for ${brand.name}, hiding image`);
      const coverContainer = event.target.closest(".h-48");
      if (coverContainer) {
        coverContainer.style.display = "none";
      }
    };
    const getBrandGradient = (slug) => {
      const gradients = {
        "aprati": "bg-gradient-to-br from-blue-500 to-blue-600",
        "frutati": "bg-gradient-to-br from-green-500 to-green-600",
        "mocati": "bg-gradient-to-br from-orange-500 to-orange-600"
      };
      if (gradients[slug]) {
        return gradients[slug];
      }
      const colors = [
        "bg-gradient-to-br from-red-500 to-red-600",
        "bg-gradient-to-br from-orange-500 to-orange-600",
        "bg-gradient-to-br from-blue-600 to-blue-700",
        "bg-gradient-to-br from-green-600 to-green-700",
        "bg-gradient-to-br from-red-600 to-orange-600"
      ];
      let hash = 0;
      for (let i = 0; i < slug.length; i++) {
        hash = (hash << 5) - hash + slug.charCodeAt(i);
        hash = hash & hash;
      }
      return colors[Math.abs(hash) % colors.length];
    };
    const getImageUrl = (imagePath) => {
      if (!imagePath) return "";
      if (imagePath.startsWith("data:")) return imagePath;
      if (imagePath.startsWith("http")) return imagePath;
      if (imagePath.startsWith("/storage/")) {
        return `${runtimeConfig.public.apiBaseUrl}${imagePath}`;
      }
      return `${runtimeConfig.public.apiBaseUrl}/storage/${imagePath}`;
    };
    useSeoMeta({
      title: "Our Brands - Aprati Foods (Cambodia) Ltd",
      description: "Discover our premium food brand collection including innovative food solutions"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-green-50 relative overflow-hidden" }, _attrs))} data-v-9cbd6bee><div class="absolute inset-0 overflow-hidden pointer-events-none z-5" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-1/12 left-1/12 w-20 h-20 object-contain opacity-18 animate-float" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-1/8 right-1/12 w-20 h-20 object-contain opacity-20 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.5s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-1/6 left-1/5 w-16 h-16 object-contain opacity-15 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.8s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute top-1/5 right-1/6 w-16 h-16 object-contain opacity-18 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.2s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-1/4 left-1/8 w-14 h-14 object-contain opacity-12 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.3s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute top-1/3 right-1/8 w-20 h-20 object-contain opacity-16 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.5s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-2/5 left-1/4 w-16 h-16 object-contain opacity-14 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.7s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-1/2 right-1/5 w-16 h-16 object-contain opacity-19 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.8s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-3/5 left-1/6 w-20 h-20 object-contain opacity-13 animate-float" style="${ssrRenderStyle({ "animation-delay": "1s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute top-2/3 right-1/4 w-20 h-20 object-contain opacity-17 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.4s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-3/4 left-1/12 w-14 h-14 object-contain opacity-14 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.4s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute top-4/5 right-1/12 w-20 h-20 object-contain opacity-20 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "2s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute bottom-1/6 left-2/5 w-16 h-16 object-contain opacity-16 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.6s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute bottom-1/5 right-2/5 w-14 h-14 object-contain opacity-18 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "2.2s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute bottom-1/4 left-3/5 w-16 h-16 object-contain opacity-15 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.9s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute bottom-1/3 right-3/5 w-16 h-16 object-contain opacity-17 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.1s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute bottom-2/5 left-1/3 w-14 h-14 object-contain opacity-13 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.9s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute bottom-1/2 right-1/3 w-20 h-20 object-contain opacity-19 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.3s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-1/10 left-1/3 w-20 h-20 object-contain opacity-17 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.6s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-1/7 right-1/3 w-16 h-16 object-contain opacity-16 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "2.1s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute bottom-1/10 left-1/4 w-20 h-20 object-contain opacity-18 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.7s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute bottom-1/7 right-1/4 w-16 h-16 object-contain opacity-14 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.8s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-[8%] left-[15%] w-16 h-16 object-contain opacity-16 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.9s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute top-[12%] right-[22%] w-20 h-20 object-contain opacity-18 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.6s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-[18%] left-[35%] w-14 h-14 object-contain opacity-15 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.5s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-[25%] right-[40%] w-16 h-16 object-contain opacity-17 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.9s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-[32%] left-[45%] w-20 h-20 object-contain opacity-14 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.2s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute top-[38%] right-[15%] w-14 h-14 object-contain opacity-19 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.7s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-[45%] left-[28%] w-16 h-16 object-contain opacity-13 animate-float" style="${ssrRenderStyle({ "animation-delay": "2.1s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute top-[52%] right-[35%] w-20 h-20 object-contain opacity-16 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.4s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-[58%] left-[12%] w-16 h-16 object-contain opacity-18 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.6s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-[65%] right-[28%] w-14 h-14 object-contain opacity-15 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.8s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-[72%] left-[38%] w-20 h-20 object-contain opacity-17 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.1s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute top-[78%] right-[18%] w-16 h-16 object-contain opacity-14 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.9s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-[85%] left-[22%] w-14 h-14 object-contain opacity-19 animate-float" style="${ssrRenderStyle({ "animation-delay": "2.3s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute top-[92%] right-[42%] w-20 h-20 object-contain opacity-16 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.5s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute bottom-[5%] left-[48%] w-16 h-16 object-contain opacity-18 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.8s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute bottom-[12%] right-[12%] w-20 h-20 object-contain opacity-15 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "2.2s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute bottom-[18%] left-[52%] w-14 h-14 object-contain opacity-17 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.3s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute bottom-[25%] right-[48%] w-16 h-16 object-contain opacity-13 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.4s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute bottom-[32%] left-[18%] w-20 h-20 object-contain opacity-16 animate-float" style="${ssrRenderStyle({ "animation-delay": "2s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute bottom-[38%] right-[25%] w-14 h-14 object-contain opacity-19 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.7s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute bottom-[45%] left-[8%] w-16 h-16 object-contain opacity-14 animate-float" style="${ssrRenderStyle({ "animation-delay": "1s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute bottom-[52%] right-[8%] w-20 h-20 object-contain opacity-18 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "2.4s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-[15%] left-[55%] w-16 h-16 object-contain opacity-16 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.7s" })}" data-v-9cbd6bee><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute top-[42%] right-[52%] w-14 h-14 object-contain opacity-15 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.6s" })}" data-v-9cbd6bee></div><div class="fixed inset-0 pointer-events-none z-0" data-v-9cbd6bee><div class="absolute inset-0 opacity-20" data-v-9cbd6bee><div class="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full blur-3xl animate-float" data-v-9cbd6bee></div><div class="absolute top-1/4 right-1/6 w-80 h-80 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full blur-3xl animate-float-delayed" data-v-9cbd6bee></div><div class="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full blur-3xl animate-float-slow" data-v-9cbd6bee></div><div class="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full blur-3xl animate-float animation-delay-500" data-v-9cbd6bee></div><div class="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-green-300 to-green-400 rounded-full blur-3xl animate-float-delayed animation-delay-700" data-v-9cbd6bee></div><div class="absolute top-1/3 right-1/3 w-88 h-88 bg-gradient-to-r from-red-300 to-red-400 rounded-full blur-3xl animate-float-slow animation-delay-300" data-v-9cbd6bee></div></div><div class="absolute inset-0 opacity-25" data-v-9cbd6bee><div class="absolute top-20 left-1/5 w-10 h-10 bg-pink-400 rounded-full animate-bounce shadow-xl" data-v-9cbd6bee></div><div class="absolute top-1/4 right-1/5 w-12 h-12 bg-purple-400 rounded-full animate-bounce animation-delay-400 shadow-xl" data-v-9cbd6bee></div><div class="absolute top-1/3 left-1/3 w-8 h-8 bg-blue-400 rounded-full animate-bounce animation-delay-700 shadow-xl" data-v-9cbd6bee></div><div class="absolute top-1/2 right-1/4 w-14 h-14 bg-yellow-400 rounded-full animate-bounce animation-delay-300 shadow-xl" data-v-9cbd6bee></div><div class="absolute top-2/3 left-1/6 w-10 h-10 bg-green-400 rounded-full animate-bounce animation-delay-900 shadow-xl" data-v-9cbd6bee></div><div class="absolute top-3/4 right-1/6 w-12 h-12 bg-red-400 rounded-full animate-bounce animation-delay-500 shadow-xl" data-v-9cbd6bee></div><div class="absolute bottom-20 left-1/4 w-9 h-9 bg-orange-400 rounded-full animate-bounce animation-delay-1000 shadow-xl" data-v-9cbd6bee></div><div class="absolute bottom-40 right-1/3 w-11 h-11 bg-pink-300 rounded-full animate-bounce animation-delay-400 shadow-xl" data-v-9cbd6bee></div></div><div class="absolute inset-0 opacity-30" data-v-9cbd6bee><div class="absolute top-24 left-1/4 w-16 h-20 bg-gradient-to-br from-pink-300 to-pink-400 rounded-2xl rotate-12 animate-wiggle animation-delay-300 shadow-lg" data-v-9cbd6bee></div><div class="absolute top-1/3 right-1/5 w-14 h-18 bg-gradient-to-br from-purple-300 to-purple-400 rounded-2xl -rotate-12 animate-wiggle animation-delay-700 shadow-lg" data-v-9cbd6bee></div><div class="absolute top-1/2 left-1/6 w-18 h-22 bg-gradient-to-br from-blue-300 to-blue-400 rounded-2xl rotate-45 animate-wiggle animation-delay-500 shadow-lg" data-v-9cbd6bee></div><div class="absolute top-2/3 right-1/4 w-16 h-20 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-2xl -rotate-45 animate-wiggle animation-delay-1000 shadow-lg" data-v-9cbd6bee></div><div class="absolute bottom-32 left-1/3 w-14 h-18 bg-gradient-to-br from-green-300 to-green-400 rounded-2xl rotate-12 animate-wiggle animation-delay-400 shadow-lg" data-v-9cbd6bee></div><div class="absolute bottom-48 right-1/6 w-16 h-20 bg-gradient-to-br from-red-300 to-red-400 rounded-2xl -rotate-12 animate-wiggle animation-delay-900 shadow-lg" data-v-9cbd6bee></div></div><div class="absolute inset-0 opacity-25" data-v-9cbd6bee><div class="absolute top-16 left-1/6 text-5xl animate-float animation-delay-300" data-v-9cbd6bee>🍬</div><div class="absolute top-24 right-1/8 text-4xl animate-spin animation-delay-700" data-v-9cbd6bee>🍭</div><div class="absolute top-32 left-1/4 text-6xl animate-pulse animation-delay-500" data-v-9cbd6bee>🍮</div><div class="absolute top-40 right-1/5 text-5xl animate-bounce animation-delay-900" data-v-9cbd6bee>🍡</div><div class="absolute top-48 left-1/3 text-4xl animate-wiggle animation-delay-400" data-v-9cbd6bee>🍰</div><div class="absolute top-56 right-1/4 text-5xl animate-float animation-delay-1000" data-v-9cbd6bee>🍬</div><div class="absolute top-1/4 left-1/8 text-4xl animate-bounce animation-delay-300" data-v-9cbd6bee>🍭</div><div class="absolute top-1/3 right-1/6 text-6xl animate-wiggle animation-delay-700" data-v-9cbd6bee>🍮</div><div class="absolute top-1/3 left-2/5 text-5xl animate-spin animation-delay-500" data-v-9cbd6bee>🍡</div><div class="absolute top-1/3 right-2/5 text-4xl animate-float animation-delay-1000" data-v-9cbd6bee>🍰</div><div class="absolute top-1/2 left-1/10 text-5xl animate-wiggle animation-delay-500" data-v-9cbd6bee>🍬</div><div class="absolute top-1/2 right-1/10 text-4xl animate-float animation-delay-300" data-v-9cbd6bee>🍭</div><div class="absolute top-1/2 left-1/2 text-6xl animate-spin animation-delay-700" data-v-9cbd6bee>🍮</div><div class="absolute top-1/2 right-1/3 text-5xl animate-pulse animation-delay-1000" data-v-9cbd6bee>🍡</div><div class="absolute top-2/3 left-1/5 text-6xl animate-float animation-delay-700" data-v-9cbd6bee>🍰</div><div class="absolute top-2/3 right-1/5 text-5xl animate-spin animation-delay-300" data-v-9cbd6bee>🍬</div><div class="absolute top-3/4 left-1/4 text-4xl animate-pulse animation-delay-1000" data-v-9cbd6bee>🍭</div><div class="absolute top-3/4 right-1/4 text-5xl animate-bounce animation-delay-500" data-v-9cbd6bee>🍮</div><div class="absolute bottom-32 left-1/6 text-5xl animate-spin animation-delay-400" data-v-9cbd6bee>🍡</div><div class="absolute bottom-40 right-1/6 text-4xl animate-pulse animation-delay-700" data-v-9cbd6bee>🍰</div><div class="absolute bottom-48 left-1/3 text-6xl animate-bounce animation-delay-300" data-v-9cbd6bee>🍬</div><div class="absolute bottom-56 right-1/3 text-5xl animate-wiggle animation-delay-1000" data-v-9cbd6bee>🍭</div><div class="absolute bottom-24 left-2/5 text-4xl animate-float animation-delay-500" data-v-9cbd6bee>🍮</div><div class="absolute bottom-28 right-2/5 text-5xl animate-spin animation-delay-900" data-v-9cbd6bee>🍡</div><div class="absolute top-1/5 left-3/4 text-4xl animate-float-slow animation-delay-300" data-v-9cbd6bee>🍰</div><div class="absolute top-2/5 right-3/4 text-5xl animate-bounce animation-delay-700" data-v-9cbd6bee>🍬</div><div class="absolute bottom-1/5 left-1/8 text-6xl animate-wiggle animation-delay-500" data-v-9cbd6bee>🍭</div><div class="absolute bottom-2/5 right-1/8 text-4xl animate-pulse animation-delay-1000" data-v-9cbd6bee>🍮</div><div class="absolute top-1/6 left-4/5 text-5xl animate-spin animation-delay-400" data-v-9cbd6bee>🍡</div><div class="absolute bottom-1/6 right-4/5 text-6xl animate-float animation-delay-900" data-v-9cbd6bee>🍰</div></div></div><section class="relative py-32 overflow-hidden bg-gradient-to-br from-blue-100 via-orange-50 to-red-50" data-v-9cbd6bee><div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 animate-pulse z-10" data-v-9cbd6bee></div><div class="absolute inset-0 opacity-30 pointer-events-none" data-v-9cbd6bee><div class="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full blur-3xl animate-float" data-v-9cbd6bee></div><div class="absolute bottom-1/4 right-1/6 w-96 h-96 bg-gradient-to-r from-white to-blue-300 rounded-full blur-3xl animate-float-delayed" data-v-9cbd6bee></div><div class="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-300 to-blue-600 rounded-full blur-3xl animate-float-slow" data-v-9cbd6bee></div></div><div class="absolute inset-0 opacity-40 pointer-events-none" data-v-9cbd6bee><div class="absolute top-20 left-20 w-12 h-12 bg-white rounded-full animate-bounce shadow-2xl shadow-white/50" data-v-9cbd6bee></div><div class="absolute top-40 right-32 w-8 h-8 bg-blue-300 rounded-full animate-bounce animation-delay-500 shadow-2xl shadow-blue-300/50" data-v-9cbd6bee></div><div class="absolute top-60 left-1/3 w-10 h-10 bg-blue-400 rounded-full animate-bounce animation-delay-700 shadow-2xl shadow-blue-400/50" data-v-9cbd6bee></div><div class="absolute top-80 right-1/4 w-6 h-6 bg-white rounded-full animate-bounce animation-delay-700 shadow-2xl shadow-white/50" data-v-9cbd6bee></div><div class="absolute bottom-40 left-1/4 w-14 h-14 bg-blue-500 rounded-full animate-bounce animation-delay-300 shadow-2xl shadow-blue-500/50" data-v-9cbd6bee></div><div class="absolute bottom-60 right-20 w-9 h-9 bg-blue-600 rounded-full animate-bounce animation-delay-900 shadow-2xl shadow-blue-600/50" data-v-9cbd6bee></div><div class="absolute top-32 left-1/2 w-10 h-10 bg-pink-300 rounded-full animate-bounce animation-delay-400 shadow-2xl shadow-pink-300/50" data-v-9cbd6bee></div><div class="absolute top-1/3 right-1/3 w-12 h-12 bg-purple-300 rounded-full animate-bounce animation-delay-1000 shadow-2xl shadow-purple-300/50" data-v-9cbd6bee></div><div class="absolute top-1/2 left-1/5 w-8 h-8 bg-yellow-300 rounded-full animate-bounce animation-delay-300 shadow-2xl shadow-yellow-300/50" data-v-9cbd6bee></div><div class="absolute top-2/3 right-1/5 w-14 h-14 bg-green-300 rounded-full animate-bounce animation-delay-700 shadow-2xl shadow-green-300/50" data-v-9cbd6bee></div><div class="absolute bottom-1/3 left-2/3 w-10 h-10 bg-red-300 rounded-full animate-bounce animation-delay-500 shadow-2xl shadow-red-300/50" data-v-9cbd6bee></div><div class="absolute bottom-20 right-1/3 w-12 h-12 bg-orange-300 rounded-full animate-bounce animation-delay-900 shadow-2xl shadow-orange-300/50" data-v-9cbd6bee></div><div class="absolute top-1/4 right-1/5 w-16 h-16 bg-gradient-to-br from-blue-300 to-blue-400 rounded-2xl rotate-12 animate-wiggle animation-delay-300 shadow-xl" data-v-9cbd6bee></div><div class="absolute bottom-1/3 left-1/5 w-12 h-12 bg-gradient-to-br from-white to-blue-200 rounded-2xl -rotate-12 animate-wiggle animation-delay-700 shadow-xl" data-v-9cbd6bee></div><div class="absolute top-1/3 left-1/4 w-14 h-14 bg-gradient-to-br from-pink-300 to-pink-400 rounded-2xl rotate-45 animate-wiggle animation-delay-500 shadow-xl" data-v-9cbd6bee></div><div class="absolute bottom-1/4 right-1/4 w-16 h-16 bg-gradient-to-br from-purple-300 to-purple-400 rounded-2xl -rotate-45 animate-wiggle animation-delay-1000 shadow-xl" data-v-9cbd6bee></div><div class="absolute top-1/2 right-1/6 w-12 h-12 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-2xl rotate-12 animate-wiggle animation-delay-400 shadow-xl" data-v-9cbd6bee></div><div class="absolute bottom-1/2 left-1/6 w-14 h-14 bg-gradient-to-br from-green-300 to-green-400 rounded-2xl -rotate-12 animate-wiggle animation-delay-900 shadow-xl" data-v-9cbd6bee></div></div><div class="absolute inset-0 pointer-events-none" data-v-9cbd6bee><div class="absolute top-16 left-1/6 text-5xl opacity-35 animate-float animation-delay-300" data-v-9cbd6bee>🍬</div><div class="absolute top-24 right-1/5 text-4xl opacity-30 animate-spin animation-delay-700" data-v-9cbd6bee>🍭</div><div class="absolute top-32 left-1/3 text-6xl opacity-25 animate-pulse animation-delay-500" data-v-9cbd6bee>🍮</div><div class="absolute top-20 right-1/3 text-5xl opacity-30 animate-bounce animation-delay-900" data-v-9cbd6bee>🍡</div><div class="absolute top-28 left-1/2 text-4xl opacity-35 animate-wiggle animation-delay-400" data-v-9cbd6bee>🍰</div><div class="absolute top-36 right-1/2 text-5xl opacity-30 animate-float animation-delay-1000" data-v-9cbd6bee>🍬</div><div class="absolute top-1/4 left-1/5 text-4xl opacity-30 animate-bounce animation-delay-300" data-v-9cbd6bee>🍭</div><div class="absolute top-1/3 right-1/6 text-6xl opacity-25 animate-wiggle animation-delay-700" data-v-9cbd6bee>🍮</div><div class="absolute top-1/4 left-2/5 text-5xl opacity-35 animate-spin animation-delay-500" data-v-9cbd6bee>🍡</div><div class="absolute top-1/3 right-2/5 text-4xl opacity-30 animate-float animation-delay-1000" data-v-9cbd6bee>🍰</div><div class="absolute top-1/4 left-3/5 text-5xl opacity-25 animate-pulse animation-delay-400" data-v-9cbd6bee>🍬</div><div class="absolute top-1/3 right-3/5 text-6xl opacity-30 animate-bounce animation-delay-900" data-v-9cbd6bee>🍭</div><div class="absolute top-1/2 left-1/6 text-5xl opacity-35 animate-wiggle animation-delay-500" data-v-9cbd6bee>🍮</div><div class="absolute top-1/2 right-1/6 text-4xl opacity-30 animate-float animation-delay-300" data-v-9cbd6bee>🍡</div><div class="absolute top-1/2 left-1/3 text-6xl opacity-25 animate-spin animation-delay-700" data-v-9cbd6bee>🍰</div><div class="absolute top-1/2 right-1/3 text-5xl opacity-30 animate-pulse animation-delay-1000" data-v-9cbd6bee>🍬</div><div class="absolute top-1/2 left-2/3 text-4xl opacity-35 animate-bounce animation-delay-400" data-v-9cbd6bee>🍭</div><div class="absolute top-1/2 right-2/3 text-5xl opacity-30 animate-wiggle animation-delay-900" data-v-9cbd6bee>🍮</div><div class="absolute top-2/3 left-1/5 text-6xl opacity-25 animate-float animation-delay-700" data-v-9cbd6bee>🍡</div><div class="absolute top-2/3 right-1/5 text-5xl opacity-30 animate-spin animation-delay-300" data-v-9cbd6bee>🍰</div><div class="absolute top-3/4 left-1/4 text-4xl opacity-35 animate-pulse animation-delay-1000" data-v-9cbd6bee>🍬</div><div class="absolute top-3/4 right-1/4 text-5xl opacity-30 animate-bounce animation-delay-500" data-v-9cbd6bee>🍭</div><div class="absolute top-2/3 left-1/2 text-6xl opacity-25 animate-wiggle animation-delay-400" data-v-9cbd6bee>🍮</div><div class="absolute top-3/4 right-1/2 text-4xl opacity-30 animate-float animation-delay-900" data-v-9cbd6bee>🍡</div><div class="absolute bottom-20 left-1/6 text-5xl opacity-35 animate-spin animation-delay-400" data-v-9cbd6bee>🍰</div><div class="absolute bottom-24 right-1/6 text-4xl opacity-30 animate-pulse animation-delay-700" data-v-9cbd6bee>🍬</div><div class="absolute bottom-32 left-1/4 text-6xl opacity-25 animate-bounce animation-delay-300" data-v-9cbd6bee>🍭</div><div class="absolute bottom-28 right-1/4 text-5xl opacity-30 animate-wiggle animation-delay-1000" data-v-9cbd6bee>🍮</div><div class="absolute bottom-20 left-3/5 text-4xl opacity-35 animate-float animation-delay-500" data-v-9cbd6bee>🍡</div><div class="absolute bottom-24 right-3/5 text-5xl opacity-30 animate-spin animation-delay-900" data-v-9cbd6bee>🍰</div><div class="absolute top-36 left-3/4 text-4xl opacity-25 animate-float-slow animation-delay-300" data-v-9cbd6bee>🍬</div><div class="absolute top-44 right-3/4 text-5xl opacity-30 animate-bounce animation-delay-700" data-v-9cbd6bee>🍭</div><div class="absolute bottom-36 left-1/8 text-6xl opacity-25 animate-wiggle animation-delay-500" data-v-9cbd6bee>🍮</div><div class="absolute bottom-44 right-1/8 text-4xl opacity-35 animate-pulse animation-delay-1000" data-v-9cbd6bee>🍡</div><div class="absolute top-1/5 left-4/5 text-5xl opacity-30 animate-spin animation-delay-400" data-v-9cbd6bee>🍰</div><div class="absolute bottom-1/5 right-4/5 text-6xl opacity-25 animate-float animation-delay-900" data-v-9cbd6bee>🍬</div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-v-9cbd6bee><div class="text-center" data-v-9cbd6bee><div class="inline-block relative mb-8" data-v-9cbd6bee><div class="relative px-8 py-4 text-xs font-black tracking-[0.3em] uppercase bg-white rounded-full shadow-2xl shadow-red-500 ring-2 ring-blue-300" data-v-9cbd6bee><span class="relative z-10 text-blue-600 drop-shadow-[0_2px_8px_rgba(239,68,68,0.9)]" data-v-9cbd6bee>🍬 Premium Collection 🍬</span><div class="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-transparent to-transparent rounded-full pointer-events-none" data-v-9cbd6bee></div><div class="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full animate-ping" data-v-9cbd6bee></div></div></div><h1 class="text-6xl lg:text-8xl font-black mb-6 leading-none tracking-tighter text-blue-600" style="${ssrRenderStyle({ "text-shadow": "0 4px 12px rgba(239, 68, 68, 0.9), 0 2px 6px rgba(239, 68, 68, 0.8), 0 0 20px rgba(239, 68, 68, 0.7)" })}" data-v-9cbd6bee> Our <span class="font-black" data-v-9cbd6bee>Premium Brands</span></h1><div class="w-32 h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 mx-auto mb-8 rounded-full shadow-lg shadow-blue-500/50" data-v-9cbd6bee></div><p class="text-xl lg:text-2xl mb-8 text-blue-500 max-w-4xl mx-auto font-medium" style="${ssrRenderStyle({ "text-shadow": "0 2px 8px rgba(239, 68, 68, 0.8), 0 1px 4px rgba(239, 68, 68, 0.6)" })}" data-v-9cbd6bee> Discover our premium food brand collection crafted with excellence and innovation. </p></div></div><div class="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400" data-v-9cbd6bee></div></section><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative" data-v-9cbd6bee><div class="absolute inset-0 overflow-hidden pointer-events-none opacity-20" data-v-9cbd6bee><div class="absolute top-10 left-5 text-4xl animate-wiggle animation-delay-300" data-v-9cbd6bee>🍬</div><div class="absolute top-1/4 right-10 text-5xl animate-wiggle animation-delay-700" data-v-9cbd6bee>🍭</div><div class="absolute top-1/2 left-10 text-4xl animate-wiggle animation-delay-500" data-v-9cbd6bee>�</div><div class="absolute bottom-1/4 right-20 text-5xl animate-wiggle animation-delay-900" data-v-9cbd6bee>🍡</div><div class="absolute bottom-10 left-1/3 text-4xl animate-wiggle animation-delay-400" data-v-9cbd6bee>🍰</div></div>`);
      if (unref(loading)) {
        _push(`<div class="text-center py-20" data-v-9cbd6bee><div class="relative mx-auto w-20 h-20 mb-6" data-v-9cbd6bee><div class="absolute inset-0 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500 border-r-red-500" data-v-9cbd6bee></div><div class="absolute inset-2 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 animation-delay-300" style="${ssrRenderStyle({ "animation-direction": "reverse" })}" data-v-9cbd6bee></div></div><p class="mt-8 text-gray-700 text-lg font-black" data-v-9cbd6bee>🍬 Loading our premium brands... 🍬</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(error)) {
        _push(`<div class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 text-center" data-v-9cbd6bee><svg class="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9cbd6bee><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-9cbd6bee></path></svg> ${ssrInterpolate(unref(error) || "Failed to load brands")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(loading) && !unref(error) && unref(brands).length > 0) {
        _push(`<div class="space-y-12" data-v-9cbd6bee><!--[-->`);
        ssrRenderList(unref(brands), (brand, index2) => {
          _push(`<div class="group relative cursor-pointer" data-v-9cbd6bee>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/brands/${brand.slug}`,
            class: "block"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-blue-200/50 p-1 transition-all duration-700 group-hover:scale-[1.03] overflow-hidden border-2 border-blue-100 hover:border-blue-300" data-v-9cbd6bee${_scopeId}><div class="rounded-2xl overflow-hidden" data-v-9cbd6bee${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[300px]" data-v-9cbd6bee${_scopeId}><div class="${ssrRenderClass([index2 % 2 === 0 ? "lg:order-1" : "lg:order-2", "relative overflow-hidden rounded-2xl"])}" data-v-9cbd6bee${_scopeId}><div class="h-full min-h-[300px] relative transition-all duration-700 group-hover:scale-105" data-v-9cbd6bee${_scopeId}>`);
                if (brand.cover_image_url || brand.cover_image) {
                  _push2(`<img${ssrRenderAttr("src", getImageUrl(brand.cover_image_url || brand.cover_image))}${ssrRenderAttr("alt", `${brand.name} cover`)} class="absolute inset-0 w-full h-full object-cover" data-v-9cbd6bee${_scopeId}>`);
                } else {
                  _push2(`<div class="${ssrRenderClass([
                    "absolute inset-0",
                    getBrandGradient(brand.slug)
                  ])}" data-v-9cbd6bee${_scopeId}></div>`);
                }
                _push2(`<div class="absolute inset-0 bg-black/20" data-v-9cbd6bee${_scopeId}></div><div class="absolute inset-0 flex items-center justify-center" data-v-9cbd6bee${_scopeId}>`);
                if (brand.logo_url || brand.logo) {
                  _push2(`<div class="w-32 h-32 bg-white/95 backdrop-blur-sm rounded-3xl flex items-center justify-center p-4 shadow-2xl ring-4 ring-white/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500" data-v-9cbd6bee${_scopeId}><img${ssrRenderAttr("src", getImageUrl(brand.logo_url || brand.logo))}${ssrRenderAttr("alt", brand.name)} class="max-w-full max-h-full object-contain" data-v-9cbd6bee${_scopeId}></div>`);
                } else {
                  _push2(`<div class="text-4xl font-black text-white drop-shadow-lg" data-v-9cbd6bee${_scopeId}>${ssrInterpolate(brand.name)}</div>`);
                }
                _push2(`</div></div><div class="absolute top-6 right-6" data-v-9cbd6bee${_scopeId}><div class="flex items-center space-x-2 px-5 py-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-blue-100" data-v-9cbd6bee${_scopeId}><h3 class="text-xs text-blue-700 font-black" data-v-9cbd6bee${_scopeId}>${ssrInterpolate(brand.name)}</h3><div class="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" data-v-9cbd6bee${_scopeId}></div></div></div><div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center" data-v-9cbd6bee${_scopeId}><div class="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100" data-v-9cbd6bee${_scopeId}><div class="bg-white/90 backdrop-blur-sm rounded-full p-4 border border-white/50 shadow-lg" data-v-9cbd6bee${_scopeId}><svg class="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9cbd6bee${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-9cbd6bee${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-9cbd6bee${_scopeId}></path></svg></div></div></div></div><div class="${ssrRenderClass([index2 % 2 === 0 ? "lg:order-2" : "lg:order-1", "flex flex-col justify-center p-8 lg:p-12"])}" data-v-9cbd6bee${_scopeId}><div class="mb-4" data-v-9cbd6bee${_scopeId}><span class="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-black shadow-lg shadow-blue-500/20 border border-blue-200" data-v-9cbd6bee${_scopeId}><div class="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" data-v-9cbd6bee${_scopeId}></div> OUR BRANDS </span></div><h3 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight" data-v-9cbd6bee${_scopeId}>${ssrInterpolate(brand.name)}</h3><div class="prose prose-gray prose-lg max-w-none text-gray-600 leading-relaxed mb-8" data-v-9cbd6bee${_scopeId}><p class="line-clamp-4" data-v-9cbd6bee${_scopeId}>${ssrInterpolate(brand.description && brand.description.length > 150 ? brand.description.substring(0, 150) + "..." : brand.description || "Premium quality products with innovative solutions crafted for excellence.")}</p></div><div class="flex items-center" data-v-9cbd6bee${_scopeId}><div class="group/btn relative inline-flex items-center px-10 py-5 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-black transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/40 transform hover:scale-110 border border-blue-200 overflow-hidden" data-v-9cbd6bee${_scopeId}><span class="relative z-10" data-v-9cbd6bee${_scopeId}>🍭 VIEW PRODUCTS</span><svg class="relative z-10 ml-3 w-5 h-5 transition-transform group-hover/btn:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9cbd6bee${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-9cbd6bee${_scopeId}></path></svg><div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" data-v-9cbd6bee${_scopeId}></div><div class="absolute inset-0 bg-gradient-to-br from-blue-300/30 to-blue-400/30 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-full animate-pulse" data-v-9cbd6bee${_scopeId}></div></div></div></div></div></div></div>`);
              } else {
                return [
                  createVNode("div", { class: "bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-blue-200/50 p-1 transition-all duration-700 group-hover:scale-[1.03] overflow-hidden border-2 border-blue-100 hover:border-blue-300" }, [
                    createVNode("div", { class: "rounded-2xl overflow-hidden" }, [
                      createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[300px]" }, [
                        createVNode("div", {
                          class: ["relative overflow-hidden rounded-2xl", index2 % 2 === 0 ? "lg:order-1" : "lg:order-2"]
                        }, [
                          createVNode("div", { class: "h-full min-h-[300px] relative transition-all duration-700 group-hover:scale-105" }, [
                            brand.cover_image_url || brand.cover_image ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: getImageUrl(brand.cover_image_url || brand.cover_image),
                              alt: `${brand.name} cover`,
                              class: "absolute inset-0 w-full h-full object-cover",
                              onError: ($event) => handleCoverError($event, brand)
                            }, null, 40, ["src", "alt", "onError"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: [
                                "absolute inset-0",
                                getBrandGradient(brand.slug)
                              ]
                            }, null, 2)),
                            createVNode("div", { class: "absolute inset-0 bg-black/20" }),
                            createVNode("div", { class: "absolute inset-0 flex items-center justify-center" }, [
                              brand.logo_url || brand.logo ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "w-32 h-32 bg-white/95 backdrop-blur-sm rounded-3xl flex items-center justify-center p-4 shadow-2xl ring-4 ring-white/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                              }, [
                                createVNode("img", {
                                  src: getImageUrl(brand.logo_url || brand.logo),
                                  alt: brand.name,
                                  class: "max-w-full max-h-full object-contain",
                                  onError: ($event) => handleLogoError($event, brand)
                                }, null, 40, ["src", "alt", "onError"])
                              ])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "text-4xl font-black text-white drop-shadow-lg"
                              }, toDisplayString(brand.name), 1))
                            ])
                          ]),
                          createVNode("div", { class: "absolute top-6 right-6" }, [
                            createVNode("div", { class: "flex items-center space-x-2 px-5 py-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-blue-100" }, [
                              createVNode("h3", { class: "text-xs text-blue-700 font-black" }, toDisplayString(brand.name), 1),
                              createVNode("div", { class: "w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" })
                            ])
                          ]),
                          createVNode("div", { class: "absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center" }, [
                            createVNode("div", { class: "opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100" }, [
                              createVNode("div", { class: "bg-white/90 backdrop-blur-sm rounded-full p-4 border border-white/50 shadow-lg" }, [
                                (openBlock(), createBlock("svg", {
                                  class: "w-8 h-8 text-gray-800",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  }),
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  })
                                ]))
                              ])
                            ])
                          ])
                        ], 2),
                        createVNode("div", {
                          class: ["flex flex-col justify-center p-8 lg:p-12", index2 % 2 === 0 ? "lg:order-2" : "lg:order-1"]
                        }, [
                          createVNode("div", { class: "mb-4" }, [
                            createVNode("span", { class: "inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-black shadow-lg shadow-blue-500/20 border border-blue-200" }, [
                              createVNode("div", { class: "w-2 h-2 bg-white rounded-full mr-2 animate-pulse" }),
                              createTextVNode(" OUR BRANDS ")
                            ])
                          ]),
                          createVNode("h3", { class: "text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight" }, toDisplayString(brand.name), 1),
                          createVNode("div", { class: "prose prose-gray prose-lg max-w-none text-gray-600 leading-relaxed mb-8" }, [
                            createVNode("p", { class: "line-clamp-4" }, toDisplayString(brand.description && brand.description.length > 150 ? brand.description.substring(0, 150) + "..." : brand.description || "Premium quality products with innovative solutions crafted for excellence."), 1)
                          ]),
                          createVNode("div", { class: "flex items-center" }, [
                            createVNode("div", { class: "group/btn relative inline-flex items-center px-10 py-5 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-black transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/40 transform hover:scale-110 border border-blue-200 overflow-hidden" }, [
                              createVNode("span", { class: "relative z-10" }, "🍭 VIEW PRODUCTS"),
                              (openBlock(), createBlock("svg", {
                                class: "relative z-10 ml-3 w-5 h-5 transition-transform group-hover/btn:translate-x-2",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M9 5l7 7-7 7"
                                })
                              ])),
                              createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" }),
                              createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-blue-300/30 to-blue-400/30 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-full animate-pulse" })
                            ])
                          ])
                        ], 2)
                      ])
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else if (!unref(loading)) {
        _push(`<div class="text-center py-20" data-v-9cbd6bee><div class="max-w-3xl mx-auto" data-v-9cbd6bee><div class="relative mb-12" data-v-9cbd6bee><div class="w-32 h-32 mx-auto relative" data-v-9cbd6bee><div class="absolute inset-0 rounded-full bg-gray-200" data-v-9cbd6bee></div><div class="absolute inset-2 rounded-full bg-white flex items-center justify-center shadow-lg" data-v-9cbd6bee><svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9cbd6bee><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" data-v-9cbd6bee></path></svg></div></div></div><h3 class="text-2xl font-semibold text-gray-900 mb-2" data-v-9cbd6bee>Coming Soon</h3><p class="text-gray-600" data-v-9cbd6bee>Our brand collection is being curated. Check back soon to discover our premium offerings.</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (!unref(loading) && unref(brands).length > 0) {
        _push(`<section class="relative py-24 bg-gradient-to-b from-orange-50 via-red-50 to-blue-50 overflow-hidden" data-v-9cbd6bee><div class="absolute inset-0" data-v-9cbd6bee><div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 animate-pulse" data-v-9cbd6bee></div><div class="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400" data-v-9cbd6bee></div></div><div class="absolute inset-0 opacity-30 pointer-events-none" data-v-9cbd6bee><div class="absolute top-20 left-10 text-6xl animate-bounce animation-delay-300" data-v-9cbd6bee>🍬</div><div class="absolute top-40 right-20 text-5xl animate-bounce animation-delay-700" data-v-9cbd6bee>🍭</div><div class="absolute bottom-40 left-1/4 text-7xl animate-bounce animation-delay-500" data-v-9cbd6bee>�</div><div class="absolute bottom-60 right-1/3 text-6xl animate-bounce animation-delay-900" data-v-9cbd6bee>🍡</div><div class="absolute top-1/3 left-1/2 text-5xl animate-bounce animation-delay-400" data-v-9cbd6bee>🍰</div></div><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" data-v-9cbd6bee><div class="inline-block relative mb-8" data-v-9cbd6bee><div class="relative px-8 py-4 text-xs font-black tracking-[0.3em] uppercase bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-full shadow-2xl shadow-blue-500/50 border border-blue-200" data-v-9cbd6bee><span class="relative z-10" data-v-9cbd6bee>🎉 READY TO EXPLORE 🎉</span><div class="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full pointer-events-none" data-v-9cbd6bee></div><div class="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full animate-ping" data-v-9cbd6bee></div></div></div><h2 class="text-5xl lg:text-6xl font-black mb-6 leading-none tracking-tighter drop-shadow-xl" data-v-9cbd6bee><span class="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent" data-v-9cbd6bee>Ready to Explore</span> <span class="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent" data-v-9cbd6bee>Our Products?</span></h2><div class="w-32 h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 mx-auto mb-8 rounded-full shadow-lg shadow-blue-500/50" data-v-9cbd6bee></div><p class="text-xl text-gray-600 mb-12 font-light" data-v-9cbd6bee> Discover our premium food brands and bring quality to your table. </p><div class="flex flex-col sm:flex-row gap-6 justify-center" data-v-9cbd6bee>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/contact",
          class: "group relative inline-flex items-center px-12 py-6 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-black text-sm tracking-wider uppercase transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/60 border border-blue-200 overflow-hidden"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="relative z-10" data-v-9cbd6bee${_scopeId}>💌 CONTACT US</span><svg class="relative z-10 ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9cbd6bee${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-9cbd6bee${_scopeId}></path></svg><div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" data-v-9cbd6bee${_scopeId}></div><div class="absolute inset-0 bg-gradient-to-br from-blue-300/30 to-blue-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full animate-pulse" data-v-9cbd6bee${_scopeId}></div>`);
            } else {
              return [
                createVNode("span", { class: "relative z-10" }, "💌 CONTACT US"),
                (openBlock(), createBlock("svg", {
                  class: "relative z-10 ml-3 w-5 h-5 transition-transform group-hover:translate-x-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 5l7 7-7 7"
                  })
                ])),
                createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" }),
                createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-blue-300/30 to-blue-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full animate-pulse" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "group relative inline-flex items-center px-12 py-6 rounded-full bg-gradient-to-r from-white to-blue-100 text-blue-700 font-black text-sm tracking-wider uppercase transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-white/60 border-2 border-blue-100 overflow-hidden"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="relative z-10" data-v-9cbd6bee${_scopeId}>🏠 BACK TO HOME</span><div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" data-v-9cbd6bee${_scopeId}></div><div class="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-blue-300/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full animate-pulse" data-v-9cbd6bee${_scopeId}></div>`);
            } else {
              return [
                createVNode("span", { class: "relative z-10" }, "🏠 BACK TO HOME"),
                createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" }),
                createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-blue-200/30 to-blue-300/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full animate-pulse" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></section>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/brands/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9cbd6bee"]]);

export { index as default };
//# sourceMappingURL=index-Da2RSWAC.mjs.map
