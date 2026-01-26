import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, mergeProps, withCtx, createVNode, createBlock, openBlock, createTextVNode, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _imports_12, a as _imports_13, b as _imports_14, c as _imports_15, d as _imports_10, e as _imports_11 } from './virtual_public-B_jtVuV9.mjs';
import { u as useApi } from './useApi-CO9TAo9a.mjs';
import { a as useSeoMeta } from './server.mjs';
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
import './cookie-D4T41UgU.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/cookie-es/dist/index.mjs';
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
  __name: "management",
  __ssrInlineRender: true,
  setup(__props) {
    useApi();
    const posts = ref([]);
    const loading = ref(true);
    const error = ref("");
    const showModal = ref(false);
    const selectedPost = ref(null);
    const getInitials = (name) => {
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
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
    useSeoMeta({
      title: "Top Management - Aprati Food Company",
      description: "Meet the leadership team behind Aprati Food Company"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 relative overflow-hidden" }, _attrs))} data-v-548120c8><div class="absolute inset-0 overflow-hidden pointer-events-none" data-v-548120c8><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-1/6 left-1/6 w-20 h-20 object-contain opacity-15 animate-float" data-v-548120c8><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-1/4 right-1/6 w-20 h-20 object-contain opacity-18 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.5s" })}" data-v-548120c8><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute bottom-1/3 left-1/4 w-16 h-16 object-contain opacity-12 animate-float" style="${ssrRenderStyle({ "animation-delay": "1s" })}" data-v-548120c8><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute top-1/2 right-1/4 w-16 h-16 object-contain opacity-20 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.5s" })}" data-v-548120c8><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute bottom-1/6 right-1/3 w-14 h-14 object-contain opacity-16 animate-float" style="${ssrRenderStyle({ "animation-delay": "2s" })}" data-v-548120c8><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute top-2/3 left-1/6 w-20 h-20 object-contain opacity-14 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.8s" })}" data-v-548120c8><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute bottom-1/4 right-1/6 w-14 h-14 object-contain opacity-15 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.2s" })}" data-v-548120c8><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-3/4 left-1/3 w-16 h-16 object-contain opacity-18 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.8s" })}" data-v-548120c8><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-1/5 right-1/5 w-14 h-14 object-contain opacity-13 animate-float" style="${ssrRenderStyle({ "animation-delay": "2.3s" })}" data-v-548120c8><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute bottom-2/5 left-1/5 w-16 h-16 object-contain opacity-17 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.3s" })}" data-v-548120c8><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-2/5 left-2/5 w-20 h-20 object-contain opacity-10 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.4s" })}" data-v-548120c8><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute bottom-3/5 right-2/5 w-16 h-16 object-contain opacity-16 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.7s" })}" data-v-548120c8><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-4/5 left-1/4 w-14 h-14 object-contain opacity-12 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.9s" })}" data-v-548120c8><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute bottom-4/5 right-1/4 w-20 h-20 object-contain opacity-15 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.4s" })}" data-v-548120c8><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-1/3 left-2/3 w-16 h-16 object-contain opacity-18 animate-float" style="${ssrRenderStyle({ "animation-delay": "2.1s" })}" data-v-548120c8><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute bottom-1/5 right-2/3 w-14 h-14 object-contain opacity-14 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.6s" })}" data-v-548120c8><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-3/5 right-1/5 w-20 h-20 object-contain opacity-11 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.9s" })}" data-v-548120c8><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute bottom-2/3 left-3/5 w-16 h-16 object-contain opacity-19 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "2.2s" })}" data-v-548120c8><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-1/8 right-3/4 w-14 h-14 object-contain opacity-13 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.1s" })}" data-v-548120c8><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute bottom-1/8 left-3/4 w-16 h-16 object-contain opacity-17 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.2s" })}" data-v-548120c8></div><section class="bg-blue-200 relative overflow-hidden py-24" data-v-548120c8><div class="absolute inset-0" data-v-548120c8><div class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-blue-700/30 rounded-full blur-3xl animate-pulse" data-v-548120c8></div><div class="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-full blur-3xl animate-pulse delay-1000" data-v-548120c8></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-v-548120c8><div class="text-center" data-v-548120c8><div class="relative mb-8" data-v-548120c8><div class="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 border border-blue-200 text-blue-800 mb-6" data-v-548120c8><div class="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse" data-v-548120c8></div><span class="text-sm font-semibold tracking-wide uppercase" data-v-548120c8>Leadership Team</span></div></div><h1 class="text-4xl lg:text-6xl font-black text-blue-600 mb-6 leading-tight" data-v-548120c8> Top <span class="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent" data-v-548120c8>Management</span></h1><p class="text-xl lg:text-2xl mb-8 text-blue-500 max-w-4xl mx-auto" data-v-548120c8> Meet the visionary leaders driving innovation and excellence at Aprati Food Company. </p></div></div></section><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" data-v-548120c8>`);
      if (loading.value) {
        _push(`<div class="text-center py-20" data-v-548120c8><div class="relative" data-v-548120c8><div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600" data-v-548120c8></div></div><p class="mt-8 text-gray-600 text-lg font-medium" data-v-548120c8>Loading leadership team...</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (error.value) {
        _push(`<div class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 text-center" data-v-548120c8><svg class="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-548120c8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-548120c8></path></svg> ${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value && !error.value && posts.value.length > 0) {
        _push(`<div class="space-y-8" data-v-548120c8><!--[-->`);
        ssrRenderList(posts.value, (post, index) => {
          _push(`<div class="group relative cursor-pointer" data-v-548120c8><div class="bg-white rounded-2xl shadow-md border border-blue-100 p-0.5 hover:shadow-lg transition-all duration-500 group-hover:scale-[1.005] flex justify-center items-center min-h-[250px] overflow-hidden" data-v-548120c8><div class="rounded-2xl w-full flex items-center justify-center overflow-hidden text-center" data-v-548120c8><div class="w-full flex flex-col items-center justify-center text-center p-6 lg:p-8 max-w-2xl" data-v-548120c8><div class="w-32 h-32 mx-auto mb-6 relative" data-v-548120c8><div class="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm border border-white/30" data-v-548120c8></div><div class="absolute inset-2 rounded-full bg-white/90 flex items-center justify-center shadow-lg" data-v-548120c8><span class="text-4xl font-bold text-gray-800" data-v-548120c8>${ssrInterpolate(getInitials(post.name))}</span></div></div><h3 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight" data-v-548120c8>${ssrInterpolate(post.name)}</h3><div class="prose prose-gray prose-lg max-w-none text-gray-600 leading-relaxed mb-6" data-v-548120c8><p class="line-clamp-4" data-v-548120c8>${ssrInterpolate(post.description.length > 150 ? post.description.substring(0, 150) + "..." : post.description)}</p></div><div class="flex items-center justify-center" data-v-548120c8><button class="group/btn relative inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-1" data-v-548120c8><span class="relative z-10" data-v-548120c8>View Detail</span><svg class="relative z-10 ml-3 w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-548120c8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-548120c8></path></svg></button></div></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-20" data-v-548120c8><div class="max-w-3xl mx-auto" data-v-548120c8><div class="relative mb-12" data-v-548120c8><div class="w-32 h-32 mx-auto relative" data-v-548120c8><div class="absolute inset-0 rounded-full bg-gray-200" data-v-548120c8></div><div class="absolute inset-2 rounded-full bg-white flex items-center justify-center shadow-lg" data-v-548120c8><svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-548120c8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-548120c8></path></svg></div></div></div><h3 class="text-2xl font-semibold text-gray-900 mb-2" data-v-548120c8>Leadership Team Coming Soon</h3><p class="text-gray-600" data-v-548120c8>Meet our leadership team information will be available soon.</p></div></div>`);
      }
      _push(`</div>`);
      if (!loading.value && posts.value.length > 0) {
        _push(`<div class="bg-gray-100 py-16" data-v-548120c8><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-v-548120c8><h2 class="text-3xl font-bold text-gray-900 mb-6" data-v-548120c8>Join Our Growing Team</h2><p class="text-xl text-gray-600 mb-8" data-v-548120c8> Discover exciting career opportunities and become part of our success story. </p><div class="flex flex-col sm:flex-row gap-4 justify-center" data-v-548120c8>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/careers",
          class: "group relative inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-green-700 to-green-900 text-white font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-green-700/25 transform hover:scale-105"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="relative z-10" data-v-548120c8${_scopeId}>View Careers</span><svg class="relative z-10 ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-548120c8${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-548120c8${_scopeId}></path></svg>`);
            } else {
              return [
                createVNode("span", { class: "relative z-10" }, "View Careers"),
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
          to: "/about",
          class: "group inline-flex items-center px-8 py-4 rounded-2xl border-2 border-gray-500 text-gray-700 font-bold text-lg transition-all duration-300 hover:bg-gray-100 hover:border-gray-400"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` About Us <svg class="ml-3 w-6 h-6 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-548120c8${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-v-548120c8${_scopeId}></path></svg>`);
            } else {
              return [
                createTextVNode(" About Us "),
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
        _push(`<div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn" data-v-548120c8><div class="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl animate-slideUp" data-v-548120c8><div class="relative bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6" data-v-548120c8><button class="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:scale-110" data-v-548120c8><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-548120c8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-548120c8></path></svg></button><div class="flex items-center pr-12" data-v-548120c8><div class="w-16 h-16 mr-6" data-v-548120c8><div class="w-full h-full rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center" data-v-548120c8><span class="text-2xl font-bold text-white" data-v-548120c8>${ssrInterpolate(getInitials(selectedPost.value.name))}</span></div></div><div data-v-548120c8><h3 class="text-2xl lg:text-3xl font-bold text-white" data-v-548120c8>${ssrInterpolate(selectedPost.value.name)}</h3><div class="flex items-center mt-2 text-white/70" data-v-548120c8><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-548120c8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-548120c8></path></svg><span class="text-sm" data-v-548120c8>Leadership Team</span></div></div></div></div><div class="px-8 py-6 overflow-y-auto max-h-[calc(85vh-180px)]" data-v-548120c8><div class="space-y-6" data-v-548120c8>`);
        if (selectedPost.value.description) {
          _push(`<div data-v-548120c8><div class="flex items-center mb-3" data-v-548120c8><div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3" data-v-548120c8><svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-548120c8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-548120c8></path></svg></div><h4 class="text-lg font-semibold text-gray-900" data-v-548120c8>Overview</h4></div><div class="prose prose-lg max-w-none" data-v-548120c8><p class="text-gray-700 leading-relaxed text-lg whitespace-pre-line" data-v-548120c8>${ssrInterpolate(selectedPost.value.description)}</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (selectedPost.value.bio) {
          _push(`<div class="border-t border-gray-100 pt-6" data-v-548120c8><div class="flex items-center mb-3" data-v-548120c8><div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3" data-v-548120c8><svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-548120c8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" data-v-548120c8></path></svg></div><h4 class="text-lg font-semibold text-gray-900" data-v-548120c8>Biography</h4></div><div class="prose prose-lg max-w-none" data-v-548120c8><p class="text-gray-700 leading-relaxed text-lg whitespace-pre-line" data-v-548120c8>${ssrInterpolate(selectedPost.value.bio)}</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (selectedPost.value.email || selectedPost.value.department) {
          _push(`<div class="border-t border-gray-100 pt-6" data-v-548120c8><div class="flex items-center mb-3" data-v-548120c8><div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3" data-v-548120c8><svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-548120c8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-548120c8></path></svg></div><h4 class="text-lg font-semibold text-gray-900" data-v-548120c8>Contact Information</h4></div><div class="space-y-2" data-v-548120c8>`);
          if (selectedPost.value.email) {
            _push(`<p class="text-gray-700" data-v-548120c8><span class="font-medium" data-v-548120c8>Email:</span><a${ssrRenderAttr("href", `mailto:${selectedPost.value.email}`)} class="text-blue-600 hover:text-blue-800 ml-2" data-v-548120c8>${ssrInterpolate(selectedPost.value.email)}</a></p>`);
          } else {
            _push(`<!---->`);
          }
          if (selectedPost.value.department) {
            _push(`<p class="text-gray-700" data-v-548120c8><span class="font-medium" data-v-548120c8>Department:</span><span class="ml-2" data-v-548120c8>${ssrInterpolate(selectedPost.value.department)}</span></p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="px-8 py-4 bg-gray-50 border-t border-gray-100" data-v-548120c8><div class="flex justify-between items-center" data-v-548120c8><div class="text-sm text-gray-500" data-v-548120c8><span data-v-548120c8>Last updated: ${ssrInterpolate(formatDate(selectedPost.value.updated_at))}</span></div><button class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-200" data-v-548120c8> Close </button></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/management.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const management = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-548120c8"]]);

export { management as default };
//# sourceMappingURL=management-BnM33gW4.mjs.map
