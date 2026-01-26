import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, mergeProps, withCtx, createVNode, createBlock, openBlock, unref, createTextVNode, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderSlot, ssrRenderList } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { u as useApi } from './useApi-CO9TAo9a.mjs';
import { _ as __nuxt_component_2 } from './AppToast-CE8UiWBe.mjs';
import { HomeIcon, TagIcon, CubeIcon, PhotoIcon, InformationCircleIcon, DocumentTextIcon, BriefcaseIcon, UsersIcon, CogIcon } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/@heroicons/vue/24/outline/esm/index.js';
import { g as useRoute } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/ufo/dist/index.mjs';
import './cookie-D4T41UgU.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/cookie-es/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/h3/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/destr/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/ohash/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/klona/dist/index.mjs';
import './useToast-BHiNW5Rt.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/ofetch/dist/node.mjs';
import '../_/nitro.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/hookable/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/node-mock-http/dist/index.mjs';
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
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/unctx/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/pinia/dist/pinia.prod.cjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue-router/dist/vue-router.node.mjs';
import '../_/renderer.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/unhead/dist/server.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/devalue/index.js';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/unhead/dist/plugins.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/unhead/dist/utils.mjs';

const _sfc_main$1 = {
  __name: "AdminNotifications",
  __ssrInlineRender: true,
  setup(__props) {
    const { jobApplications: jobAppApi } = useApi();
    const notifications = ref([]);
    const showNotifications = ref(false);
    const unreadCount = ref(0);
    const formatTime = (dateString) => {
      const date = new Date(dateString);
      const now = /* @__PURE__ */ new Date();
      const diffInSeconds = Math.floor((now - date) / 1e3);
      if (diffInSeconds < 60) {
        return "Just now";
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
      } else {
        return date.toLocaleDateString();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      if (unref(notifications).length > 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><button class="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>`);
        if (unref(unreadCount) > 0) {
          _push(`<span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">${ssrInterpolate(unref(unreadCount) > 99 ? "99+" : unref(unreadCount))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
        if (unref(showNotifications)) {
          _push(`<div class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50"><div class="p-4 border-b"><div class="flex items-center justify-between"><h3 class="text-lg font-semibold text-gray-900">Notifications</h3><button class="text-sm text-blue-600 hover:text-blue-800"> Mark all read </button></div></div><div class="max-h-96 overflow-y-auto">`);
          if (unref(notifications).length === 0) {
            _push(`<div class="p-4 text-center text-gray-500"> No new notifications </div>`);
          } else {
            _push(`<div><!--[-->`);
            ssrRenderList(unref(notifications), (notification) => {
              _push(`<div class="${ssrRenderClass([
                "p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors",
                !notification.read ? "bg-blue-50" : ""
              ])}"><div class="flex items-start space-x-3"><div class="flex-shrink-0"><div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"><svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div></div><div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-900">${ssrInterpolate(notification.title)}</p><p class="text-sm text-gray-500 mt-1">${ssrInterpolate(notification.message)}</p><p class="text-xs text-gray-400 mt-2">${ssrInterpolate(formatTime(notification.created_at))}</p></div>`);
              if (!notification.read) {
                _push(`<div class="flex-shrink-0"><div class="w-2 h-2 bg-blue-500 rounded-full"></div></div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div></div>`);
            });
            _push(`<!--]--></div>`);
          }
          _push(`</div><div class="p-4 border-t">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/admin/job-applications",
            class: "block text-center text-sm text-blue-600 hover:text-blue-800",
            onClick: ($event) => showNotifications.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` View all applications `);
              } else {
                return [
                  createTextVNode(" View all applications ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(showNotifications)) {
          _push(`<div class="fixed inset-0 z-40"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AdminNotifications.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const currentDate = ref("");
    const currentTime = ref("");
    const getPageTitle = () => {
      const path = route.path;
      if (path.includes("/brands")) return "Brand Management";
      if (path.includes("/products")) return "Product Management";
      if (path.includes("/hero-images")) return "Hero Image Management";
      if (path.includes("/hero-content")) return "Hero Content";
      if (path.includes("/information-sections")) return "Information Sections";
      if (path.includes("/about-content")) return "About Content";
      if (path.includes("/about")) return "About Page";
      if (path.includes("/careers")) return "Career Positions";
      if (path.includes("/job-applications")) return "Job Applications";
      if (path.includes("/management-posts")) return "Management Team";
      if (path.includes("/visitors")) return "Website Analytics";
      if (path.includes("/users")) return "User Management";
      if (path.includes("/privacy")) return "Privacy Policy";
      if (path.includes("/header-settings")) return "Header Settings";
      if (path.includes("/footer-settings")) return "Footer Settings";
      if (path.includes("/profile")) return "My Profile";
      if (path.includes("/settings")) return "General Settings";
      return "Dashboard";
    };
    const getCurrentDate = () => {
      return currentDate.value;
    };
    const getCurrentTime = () => {
      return currentTime.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_AdminNotifications = _sfc_main$1;
      const _component_AppToast = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 flex" }, _attrs))} data-v-0a880462><div class="w-72 bg-white shadow-xl border-r border-gray-200 flex flex-col" data-v-0a880462><div class="px-6 py-6 bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-800" data-v-0a880462>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/dashboard",
        class: "flex items-center group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mr-3 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110" data-v-0a880462${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a880462${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-0a880462${_scopeId}></path></svg></div><div data-v-0a880462${_scopeId}><span class="block text-xl font-bold text-white" data-v-0a880462${_scopeId}>Aprati Admin</span><span class="block text-xs text-blue-100" data-v-0a880462${_scopeId}>Management System</span></div>`);
          } else {
            return [
              createVNode("div", { class: "w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mr-3 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-6 h-6 text-white",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M13 10V3L4 14h7v7l9-11h-7z"
                  })
                ]))
              ]),
              createVNode("div", null, [
                createVNode("span", { class: "block text-xl font-bold text-white" }, "Aprati Admin"),
                createVNode("span", { class: "block text-xs text-blue-100" }, "Management System")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><nav class="flex-1 overflow-y-auto py-6 px-3" data-v-0a880462><div class="space-y-1" data-v-0a880462><div class="px-3 mb-2" data-v-0a880462><p class="text-xs font-bold text-gray-500 uppercase tracking-wider" data-v-0a880462>Main Menu</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/dashboard",
        class: ["group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200", _ctx.$route.path === "/admin/dashboard" ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-105" : "text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:scale-105"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([_ctx.$route.path === "/admin/dashboard" ? "bg-white/20" : "bg-gray-100 group-hover:bg-blue-100", "w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all"])}" data-v-0a880462${_scopeId}>`);
            _push2(ssrRenderComponent(unref(HomeIcon), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(`</div><span data-v-0a880462${_scopeId}>Dashboard</span>`);
          } else {
            return [
              createVNode("div", {
                class: ["w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all", _ctx.$route.path === "/admin/dashboard" ? "bg-white/20" : "bg-gray-100 group-hover:bg-blue-100"]
              }, [
                createVNode(unref(HomeIcon), { class: "w-5 h-5" })
              ], 2),
              createVNode("span", null, "Dashboard")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="px-3 mt-6 mb-2" data-v-0a880462><p class="text-xs font-bold text-gray-500 uppercase tracking-wider" data-v-0a880462>Content</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/brands",
        class: ["group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200", _ctx.$route.path.startsWith("/admin/brands") ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30 scale-105" : "text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:scale-105"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([_ctx.$route.path.startsWith("/admin/brands") ? "bg-white/20" : "bg-gray-100 group-hover:bg-purple-100", "w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all"])}" data-v-0a880462${_scopeId}>`);
            _push2(ssrRenderComponent(unref(TagIcon), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(`</div><span data-v-0a880462${_scopeId}>Brands</span>`);
          } else {
            return [
              createVNode("div", {
                class: ["w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all", _ctx.$route.path.startsWith("/admin/brands") ? "bg-white/20" : "bg-gray-100 group-hover:bg-purple-100"]
              }, [
                createVNode(unref(TagIcon), { class: "w-5 h-5" })
              ], 2),
              createVNode("span", null, "Brands")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/products",
        class: ["group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200", _ctx.$route.path.startsWith("/admin/products") ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-500/30 scale-105" : "text-gray-700 hover:bg-green-50 hover:text-green-700 hover:scale-105"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([_ctx.$route.path.startsWith("/admin/products") ? "bg-white/20" : "bg-gray-100 group-hover:bg-green-100", "w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all"])}" data-v-0a880462${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CubeIcon), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(`</div><span data-v-0a880462${_scopeId}>Products</span>`);
          } else {
            return [
              createVNode("div", {
                class: ["w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all", _ctx.$route.path.startsWith("/admin/products") ? "bg-white/20" : "bg-gray-100 group-hover:bg-green-100"]
              }, [
                createVNode(unref(CubeIcon), { class: "w-5 h-5" })
              ], 2),
              createVNode("span", null, "Products")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/hero-images",
        class: ["group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200", _ctx.$route.path.startsWith("/admin/hero-images") ? "bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg shadow-orange-500/30 scale-105" : "text-gray-700 hover:bg-orange-50 hover:text-orange-700 hover:scale-105"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([_ctx.$route.path.startsWith("/admin/hero-images") ? "bg-white/20" : "bg-gray-100 group-hover:bg-orange-100", "w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all"])}" data-v-0a880462${_scopeId}>`);
            _push2(ssrRenderComponent(unref(PhotoIcon), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(`</div><span data-v-0a880462${_scopeId}>Hero Images</span>`);
          } else {
            return [
              createVNode("div", {
                class: ["w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all", _ctx.$route.path.startsWith("/admin/hero-images") ? "bg-white/20" : "bg-gray-100 group-hover:bg-orange-100"]
              }, [
                createVNode(unref(PhotoIcon), { class: "w-5 h-5" })
              ], 2),
              createVNode("span", null, "Hero Images")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/information-sections",
        class: ["group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200", _ctx.$route.path.startsWith("/admin/information-sections") ? "bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-lg shadow-cyan-500/30 scale-105" : "text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 hover:scale-105"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([_ctx.$route.path.startsWith("/admin/information-sections") ? "bg-white/20" : "bg-gray-100 group-hover:bg-cyan-100", "w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all"])}" data-v-0a880462${_scopeId}>`);
            _push2(ssrRenderComponent(unref(InformationCircleIcon), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(`</div><span data-v-0a880462${_scopeId}>Info Sections</span>`);
          } else {
            return [
              createVNode("div", {
                class: ["w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all", _ctx.$route.path.startsWith("/admin/information-sections") ? "bg-white/20" : "bg-gray-100 group-hover:bg-cyan-100"]
              }, [
                createVNode(unref(InformationCircleIcon), { class: "w-5 h-5" })
              ], 2),
              createVNode("span", null, "Info Sections")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/about-content",
        class: ["group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200", _ctx.$route.path.startsWith("/admin/about-content") ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/30 scale-105" : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 hover:scale-105"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([_ctx.$route.path.startsWith("/admin/about-content") ? "bg-white/20" : "bg-gray-100 group-hover:bg-indigo-100", "w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all"])}" data-v-0a880462${_scopeId}>`);
            _push2(ssrRenderComponent(unref(DocumentTextIcon), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(`</div><span data-v-0a880462${_scopeId}>About Content</span>`);
          } else {
            return [
              createVNode("div", {
                class: ["w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all", _ctx.$route.path.startsWith("/admin/about-content") ? "bg-white/20" : "bg-gray-100 group-hover:bg-indigo-100"]
              }, [
                createVNode(unref(DocumentTextIcon), { class: "w-5 h-5" })
              ], 2),
              createVNode("span", null, "About Content")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="px-3 mt-6 mb-2" data-v-0a880462><p class="text-xs font-bold text-gray-500 uppercase tracking-wider" data-v-0a880462>Careers</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/careers",
        class: ["group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200", _ctx.$route.path.startsWith("/admin/careers") ? "bg-gradient-to-r from-pink-600 to-pink-700 text-white shadow-lg shadow-pink-500/30 scale-105" : "text-gray-700 hover:bg-pink-50 hover:text-pink-700 hover:scale-105"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([_ctx.$route.path.startsWith("/admin/careers") ? "bg-white/20" : "bg-gray-100 group-hover:bg-pink-100", "w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all"])}" data-v-0a880462${_scopeId}>`);
            _push2(ssrRenderComponent(unref(BriefcaseIcon), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(`</div><span data-v-0a880462${_scopeId}>Job Positions</span>`);
          } else {
            return [
              createVNode("div", {
                class: ["w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all", _ctx.$route.path.startsWith("/admin/careers") ? "bg-white/20" : "bg-gray-100 group-hover:bg-pink-100"]
              }, [
                createVNode(unref(BriefcaseIcon), { class: "w-5 h-5" })
              ], 2),
              createVNode("span", null, "Job Positions")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/job-applications",
        class: ["group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200", _ctx.$route.path.startsWith("/admin/job-applications") ? "bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-lg shadow-rose-500/30 scale-105" : "text-gray-700 hover:bg-rose-50 hover:text-rose-700 hover:scale-105"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([_ctx.$route.path.startsWith("/admin/job-applications") ? "bg-white/20" : "bg-gray-100 group-hover:bg-rose-100", "w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all"])}" data-v-0a880462${_scopeId}>`);
            _push2(ssrRenderComponent(unref(DocumentTextIcon), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(`</div><span data-v-0a880462${_scopeId}>Applications</span>`);
          } else {
            return [
              createVNode("div", {
                class: ["w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all", _ctx.$route.path.startsWith("/admin/job-applications") ? "bg-white/20" : "bg-gray-100 group-hover:bg-rose-100"]
              }, [
                createVNode(unref(DocumentTextIcon), { class: "w-5 h-5" })
              ], 2),
              createVNode("span", null, "Applications")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="px-3 mt-6 mb-2" data-v-0a880462><p class="text-xs font-bold text-gray-500 uppercase tracking-wider" data-v-0a880462>System</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/users",
        class: ["group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200", _ctx.$route.path.startsWith("/admin/users") ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg shadow-teal-500/30 scale-105" : "text-gray-700 hover:bg-teal-50 hover:text-teal-700 hover:scale-105"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([_ctx.$route.path.startsWith("/admin/users") ? "bg-white/20" : "bg-gray-100 group-hover:bg-teal-100", "w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all"])}" data-v-0a880462${_scopeId}>`);
            _push2(ssrRenderComponent(unref(UsersIcon), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(`</div><span data-v-0a880462${_scopeId}>Users</span>`);
          } else {
            return [
              createVNode("div", {
                class: ["w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all", _ctx.$route.path.startsWith("/admin/users") ? "bg-white/20" : "bg-gray-100 group-hover:bg-teal-100"]
              }, [
                createVNode(unref(UsersIcon), { class: "w-5 h-5" })
              ], 2),
              createVNode("span", null, "Users")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/privacy",
        class: ["group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200", _ctx.$route.path.startsWith("/admin/privacy") ? "bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg shadow-gray-500/30 scale-105" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:scale-105"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([_ctx.$route.path.startsWith("/admin/privacy") ? "bg-white/20" : "bg-gray-100 group-hover:bg-gray-200", "w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all"])}" data-v-0a880462${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a880462${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-0a880462${_scopeId}></path></svg></div><span data-v-0a880462${_scopeId}>Privacy Policy</span>`);
          } else {
            return [
              createVNode("div", {
                class: ["w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all", _ctx.$route.path.startsWith("/admin/privacy") ? "bg-white/20" : "bg-gray-100 group-hover:bg-gray-200"]
              }, [
                (openBlock(), createBlock("svg", {
                  class: "w-5 h-5",
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
              ], 2),
              createVNode("span", null, "Privacy Policy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mt-6 pt-6 border-t border-gray-200" data-v-0a880462><div class="px-3 mb-2" data-v-0a880462><p class="text-xs font-bold text-gray-500 uppercase tracking-wider" data-v-0a880462>Quick Actions</p></div><div class="space-y-1.5" data-v-0a880462>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/management-posts",
        class: "group flex items-center px-3 py-2 text-xs font-medium rounded-lg hover:bg-emerald-50 transition-all duration-200 text-gray-700 hover:text-emerald-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-7 h-7 flex items-center justify-center bg-emerald-100 rounded-lg mr-2.5 group-hover:bg-emerald-200 transition-colors" data-v-0a880462${_scopeId}><svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a880462${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-0a880462${_scopeId}></path></svg></div><span data-v-0a880462${_scopeId}>Management Team</span>`);
          } else {
            return [
              createVNode("div", { class: "w-7 h-7 flex items-center justify-center bg-emerald-100 rounded-lg mr-2.5 group-hover:bg-emerald-200 transition-colors" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4 text-emerald-600",
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
              createVNode("span", null, "Management Team")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/hero-content",
        class: "group flex items-center px-3 py-2 text-xs font-medium rounded-lg hover:bg-yellow-50 transition-all duration-200 text-gray-700 hover:text-yellow-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-7 h-7 flex items-center justify-center bg-yellow-100 rounded-lg mr-2.5 group-hover:bg-yellow-200 transition-colors" data-v-0a880462${_scopeId}><svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a880462${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-0a880462${_scopeId}></path></svg></div><span data-v-0a880462${_scopeId}>Hero Content</span>`);
          } else {
            return [
              createVNode("div", { class: "w-7 h-7 flex items-center justify-center bg-yellow-100 rounded-lg mr-2.5 group-hover:bg-yellow-200 transition-colors" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4 text-yellow-600",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  })
                ]))
              ]),
              createVNode("span", null, "Hero Content")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/visitors",
        class: "group flex items-center px-3 py-2 text-xs font-medium rounded-lg hover:bg-cyan-50 transition-all duration-200 text-gray-700 hover:text-cyan-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-7 h-7 flex items-center justify-center bg-cyan-100 rounded-lg mr-2.5 group-hover:bg-cyan-200 transition-colors" data-v-0a880462${_scopeId}><svg class="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a880462${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-0a880462${_scopeId}></path></svg></div><span data-v-0a880462${_scopeId}>Analytics</span>`);
          } else {
            return [
              createVNode("div", { class: "w-7 h-7 flex items-center justify-center bg-cyan-100 rounded-lg mr-2.5 group-hover:bg-cyan-200 transition-colors" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4 text-cyan-600",
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
              createVNode("span", null, "Analytics")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/about",
        class: "group flex items-center px-3 py-2 text-xs font-medium rounded-lg hover:bg-purple-50 transition-all duration-200 text-gray-700 hover:text-purple-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-7 h-7 flex items-center justify-center bg-purple-100 rounded-lg mr-2.5 group-hover:bg-purple-200 transition-colors" data-v-0a880462${_scopeId}><svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a880462${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-0a880462${_scopeId}></path></svg></div><span data-v-0a880462${_scopeId}>About Page</span>`);
          } else {
            return [
              createVNode("div", { class: "w-7 h-7 flex items-center justify-center bg-purple-100 rounded-lg mr-2.5 group-hover:bg-purple-200 transition-colors" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4 text-purple-600",
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
              createVNode("span", null, "About Page")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="mt-6 pt-6 border-t border-gray-200" data-v-0a880462><div class="px-3 mb-2" data-v-0a880462><p class="text-xs font-bold text-gray-500 uppercase tracking-wider" data-v-0a880462>Settings</p></div><div class="space-y-1" data-v-0a880462>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/header-settings",
        class: ["group flex items-center px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200", _ctx.$route.path.startsWith("/admin/header-settings") ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([_ctx.$route.path.startsWith("/admin/header-settings") ? "bg-white/20" : "bg-gray-100", "w-7 h-7 flex items-center justify-center rounded-lg mr-2.5"])}" data-v-0a880462${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a880462${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M13 13h4a2 2 0 012 2v4a2 2 0 01-2 2h-4m-6-4h.01M13 13h.01" data-v-0a880462${_scopeId}></path></svg></div> Header Settings `);
          } else {
            return [
              createVNode("div", {
                class: ["w-7 h-7 flex items-center justify-center rounded-lg mr-2.5", _ctx.$route.path.startsWith("/admin/header-settings") ? "bg-white/20" : "bg-gray-100"]
              }, [
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M13 13h4a2 2 0 012 2v4a2 2 0 01-2 2h-4m-6-4h.01M13 13h.01"
                  })
                ]))
              ], 2),
              createTextVNode(" Header Settings ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/footer-settings",
        class: ["group flex items-center px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200", _ctx.$route.path.startsWith("/admin/footer-settings") ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([_ctx.$route.path.startsWith("/admin/footer-settings") ? "bg-white/20" : "bg-gray-100", "w-7 h-7 flex items-center justify-center rounded-lg mr-2.5"])}" data-v-0a880462${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a880462${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" data-v-0a880462${_scopeId}></path></svg></div> Footer Settings `);
          } else {
            return [
              createVNode("div", {
                class: ["w-7 h-7 flex items-center justify-center rounded-lg mr-2.5", _ctx.$route.path.startsWith("/admin/footer-settings") ? "bg-white/20" : "bg-gray-100"]
              }, [
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M19 14l-7 7m0 0l-7-7m7 7V3"
                  })
                ]))
              ], 2),
              createTextVNode(" Footer Settings ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/profile",
        class: ["group flex items-center px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200", _ctx.$route.path === "/admin/profile" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([_ctx.$route.path === "/admin/profile" ? "bg-white/20" : "bg-gray-100", "w-7 h-7 flex items-center justify-center rounded-lg mr-2.5"])}" data-v-0a880462${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a880462${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-0a880462${_scopeId}></path></svg></div> My Profile `);
          } else {
            return [
              createVNode("div", {
                class: ["w-7 h-7 flex items-center justify-center rounded-lg mr-2.5", _ctx.$route.path === "/admin/profile" ? "bg-white/20" : "bg-gray-100"]
              }, [
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4",
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
              ], 2),
              createTextVNode(" My Profile ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/settings",
        class: ["group flex items-center px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200", _ctx.$route.path === "/admin/settings" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([_ctx.$route.path === "/admin/settings" ? "bg-white/20" : "bg-gray-100", "w-7 h-7 flex items-center justify-center rounded-lg mr-2.5"])}" data-v-0a880462${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CogIcon), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(`</div> General Settings `);
          } else {
            return [
              createVNode("div", {
                class: ["w-7 h-7 flex items-center justify-center rounded-lg mr-2.5", _ctx.$route.path === "/admin/settings" ? "bg-white/20" : "bg-gray-100"]
              }, [
                createVNode(unref(CogIcon), { class: "w-4 h-4" })
              ], 2),
              createTextVNode(" General Settings ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></nav><div class="mt-6 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl mx-3 border border-gray-200" data-v-0a880462><div class="flex items-center mb-3" data-v-0a880462><div class="relative" data-v-0a880462><div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg" data-v-0a880462><span class="text-sm font-bold text-white" data-v-0a880462>A</span></div><div class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" data-v-0a880462></div></div><div class="ml-3 flex-1" data-v-0a880462><p class="text-sm font-semibold text-gray-900" data-v-0a880462>Admin User</p><p class="text-xs text-gray-600" data-v-0a880462>admin@aprati.com</p></div></div><button class="w-full flex items-center justify-center px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 hover:border-red-200 transition-all duration-200 shadow-sm" data-v-0a880462><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a880462><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-0a880462></path></svg> Sign Out </button></div></div><div class="flex-1 flex flex-col overflow-hidden" data-v-0a880462><header class="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-10" data-v-0a880462><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-0a880462><div class="flex justify-between items-center h-16" data-v-0a880462><div class="flex items-center space-x-4" data-v-0a880462><h1 class="text-2xl font-bold text-gray-900" data-v-0a880462>${ssrInterpolate(getPageTitle())}</h1><span class="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800" data-v-0a880462>${ssrInterpolate(getCurrentDate())}</span></div><div class="flex items-center space-x-3" data-v-0a880462>`);
      _push(ssrRenderComponent(_component_AdminNotifications, null, null, _parent));
      _push(`<div class="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-gray-100 rounded-lg" data-v-0a880462><svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a880462><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-0a880462></path></svg><span class="text-sm font-medium text-gray-700" data-v-0a880462>${ssrInterpolate(getCurrentTime())}</span></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        target: "_blank",
        class: "inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a880462${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-v-0a880462${_scopeId}></path></svg> View Site `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 mr-2",
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
              ])),
              createTextVNode(" View Site ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></header><main class="flex-1 overflow-y-auto" data-v-0a880462>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
      _push(ssrRenderComponent(_component_AppToast, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const admin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0a880462"]]);

export { admin as default };
//# sourceMappingURL=admin-V8crszfm.mjs.map
