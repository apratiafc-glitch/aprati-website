import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, computed, resolveDirective, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderStyle, ssrGetDirectiveProps } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { debounce } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/lodash-es/lodash.js';
import { u as useApi } from './useApi-CO9TAo9a.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
import './cookie-D4T41UgU.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/cookie-es/dist/index.mjs';

const _sfc_main = {
  __name: "categories",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(true);
    const showModal = ref(false);
    const showDeleteModal = ref(false);
    const isEditing = ref(false);
    const saving = ref(false);
    const deleting = ref(false);
    const categoryToDelete = ref(null);
    const activeDropdown = ref(null);
    const notification = ref({
      show: false,
      type: "success",
      message: "",
      timeout: null
    });
    const categories2 = ref([]);
    const stats = ref({});
    const filters = ref({
      search: "",
      type: "",
      status: ""
    });
    const categoryForm = ref({
      id: null,
      name: "",
      slug: "",
      description: "",
      parent_id: "",
      color: "#3B82F6",
      sort_order: 0,
      is_active: true,
      is_featured: false
    });
    const mainCategories = computed(() => {
      return categories2.value.filter((cat) => !cat.parent_id);
    });
    const loadCategories = async () => {
      loading.value = true;
      try {
        const api = useApi();
        const params = new URLSearchParams();
        Object.keys(filters.value).forEach((key) => {
          if (filters.value[key] !== "" && filters.value[key] !== null) {
            params.append(key, filters.value[key]);
          }
        });
        const response = await api.request(`/admin/categories?${params.toString()}`);
        if (response.success && response.data) {
          categories2.value = response.data.categories || [];
        } else {
          console.error("API Error:", response.error);
          categories2.value = [];
        }
      } catch (error) {
        console.error("Failed to load categories:", error);
        categories2.value = [];
      } finally {
        loading.value = false;
      }
    };
    debounce(() => {
      loadCategories();
    }, 500);
    const truncateText = (text, length) => {
      if (!text) return "";
      return text.length > length ? text.substring(0, length) + "..." : text;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _directive_else34 = resolveDirective('else"');
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))} data-v-958fcac0><nav class="bg-white shadow-sm" data-v-958fcac0><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-958fcac0><div class="flex justify-between items-center h-16" data-v-958fcac0><div class="flex items-center space-x-4" data-v-958fcac0>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: "text-blue-600 hover:text-blue-800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ← Back to Dashboard `);
          } else {
            return [
              createTextVNode(" ← Back to Dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="text-2xl font-bold text-gray-900" data-v-958fcac0>Category Management</h1></div><div class="flex items-center space-x-4" data-v-958fcac0>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/products",
        class: "text-gray-600 hover:text-gray-800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Products `);
          } else {
            return [
              createTextVNode(" Products ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 text-blue-700 disabled:text-gray-400 rounded-lg transition-colors duration-200" data-v-958fcac0><svg class="${ssrRenderClass([{ "animate-spin": unref(loading) }, "w-4 h-4 mr-2"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-958fcac0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-958fcac0></path></svg>`);
      if (unref(loading)) {
        _push(`<span data-v-958fcac0>Loading...</span>`);
      } else {
        _push(`<span data-v-958fcac0>Refresh</span>`);
      }
      _push(`</button><span class="text-gray-600" data-v-958fcac0>Welcome, Admin</span><button class="text-red-600 hover:text-red-800" data-v-958fcac0>Logout</button></div></div></div></nav><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-v-958fcac0><div class="bg-white rounded-lg shadow-lg p-6 mb-8" data-v-958fcac0><div class="flex justify-between items-center" data-v-958fcac0><div data-v-958fcac0><h2 class="text-2xl font-bold text-gray-900 mb-2" data-v-958fcac0>Category Management</h2><p class="text-gray-600" data-v-958fcac0>Organize your products with custom categories</p></div><button class="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors" data-v-958fcac0><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-958fcac0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-958fcac0></path></svg> Add New Category </button></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" data-v-958fcac0><div class="bg-white rounded-lg shadow-lg p-6" data-v-958fcac0><div class="flex items-center" data-v-958fcac0><div class="p-3 rounded-full bg-blue-100" data-v-958fcac0><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-958fcac0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" data-v-958fcac0></path></svg></div><div class="ml-4" data-v-958fcac0><p class="text-sm font-medium text-gray-600" data-v-958fcac0>Total Categories</p><p class="text-2xl font-semibold text-gray-900" data-v-958fcac0>`);
      if (unref(loading)) {
        _push(`<span class="animate-pulse bg-gray-200 rounded w-8 h-8 inline-block" data-v-958fcac0></span>`);
      } else {
        _push(`<span data-v-958fcac0>${ssrInterpolate(unref(stats).total_categories || 0)}</span>`);
      }
      _push(`</p></div></div></div><div class="bg-white rounded-lg shadow-lg p-6" data-v-958fcac0><div class="flex items-center" data-v-958fcac0><div class="p-3 rounded-full bg-green-100" data-v-958fcac0><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-958fcac0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-958fcac0></path></svg></div><div class="ml-4" data-v-958fcac0><p class="text-sm font-medium text-gray-600" data-v-958fcac0>Active Categories</p><p class="text-2xl font-semibold text-gray-900" data-v-958fcac0>`);
      if (unref(loading)) {
        _push(`<span class="animate-pulse bg-gray-200 rounded w-8 h-8 inline-block" data-v-958fcac0></span>`);
      } else {
        _push(`<span data-v-958fcac0>${ssrInterpolate(unref(stats).active_categories || 0)}</span>`);
      }
      _push(`</p></div></div></div><div class="bg-white rounded-lg shadow-lg p-6" data-v-958fcac0><div class="flex items-center" data-v-958fcac0><div class="p-3 rounded-full bg-purple-100" data-v-958fcac0><svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-958fcac0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" data-v-958fcac0></path></svg></div><div class="ml-4" data-v-958fcac0><p class="text-sm font-medium text-gray-600" data-v-958fcac0>Products Using Categories</p><p class="text-2xl font-semibold text-gray-900" data-v-958fcac0>`);
      if (unref(loading)) {
        _push(`<span class="animate-pulse bg-gray-200 rounded w-8 h-8 inline-block" data-v-958fcac0></span>`);
      } else {
        _push(`<span data-v-958fcac0>${ssrInterpolate(unref(stats).products_with_categories || 0)}</span>`);
      }
      _push(`</p></div></div></div></div><div class="bg-white rounded-lg shadow-lg p-6 mb-8" data-v-958fcac0><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-958fcac0><div data-v-958fcac0><label class="block text-gray-700 text-sm font-medium mb-2" data-v-958fcac0>Search Categories</label><input${ssrRenderAttr("value", unref(filters).search)} type="text" placeholder="Search by name or description..." class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-958fcac0></div><div data-v-958fcac0><label class="block text-gray-700 text-sm font-medium mb-2" data-v-958fcac0>Category Type</label><select class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-958fcac0><option value="" data-v-958fcac0${ssrIncludeBooleanAttr(Array.isArray(unref(filters).type) ? ssrLooseContain(unref(filters).type, "") : ssrLooseEqual(unref(filters).type, "")) ? " selected" : ""}>All Types</option><option value="main" data-v-958fcac0${ssrIncludeBooleanAttr(Array.isArray(unref(filters).type) ? ssrLooseContain(unref(filters).type, "main") : ssrLooseEqual(unref(filters).type, "main")) ? " selected" : ""}>Main Category</option><option value="sub" data-v-958fcac0${ssrIncludeBooleanAttr(Array.isArray(unref(filters).type) ? ssrLooseContain(unref(filters).type, "sub") : ssrLooseEqual(unref(filters).type, "sub")) ? " selected" : ""}>Subcategory</option></select></div><div data-v-958fcac0><label class="block text-gray-700 text-sm font-medium mb-2" data-v-958fcac0>Status</label><select class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-958fcac0><option value="" data-v-958fcac0${ssrIncludeBooleanAttr(Array.isArray(unref(filters).status) ? ssrLooseContain(unref(filters).status, "") : ssrLooseEqual(unref(filters).status, "")) ? " selected" : ""}>All Status</option><option value="active" data-v-958fcac0${ssrIncludeBooleanAttr(Array.isArray(unref(filters).status) ? ssrLooseContain(unref(filters).status, "active") : ssrLooseEqual(unref(filters).status, "active")) ? " selected" : ""}>Active</option><option value="inactive" data-v-958fcac0${ssrIncludeBooleanAttr(Array.isArray(unref(filters).status) ? ssrLooseContain(unref(filters).status, "inactive") : ssrLooseEqual(unref(filters).status, "inactive")) ? " selected" : ""}>Inactive</option></select></div></div></div><div class="bg-white rounded-lg shadow-lg overflow-hidden" data-v-958fcac0><div class="px-6 py-4 border-b border-gray-200" data-v-958fcac0><h3 class="text-xl font-semibold text-gray-800 flex items-center" data-v-958fcac0> Categories <span class="ml-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full" data-v-958fcac0>${ssrInterpolate(unref(categories2).length || 0)}</span></h3></div>`);
      if (unref(loading)) {
        _push(`<div class="p-8 text-center" data-v-958fcac0><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" data-v-958fcac0></div><p class="text-gray-600" data-v-958fcac0>Loading categories...</p></div>`);
      } else if (unref(categories2).length > 0) {
        _push(`<div class="p-6" data-v-958fcac0><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-v-958fcac0><!--[-->`);
        ssrRenderList(unref(categories2), (category) => {
          _push(`<div class="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300 transform hover:scale-[1.02]" data-v-958fcac0><div class="flex items-start justify-between mb-4" data-v-958fcac0><div class="flex-1" data-v-958fcac0><div class="flex items-center mb-2" data-v-958fcac0><div class="w-3 h-3 rounded-full mr-2" style="${ssrRenderStyle({ backgroundColor: category.color || "#3B82F6" })}" data-v-958fcac0></div><h4 class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors" data-v-958fcac0>${ssrInterpolate(category.name)}</h4></div>`);
          if (category.description) {
            _push(`<p class="text-sm text-gray-600 leading-relaxed mb-3" data-v-958fcac0>${ssrInterpolate(truncateText(category.description, 80))}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="relative" data-v-958fcac0><button class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors" data-v-958fcac0><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-958fcac0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" data-v-958fcac0></path></svg></button>`);
          if (unref(activeDropdown) === category.id) {
            _push(`<div class="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]" data-v-958fcac0><button class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors" data-v-958fcac0> Edit </button><button class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors" data-v-958fcac0> Delete </button></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="space-y-2 mb-4" data-v-958fcac0><div class="flex items-center justify-between text-sm" data-v-958fcac0><span class="text-gray-500" data-v-958fcac0>Products:</span><span class="font-medium text-gray-900" data-v-958fcac0>${ssrInterpolate(category.products_count || 0)}</span></div><div class="flex items-center justify-between text-sm" data-v-958fcac0><span class="text-gray-500" data-v-958fcac0>Type:</span><span class="${ssrRenderClass([category.parent_id ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800", "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"])}" data-v-958fcac0>${ssrInterpolate(category.parent_id ? "Subcategory" : "Main Category")}</span></div></div><div class="flex items-center justify-between" data-v-958fcac0><span class="${ssrRenderClass([category.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800", "px-2 py-1 text-xs rounded-full font-medium"])}" data-v-958fcac0>${ssrInterpolate(category.is_active ? "Active" : "Inactive")}</span>`);
          if (category.parent) {
            _push(`<div class="text-xs text-gray-500" data-v-958fcac0> Parent: ${ssrInterpolate(category.parent.name)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<div class="p-16 text-center" data-v-958fcac0><div class="bg-gray-100 rounded-2xl p-12 max-w-md mx-auto" data-v-958fcac0><svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-958fcac0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" data-v-958fcac0></path></svg><h3 class="text-xl font-semibold text-gray-900 mb-2" data-v-958fcac0>No categories yet</h3><p class="text-gray-600 mb-4" data-v-958fcac0>Create your first category to organize your products.</p><button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" data-v-958fcac0> Create Category </button></div></div>`);
      }
      _push(`</div></div>`);
      if (unref(showModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-v-958fcac0><div class="bg-white rounded-lg border w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl" data-v-958fcac0><div class="p-6 border-b border-gray-200" data-v-958fcac0><h3 class="text-2xl font-semibold text-gray-900" data-v-958fcac0>${ssrInterpolate(unref(isEditing) ? "Edit Category" : "Create New Category")}</h3></div><form class="p-6 space-y-6" data-v-958fcac0><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-958fcac0><div class="space-y-4" data-v-958fcac0><div data-v-958fcac0><label class="block text-gray-700 text-sm font-medium mb-2" data-v-958fcac0>Category Name *</label><input${ssrRenderAttr("value", unref(categoryForm).name)} type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter category name" data-v-958fcac0></div><div data-v-958fcac0><label class="block text-gray-700 text-sm font-medium mb-2" data-v-958fcac0>Description</label><textarea rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Brief category description" data-v-958fcac0>${ssrInterpolate(unref(categoryForm).description)}</textarea></div><div data-v-958fcac0><label class="block text-gray-700 text-sm font-medium mb-2" data-v-958fcac0>Parent Category</label><select class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-958fcac0><option value="" data-v-958fcac0${ssrIncludeBooleanAttr(Array.isArray(unref(categoryForm).parent_id) ? ssrLooseContain(unref(categoryForm).parent_id, "") : ssrLooseEqual(unref(categoryForm).parent_id, "")) ? " selected" : ""}>None (Main Category)</option><!--[-->`);
        ssrRenderList(unref(mainCategories), (category) => {
          _push(`<option${ssrRenderAttr("value", category.id)}${ssrIncludeBooleanAttr(unref(isEditing) && category.id === unref(categoryForm).id) ? " disabled" : ""} data-v-958fcac0${ssrIncludeBooleanAttr(Array.isArray(unref(categoryForm).parent_id) ? ssrLooseContain(unref(categoryForm).parent_id, category.id) : ssrLooseEqual(unref(categoryForm).parent_id, category.id)) ? " selected" : ""}>${ssrInterpolate(category.name)}</option>`);
        });
        _push(`<!--]--></select></div></div><div class="space-y-4" data-v-958fcac0><div data-v-958fcac0><label class="block text-gray-700 text-sm font-medium mb-2" data-v-958fcac0>Category Color</label><div class="flex items-center space-x-3" data-v-958fcac0><input${ssrRenderAttr("value", unref(categoryForm).color)} type="color" class="w-12 h-10 border border-gray-300 rounded-md" data-v-958fcac0><input${ssrRenderAttr("value", unref(categoryForm).color)} type="text" class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="#3B82F6" data-v-958fcac0></div></div><div data-v-958fcac0><label class="block text-gray-700 text-sm font-medium mb-2" data-v-958fcac0>Display Order</label><input${ssrRenderAttr("value", unref(categoryForm).sort_order)} type="number" min="0" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0" data-v-958fcac0></div><div class="space-y-3" data-v-958fcac0><div class="flex items-center" data-v-958fcac0><input${ssrIncludeBooleanAttr(Array.isArray(unref(categoryForm).is_active) ? ssrLooseContain(unref(categoryForm).is_active, null) : unref(categoryForm).is_active) ? " checked" : ""} type="checkbox" id="is_active" class="w-4 h-4 text-green-400 bg-white border-gray-300 rounded focus:ring-green-400 focus:ring-2" data-v-958fcac0><label for="is_active" class="ml-2 text-sm text-gray-700" data-v-958fcac0>Active Category</label></div><div class="flex items-center" data-v-958fcac0><input${ssrIncludeBooleanAttr(Array.isArray(unref(categoryForm).is_featured) ? ssrLooseContain(unref(categoryForm).is_featured, null) : unref(categoryForm).is_featured) ? " checked" : ""} type="checkbox" id="is_featured" class="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2" data-v-958fcac0><label for="is_featured" class="ml-2 text-sm text-gray-700" data-v-958fcac0>Featured Category</label></div></div></div></div><div class="flex justify-end space-x-4 pt-6 border-t border-gray-200" data-v-958fcac0><button type="button" class="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors" data-v-958fcac0> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-958fcac0>`);
        if (unref(saving)) {
          _push(`<span data-v-958fcac0>${ssrInterpolate(unref(isEditing) ? "Updating..." : "Creating...")}</span>`);
        } else {
          _push(`<span data-v-958fcac0>${ssrInterpolate(unref(isEditing) ? "Update Category" : "Create Category")}</span>`);
        }
        _push(`</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showDeleteModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-v-958fcac0><div class="bg-white rounded-lg border w-full max-w-md shadow-xl" data-v-958fcac0><div class="p-6" data-v-958fcac0><div class="flex items-center mb-4" data-v-958fcac0><div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4" data-v-958fcac0><svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-958fcac0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" data-v-958fcac0></path></svg></div><div data-v-958fcac0><h3 class="text-lg font-semibold text-gray-900" data-v-958fcac0>Delete Category</h3><p class="text-gray-600" data-v-958fcac0>This action cannot be undone</p></div></div><p class="text-gray-800 mb-6" data-v-958fcac0> Are you sure you want to delete &quot;<strong data-v-958fcac0>${ssrInterpolate(unref(categoryToDelete)?.name)}</strong>&quot;? `);
        if (unref(categoryToDelete)?.products_count > 0) {
          _push(`<span class="text-red-600" data-v-958fcac0> This category has ${ssrInterpolate(unref(categoryToDelete).products_count)} product(s) associated with it. </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p><div class="flex justify-end space-x-4" data-v-958fcac0><button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors" data-v-958fcac0> Cancel </button><button${ssrIncludeBooleanAttr(unref(deleting)) ? " disabled" : ""} class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-958fcac0>`);
        if (unref(deleting)) {
          _push(`<span data-v-958fcac0>Deleting...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_else34))} data-v-958fcac0>Delete Category</span></button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(notification).show) {
        _push(`<div class="${ssrRenderClass([{
          "translate-x-0 opacity-100": unref(notification).show,
          "translate-x-full opacity-0": !unref(notification).show
        }, "fixed top-4 right-4 z-50 max-w-sm w-full bg-white/95 backdrop-blur-sm border border-white/20 rounded-xl shadow-2xl transition-all duration-300 transform"])}" data-v-958fcac0><div class="p-4" data-v-958fcac0><div class="flex items-start" data-v-958fcac0><div class="flex-shrink-0" data-v-958fcac0>`);
        if (unref(notification).type === "success") {
          _push(`<svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-958fcac0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-958fcac0></path></svg>`);
        } else if (unref(notification).type === "error") {
          _push(`<svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-958fcac0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-958fcac0></path></svg>`);
        } else if (unref(notification).type === "warning") {
          _push(`<svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-958fcac0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" data-v-958fcac0></path></svg>`);
        } else {
          _push(`<svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-958fcac0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-958fcac0></path></svg>`);
        }
        _push(`</div><div class="ml-3 w-0 flex-1" data-v-958fcac0><p class="${ssrRenderClass([{
          "text-green-800": unref(notification).type === "success",
          "text-red-800": unref(notification).type === "error",
          "text-yellow-800": unref(notification).type === "warning",
          "text-blue-800": unref(notification).type === "info"
        }, "text-sm font-medium"])}" data-v-958fcac0>${ssrInterpolate(unref(notification).message)}</p></div><div class="ml-4 flex-shrink-0 flex" data-v-958fcac0><button class="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none" data-v-958fcac0><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-958fcac0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-958fcac0></path></svg></button></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/categories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const categories = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-958fcac0"]]);

export { categories as default };
//# sourceMappingURL=categories-DooAl-Op.mjs.map
