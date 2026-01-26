import { ref, computed, watch, mergeProps, unref, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrLooseContain, ssrLooseEqual } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { u as useAuth } from './useAuth-GvylWPw3.mjs';
import { u as useApi } from './useApi-CO9TAo9a.mjs';
import { u as useNotifications } from './useNotifications-DEaDkXXH.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './server.mjs';
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
import './cookie-D4T41UgU.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/cookie-es/dist/index.mjs';

const _sfc_main = {
  __name: "privacy",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    const api = useApi();
    useNotifications();
    const sections = ref([]);
    const originalSections = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const saving = ref(false);
    computed(() => user.value?.role === "admin");
    watch(sections, (newSections) => {
      newSections.forEach((section, index) => {
        if (!section.is_new && originalSections.value[index]) {
          const original = originalSections.value[index];
          section.has_changes = section.title !== original.title || section.content !== original.content || section.is_active !== original.is_active || section.sort_order !== original.sort_order;
        }
      });
    }, { deep: true });
    const formatDate = (dateString) => {
      if (!dateString) return "Not saved yet";
      return new Date(dateString).toLocaleString();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50" }, _attrs))} data-v-01494b1e><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-v-01494b1e><div class="mb-8" data-v-01494b1e><div class="mb-4 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded" data-v-01494b1e><div class="flex items-center" data-v-01494b1e><svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-01494b1e><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" data-v-01494b1e></path></svg><span class="font-medium" data-v-01494b1e>Development Mode:</span><span class="ml-1" data-v-01494b1e>Auto-authentication enabled for testing. Valid admin token will be applied automatically.</span></div></div><div class="flex justify-between items-center" data-v-01494b1e><div data-v-01494b1e><h1 class="text-3xl font-bold text-gray-900" data-v-01494b1e>Privacy Policy Management</h1><p class="text-gray-600 mt-2" data-v-01494b1e>Manage all privacy policy sections in one place</p><div class="mt-2 flex items-center space-x-4" data-v-01494b1e>`);
      if (unref(api).utils.isAuthenticated()) {
        _push(`<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800" data-v-01494b1e> ✅ Authenticated as ${ssrInterpolate(unref(api).utils.getCurrentUser()?.name || "Admin")}</span>`);
      } else {
        _push(`<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800" data-v-01494b1e> ❌ Not Authenticated - Please log in first </span>`);
      }
      if (unref(api).utils.isAdmin()) {
        _push(`<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800" data-v-01494b1e> 👑 Admin Role </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer" data-v-01494b1e> 🚪 Logout &amp; Clear Auth </button></div></div><div class="flex space-x-3" data-v-01494b1e><button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium" data-v-01494b1e> Add New Section </button><button${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50" data-v-01494b1e>${ssrInterpolate(saving.value ? "Saving..." : "Save All Changes")}</button></div></div></div>`);
      if (loading.value) {
        _push(`<div class="text-center py-12" data-v-01494b1e><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" data-v-01494b1e></div><p class="mt-2 text-gray-600" data-v-01494b1e>Loading privacy sections...</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (error.value) {
        _push(`<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6" data-v-01494b1e>${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value && !error.value) {
        _push(`<div class="space-y-6" data-v-01494b1e><!--[-->`);
        ssrRenderList(sections.value, (section, index) => {
          _push(`<div class="${ssrRenderClass([section.is_new ? "border-l-green-500" : "border-l-blue-500", "bg-white rounded-lg shadow-md p-6 border-l-4"])}" data-v-01494b1e><div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-01494b1e><div class="lg:col-span-1" data-v-01494b1e><label class="block text-sm font-medium text-gray-700 mb-2" data-v-01494b1e>Section Title</label><input${ssrRenderAttr("value", section.title)} type="text" placeholder="e.g., Information We Collect" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" data-v-01494b1e><label class="block text-sm font-medium text-gray-700 mb-2" data-v-01494b1e>Display Order</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" data-v-01494b1e><option value="1" data-v-01494b1e${ssrIncludeBooleanAttr(Array.isArray(section.sort_order) ? ssrLooseContain(section.sort_order, "1") : ssrLooseEqual(section.sort_order, "1")) ? " selected" : ""}>First (Top Priority)</option><option value="2" data-v-01494b1e${ssrIncludeBooleanAttr(Array.isArray(section.sort_order) ? ssrLooseContain(section.sort_order, "2") : ssrLooseEqual(section.sort_order, "2")) ? " selected" : ""}>Second</option><option value="3" data-v-01494b1e${ssrIncludeBooleanAttr(Array.isArray(section.sort_order) ? ssrLooseContain(section.sort_order, "3") : ssrLooseEqual(section.sort_order, "3")) ? " selected" : ""}>Third</option><option value="4" data-v-01494b1e${ssrIncludeBooleanAttr(Array.isArray(section.sort_order) ? ssrLooseContain(section.sort_order, "4") : ssrLooseEqual(section.sort_order, "4")) ? " selected" : ""}>Fourth</option><option value="5" data-v-01494b1e${ssrIncludeBooleanAttr(Array.isArray(section.sort_order) ? ssrLooseContain(section.sort_order, "5") : ssrLooseEqual(section.sort_order, "5")) ? " selected" : ""}>Fifth</option><option value="10" data-v-01494b1e${ssrIncludeBooleanAttr(Array.isArray(section.sort_order) ? ssrLooseContain(section.sort_order, "10") : ssrLooseEqual(section.sort_order, "10")) ? " selected" : ""}>Lower Priority</option></select><label class="block text-sm font-medium text-gray-700 mb-2" data-v-01494b1e>Language</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" data-v-01494b1e><option value="en" data-v-01494b1e${ssrIncludeBooleanAttr(Array.isArray(section.language) ? ssrLooseContain(section.language, "en") : ssrLooseEqual(section.language, "en")) ? " selected" : ""}>English</option><option value="km" data-v-01494b1e${ssrIncludeBooleanAttr(Array.isArray(section.language) ? ssrLooseContain(section.language, "km") : ssrLooseEqual(section.language, "km")) ? " selected" : ""}>ខ្មែរ (Khmer)</option></select><div class="flex items-center justify-between" data-v-01494b1e><label class="flex items-center" data-v-01494b1e><input${ssrIncludeBooleanAttr(Array.isArray(section.is_active) ? ssrLooseContain(section.is_active, null) : section.is_active) ? " checked" : ""} type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2" data-v-01494b1e><span class="text-sm text-gray-900" data-v-01494b1e>Active</span></label><button class="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg text-sm" title="Delete Section" data-v-01494b1e><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-01494b1e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-01494b1e></path></svg></button></div></div><div class="lg:col-span-2" data-v-01494b1e><label class="block text-sm font-medium text-gray-700 mb-2" data-v-01494b1e>Content</label><textarea rows="8" placeholder="Enter the privacy policy section content..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-01494b1e>${ssrInterpolate(section.content)}</textarea><div class="flex items-center mt-3 space-x-3" data-v-01494b1e>`);
          if (section.is_new) {
            _push(`<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800" data-v-01494b1e> New Section </span>`);
          } else if (section.has_changes) {
            _push(`<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800" data-v-01494b1e> Modified </span>`);
          } else {
            _push(`<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800" data-v-01494b1e> Saved </span>`);
          }
          if (section.created_at) {
            _push(`<span class="text-xs text-gray-500" data-v-01494b1e> Created: ${ssrInterpolate(formatDate(section.created_at))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div></div>`);
        });
        _push(`<!--]-->`);
        if (sections.value.length === 0) {
          _push(`<div class="text-center py-12 bg-white rounded-lg shadow-md" data-v-01494b1e><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-01494b1e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-01494b1e></path></svg><h3 class="mt-2 text-sm font-medium text-gray-900" data-v-01494b1e>No sections found</h3><p class="mt-1 text-sm text-gray-500" data-v-01494b1e>Get started by creating your first privacy policy section.</p><div class="mt-6" data-v-01494b1e><button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium" data-v-01494b1e> Add New Section </button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value && !error.value && sections.value.length > 0) {
        _push(`<div class="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 border" data-v-01494b1e><div class="flex items-center space-x-3" data-v-01494b1e><span class="text-sm text-gray-600" data-v-01494b1e>${ssrInterpolate(sections.value.length)} section(s)</span><button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm" data-v-01494b1e> Add New </button><button${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm disabled:opacity-50" data-v-01494b1e>${ssrInterpolate(saving.value ? "Saving..." : "Save All")}</button></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/privacy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const privacy = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-01494b1e"]]);

export { privacy as default };
//# sourceMappingURL=privacy-C1tgBrTZ.mjs.map
