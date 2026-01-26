import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, mergeProps, withCtx, createVNode, createBlock, openBlock, createTextVNode, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { a as useSeoMeta } from './server.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/ufo/dist/index.mjs';
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

const _sfc_main = {
  __name: "about_clean",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "About Us - Aprati Food Company",
      description: "Learn about Aprati Food Company, our mission, vision, values, and commitment to quality food products."
    });
    const posts = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const showModal = ref(false);
    const selectedPost = ref(null);
    const getShortDescription = (description) => {
      if (!description) return "";
      const words = description.split(" ");
      if (words.length <= 25) return description;
      return words.slice(0, 25).join(" ") + "...";
    };
    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><section class="bg-blue-200 relative overflow-hidden py-24"><div class="absolute inset-0"><div class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div><div class="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"><div class="text-center"><div class="relative mb-8"><div class="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 border border-blue-200 text-blue-800 mb-6"><div class="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse"></div><span class="text-sm font-semibold tracking-wide uppercase">About Our Company</span></div></div><h1 class="text-4xl lg:text-6xl font-black text-blue-500 mb-6 leading-tight"> About <span class="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Aprati</span></h1><p class="text-xl lg:text-2xl mb-8 text-blue-500 max-w-4xl mx-auto"> Discover our story, mission, and unwavering commitment to delivering exceptional food products. </p></div></div></section><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">`);
      if (loading.value) {
        _push(`<div class="text-center py-20"><div class="relative"><div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div></div><p class="mt-8 text-gray-600 text-lg font-medium">Loading company information...</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (error.value) {
        _push(`<div class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 text-center"><svg class="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${ssrInterpolate(error.value)}</div>`);
      } else if (posts.value.length > 0) {
        _push(`<div class="space-y-8"><!--[-->`);
        ssrRenderList(posts.value, (post, index) => {
          _push(`<div class="group relative cursor-pointer"><div class="bg-white rounded-3xl shadow-lg border border-blue-500 p-1 hover:shadow-xl transition-all duration-500 group-hover:scale-[1.01] overflow-hidden"><div class="rounded-2xl overflow-hidden"><div class="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[300px]"><div class="${ssrRenderClass([index % 2 === 0 ? "lg:order-1" : "lg:order-2", "relative overflow-hidden rounded-2xl"])}"><div class="${ssrRenderClass([
            "h-full min-h-[300px] transition-all duration-700 group-hover:scale-105",
            index % 4 === 0 ? "bg-gradient-to-br from-blue-400 to-blue-600" : index % 4 === 1 ? "bg-gradient-to-br from-red-500 to-red-600" : index % 4 === 2 ? "bg-gradient-to-br from-emerald-400 to-emerald-600" : "bg-gradient-to-br from-orange-400 to-orange-600"
          ])}"><div class="h-full flex items-center justify-center text-white p-8"><div class="text-center">`);
          if (index % 4 === 0) {
            _push(`<svg class="w-24 h-24 mx-auto mb-6 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`);
          } else if (index % 4 === 1) {
            _push(`<svg class="w-24 h-24 mx-auto mb-6 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`);
          } else if (index % 4 === 2) {
            _push(`<svg class="w-24 h-24 mx-auto mb-6 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>`);
          } else {
            _push(`<svg class="w-24 h-24 mx-auto mb-6 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`);
          }
          _push(`<h3 class="text-2xl font-bold opacity-95 mb-4">${ssrInterpolate(post.name || post.title)}</h3><p class="text-lg opacity-80">Company Information</p></div></div></div><div class="absolute top-6 right-6"><div class="flex items-center space-x-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/30"><div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div></div></div><div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center"><div class="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100"><div class="bg-white/90 backdrop-blur-sm rounded-full p-4 border border-white/50 shadow-lg"><svg class="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></div></div></div></div><div class="${ssrRenderClass([index % 2 === 0 ? "lg:order-2" : "lg:order-1", "flex flex-col justify-center p-8 lg:p-12"])}"><div class="mb-4"><span class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-sm font-semibold"><div class="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></div> About Us </span></div><h3 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">${ssrInterpolate(post.name || post.title)}</h3><div class="prose prose-gray prose-lg max-w-none text-gray-600 leading-relaxed mb-8"><p class="line-clamp-4">${ssrInterpolate(getShortDescription(post.description))}</p></div><div class="flex items-center"><button class="group/btn relative inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-1"><span class="relative z-10">Read More</span><svg class="relative z-10 ml-3 w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div></div></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-20"><div class="max-w-3xl mx-auto"><div class="relative mb-12"><div class="w-32 h-32 mx-auto relative"><div class="absolute inset-0 rounded-full bg-gray-200"></div><div class="absolute inset-2 rounded-full bg-white flex items-center justify-center shadow-lg"><svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div></div></div><h3 class="text-2xl font-semibold text-gray-900 mb-2">Coming Soon</h3><p class="text-gray-600">Our story is being crafted. Check back soon to learn more about us.</p></div></div>`);
      }
      _push(`</div>`);
      if (!loading.value && posts.value.length > 0) {
        _push(`<div class="bg-gray-100 py-16"><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><h2 class="text-3xl font-bold text-gray-900 mb-6">Ready to Experience Our Products?</h2><p class="text-xl text-gray-600 mb-8"> Discover our premium food brands and bring quality to your table. </p><div class="flex flex-col sm:flex-row gap-4 justify-center">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/brands",
          class: "group relative inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-green-700 to-green-900 text-white font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-green-700/25 transform hover:scale-105"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="relative z-10"${_scopeId}>Explore Our Brands</span><svg class="relative z-10 ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg>`);
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
              _push2(` Contact Us <svg class="ml-3 w-6 h-6 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"${_scopeId}></path></svg>`);
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
      if (showModal.value && selectedPost.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"><div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 scale-100"><div class="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 p-8"><div class="absolute inset-0 bg-black bg-opacity-10"></div><button class="absolute top-4 right-4 text-white hover:text-gray-200 bg-white bg-opacity-20 rounded-full p-2 transition-all duration-200 hover:bg-opacity-30 backdrop-blur-sm z-10"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button><div class="relative z-10"><div class="flex items-center space-x-6"><div class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center border-4 border-white shadow-xl backdrop-blur-sm"><svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div class="flex-1"><h2 class="text-3xl font-bold text-white mb-2">${ssrInterpolate(selectedPost.value.name || selectedPost.value.title)}</h2><p class="text-blue-100 text-lg">About Us Details</p></div></div></div></div><div class="overflow-y-auto max-h-[60vh]"><div class="p-8"><div class="bg-white rounded-xl border border-gray-200 p-6"><h3 class="text-2xl font-semibold text-gray-900 mb-6 flex items-center"><svg class="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> Full Description </h3><div class="prose max-w-none"><p class="text-gray-700 whitespace-pre-line leading-relaxed text-lg">${ssrInterpolate(selectedPost.value.description)}</p></div></div></div></div><div class="bg-gray-50 px-8 py-6 border-t border-gray-200"><div class="flex items-center justify-between"><div class="text-sm text-gray-500"> Last updated: ${ssrInterpolate(formatDate(selectedPost.value.updated_at))}</div><button class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold"> Close </button></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about_clean.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about_clean-0_L9Mzda.mjs.map
