import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, mergeProps, withCtx, createBlock, openBlock, createVNode, unref, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrLooseContain } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { b as useRuntimeConfig } from './server.mjs';
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
  __name: "header-settings",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const uploading = ref(false);
    const message = ref("");
    const messageType = ref("success");
    const hasChanges = ref(false);
    const settings = ref({});
    const formData = ref({
      branding: {},
      search: {}
    });
    const getCurrentLogo = () => {
      const logoPath = formData.value.branding?.header_logo || settings.value.branding?.header_logo;
      if (!logoPath || logoPath === "/images/logo.png") return null;
      if (logoPath.startsWith("http://") || logoPath.startsWith("https://")) {
        return logoPath;
      }
      const runtimeConfig = useRuntimeConfig();
      const baseUrl = runtimeConfig.public.apiBaseUrl?.replace("/api", "") || "https://sdev.apratifoods.asia";
      return logoPath.startsWith("/storage/") ? `${baseUrl}${logoPath}` : `${baseUrl}/storage/${logoPath}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50" }, _attrs))}><nav class="bg-white shadow-sm" style="${ssrRenderStyle({ "display": "none" })}"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="flex items-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: "text-blue-600 hover:text-blue-800 mr-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-6 h-6",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="text-2xl font-bold text-gray-900">Header Settings</h1></div><div class="flex items-center space-x-4"><button${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100 text-gray-700 disabled:text-gray-400 rounded-lg transition-colors duration-200"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> Refresh </button><button${ssrIncludeBooleanAttr(unref(loading) || !unref(hasChanges)) ? " disabled" : ""} class="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 text-blue-700 disabled:text-gray-400 rounded-lg transition-colors duration-200"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>`);
      if (unref(loading)) {
        _push(`<span>Saving...</span>`);
      } else {
        _push(`<span>Save All Changes</span>`);
      }
      _push(`</button></div></div></div></nav>`);
      if (unref(message)) {
        _push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"><div class="${ssrRenderClass([
          "p-4 rounded-md",
          unref(messageType) === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
        ])}">${ssrInterpolate(unref(message))}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">`);
      if (unref(loading) && !unref(settings).branding) {
        _push(`<div class="space-y-6"><div class="bg-white rounded-lg shadow-lg p-6"><div class="animate-pulse space-y-4"><div class="h-6 bg-gray-200 rounded w-1/4"></div><div class="space-y-3"><div class="h-4 bg-gray-200 rounded w-full"></div><div class="h-4 bg-gray-200 rounded w-3/4"></div></div></div></div></div>`);
      } else {
        _push(`<div class="space-y-8"><div class="bg-white rounded-lg shadow-lg p-6"><div class="flex items-center mb-6"><div class="p-2 bg-blue-100 rounded-lg mr-4"><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M13 13h4a2 2 0 012 2v4a2 2 0 01-2 2h-4m-6-4h.01M13 13h.01"></path></svg></div><div><h3 class="text-lg font-semibold text-gray-900">Branding Information</h3><p class="text-gray-600">Manage your website&#39;s header logo and company information</p></div></div><div class="space-y-6">`);
        if (unref(settings).branding) {
          _push(`<div><label class="block text-sm font-medium text-gray-700 mb-2">Header Logo</label><div class="flex items-center space-x-6"><div class="flex-shrink-0"><div class="w-32 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">`);
          if (getCurrentLogo()) {
            _push(`<img${ssrRenderAttr("src", getCurrentLogo())} alt="Header Logo" class="max-w-full max-h-full object-contain">`);
          } else {
            _push(`<div class="text-center text-gray-400"><svg class="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span class="text-xs">No logo</span></div>`);
          }
          _push(`</div></div><div class="flex-1"><input type="file" accept="image/*" class="hidden"><button${ssrIncludeBooleanAttr(unref(uploading)) ? " disabled" : ""} class="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 text-blue-700 disabled:text-gray-400 rounded-lg transition-colors duration-200"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>`);
          if (unref(uploading)) {
            _push(`<span>Uploading...</span>`);
          } else {
            _push(`<span>Upload New Logo</span>`);
          }
          _push(`</button><p class="text-xs text-gray-500 mt-1">Recommended: PNG, JPG or SVG. Max 2MB.</p></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(settings).branding) {
          _push(`<div><label class="block text-sm font-medium text-gray-700 mb-2">Company Name</label><input${ssrRenderAttr("value", unref(formData).branding.company_name)} type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter company name"></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(settings).branding) {
          _push(`<div><label class="block text-sm font-medium text-gray-700 mb-2">Company Tagline</label><input${ssrRenderAttr("value", unref(formData).branding.tagline)} type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter company tagline"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="bg-white rounded-lg shadow-lg p-6"><div class="flex items-center mb-6"><div class="p-2 bg-green-100 rounded-lg mr-4"><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div><div><h3 class="text-lg font-semibold text-gray-900">Search Settings</h3><p class="text-gray-600">Configure search functionality in the header</p></div></div><div class="space-y-6">`);
        if (unref(settings).search) {
          _push(`<div><label class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(unref(formData).search.enable_search) ? ssrLooseContain(unref(formData).search.enable_search, null) : unref(formData).search.enable_search) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"><span class="ml-2 text-sm font-medium text-gray-700">Enable Search Bar</span></label></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(settings).search) {
          _push(`<div><label class="block text-sm font-medium text-gray-700 mb-2">Search Placeholder Text</label><input${ssrRenderAttr("value", unref(formData).search.search_placeholder)} type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter search placeholder text"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/header-settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=header-settings-CxUWtMZs.mjs.map
