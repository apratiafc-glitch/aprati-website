import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, mergeProps, withCtx, createVNode, createBlock, openBlock, createTextVNode, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _imports_12, a as _imports_13, b as _imports_14, c as _imports_15, d as _imports_10, e as _imports_11 } from './virtual_public-B_jtVuV9.mjs';
import { u as useApi } from './useApi-CO9TAo9a.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/ufo/dist/index.mjs';
import './server.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/ofetch/dist/node.mjs';
import '../_/nitro.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/h3/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/destr/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/hookable/dist/index.mjs';
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
import './cookie-D4T41UgU.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/cookie-es/dist/index.mjs';

const _sfc_main = {
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    const posts = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const selectedPost = ref(null);
    useApi();
    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      try {
        return new Date(dateString).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });
      } catch (e) {
        return "N/A";
      }
    };
    const getImageForIndex = (index) => {
      const post = posts.value[index];
      if (post && post.image_url) {
        console.log("Using uploaded image for post", index, ":", post.image_url);
        return post.image_url;
      }
      const localImages = [
        "/images/about/company-overview.jpg",
        // Blue theme
        "/images/about/our-mission.jpg",
        // Purple theme  
        "/images/about/our-values.jpg",
        // Emerald theme
        "/images/about/our-team.jpg"
        // Orange theme
      ];
      const placeholderImages = [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
        // Blue office
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
        // Purple meeting
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
        // Green team
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80"
        // Orange workspace
      ];
      const themeIndex = post?.sort_order - 1 || index;
      return localImages[themeIndex % 4] || placeholderImages[themeIndex % 4];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 relative overflow-hidden" }, _attrs))} data-v-36074d81><div class="absolute inset-0 overflow-hidden pointer-events-none" data-v-36074d81><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-1/6 left-1/6 w-20 h-20 object-contain opacity-15 animate-float" data-v-36074d81><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-1/4 right-1/6 w-16 h-16 object-contain opacity-18 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.5s" })}" data-v-36074d81><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute bottom-1/3 left-1/4 w-14 h-14 object-contain opacity-12 animate-float" style="${ssrRenderStyle({ "animation-delay": "1s" })}" data-v-36074d81><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute top-1/2 right-1/4 w-20 h-20 object-contain opacity-20 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.5s" })}" data-v-36074d81><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute bottom-1/6 right-1/3 w-16 h-16 object-contain opacity-16 animate-float" style="${ssrRenderStyle({ "animation-delay": "2s" })}" data-v-36074d81><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute top-2/3 left-1/6 w-14 h-14 object-contain opacity-14 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.8s" })}" data-v-36074d81><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute bottom-1/4 right-1/6 w-16 h-16 object-contain opacity-15 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.2s" })}" data-v-36074d81><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-3/4 left-1/3 w-14 h-14 object-contain opacity-18 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.8s" })}" data-v-36074d81><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-1/5 right-1/5 w-20 h-20 object-contain opacity-13 animate-float" style="${ssrRenderStyle({ "animation-delay": "2.3s" })}" data-v-36074d81><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute bottom-2/5 left-1/5 w-16 h-16 object-contain opacity-17 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.3s" })}" data-v-36074d81><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-2/5 left-2/5 w-14 h-14 object-contain opacity-10 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.4s" })}" data-v-36074d81><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute bottom-3/5 right-2/5 w-20 h-20 object-contain opacity-16 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.7s" })}" data-v-36074d81><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-4/5 left-1/4 w-16 h-16 object-contain opacity-12 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.9s" })}" data-v-36074d81><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute bottom-4/5 right-1/4 w-14 h-14 object-contain opacity-15 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.4s" })}" data-v-36074d81><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-1/3 left-2/3 w-16 h-16 object-contain opacity-18 animate-float" style="${ssrRenderStyle({ "animation-delay": "2.1s" })}" data-v-36074d81><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute bottom-1/5 right-2/3 w-20 h-20 object-contain opacity-14 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.6s" })}" data-v-36074d81><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-3/5 right-1/5 w-14 h-14 object-contain opacity-11 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.9s" })}" data-v-36074d81><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute bottom-2/3 left-3/5 w-16 h-16 object-contain opacity-19 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "2.2s" })}" data-v-36074d81></div><section class="bg-blue-200 relative overflow-hidden py-24" data-v-36074d81><div class="absolute inset-0" data-v-36074d81><div class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" data-v-36074d81></div><div class="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-full blur-3xl animate-pulse delay-1000" data-v-36074d81></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-v-36074d81><div class="text-center" data-v-36074d81><div class="relative mb-8" data-v-36074d81><div class="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 border border-blue-200 text-blue-800 mb-6" data-v-36074d81><div class="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse" data-v-36074d81></div><span class="text-sm font-semibold tracking-wide uppercase" data-v-36074d81>About Our Company</span></div></div><h1 class="text-4xl lg:text-6xl font-black text-blue-500 mb-6 leading-tight" data-v-36074d81> About <span class="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent" data-v-36074d81>Aprati</span></h1><p class="text-xl lg:text-2xl mb-8 text-blue-500 max-w-4xl mx-auto" data-v-36074d81> Discover our story, mission, and unwavering commitment to delivering exceptional food products. </p></div></div></section><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" data-v-36074d81>`);
      if (loading.value) {
        _push(`<div class="text-center py-20" data-v-36074d81><div class="relative" data-v-36074d81><div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600" data-v-36074d81></div></div><p class="mt-8 text-gray-600 text-lg font-medium" data-v-36074d81>Loading company information...</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (error.value) {
        _push(`<div class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 text-center" data-v-36074d81><svg class="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-36074d81><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-36074d81></path></svg> ${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value && !error.value && posts.value.length > 0) {
        _push(`<div class="space-y-8" data-v-36074d81><!--[-->`);
        ssrRenderList(posts.value, (post, index) => {
          _push(`<div class="group relative cursor-pointer" data-v-36074d81><div class="bg-white rounded-3xl shadow-lg border border-blue-500 p-1 hover:shadow-xl transition-all duration-500 group-hover:scale-[1.01] overflow-hidden" data-v-36074d81><div class="rounded-2xl overflow-hidden" data-v-36074d81><div class="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[300px]" data-v-36074d81><div class="${ssrRenderClass([index % 2 === 0 ? "lg:order-1" : "lg:order-2", "relative overflow-hidden rounded-2xl"])}" data-v-36074d81><div class="h-full min-h-[300px] relative transition-all duration-700 group-hover:scale-105"${ssrRenderAttr("data-index", index)} data-v-36074d81><img${ssrRenderAttr("src", getImageForIndex(index))}${ssrRenderAttr("alt", `${post.name || post.title} image`)} class="absolute inset-0 w-full h-full object-cover" data-v-36074d81>`);
          if (!post.image_url) {
            _push(`<div class="${ssrRenderClass([
              "absolute inset-0 opacity-80",
              (post.sort_order - 1) % 4 === 0 ? "bg-gradient-to-br from-blue-600/80 to-blue-800/80" : (post.sort_order - 1) % 4 === 1 ? "bg-gradient-to-br from-red-600/80 to-red-800/80" : (post.sort_order - 1) % 4 === 2 ? "bg-gradient-to-br from-emerald-600/80 to-emerald-800/80" : "bg-gradient-to-br from-orange-600/80 to-orange-800/80"
            ])}" data-v-36074d81></div>`);
          } else {
            _push(`<!---->`);
          }
          if (post.image_url) {
            _push(`<div class="absolute inset-0 bg-black/20" data-v-36074d81></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="relative z-10 h-full flex items-center justify-center text-white p-8" data-v-36074d81></div></div><div class="absolute top-6 right-6" data-v-36074d81><div class="flex items-center space-x-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/30" data-v-36074d81><h3 class="text-xs text-white font-bold opacity-95 mb-4" data-v-36074d81>${ssrInterpolate(post.name || post.title)}</h3><div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" data-v-36074d81></div></div></div><div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center" data-v-36074d81><div class="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100" data-v-36074d81><div class="bg-white/90 backdrop-blur-sm rounded-full p-4 border border-white/50 shadow-lg" data-v-36074d81><svg class="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-36074d81><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-36074d81></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-36074d81></path></svg></div></div></div></div><div class="${ssrRenderClass([index % 2 === 0 ? "lg:order-2" : "lg:order-1", "flex flex-col justify-center p-8 lg:p-12"])}" data-v-36074d81><div class="mb-4" data-v-36074d81><span class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-sm font-semibold" data-v-36074d81><div class="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse" data-v-36074d81></div> About Us </span></div><h3 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight" data-v-36074d81>${ssrInterpolate(post.name || post.title)}</h3><div class="prose prose-gray prose-lg max-w-none text-gray-600 leading-relaxed mb-8" data-v-36074d81><p class="line-clamp-4" data-v-36074d81>${ssrInterpolate(post.description.length > 150 ? post.description.substring(0, 150) + "..." : post.description)}</p></div><div class="flex items-center" data-v-36074d81><button class="group/btn relative inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-1" data-v-36074d81><span class="relative z-10" data-v-36074d81>View Details</span><svg class="relative z-10 ml-3 w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-36074d81><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-36074d81></path></svg></button></div></div></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-20" data-v-36074d81><div class="max-w-3xl mx-auto" data-v-36074d81><div class="relative mb-12" data-v-36074d81><div class="w-32 h-32 mx-auto relative" data-v-36074d81><div class="absolute inset-0 rounded-full bg-gray-200" data-v-36074d81></div><div class="absolute inset-2 rounded-full bg-white flex items-center justify-center shadow-lg" data-v-36074d81><svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-36074d81><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-36074d81></path></svg></div></div></div><h3 class="text-2xl font-semibold text-gray-900 mb-2" data-v-36074d81>Coming Soon</h3><p class="text-gray-600" data-v-36074d81>Our story is being crafted. Check back soon to learn more about us.</p></div></div>`);
      }
      _push(`</div>`);
      if (!loading.value && posts.value.length > 0) {
        _push(`<div class="bg-gray-100 py-16" data-v-36074d81><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-v-36074d81><h2 class="text-3xl font-bold text-gray-900 mb-6" data-v-36074d81>Ready to Experience Our Products?</h2><p class="text-xl text-gray-600 mb-8" data-v-36074d81> Discover our premium food brands and bring quality to your table. </p><div class="flex flex-col sm:flex-row gap-4 justify-center" data-v-36074d81>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/brands",
          class: "group relative inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-green-700 to-green-900 text-white font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-green-700/25 transform hover:scale-105"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="relative z-10" data-v-36074d81${_scopeId}>Explore Our Brands</span><svg class="relative z-10 ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-36074d81${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-36074d81${_scopeId}></path></svg>`);
            } else {
              return [
                createVNode("span", { class: "relative z-10" }, "Explore Our Brands"),
                (openBlock(), createBlock("svg", {
                  class: "relative z-10 ml-3 w-6 h-6 transition-transform group-hover:translate-x-1",
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
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/contact",
          class: "group inline-flex items-center px-8 py-4 rounded-2xl border-2 border-gray-500 text-gray-700 font-bold text-lg transition-all duration-300 hover:bg-gray-100 hover:border-gray-400"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Contact Us <svg class="ml-3 w-6 h-6 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-36074d81${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-v-36074d81${_scopeId}></path></svg>`);
            } else {
              return [
                createTextVNode(" Contact Us "),
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
      } else {
        _push(`<!---->`);
      }
      if (selectedPost.value) {
        _push(`<div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn" data-v-36074d81><div class="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl animate-slideUp" data-v-36074d81><div class="relative bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6" data-v-36074d81><button class="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:scale-110" data-v-36074d81><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-36074d81><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-36074d81></path></svg></button><h3 class="text-2xl lg:text-3xl font-bold text-white pr-12" data-v-36074d81>${ssrInterpolate(selectedPost.value.name || selectedPost.value.title)}</h3><div class="flex items-center mt-3 text-white/80" data-v-36074d81><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-36074d81><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-36074d81></path></svg><span class="text-sm" data-v-36074d81>Company Information</span></div></div><div class="px-8 py-6 overflow-y-auto max-h-[calc(85vh-140px)]" data-v-36074d81>`);
        if (selectedPost.value.image_url) {
          _push(`<div class="mb-8" data-v-36074d81><div class="relative rounded-2xl overflow-hidden shadow-lg" data-v-36074d81><img${ssrRenderAttr("src", selectedPost.value.image_url)}${ssrRenderAttr("alt", selectedPost.value.name || selectedPost.value.title)} class="w-full h-85 object-cover" data-v-36074d81><div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" data-v-36074d81></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="prose prose-lg max-w-none" data-v-36074d81><p class="text-gray-700 leading-relaxed text-lg whitespace-pre-line" data-v-36074d81>${ssrInterpolate(selectedPost.value.description)}</p></div></div><div class="px-8 py-4 bg-gray-50 border-t border-gray-100" data-v-36074d81><div class="flex justify-between items-center" data-v-36074d81><div class="text-sm text-gray-500" data-v-36074d81><span data-v-36074d81>Last updated: ${ssrInterpolate(formatDate(selectedPost.value.updated_at))}</span></div><button class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-200" data-v-36074d81> Close </button></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const about = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-36074d81"]]);

export { about as default };
//# sourceMappingURL=about-C8iRnCKS.mjs.map
