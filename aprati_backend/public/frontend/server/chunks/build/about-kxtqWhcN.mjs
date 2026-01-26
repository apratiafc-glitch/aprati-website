import { ref, computed, mergeProps, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderStyle } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
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
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    useApi();
    useNotifications();
    const posts = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const saving = ref(false);
    const deleting = ref(false);
    const showCreateModal = ref(false);
    const showEditModal = ref(false);
    const showDeleteModal = ref(false);
    const itemToDelete = ref(null);
    const form = ref({
      title: "",
      description: "",
      image_url: "",
      image_file: null,
      key: "",
      sort_order: 1
    });
    const imagePreview = ref("");
    const uploadProgress = ref(0);
    ref(null);
    computed(() => user.value?.role === "admin");
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50" }, _attrs))} data-v-ca8ddb0f><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-v-ca8ddb0f><div class="mb-8" data-v-ca8ddb0f><div class="flex justify-between items-center" data-v-ca8ddb0f><div data-v-ca8ddb0f><h1 class="text-3xl font-bold text-gray-900" data-v-ca8ddb0f>About Us Management</h1><p class="text-gray-600 mt-2" data-v-ca8ddb0f>Create and manage About Us posts with title and description</p></div><button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium" data-v-ca8ddb0f> Add New Post </button></div></div>`);
      if (loading.value) {
        _push(`<div class="text-center py-12" data-v-ca8ddb0f><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" data-v-ca8ddb0f></div><p class="mt-2 text-gray-600" data-v-ca8ddb0f>Loading posts...</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (error.value) {
        _push(`<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6" data-v-ca8ddb0f>${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value && !error.value) {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-ca8ddb0f><!--[-->`);
        ssrRenderList(posts.value, (post) => {
          _push(`<div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow" data-v-ca8ddb0f><div class="flex justify-between items-start mb-4" data-v-ca8ddb0f><div class="flex-1" data-v-ca8ddb0f>`);
          if (post.image_url) {
            _push(`<div class="mb-3" data-v-ca8ddb0f><img${ssrRenderAttr("src", post.image_url)}${ssrRenderAttr("alt", post.title || post.name)} class="w-16 h-12 object-cover rounded border" data-v-ca8ddb0f></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<h3 class="text-lg font-semibold text-gray-900 mb-2" data-v-ca8ddb0f>${ssrInterpolate(post.title || post.name)}</h3><p class="text-gray-600 text-sm mb-2" data-v-ca8ddb0f>${ssrInterpolate(post.content || post.description)}</p><div class="flex items-center" data-v-ca8ddb0f><span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800" data-v-ca8ddb0f><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ca8ddb0f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" data-v-ca8ddb0f></path></svg> Order: ${ssrInterpolate(post.sort_order || 1)}</span></div></div><div class="flex space-x-2 ml-4" data-v-ca8ddb0f><button class="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-lg" title="Edit" data-v-ca8ddb0f><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ca8ddb0f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-ca8ddb0f></path></svg></button><button class="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg" title="Delete" data-v-ca8ddb0f><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ca8ddb0f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-ca8ddb0f></path></svg></button></div></div><div class="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500" data-v-ca8ddb0f><p data-v-ca8ddb0f>Created: ${ssrInterpolate(formatDate(post.created_at))}</p><p data-v-ca8ddb0f>Updated: ${ssrInterpolate(formatDate(post.updated_at))}</p></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value && !error.value && posts.value.length === 0) {
        _push(`<div class="text-center py-12" data-v-ca8ddb0f><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ca8ddb0f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-ca8ddb0f></path></svg><h3 class="mt-2 text-sm font-medium text-gray-900" data-v-ca8ddb0f>No posts found</h3><p class="mt-1 text-sm text-gray-500" data-v-ca8ddb0f>Get started by creating your first About Us post.</p><div class="mt-6" data-v-ca8ddb0f><button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium" data-v-ca8ddb0f> Add New Post </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (showCreateModal.value || showEditModal.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" data-v-ca8ddb0f><div class="bg-white rounded-lg max-w-2xl w-full" data-v-ca8ddb0f><div class="p-6" data-v-ca8ddb0f><div class="flex justify-between items-center mb-6" data-v-ca8ddb0f><h2 class="text-2xl font-bold text-gray-900" data-v-ca8ddb0f>${ssrInterpolate(showEditModal.value ? "Edit Post" : "Create New Post")}</h2><button class="text-gray-400 hover:text-gray-600" data-v-ca8ddb0f><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ca8ddb0f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-ca8ddb0f></path></svg></button></div><form class="space-y-6" data-v-ca8ddb0f><div data-v-ca8ddb0f><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ca8ddb0f>Title *</label><input${ssrRenderAttr("value", form.value.title)} type="text" placeholder="Enter post title" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required data-v-ca8ddb0f></div><div data-v-ca8ddb0f><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ca8ddb0f>Description *</label><textarea rows="6" placeholder="Enter post description..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required data-v-ca8ddb0f>${ssrInterpolate(form.value.description)}</textarea></div><div data-v-ca8ddb0f><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ca8ddb0f>Display Order</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-ca8ddb0f><option value="1" data-v-ca8ddb0f${ssrIncludeBooleanAttr(Array.isArray(form.value.sort_order) ? ssrLooseContain(form.value.sort_order, "1") : ssrLooseEqual(form.value.sort_order, "1")) ? " selected" : ""}>First (Top Priority)</option><option value="2" data-v-ca8ddb0f${ssrIncludeBooleanAttr(Array.isArray(form.value.sort_order) ? ssrLooseContain(form.value.sort_order, "2") : ssrLooseEqual(form.value.sort_order, "2")) ? " selected" : ""}>Second</option><option value="3" data-v-ca8ddb0f${ssrIncludeBooleanAttr(Array.isArray(form.value.sort_order) ? ssrLooseContain(form.value.sort_order, "3") : ssrLooseEqual(form.value.sort_order, "3")) ? " selected" : ""}>Third</option><option value="4" data-v-ca8ddb0f${ssrIncludeBooleanAttr(Array.isArray(form.value.sort_order) ? ssrLooseContain(form.value.sort_order, "4") : ssrLooseEqual(form.value.sort_order, "4")) ? " selected" : ""}>Fourth</option><option value="5" data-v-ca8ddb0f${ssrIncludeBooleanAttr(Array.isArray(form.value.sort_order) ? ssrLooseContain(form.value.sort_order, "5") : ssrLooseEqual(form.value.sort_order, "5")) ? " selected" : ""}>Fifth</option><option value="10" data-v-ca8ddb0f${ssrIncludeBooleanAttr(Array.isArray(form.value.sort_order) ? ssrLooseContain(form.value.sort_order, "10") : ssrLooseEqual(form.value.sort_order, "10")) ? " selected" : ""}>Lower Priority</option></select><p class="text-xs text-gray-500 mt-1" data-v-ca8ddb0f>Posts with lower numbers appear first on the public page</p></div><div data-v-ca8ddb0f><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ca8ddb0f>Image</label>`);
        if (showEditModal.value && form.value.image_url) {
          _push(`<div class="mb-4" data-v-ca8ddb0f><p class="text-sm text-gray-600 mb-2" data-v-ca8ddb0f>Current Image:</p><div class="relative inline-block" data-v-ca8ddb0f><img${ssrRenderAttr("src", form.value.image_url)} alt="Current image" class="w-32 h-24 object-cover rounded-lg border" data-v-ca8ddb0f><button type="button" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600" data-v-ca8ddb0f> × </button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors" data-v-ca8ddb0f><input type="file" accept="image/*" class="hidden" data-v-ca8ddb0f>`);
        if (!imagePreview.value) {
          _push(`<div class="cursor-pointer" data-v-ca8ddb0f><svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" data-v-ca8ddb0f><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-ca8ddb0f></path></svg><p class="mt-2 text-sm text-gray-600" data-v-ca8ddb0f>Click to upload an image</p><p class="text-xs text-gray-500" data-v-ca8ddb0f>PNG, JPG, GIF up to 2MB</p></div>`);
        } else {
          _push(`<div class="relative" data-v-ca8ddb0f><img${ssrRenderAttr("src", imagePreview.value)} alt="Preview" class="w-32 h-24 object-cover rounded-lg mx-auto" data-v-ca8ddb0f><div class="mt-2 flex justify-center space-x-2" data-v-ca8ddb0f><button type="button" class="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200" data-v-ca8ddb0f> Change </button><button type="button" class="text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200" data-v-ca8ddb0f> Remove </button></div></div>`);
        }
        _push(`</div>`);
        if (uploadProgress.value > 0 && uploadProgress.value < 100) {
          _push(`<div class="mt-2" data-v-ca8ddb0f><div class="bg-gray-200 rounded-full h-2" data-v-ca8ddb0f><div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="${ssrRenderStyle(`width: ${uploadProgress.value}%`)}" data-v-ca8ddb0f></div></div><p class="text-sm text-gray-600 mt-1" data-v-ca8ddb0f>Uploading... ${ssrInterpolate(uploadProgress.value)}%</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex justify-end space-x-4" data-v-ca8ddb0f><button type="button" class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50" data-v-ca8ddb0f> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50" data-v-ca8ddb0f>${ssrInterpolate(saving.value ? "Saving..." : showEditModal.value ? "Update" : "Create")}</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showDeleteModal.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" data-v-ca8ddb0f><div class="bg-white rounded-lg max-w-md w-full" data-v-ca8ddb0f><div class="p-6" data-v-ca8ddb0f><div class="flex items-center mb-4" data-v-ca8ddb0f><div class="bg-red-100 rounded-full p-2 mr-3" data-v-ca8ddb0f><svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ca8ddb0f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" data-v-ca8ddb0f></path></svg></div><h3 class="text-lg font-medium text-gray-900" data-v-ca8ddb0f>Delete Post</h3></div><p class="text-gray-600 mb-6" data-v-ca8ddb0f> Are you sure you want to delete &quot;${ssrInterpolate(itemToDelete.value?.title || itemToDelete.value?.name)}&quot;? This action cannot be undone. </p><div class="flex justify-end space-x-4" data-v-ca8ddb0f><button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50" data-v-ca8ddb0f> Cancel </button><button${ssrIncludeBooleanAttr(deleting.value) ? " disabled" : ""} class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50" data-v-ca8ddb0f>${ssrInterpolate(deleting.value ? "Deleting..." : "Delete")}</button></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const about = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ca8ddb0f"]]);

export { about as default };
//# sourceMappingURL=about-kxtqWhcN.mjs.map
