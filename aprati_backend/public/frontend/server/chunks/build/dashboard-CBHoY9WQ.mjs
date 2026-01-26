import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, computed, mergeProps, unref, withCtx, createVNode, createBlock, openBlock, createTextVNode, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { InformationCircleIcon, BriefcaseIcon, PhotoIcon, TagIcon, UsersIcon, PlusIcon } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/@heroicons/vue/24/outline/esm/index.js';
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

const _sfc_main = {
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const stats = ref({
      informationSections: { total: 0, active: 0, inactive: 0 },
      careers: { total: 0, active: 0, inactive: 0, closed: 0 },
      heroContent: { total: 0, active: 0 },
      brands: { total: 0, active: 0 },
      users: { total: 0, active: 0 }
    });
    ref([]);
    const recentCareers = ref([]);
    ref(true);
    const loadingCareers = ref(true);
    const currentDate = computed(() => {
      return (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50" }, _attrs))}><div class="px-4 sm:px-6 lg:px-8 py-6"><div class="mb-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg overflow-hidden"><div class="px-8 py-6 text-white"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold mb-2">Welcome Back! 👋</h1><p class="text-blue-100">Here&#39;s what&#39;s happening with your site today</p></div><div class="hidden md:block"><div class="text-right"><div class="text-sm text-blue-200 mb-1">Current Date</div><div class="text-lg font-semibold">${ssrInterpolate(currentDate.value)}</div></div></div></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"><div class="bg-white overflow-hidden shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group"><div class="p-6"><div class="flex items-center justify-between mb-4"><div class="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">`);
      _push(ssrRenderComponent(unref(InformationCircleIcon), { class: "h-7 w-7 text-white" }, null, _parent));
      _push(`</div><div class="text-right"><p class="text-3xl font-bold text-gray-900">${ssrInterpolate(stats.value.informationSections?.total || 0)}</p></div></div><h3 class="text-sm font-semibold text-gray-700 mb-2">Information Sections</h3><div class="flex items-center justify-between text-xs"><span class="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">${ssrInterpolate(stats.value.informationSections?.active || 0)} active</span><span class="px-2 py-1 bg-red-100 text-red-700 rounded-full font-medium">${ssrInterpolate(stats.value.informationSections?.inactive || 0)} inactive</span></div></div></div><div class="bg-white overflow-hidden shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group"><div class="p-6"><div class="flex items-center justify-between mb-4"><div class="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">`);
      _push(ssrRenderComponent(unref(BriefcaseIcon), { class: "h-7 w-7 text-white" }, null, _parent));
      _push(`</div><div class="text-right"><p class="text-3xl font-bold text-gray-900">${ssrInterpolate(stats.value.careers?.total || 0)}</p></div></div><h3 class="text-sm font-semibold text-gray-700 mb-2">Career Positions</h3><div class="flex items-center justify-between text-xs"><span class="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">${ssrInterpolate(stats.value.careers?.active || 0)} active</span><span class="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">${ssrInterpolate(stats.value.careers?.inactive || 0)} inactive</span></div></div></div><div class="bg-white overflow-hidden shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group"><div class="p-6"><div class="flex items-center justify-between mb-4"><div class="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">`);
      _push(ssrRenderComponent(unref(PhotoIcon), { class: "h-7 w-7 text-white" }, null, _parent));
      _push(`</div><div class="text-right"><p class="text-3xl font-bold text-gray-900">${ssrInterpolate(stats.value.heroContent?.total || 0)}</p></div></div><h3 class="text-sm font-semibold text-gray-700 mb-2">Hero Content</h3><div class="flex items-center text-xs"><span class="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">${ssrInterpolate(stats.value.heroContent?.active || 0)} active</span></div></div></div><div class="bg-white overflow-hidden shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group"><div class="p-6"><div class="flex items-center justify-between mb-4"><div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">`);
      _push(ssrRenderComponent(unref(TagIcon), { class: "h-7 w-7 text-white" }, null, _parent));
      _push(`</div><div class="text-right"><p class="text-3xl font-bold text-gray-900">${ssrInterpolate(stats.value.brands?.total || 0)}</p></div></div><h3 class="text-sm font-semibold text-gray-700 mb-2">Brands</h3><div class="flex items-center text-xs"><span class="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">${ssrInterpolate(stats.value.brands?.active || 0)} active</span></div></div></div><div class="bg-white overflow-hidden shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group"><div class="p-6"><div class="flex items-center justify-between mb-4"><div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">`);
      _push(ssrRenderComponent(unref(UsersIcon), { class: "h-7 w-7 text-white" }, null, _parent));
      _push(`</div><div class="text-right"><p class="text-3xl font-bold text-gray-900">${ssrInterpolate(stats.value.users?.total || 0)}</p></div></div><h3 class="text-sm font-semibold text-gray-700 mb-2">Users</h3><div class="flex items-center text-xs"><span class="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">${ssrInterpolate(stats.value.users?.active || 0)} active</span></div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"><div class="bg-white shadow rounded-lg"><div class="px-6 py-4 border-b border-gray-200"><h3 class="text-lg font-medium text-gray-900">Content Management</h3><p class="mt-1 text-sm text-gray-500">Manage your website content</p></div><div class="p-6"><div class="grid grid-cols-1 gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/information-sections",
        class: "flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-2 bg-blue-100 rounded-lg mr-4"${_scopeId}><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div><div${_scopeId}><h3 class="font-semibold text-gray-900"${_scopeId}>Information Sections</h3><p class="text-sm text-gray-600"${_scopeId}>Manage homepage information posts</p></div>`);
          } else {
            return [
              createVNode("div", { class: "p-2 bg-blue-100 rounded-lg mr-4" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-6 h-6 text-blue-600",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ]))
              ]),
              createVNode("div", null, [
                createVNode("h3", { class: "font-semibold text-gray-900" }, "Information Sections"),
                createVNode("p", { class: "text-sm text-gray-600" }, "Manage homepage information posts")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/users",
        class: "flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-2 bg-purple-100 rounded-lg mr-4"${_scopeId}><svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"${_scopeId}></path></svg></div><div${_scopeId}><h3 class="font-semibold text-gray-900"${_scopeId}>Manage Users</h3><p class="text-sm text-gray-600"${_scopeId}>Add and manage admin users</p></div>`);
          } else {
            return [
              createVNode("div", { class: "p-2 bg-purple-100 rounded-lg mr-4" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-6 h-6 text-purple-600",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  })
                ]))
              ]),
              createVNode("div", null, [
                createVNode("h3", { class: "font-semibold text-gray-900" }, "Manage Users"),
                createVNode("p", { class: "text-sm text-gray-600" }, "Add and manage admin users")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/brands",
        class: "flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-2 bg-green-100 rounded-lg mr-4"${_scopeId}><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"${_scopeId}></path></svg></div><div${_scopeId}><h3 class="font-semibold text-gray-900"${_scopeId}>Manage Brands</h3><p class="text-sm text-gray-600"${_scopeId}>Add, edit, or delete brands</p></div>`);
          } else {
            return [
              createVNode("div", { class: "p-2 bg-green-100 rounded-lg mr-4" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-6 h-6 text-green-600",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  })
                ]))
              ]),
              createVNode("div", null, [
                createVNode("h3", { class: "font-semibold text-gray-900" }, "Manage Brands"),
                createVNode("p", { class: "text-sm text-gray-600" }, "Add, edit, or delete brands")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/products",
        class: "flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-2 bg-green-100 rounded-lg mr-4"${_scopeId}><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"${_scopeId}></path></svg></div><div${_scopeId}><h3 class="font-semibold text-gray-900"${_scopeId}>Manage Products</h3><p class="text-sm text-gray-600"${_scopeId}>Add, edit, or delete products</p></div>`);
          } else {
            return [
              createVNode("div", { class: "p-2 bg-green-100 rounded-lg mr-4" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-6 h-6 text-green-600",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  })
                ]))
              ]),
              createVNode("div", null, [
                createVNode("h3", { class: "font-semibold text-gray-900" }, "Manage Products"),
                createVNode("p", { class: "text-sm text-gray-600" }, "Add, edit, or delete products")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/hero-content",
        class: "flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-2 bg-yellow-100 rounded-lg mr-4"${_scopeId}><svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6H2a1 1 0 110-2h4zM8 3v1h8V3H8zm2 4a1 1 0 100 2h4a1 1 0 100-2h-4z"${_scopeId}></path></svg></div><div${_scopeId}><h3 class="font-semibold text-gray-900"${_scopeId}>Hero Content</h3><p class="text-sm text-gray-600"${_scopeId}>Manage homepage hero text and buttons</p></div>`);
          } else {
            return [
              createVNode("div", { class: "p-2 bg-yellow-100 rounded-lg mr-4" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-6 h-6 text-yellow-600",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6H2a1 1 0 110-2h4zM8 3v1h8V3H8zm2 4a1 1 0 100 2h4a1 1 0 100-2h-4z"
                  })
                ]))
              ]),
              createVNode("div", null, [
                createVNode("h3", { class: "font-semibold text-gray-900" }, "Hero Content"),
                createVNode("p", { class: "text-sm text-gray-600" }, "Manage homepage hero text and buttons")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/hero-images",
        class: "flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-2 bg-orange-100 rounded-lg mr-4"${_scopeId}><svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg></div><div${_scopeId}><h3 class="font-semibold text-gray-900"${_scopeId}>Hero Images</h3><p class="text-sm text-gray-600"${_scopeId}>Manage homepage hero image</p></div>`);
          } else {
            return [
              createVNode("div", { class: "p-2 bg-orange-100 rounded-lg mr-4" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-6 h-6 text-orange-600",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  })
                ]))
              ]),
              createVNode("div", null, [
                createVNode("h3", { class: "font-semibold text-gray-900" }, "Hero Images"),
                createVNode("p", { class: "text-sm text-gray-600" }, "Manage homepage hero image")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/careers",
        class: "flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-2 bg-indigo-100 rounded-lg mr-4"${_scopeId}><svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"${_scopeId}></path></svg></div><div${_scopeId}><h3 class="font-semibold text-gray-900"${_scopeId}>Manage Careers</h3><p class="text-sm text-gray-600"${_scopeId}>Post jobs and manage applications</p></div>`);
          } else {
            return [
              createVNode("div", { class: "p-2 bg-indigo-100 rounded-lg mr-4" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-6 h-6 text-indigo-600",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                  })
                ]))
              ]),
              createVNode("div", null, [
                createVNode("h3", { class: "font-semibold text-gray-900" }, "Manage Careers"),
                createVNode("p", { class: "text-sm text-gray-600" }, "Post jobs and manage applications")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/management-posts",
        class: "flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-2 bg-emerald-100 rounded-lg mr-4"${_scopeId}><svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"${_scopeId}></path></svg></div><div${_scopeId}><h3 class="font-semibold text-gray-900"${_scopeId}>Management Team</h3><p class="text-sm text-gray-600"${_scopeId}>Manage top management posts</p></div>`);
          } else {
            return [
              createVNode("div", { class: "p-2 bg-emerald-100 rounded-lg mr-4" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-6 h-6 text-emerald-600",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  })
                ]))
              ]),
              createVNode("div", null, [
                createVNode("h3", { class: "font-semibold text-gray-900" }, "Management Team"),
                createVNode("p", { class: "text-sm text-gray-600" }, "Manage top management posts")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/visitors",
        class: "flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-2 bg-cyan-100 rounded-lg mr-4"${_scopeId}><svg class="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"${_scopeId}></path></svg></div><div${_scopeId}><h3 class="font-semibold text-gray-900"${_scopeId}>Website Analytics</h3><p class="text-sm text-gray-600"${_scopeId}>Track visitor statistics and behavior</p></div>`);
          } else {
            return [
              createVNode("div", { class: "p-2 bg-cyan-100 rounded-lg mr-4" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-6 h-6 text-cyan-600",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  })
                ]))
              ]),
              createVNode("div", null, [
                createVNode("h3", { class: "font-semibold text-gray-900" }, "Website Analytics"),
                createVNode("p", { class: "text-sm text-gray-600" }, "Track visitor statistics and behavior")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/footer-settings",
        class: "flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-2 bg-slate-100 rounded-lg mr-4"${_scopeId}><svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path></svg></div><div${_scopeId}><h3 class="font-semibold text-gray-900"${_scopeId}>Footer Settings</h3><p class="text-sm text-gray-600"${_scopeId}>Manage contact info and social links</p></div>`);
          } else {
            return [
              createVNode("div", { class: "p-2 bg-slate-100 rounded-lg mr-4" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-6 h-6 text-slate-600",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  }),
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  })
                ]))
              ]),
              createVNode("div", null, [
                createVNode("h3", { class: "font-semibold text-gray-900" }, "Footer Settings"),
                createVNode("p", { class: "text-sm text-gray-600" }, "Manage contact info and social links")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/profile",
        class: "flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-2 bg-purple-100 rounded-lg mr-4"${_scopeId}><svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"${_scopeId}></path></svg></div><div${_scopeId}><h3 class="font-semibold text-gray-900"${_scopeId}>My Profile</h3><p class="text-sm text-gray-600"${_scopeId}>Update profile picture and information</p></div>`);
          } else {
            return [
              createVNode("div", { class: "p-2 bg-purple-100 rounded-lg mr-4" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-6 h-6 text-purple-600",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  })
                ]))
              ]),
              createVNode("div", null, [
                createVNode("h3", { class: "font-semibold text-gray-900" }, "My Profile"),
                createVNode("p", { class: "text-sm text-gray-600" }, "Update profile picture and information")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/about",
        onClick: ($event) => console.log("Clicking Manage About link"),
        class: "flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-2 bg-purple-100 rounded-lg mr-4"${_scopeId}><svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div><div${_scopeId}><h3 class="font-semibold text-gray-900"${_scopeId}>Manage About</h3><p class="text-sm text-gray-600"${_scopeId}>Manage about page content and sections</p></div>`);
          } else {
            return [
              createVNode("div", { class: "p-2 bg-purple-100 rounded-lg mr-4" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-6 h-6 text-purple-600",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ]))
              ]),
              createVNode("div", null, [
                createVNode("h3", { class: "font-semibold text-gray-900" }, "Manage About"),
                createVNode("p", { class: "text-sm text-gray-600" }, "Manage about page content and sections")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/privacy",
        class: "flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-2 bg-red-100 rounded-lg mr-4"${_scopeId}><svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"${_scopeId}></path></svg></div><div${_scopeId}><h3 class="font-semibold text-gray-900"${_scopeId}>Privacy Policy</h3><p class="text-sm text-gray-600"${_scopeId}>Manage privacy policy sections (EN/KH)</p></div>`);
          } else {
            return [
              createVNode("div", { class: "p-2 bg-red-100 rounded-lg mr-4" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-6 h-6 text-red-600",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  })
                ]))
              ]),
              createVNode("div", null, [
                createVNode("h3", { class: "font-semibold text-gray-900" }, "Privacy Policy"),
                createVNode("p", { class: "text-sm text-gray-600" }, "Manage privacy policy sections (EN/KH)")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="bg-white shadow rounded-lg"><div class="px-6 py-4 border-b border-gray-200"><div class="flex items-center justify-between"><h3 class="text-lg font-medium text-gray-900">Recent Career Postings</h3>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/careers",
        class: "text-sm text-blue-600 hover:text-blue-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View all `);
          } else {
            return [
              createTextVNode(" View all ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="p-6">`);
      if (loadingCareers.value) {
        _push(`<div class="flex justify-center py-4"><div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div></div>`);
      } else if (recentCareers.value.length > 0) {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(recentCareers.value, (career) => {
          _push(`<div class="flex items-center space-x-3"><div class="flex-shrink-0"><div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">`);
          _push(ssrRenderComponent(unref(BriefcaseIcon), { class: "w-5 h-5 text-indigo-600" }, null, _parent));
          _push(`</div></div><div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-900 truncate">${ssrInterpolate(career.title_job)}</p><p class="text-sm text-gray-500 truncate">${ssrInterpolate(career.position)} • ${ssrInterpolate(career.department || "N/A")}</p></div><span class="${ssrRenderClass([
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            career.status === "active" ? "bg-green-100 text-green-800" : career.status === "inactive" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
          ])}">${ssrInterpolate(career.status)}</span></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-4">`);
        _push(ssrRenderComponent(unref(BriefcaseIcon), { class: "mx-auto h-8 w-8 text-gray-400" }, null, _parent));
        _push(`<p class="mt-2 text-sm text-gray-500">No career postings yet</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/careers",
          class: "mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Create your first career posting `);
            } else {
              return [
                createTextVNode(" Create your first career posting ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div></div></div><div class="bg-white shadow rounded-lg"><div class="px-6 py-4 border-b border-gray-200"><h3 class="text-lg font-medium text-gray-900">Quick Actions</h3><p class="mt-1 text-sm text-gray-500">Common administrative tasks</p></div><div class="p-6"><div class="grid grid-cols-2 md:grid-cols-5 gap-4"><button class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors">`);
      _push(ssrRenderComponent(unref(PlusIcon), { class: "h-8 w-8 text-blue-500 mb-2" }, null, _parent));
      _push(`<span class="text-sm font-medium text-gray-900">Add Info Section</span></button><button class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-colors">`);
      _push(ssrRenderComponent(unref(BriefcaseIcon), { class: "h-8 w-8 text-indigo-500 mb-2" }, null, _parent));
      _push(`<span class="text-sm font-medium text-gray-900">Manage Careers</span></button><button class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors">`);
      _push(ssrRenderComponent(unref(PhotoIcon), { class: "h-8 w-8 text-green-500 mb-2" }, null, _parent));
      _push(`<span class="text-sm font-medium text-gray-900">Manage Hero</span></button><button class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors">`);
      _push(ssrRenderComponent(unref(TagIcon), { class: "h-8 w-8 text-purple-500 mb-2" }, null, _parent));
      _push(`<span class="text-sm font-medium text-gray-900">Manage Brands</span></button><button class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition-colors">`);
      _push(ssrRenderComponent(unref(UsersIcon), { class: "h-8 w-8 text-orange-500 mb-2" }, null, _parent));
      _push(`<span class="text-sm font-medium text-gray-900">Manage Users</span></button></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard-CBHoY9WQ.mjs.map
