import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, mergeProps, withCtx, createBlock, openBlock, createVNode, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderDynamicModel } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
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
  __name: "footer-settings",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Footer Settings - Aprati Food Company",
      description: "Manage footer contact information and social media links"
    });
    const loading = ref(true);
    const settings = ref({
      contact: [],
      social: [],
      company: []
    });
    const message = ref("");
    const messageType = ref("success");
    const hasChanges = ref(false);
    const uploadProgress = ref({});
    const getImageUrl = (imagePath) => {
      if (!imagePath) return "";
      if (imagePath.startsWith("http")) return imagePath;
      if (imagePath.startsWith("/storage/")) return `https://sdev.apratifoods.asia${imagePath}`;
      return imagePath;
    };
    const getInputType = (type) => {
      const typeMap = {
        "text": "text",
        "url": "url",
        "email": "email",
        "phone": "tel",
        "textarea": "text"
      };
      return typeMap[type] || "text";
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
      _push(`<h1 class="text-2xl font-bold text-gray-900">Footer Settings</h1></div><div class="flex items-center space-x-4"><button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100 text-gray-700 disabled:text-gray-400 rounded-lg transition-colors duration-200"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> Initialize Defaults </button><button${ssrIncludeBooleanAttr(loading.value || !hasChanges.value) ? " disabled" : ""} class="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 text-blue-700 disabled:text-gray-400 rounded-lg transition-colors duration-200"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>`);
      if (loading.value) {
        _push(`<span>Saving...</span>`);
      } else {
        _push(`<span>Save All Changes</span>`);
      }
      _push(`</button></div></div></div></nav>`);
      if (message.value) {
        _push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"><div class="${ssrRenderClass([
          "p-4 rounded-md",
          messageType.value === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
        ])}">${ssrInterpolate(message.value)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">`);
      if (loading.value && !settings.value.contact) {
        _push(`<div class="space-y-6"><div class="bg-white rounded-lg shadow-lg p-6"><div class="animate-pulse space-y-4"><div class="h-6 bg-gray-200 rounded w-1/4"></div><div class="space-y-3"><div class="h-4 bg-gray-200 rounded w-full"></div><div class="h-4 bg-gray-200 rounded w-3/4"></div></div></div></div></div>`);
      } else {
        _push(`<div class="space-y-8">`);
        if (!settings.value.contact?.length && !settings.value.social?.length && !settings.value.company?.length) {
          _push(`<div class="bg-white rounded-lg shadow-lg p-8 text-center"><div class="max-w-md mx-auto"><svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg><h3 class="text-lg font-semibold text-gray-900 mb-2">No Footer Settings Found</h3><p class="text-gray-600 mb-6"> It looks like footer settings haven&#39;t been set up yet. Click the button below to initialize default settings. </p><button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-200"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> Initialize Footer Settings </button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="bg-white rounded-lg shadow-lg p-6"><div class="flex items-center mb-6"><div class="p-2 bg-blue-100 rounded-lg mr-4"><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div><h2 class="text-xl font-bold text-gray-900">Contact Information</h2></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
        ssrRenderList(settings.value.contact, (setting) => {
          _push(`<div class="space-y-2"><label${ssrRenderAttr("for", `contact-${setting.id}`)} class="block text-sm font-medium text-gray-700">${ssrInterpolate(setting.label)}</label><input${ssrRenderAttr("id", `contact-${setting.id}`)}${ssrRenderDynamicModel(getInputType(setting.type), setting.value, null)}${ssrRenderAttr("type", getInputType(setting.type))} class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"${ssrRenderAttr("placeholder", setting.label)}></div>`);
        });
        _push(`<!--]--></div></div><div class="bg-white rounded-lg shadow-lg p-6"><div class="flex items-center mb-6"><div class="p-2 bg-green-100 rounded-lg mr-4"><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg></div><h2 class="text-xl font-bold text-gray-900">Social Media Links</h2></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
        ssrRenderList(settings.value.social, (setting) => {
          _push(`<div class="space-y-2"><label${ssrRenderAttr("for", `social-${setting.id}`)} class="block text-sm font-medium text-gray-700">${ssrInterpolate(setting.label)}</label><input${ssrRenderAttr("id", `social-${setting.id}`)}${ssrRenderAttr("value", setting.value)} type="url" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"${ssrRenderAttr("placeholder", setting.label)}></div>`);
        });
        _push(`<!--]--></div></div><div class="bg-white rounded-lg shadow-lg p-6"><div class="flex items-center mb-6"><div class="p-2 bg-purple-100 rounded-lg mr-4"><svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg></div><h2 class="text-xl font-bold text-gray-900">Company Information</h2></div><div class="space-y-6"><!--[-->`);
        ssrRenderList(settings.value.company, (setting) => {
          _push(`<div class="space-y-2"><label${ssrRenderAttr("for", `company-${setting.id}`)} class="block text-sm font-medium text-gray-700">${ssrInterpolate(setting.label)}</label>`);
          if (setting.type === "image") {
            _push(`<div class="space-y-4">`);
            if (setting.value) {
              _push(`<div class="flex items-center space-x-4"><div class="flex-shrink-0"><img${ssrRenderAttr("src", getImageUrl(setting.value))}${ssrRenderAttr("alt", setting.label)} class="h-12 w-auto object-contain bg-gray-900 rounded p-2"></div><div class="flex-1"><p class="text-sm text-gray-600">Current: ${ssrInterpolate(setting.value)}</p></div></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"><input${ssrRenderAttr("id", `company-${setting.id}`)} type="file" accept="image/*" class="hidden"><label${ssrRenderAttr("for", `company-${setting.id}`)} class="cursor-pointer flex flex-col items-center space-y-2"><svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span class="text-sm text-gray-600"> Click to upload new ${ssrInterpolate(setting.label.toLowerCase())}</span><span class="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</span></label></div>`);
            if (uploadProgress.value[setting.id]) {
              _push(`<div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="${ssrRenderStyle(`width: ${uploadProgress.value[setting.id]}%`)}"></div></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else if (setting.type === "textarea") {
            _push(`<textarea${ssrRenderAttr("id", `company-${setting.id}`)} rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"${ssrRenderAttr("placeholder", setting.label)}>${ssrInterpolate(setting.value)}</textarea>`);
          } else {
            _push(`<input${ssrRenderAttr("id", `company-${setting.id}`)}${ssrRenderDynamicModel(getInputType(setting.type), setting.value, null)}${ssrRenderAttr("type", getInputType(setting.type))} class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"${ssrRenderAttr("placeholder", setting.label)}>`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div></div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/footer-settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=footer-settings-lVMUhUt9.mjs.map
