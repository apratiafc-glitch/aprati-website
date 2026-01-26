import { ref, computed, mergeProps, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderAttr } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { u as useAuth } from './useAuth-GvylWPw3.mjs';
import { u as useApi } from './useApi-CO9TAo9a.mjs';
import { u as useToast } from './useToast-BHiNW5Rt.mjs';
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
  __name: "about-content",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    const { api } = useApi();
    useToast();
    const content = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const saving = ref(false);
    const deleting = ref(false);
    const initializing = ref(false);
    const showCreateModal = ref(false);
    const showEditModal = ref(false);
    const showDeleteModal = ref(false);
    const itemToDelete = ref(null);
    const form = ref({
      key: "",
      title: "",
      content: "",
      metadata: {}
    });
    const metadataJson = ref("");
    const metadataError = ref("");
    computed(() => user.value?.role === "admin");
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50" }, _attrs))} data-v-a813c3b5><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-v-a813c3b5><div class="mb-8" data-v-a813c3b5><div class="flex justify-between items-center" data-v-a813c3b5><div data-v-a813c3b5><h1 class="text-3xl font-bold text-gray-900" data-v-a813c3b5>About Content Management</h1><p class="text-gray-600 mt-2" data-v-a813c3b5>Manage all content sections for the About page</p></div><div class="flex space-x-4" data-v-a813c3b5><button${ssrIncludeBooleanAttr(initializing.value) ? " disabled" : ""} class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50" data-v-a813c3b5>${ssrInterpolate(initializing.value ? "Initializing..." : "Initialize Defaults")}</button><button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium" data-v-a813c3b5> Add New Section </button></div></div></div>`);
      if (loading.value) {
        _push(`<div class="text-center py-12" data-v-a813c3b5><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" data-v-a813c3b5></div><p class="mt-2 text-gray-600" data-v-a813c3b5>Loading content...</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (error.value) {
        _push(`<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6" data-v-a813c3b5>${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value && !error.value) {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-a813c3b5><!--[-->`);
        ssrRenderList(content.value, (item) => {
          _push(`<div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow" data-v-a813c3b5><div class="flex justify-between items-start mb-4" data-v-a813c3b5><div class="flex-1" data-v-a813c3b5><h3 class="text-lg font-semibold text-gray-900 mb-1" data-v-a813c3b5>${ssrInterpolate(item.title)}</h3><p class="text-sm text-gray-500 mb-2" data-v-a813c3b5>Key: ${ssrInterpolate(item.key)}</p><p class="text-gray-600 text-sm line-clamp-3" data-v-a813c3b5>${ssrInterpolate(item.content)}</p></div><div class="flex space-x-2 ml-4" data-v-a813c3b5><button class="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-lg" title="Edit" data-v-a813c3b5><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a813c3b5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-a813c3b5></path></svg></button><button class="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg" title="Delete" data-v-a813c3b5><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a813c3b5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-a813c3b5></path></svg></button></div></div>`);
          if (item.metadata && Object.keys(item.metadata).length > 0) {
            _push(`<div class="mt-4 p-3 bg-gray-50 rounded" data-v-a813c3b5><p class="text-xs text-gray-500 mb-2" data-v-a813c3b5>Metadata:</p><pre class="text-xs text-gray-600 overflow-x-auto" data-v-a813c3b5>${ssrInterpolate(JSON.stringify(item.metadata, null, 2))}</pre></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500" data-v-a813c3b5><p data-v-a813c3b5>Created: ${ssrInterpolate(formatDate(item.created_at))}</p><p data-v-a813c3b5>Updated: ${ssrInterpolate(formatDate(item.updated_at))}</p></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value && !error.value && content.value.length === 0) {
        _push(`<div class="text-center py-12" data-v-a813c3b5><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a813c3b5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-a813c3b5></path></svg><h3 class="mt-2 text-sm font-medium text-gray-900" data-v-a813c3b5>No content found</h3><p class="mt-1 text-sm text-gray-500" data-v-a813c3b5>Get started by creating your first content section.</p><div class="mt-6" data-v-a813c3b5><button${ssrIncludeBooleanAttr(initializing.value) ? " disabled" : ""} class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50" data-v-a813c3b5>${ssrInterpolate(initializing.value ? "Initializing..." : "Initialize Default Content")}</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (showCreateModal.value || showEditModal.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" data-v-a813c3b5><div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" data-v-a813c3b5><div class="p-6" data-v-a813c3b5><div class="flex justify-between items-center mb-6" data-v-a813c3b5><h2 class="text-2xl font-bold text-gray-900" data-v-a813c3b5>${ssrInterpolate(showEditModal.value ? "Edit Content" : "Create New Content")}</h2><button class="text-gray-400 hover:text-gray-600" data-v-a813c3b5><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a813c3b5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-a813c3b5></path></svg></button></div><form class="space-y-6" data-v-a813c3b5><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-a813c3b5><div data-v-a813c3b5><label class="block text-sm font-medium text-gray-700 mb-2" data-v-a813c3b5>Key *</label><input${ssrRenderAttr("value", form.value.key)} type="text"${ssrIncludeBooleanAttr(showEditModal.value) ? " disabled" : ""} placeholder="e.g., company_overview, mission, value_quality" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" required data-v-a813c3b5><p class="text-xs text-gray-500 mt-1" data-v-a813c3b5>Unique identifier for this content section</p></div><div data-v-a813c3b5><label class="block text-sm font-medium text-gray-700 mb-2" data-v-a813c3b5>Title *</label><input${ssrRenderAttr("value", form.value.title)} type="text" placeholder="Content title" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required data-v-a813c3b5></div></div><div data-v-a813c3b5><label class="block text-sm font-medium text-gray-700 mb-2" data-v-a813c3b5>Content *</label><textarea rows="8" placeholder="Enter the content text..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required data-v-a813c3b5>${ssrInterpolate(form.value.content)}</textarea></div><div data-v-a813c3b5><label class="block text-sm font-medium text-gray-700 mb-2" data-v-a813c3b5>Metadata (JSON)</label><textarea rows="6" placeholder="{&quot;icon&quot;: &quot;check-circle&quot;, &quot;stats&quot;: [{&quot;label&quot;: &quot;Years&quot;, &quot;value&quot;: &quot;10+&quot;}]}" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm" data-v-a813c3b5>${ssrInterpolate(metadataJson.value)}</textarea><p class="text-xs text-gray-500 mt-1" data-v-a813c3b5>Optional JSON metadata for additional configuration</p>`);
        if (metadataError.value) {
          _push(`<div class="text-red-600 text-xs mt-1" data-v-a813c3b5>${ssrInterpolate(metadataError.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex justify-end space-x-4" data-v-a813c3b5><button type="button" class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50" data-v-a813c3b5> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50" data-v-a813c3b5>${ssrInterpolate(saving.value ? "Saving..." : showEditModal.value ? "Update" : "Create")}</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showDeleteModal.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" data-v-a813c3b5><div class="bg-white rounded-lg max-w-md w-full" data-v-a813c3b5><div class="p-6" data-v-a813c3b5><div class="flex items-center mb-4" data-v-a813c3b5><div class="bg-red-100 rounded-full p-2 mr-3" data-v-a813c3b5><svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a813c3b5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" data-v-a813c3b5></path></svg></div><h3 class="text-lg font-medium text-gray-900" data-v-a813c3b5>Delete Content</h3></div><p class="text-gray-600 mb-6" data-v-a813c3b5> Are you sure you want to delete &quot;${ssrInterpolate(itemToDelete.value?.title)}&quot;? This action cannot be undone. </p><div class="flex justify-end space-x-4" data-v-a813c3b5><button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50" data-v-a813c3b5> Cancel </button><button${ssrIncludeBooleanAttr(deleting.value) ? " disabled" : ""} class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50" data-v-a813c3b5>${ssrInterpolate(deleting.value ? "Deleting..." : "Delete")}</button></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/about-content.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const aboutContent = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a813c3b5"]]);

export { aboutContent as default };
//# sourceMappingURL=about-content-D6ZihyEo.mjs.map
