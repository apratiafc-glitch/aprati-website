import { ref, mergeProps, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { a as useSeoMeta } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/ofetch/dist/node.mjs';
import '../_/nitro.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/h3/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/ufo/dist/index.mjs';
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
  __name: "favicon",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Favicon Management - Aprati Food Company",
      description: "Manage your website favicon settings and upload custom favicon images."
    });
    const settings = ref([]);
    const currentFavicon = ref({
      primary_favicon: "/images/web.ico",
      title: "Aprati Foods Cambodia",
      description: "Premium Quality Food Products"
    });
    const loading = ref(false);
    const message = ref("");
    const messageType = ref("");
    const uploading = ref({});
    const showPreviewModal = ref(false);
    const getImageUrl = (path) => {
      if (path.startsWith("/storage/")) {
        return `http://127.0.0.1:8000${path}`;
      }
      if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
      }
      return path;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50" }, _attrs))} data-v-f974d45e><div class="favicon-management" data-v-f974d45e><div class="mb-6" data-v-f974d45e><h1 class="text-2xl font-bold text-gray-900 mb-2" data-v-f974d45e>Favicon Management</h1><p class="text-gray-600" data-v-f974d45e>Manage your website&#39;s favicon settings and upload custom favicon images.</p></div><div class="bg-white rounded-lg shadow-sm border p-6 mb-6" data-v-f974d45e><div class="flex justify-between items-center mb-4" data-v-f974d45e><h2 class="text-lg font-semibold text-gray-900" data-v-f974d45e>Current Favicon Preview</h2><div class="flex items-center space-x-2" data-v-f974d45e><span class="${ssrRenderClass([
        "px-2 py-1 text-xs rounded-full",
        settings.value.length > 0 ? "bg-green-100 text-green-800" : loading.value ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
      ])}" data-v-f974d45e>${ssrInterpolate(settings.value.length > 0 ? `${settings.value.length} settings` : loading.value ? "Loading..." : "No settings")}</span><div class="flex space-x-2" data-v-f974d45e><button class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-f974d45e><svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f974d45e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-f974d45e></path></svg> Refresh </button><button class="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200 transition-colors" data-v-f974d45e><svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f974d45e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-f974d45e></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-f974d45e></path></svg> Preview </button><button class="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-lg hover:bg-yellow-200 transition-colors" title="Debug settings (check console)" data-v-f974d45e><svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f974d45e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-f974d45e></path></svg> Debug </button></div></div></div><div class="flex items-center space-x-4" data-v-f974d45e><div class="flex-shrink-0" data-v-f974d45e><img${ssrRenderAttr("src", currentFavicon.value.primary_favicon)} alt="Primary Favicon" class="w-16 h-16 border rounded-full" data-v-f974d45e></div><div class="flex-1" data-v-f974d45e><h3 class="text-sm font-medium text-gray-900" data-v-f974d45e>Primary Favicon</h3><p class="text-sm text-gray-500" data-v-f974d45e>${ssrInterpolate(currentFavicon.value.title)}</p><p class="text-xs text-gray-400 mt-1" data-v-f974d45e>${ssrInterpolate(currentFavicon.value.primary_favicon)}</p></div><div class="flex-shrink-0" data-v-f974d45e><button${ssrIncludeBooleanAttr(loading.value || settings.value.length === 0) ? " disabled" : ""} class="px-4 py-2 bg-green-100 text-green-700 text-sm rounded-lg hover:bg-green-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors" data-v-f974d45e><svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f974d45e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-f974d45e></path></svg> ${ssrInterpolate(loading.value ? "Loading..." : "Edit")}</button></div></div></div><div class="bg-white rounded-lg shadow-sm border p-6" data-v-f974d45e><div class="flex justify-between items-center mb-4" data-v-f974d45e><h2 class="text-lg font-semibold text-gray-900" data-v-f974d45e>Favicon Settings</h2><div class="flex space-x-2" data-v-f974d45e><button class="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-f974d45e><svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f974d45e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-f974d45e></path></svg> Save All Changes </button><button class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-f974d45e> Initialize Defaults </button></div></div>`);
      if (settings.value.length > 0) {
        _push(`<div class="space-y-4" data-v-f974d45e><!--[-->`);
        ssrRenderList(settings.value, (setting) => {
          _push(`<div${ssrRenderAttr("data-setting-key", setting.key)} class="border rounded-lg p-4" data-v-f974d45e><div class="flex items-start justify-between" data-v-f974d45e><div class="flex-1" data-v-f974d45e><label class="block text-sm font-medium text-gray-700 mb-1" data-v-f974d45e>${ssrInterpolate(setting.label)}</label>`);
          if (setting.type === "image") {
            _push(`<div class="space-y-2" data-v-f974d45e><div class="flex items-center space-x-3" data-v-f974d45e>`);
            if (setting.value) {
              _push(`<img${ssrRenderAttr("src", getImageUrl(setting.value))} alt="Current image" class="w-12 h-12 border rounded-full" data-v-f974d45e>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="flex-1" data-v-f974d45e><input type="file" accept="image/*,.ico" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"${ssrIncludeBooleanAttr(uploading.value[setting.key]) ? " disabled" : ""} data-v-f974d45e></div></div><p class="text-xs text-gray-500" data-v-f974d45e>Current: ${ssrInterpolate(setting.value)}</p></div>`);
          } else if (setting.type === "text" || setting.type === "textarea") {
            _push(`<div data-v-f974d45e>`);
            if (setting.type === "text") {
              _push(`<input${ssrRenderAttr("value", setting.value)} class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"${ssrRenderAttr("placeholder", setting.label)} data-v-f974d45e>`);
            } else {
              _push(`<textarea rows="3" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"${ssrRenderAttr("placeholder", setting.label)} data-v-f974d45e>${ssrInterpolate(setting.value)}</textarea>`);
            }
            _push(`</div>`);
          } else if (setting.type === "boolean") {
            _push(`<div class="flex items-center" data-v-f974d45e><input type="checkbox"${ssrIncludeBooleanAttr(setting.value === "true" || setting.value === "1") ? " checked" : ""} class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" data-v-f974d45e><span class="ml-2 text-sm text-gray-600" data-v-f974d45e>Enable ${ssrInterpolate(setting.label.toLowerCase())}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="ml-4 flex flex-col space-y-2" data-v-f974d45e><button class="${ssrRenderClass([
            "px-3 py-1 text-xs rounded-full transition-colors",
            setting.is_active ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          ])}" data-v-f974d45e>${ssrInterpolate(setting.is_active ? "Active" : "Inactive")}</button><button class="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors" data-v-f974d45e> Edit </button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (loading.value) {
        _push(`<div class="text-center py-8" data-v-f974d45e><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" data-v-f974d45e></div><p class="text-gray-500 mt-2" data-v-f974d45e>Loading favicon settings...</p></div>`);
      } else {
        _push(`<div class="text-center py-8" data-v-f974d45e><p class="text-gray-500" data-v-f974d45e>No favicon settings found. Click &quot;Initialize Defaults&quot; to create default settings.</p></div>`);
      }
      _push(`</div>`);
      if (message.value) {
        _push(`<div class="${ssrRenderClass([
          "mt-4 p-4 rounded-lg",
          messageType.value === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
        ])}" data-v-f974d45e>${ssrInterpolate(message.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (showPreviewModal.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-f974d45e><div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" data-v-f974d45e><div class="p-6" data-v-f974d45e><div class="flex justify-between items-center mb-6" data-v-f974d45e><h3 class="text-xl font-semibold text-gray-900" data-v-f974d45e>Favicon Preview</h3><button class="text-gray-400 hover:text-gray-600" data-v-f974d45e><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f974d45e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-f974d45e></path></svg></button></div><div class="space-y-6" data-v-f974d45e><div class="border rounded-lg p-4" data-v-f974d45e><h4 class="text-sm font-medium text-gray-700 mb-3" data-v-f974d45e>Browser Tab Preview</h4><div class="bg-gray-100 rounded-t-lg p-2 flex items-center space-x-2" data-v-f974d45e><img${ssrRenderAttr("src", currentFavicon.value.primary_favicon)} alt="Favicon" class="w-4 h-4 rounded-full" data-v-f974d45e><span class="text-xs text-gray-600" data-v-f974d45e>${ssrInterpolate(currentFavicon.value.title)}</span></div><div class="bg-white border-x border-b rounded-b-lg p-4" data-v-f974d45e><div class="h-32 bg-gray-50 rounded flex items-center justify-center" data-v-f974d45e><span class="text-gray-500 text-sm" data-v-f974d45e>Website Content Preview</span></div></div></div><div class="border rounded-lg p-4" data-v-f974d45e><h4 class="text-sm font-medium text-gray-700 mb-3" data-v-f974d45e>Bookmark Preview</h4><div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg" data-v-f974d45e><img${ssrRenderAttr("src", currentFavicon.value.primary_favicon)} alt="Favicon" class="w-6 h-6 rounded-full" data-v-f974d45e><div data-v-f974d45e><div class="text-sm font-medium text-gray-900" data-v-f974d45e>${ssrInterpolate(currentFavicon.value.title)}</div><div class="text-xs text-gray-500" data-v-f974d45e>bookmarked</div></div></div></div><div class="border rounded-lg p-4" data-v-f974d45e><h4 class="text-sm font-medium text-gray-700 mb-3" data-v-f974d45e>Different Sizes</h4><div class="flex items-center space-4" data-v-f974d45e><div class="text-center" data-v-f974d45e><img${ssrRenderAttr("src", currentFavicon.value.primary_favicon)} alt="16x16" class="w-4 h-4 mx-auto mb-1 border rounded-full" data-v-f974d45e><span class="text-xs text-gray-500" data-v-f974d45e>16x16</span></div><div class="text-center ml-4" data-v-f974d45e><img${ssrRenderAttr("src", currentFavicon.value.primary_favicon)} alt="32x32" class="w-8 h-8 mx-auto mb-1 border rounded-full" data-v-f974d45e><span class="text-xs text-gray-500" data-v-f974d45e>32x32</span></div><div class="text-center ml-4" data-v-f974d45e><img${ssrRenderAttr("src", currentFavicon.value.primary_favicon)} alt="64x64" class="w-16 h-16 mx-auto mb-1 border rounded-full" data-v-f974d45e><span class="text-xs text-gray-500" data-v-f974d45e>64x64</span></div></div></div></div><div class="mt-6 flex justify-end" data-v-f974d45e><button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors" data-v-f974d45e> Close </button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/favicon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const favicon = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f974d45e"]]);

export { favicon as default };
//# sourceMappingURL=favicon-C3HLfxsZ.mjs.map
