import { _ as __nuxt_component_0$1 } from './server.mjs';
import { ref, computed, watch, mergeProps, unref, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { debounce } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/lodash-es/lodash.js';
import { u as useApi } from './useApi-CO9TAo9a.mjs';
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
import './cookie-D4T41UgU.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/cookie-es/dist/index.mjs';

const _sfc_main = {
  __name: "products",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(true);
    const showModal = ref(false);
    const showDeleteModal = ref(false);
    const showCategoryModal = ref(false);
    const showDeleteCategoryModal = ref(false);
    const showCategoryManagement = ref(false);
    const isEditing = ref(false);
    const isEditingCategory = ref(false);
    const saving = ref(false);
    const deleting = ref(false);
    const savingCategory = ref(false);
    const deletingCategory = ref(false);
    const productToDelete = ref(null);
    const categoryToDelete = ref(null);
    const notification = ref({
      show: false,
      type: "success",
      // success, error, warning, info
      message: "",
      timeout: null
    });
    const products2 = ref([]);
    const brands = ref([]);
    ref([]);
    const managedCategories = ref([]);
    const stats = ref({});
    const pagination = ref({});
    ref([]);
    const filters = ref({
      search: "",
      brand_id: "",
      category_id: "",
      status: "",
      page: 1,
      per_page: 15
    });
    const productForm = ref({
      id: null,
      brand_id: "",
      name: "",
      slug: "",
      sku: "",
      part_number: "",
      description: "",
      short_description: "",
      weight: null,
      category_id: "",
      is_active: true,
      is_featured: false,
      images: [],
      newImages: [],
      removedImages: [],
      variants: [
        {
          name: "Original",
          price: 0,
          // Start with 0 for new products
          is_default: true,
          is_active: true
        }
      ]
    });
    const categoryForm = ref({
      name: "",
      description: "",
      parent_id: "",
      color: "#6B7280",
      is_active: true
    });
    computed(() => {
      if (!isEditing.value) {
        return "";
      }
      return "";
    });
    const visiblePages = computed(() => {
      const current = pagination.value.current_page || 1;
      const last = pagination.value.last_page || 1;
      const delta = 2;
      const range = [];
      const rangeWithDots = [];
      for (let i = Math.max(2, current - delta); i <= Math.min(last - 1, current + delta); i++) {
        range.push(i);
      }
      if (current - delta > 2) {
        rangeWithDots.push(1, "...");
      } else {
        rangeWithDots.push(1);
      }
      rangeWithDots.push(...range);
      if (current + delta < last - 1) {
        rangeWithDots.push("...", last);
      } else if (last > 1) {
        rangeWithDots.push(last);
      }
      return rangeWithDots.filter((item) => item !== "..." || rangeWithDots.indexOf(item) === rangeWithDots.lastIndexOf(item));
    });
    const getProductCountForCategory = (categoryId) => {
      if (!categoryId || !products2.value) return 0;
      return products2.value.filter((product) => product.category_id === categoryId).length;
    };
    console.log("✅ Form reset complete");
    const loadProducts = async () => {
      loading.value = true;
      try {
        const api = useApi();
        const params = new URLSearchParams();
        Object.keys(filters.value).forEach((key) => {
          if (filters.value[key] !== "" && filters.value[key] !== null) {
            params.append(key, filters.value[key]);
          }
        });
        console.log("🔄 Loading products with params:", params.toString());
        const response = await api.request(`/admin/products?${params.toString()}`);
        if (response.success && response.data) {
          console.log("📦 Products loaded:", response.data.products?.data?.length || 0, "products");
          const newProducts = response.data.products?.data || [];
          console.log("📦 New products data:", newProducts);
          products2.value = newProducts;
          pagination.value = {
            current_page: response.data.products?.current_page || 1,
            last_page: response.data.products?.last_page || 1,
            per_page: response.data.products?.per_page || 10,
            total: response.data.products?.total || 0,
            from: response.data.products?.from || 0,
            to: response.data.products?.to || 0
          };
          console.log("✅ Products loaded successfully, total products:", products2.value.length);
        } else {
          console.error("❌ API Error:", response.error);
          products2.value = [];
        }
      } catch (error) {
        console.error("❌ Failed to load products:", error);
        products2.value = [];
      } finally {
        loading.value = false;
      }
    };
    debounce(() => {
      filters.value.page = 1;
      loadProducts();
    }, 500);
    const truncateText = (text, length) => {
      if (!text) return "";
      return text.length > length ? text.substring(0, length) + "..." : text;
    };
    watch(() => filters.value.category_id, async (newCategoryId, oldCategoryId) => {
      if (newCategoryId !== oldCategoryId) {
        console.log("🔄 Category filter changed:", newCategoryId);
        filters.value.page = 1;
        await loadProducts();
      }
    });
    watch(() => filters.value.brand_id, async (newBrandId, oldBrandId) => {
      if (newBrandId !== oldBrandId) {
        filters.value.page = 1;
        await loadProducts();
      }
    });
    watch(() => filters.value.status, async (newStatus, oldStatus) => {
      if (newStatus !== oldStatus) {
        filters.value.page = 1;
        await loadProducts();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50" }, _attrs))} data-v-50869779><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-v-50869779><div class="mb-6" data-v-50869779><div class="flex items-center justify-between" data-v-50869779><div data-v-50869779><h2 class="text-3xl font-bold text-gray-900 mb-2" data-v-50869779>Product Catalog</h2><p class="text-gray-600" data-v-50869779>Manage and organize your products</p></div><div class="flex items-center space-x-4" data-v-50869779><div class="relative group" data-v-50869779><button class="flex items-center px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors duration-200" data-v-50869779><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-50869779><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" data-v-50869779></path></svg> Categories <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-50869779><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-50869779></path></svg></button><div class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50" data-v-50869779><div class="p-4" data-v-50869779><div class="flex justify-between items-center mb-3" data-v-50869779><h3 class="text-lg font-semibold text-gray-900" data-v-50869779>Categories</h3><button class="text-sm bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition-colors" data-v-50869779> + Add New </button></div><div class="max-h-64 overflow-y-auto space-y-2" data-v-50869779>`);
      if (unref(managedCategories).length === 0) {
        _push(`<div class="text-gray-500 text-sm text-center py-4" data-v-50869779> No categories yet. Create your first category. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(managedCategories), (category) => {
        _push(`<div class="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg" data-v-50869779><div class="flex items-center flex-1" data-v-50869779><div class="w-3 h-3 rounded-full mr-3" style="${ssrRenderStyle({ backgroundColor: category.color || "#6B7280" })}" data-v-50869779></div><div class="flex-1" data-v-50869779><div class="text-sm font-medium text-gray-900" data-v-50869779>${ssrInterpolate(category.parent ? `${category.parent.name} → ` : "")}${ssrInterpolate(category.name)}</div>`);
        if (category.description) {
          _push(`<div class="text-xs text-gray-500" data-v-50869779>${ssrInterpolate(truncateText(category.description, 40))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="flex items-center space-x-1" data-v-50869779><button class="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors" title="Edit Category" data-v-50869779><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-50869779><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-50869779></path></svg></button><button class="p-1 text-red-600 hover:bg-red-100 rounded transition-colors" title="Delete Category" data-v-50869779><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-50869779><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-50869779></path></svg></button></div></div>`);
      });
      _push(`<!--]--></div></div></div></div><button${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 text-blue-700 disabled:text-gray-400 rounded-lg transition-colors duration-200" data-v-50869779><svg class="${ssrRenderClass([{ "animate-spin": unref(loading) }, "w-4 h-4 mr-2"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-50869779><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-50869779></path></svg>`);
      if (unref(loading)) {
        _push(`<span data-v-50869779>Loading...</span>`);
      } else {
        _push(`<span data-v-50869779>Refresh</span>`);
      }
      _push(`</button><span class="text-gray-600" data-v-50869779>Welcome, Admin</span></div></div></div><div class="bg-white rounded-lg shadow-lg p-6 mb-8" data-v-50869779><div class="flex justify-between items-center" data-v-50869779><div data-v-50869779><h2 class="text-2xl font-bold text-gray-900 mb-2" data-v-50869779>Product Management</h2><p class="text-gray-600" data-v-50869779>Manage your product catalog and inventory</p></div><button class="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors" data-v-50869779><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-50869779><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-50869779></path></svg> Add New Product </button></div></div><div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-v-50869779><div class="bg-white rounded-lg shadow-lg p-6" data-v-50869779><div class="flex items-center" data-v-50869779><div class="p-3 rounded-full bg-blue-100" data-v-50869779><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-50869779><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" data-v-50869779></path></svg></div><div class="ml-4" data-v-50869779><p class="text-sm font-medium text-gray-600" data-v-50869779>Total Products</p><p class="text-2xl font-semibold text-gray-900" data-v-50869779>`);
      if (unref(loading)) {
        _push(`<span class="animate-pulse bg-gray-200 rounded w-8 h-8 inline-block" data-v-50869779></span>`);
      } else {
        _push(`<span data-v-50869779>${ssrInterpolate(unref(stats).total_products || 0)}</span>`);
      }
      _push(`</p></div></div></div><div class="bg-white rounded-lg shadow-lg p-6" data-v-50869779><div class="flex items-center" data-v-50869779><div class="p-3 rounded-full bg-green-100" data-v-50869779><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-50869779><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-50869779></path></svg></div><div class="ml-4" data-v-50869779><p class="text-sm font-medium text-gray-600" data-v-50869779>Active Products</p><p class="text-2xl font-semibold text-gray-900" data-v-50869779>`);
      if (unref(loading)) {
        _push(`<span class="animate-pulse bg-gray-200 rounded w-8 h-8 inline-block" data-v-50869779></span>`);
      } else {
        _push(`<span data-v-50869779>${ssrInterpolate(unref(stats).active_products || 0)}</span>`);
      }
      _push(`</p></div></div></div></div><div class="bg-white rounded-lg shadow-lg p-6 mb-8" data-v-50869779><div class="grid grid-cols-1 md:grid-cols-4 gap-4" data-v-50869779><div data-v-50869779><label class="block text-gray-700 text-sm font-medium mb-2" data-v-50869779>Search Products</label><input${ssrRenderAttr("value", unref(filters).search)} type="text" placeholder="Search by name, SKU, part number..." class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-50869779></div><div data-v-50869779><label class="block text-gray-700 text-sm font-medium mb-2" data-v-50869779>Brand</label><select class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-50869779><option value="" data-v-50869779${ssrIncludeBooleanAttr(Array.isArray(unref(filters).brand_id) ? ssrLooseContain(unref(filters).brand_id, "") : ssrLooseEqual(unref(filters).brand_id, "")) ? " selected" : ""}>All Brands</option><!--[-->`);
      ssrRenderList(unref(brands), (brand) => {
        _push(`<option${ssrRenderAttr("value", brand.id)} data-v-50869779${ssrIncludeBooleanAttr(Array.isArray(unref(filters).brand_id) ? ssrLooseContain(unref(filters).brand_id, brand.id) : ssrLooseEqual(unref(filters).brand_id, brand.id)) ? " selected" : ""}>${ssrInterpolate(brand.name)}</option>`);
      });
      _push(`<!--]--></select></div><div data-v-50869779><div class="flex justify-between items-center mb-2" data-v-50869779><label class="block text-gray-700 text-sm font-medium" data-v-50869779>Category</label><div class="flex items-center space-x-2" data-v-50869779><button class="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1 bg-blue-50 hover:bg-blue-100 rounded transition-colors" title="Create New Category" data-v-50869779> + Add </button><button class="text-xs text-purple-600 hover:text-purple-800 font-medium px-2 py-1 bg-purple-50 hover:bg-purple-100 rounded transition-colors" title="Manage Categories" data-v-50869779><svg class="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-50869779><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" data-v-50869779></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-50869779></path></svg> Manage </button></div></div><select class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-50869779><option value="" data-v-50869779${ssrIncludeBooleanAttr(Array.isArray(unref(filters).category_id) ? ssrLooseContain(unref(filters).category_id, "") : ssrLooseEqual(unref(filters).category_id, "")) ? " selected" : ""}>All Categories</option><!--[-->`);
      ssrRenderList(unref(managedCategories), (category) => {
        _push(`<option${ssrRenderAttr("value", category.id)} data-v-50869779${ssrIncludeBooleanAttr(Array.isArray(unref(filters).category_id) ? ssrLooseContain(unref(filters).category_id, category.id) : ssrLooseEqual(unref(filters).category_id, category.id)) ? " selected" : ""}>${ssrInterpolate(category.parent ? `${category.parent.name} → ` : "")}${ssrInterpolate(category.name)}</option>`);
      });
      _push(`<!--]--></select>`);
      if (unref(showCategoryManagement)) {
        _push(`<div class="mt-3 bg-gray-50 rounded-lg p-3 border border-gray-200" data-v-50869779><div class="flex justify-between items-center mb-3" data-v-50869779><h4 class="text-sm font-semibold text-gray-900" data-v-50869779>Quick Category Management</h4><button class="text-gray-400 hover:text-gray-600" data-v-50869779><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-50869779><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-50869779></path></svg></button></div><div class="max-h-48 overflow-y-auto space-y-2" data-v-50869779>`);
        if (unref(managedCategories).length === 0) {
          _push(`<div class="text-gray-500 text-xs text-center py-4" data-v-50869779> No categories yet. Create your first category. </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(managedCategories), (category) => {
          _push(`<div class="flex items-center justify-between p-2 bg-white rounded border hover:bg-gray-50 transition-colors" data-v-50869779><div class="flex items-center flex-1 min-w-0" data-v-50869779><div class="w-3 h-3 rounded-full mr-2 flex-shrink-0" style="${ssrRenderStyle({ backgroundColor: category.color || "#6B7280" })}" data-v-50869779></div><div class="flex-1 min-w-0" data-v-50869779><div class="text-xs font-medium text-gray-900 truncate" data-v-50869779>${ssrInterpolate(category.parent ? `${category.parent.name} → ` : "")}${ssrInterpolate(category.name)}</div>`);
          if (category.description) {
            _push(`<div class="text-xs text-gray-500 truncate" data-v-50869779>${ssrInterpolate(truncateText(category.description, 30))}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="flex items-center space-x-1 ml-2" data-v-50869779><button class="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors" title="Edit Category" data-v-50869779><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-50869779><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-50869779></path></svg></button><button class="p-1 text-red-600 hover:bg-red-100 rounded transition-colors" title="Delete Category" data-v-50869779><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-50869779><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-50869779></path></svg></button></div></div>`);
        });
        _push(`<!--]--></div><div class="mt-3 pt-2 border-t border-gray-200" data-v-50869779><button class="w-full text-xs text-blue-600 hover:text-blue-800 font-medium py-2 border border-blue-200 hover:bg-blue-50 rounded transition-colors" data-v-50869779> + Create New Category </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-50869779><label class="block text-gray-700 text-sm font-medium mb-2" data-v-50869779>Status</label><select class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-50869779><option value="" data-v-50869779${ssrIncludeBooleanAttr(Array.isArray(unref(filters).status) ? ssrLooseContain(unref(filters).status, "") : ssrLooseEqual(unref(filters).status, "")) ? " selected" : ""}>All Status</option><option value="active" data-v-50869779${ssrIncludeBooleanAttr(Array.isArray(unref(filters).status) ? ssrLooseContain(unref(filters).status, "active") : ssrLooseEqual(unref(filters).status, "active")) ? " selected" : ""}>Active</option><option value="inactive" data-v-50869779${ssrIncludeBooleanAttr(Array.isArray(unref(filters).status) ? ssrLooseContain(unref(filters).status, "inactive") : ssrLooseEqual(unref(filters).status, "inactive")) ? " selected" : ""}>Inactive</option><option value="featured" data-v-50869779${ssrIncludeBooleanAttr(Array.isArray(unref(filters).status) ? ssrLooseContain(unref(filters).status, "featured") : ssrLooseEqual(unref(filters).status, "featured")) ? " selected" : ""}>Featured</option><option value="low_stock" data-v-50869779${ssrIncludeBooleanAttr(Array.isArray(unref(filters).status) ? ssrLooseContain(unref(filters).status, "low_stock") : ssrLooseEqual(unref(filters).status, "low_stock")) ? " selected" : ""}>Low Stock</option></select></div></div></div><div class="bg-white rounded-lg shadow-lg overflow-hidden" data-v-50869779><div class="px-6 py-4 border-b border-gray-200" data-v-50869779><h3 class="text-xl font-semibold text-gray-800 flex items-center" data-v-50869779> Products <span class="ml-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full" data-v-50869779>${ssrInterpolate(unref(pagination).total || 0)}</span><button class="ml-4 px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded hover:bg-orange-200 transition-colors" title="Force refresh products (for debugging Mocati issue)" data-v-50869779> 🔄 Refresh </button></h3></div><div class="overflow-x-auto" data-v-50869779>`);
      if (unref(loading)) {
        _push(`<div class="p-8 text-center" data-v-50869779><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" data-v-50869779></div><p class="text-gray-600" data-v-50869779>Loading products...</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div>`);
      if (unref(pagination).total > unref(pagination).per_page) {
        _push(`<div class="px-6 py-4 border-t border-gray-200" data-v-50869779><div class="flex items-center justify-between" data-v-50869779><div class="text-sm text-gray-600" data-v-50869779> Showing ${ssrInterpolate(unref(pagination).from)} to ${ssrInterpolate(unref(pagination).to)} of ${ssrInterpolate(unref(pagination).total)} results </div><div class="flex space-x-2" data-v-50869779><!--[-->`);
        ssrRenderList(unref(visiblePages), (page) => {
          _push(`<button class="${ssrRenderClass([
            "px-3 py-1 rounded-lg text-sm transition-colors",
            page === unref(pagination).current_page ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          ])}" data-v-50869779>${ssrInterpolate(page)}</button>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (unref(showModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-v-50869779><div class="bg-white rounded-lg border w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl" data-v-50869779><div class="p-6 border-b border-gray-200" data-v-50869779><h3 class="text-2xl font-semibold text-gray-900" data-v-50869779>${ssrInterpolate(unref(isEditing) ? "Edit Product" : "Create New Product")}</h3></div><form class="p-6 space-y-6" data-v-50869779><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-50869779><div class="space-y-4" data-v-50869779><h4 class="text-lg font-semibold text-gray-900 mb-4" data-v-50869779>Basic Information</h4><div data-v-50869779><label class="block text-gray-700 text-sm font-medium mb-2" data-v-50869779>Product Name *</label><input${ssrRenderAttr("value", unref(productForm).name)} type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter product name" data-v-50869779></div><div data-v-50869779><label class="block text-gray-700 text-sm font-medium mb-2" data-v-50869779>Brand *</label><select required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-50869779><option value="" data-v-50869779${ssrIncludeBooleanAttr(Array.isArray(unref(productForm).brand_id) ? ssrLooseContain(unref(productForm).brand_id, "") : ssrLooseEqual(unref(productForm).brand_id, "")) ? " selected" : ""}>Select Brand</option><!--[-->`);
        ssrRenderList(unref(brands), (brand) => {
          _push(`<option${ssrRenderAttr("value", brand.id)} data-v-50869779${ssrIncludeBooleanAttr(Array.isArray(unref(productForm).brand_id) ? ssrLooseContain(unref(productForm).brand_id, brand.id) : ssrLooseEqual(unref(productForm).brand_id, brand.id)) ? " selected" : ""}>${ssrInterpolate(brand.name)}</option>`);
        });
        _push(`<!--]--></select></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-50869779><div data-v-50869779><label class="block text-gray-700 text-sm font-medium mb-2" data-v-50869779>SKU</label><input${ssrRenderAttr("value", unref(productForm).sku)} type="text" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Product SKU" data-v-50869779></div><div data-v-50869779><label class="block text-gray-700 text-sm font-medium mb-2" data-v-50869779>Part Number</label><input${ssrRenderAttr("value", unref(productForm).part_number)} type="text" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Part number" data-v-50869779></div></div><div data-v-50869779><label class="block text-gray-700 text-sm font-medium mb-2" data-v-50869779>Short Description</label><textarea rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Brief product description" data-v-50869779>${ssrInterpolate(unref(productForm).short_description)}</textarea></div><div data-v-50869779><label class="block text-gray-700 text-sm font-medium mb-2" data-v-50869779>Full Description</label><textarea rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Detailed product description" data-v-50869779>${ssrInterpolate(unref(productForm).description)}</textarea></div></div><div class="space-y-4" data-v-50869779><h4 class="text-lg font-semibold text-gray-900 mb-4" data-v-50869779>Product Details</h4><div data-v-50869779><label class="block text-gray-700 text-sm font-medium mb-2" data-v-50869779>Weight (kg)</label><input${ssrRenderAttr("value", unref(productForm).weight)} type="number" step="0.01" min="0" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0.00" data-v-50869779></div><div data-v-50869779><div class="flex justify-between items-center mb-2" data-v-50869779><label class="block text-gray-700 text-sm font-medium" data-v-50869779>Category</label><button type="button" class="text-sm text-blue-600 hover:text-blue-800 font-medium" data-v-50869779> + Create New </button></div><select class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-50869779><option value="" data-v-50869779${ssrIncludeBooleanAttr(Array.isArray(unref(productForm).category_id) ? ssrLooseContain(unref(productForm).category_id, "") : ssrLooseEqual(unref(productForm).category_id, "")) ? " selected" : ""}>Select Category</option><!--[-->`);
        ssrRenderList(unref(managedCategories), (category) => {
          _push(`<option${ssrRenderAttr("value", category.id)} data-v-50869779${ssrIncludeBooleanAttr(Array.isArray(unref(productForm).category_id) ? ssrLooseContain(unref(productForm).category_id, category.id) : ssrLooseEqual(unref(productForm).category_id, category.id)) ? " selected" : ""}>${ssrInterpolate(category.parent ? `${category.parent.name} → ` : "")}${ssrInterpolate(category.name)}</option>`);
        });
        _push(`<!--]--></select></div><div class="space-y-4" data-v-50869779><div class="flex justify-between items-center" data-v-50869779><h5 class="text-lg font-semibold text-gray-900" data-v-50869779>Product Variants (Flavors)</h5><button type="button" class="px-3 py-1 bg-green-100 border border-green-300 rounded-lg text-green-700 hover:bg-green-200 transition-colors text-sm" data-v-50869779> + Add Variant </button></div>`);
        if (unref(productForm).variants && unref(productForm).variants.length === 0) {
          _push(`<div class="text-gray-500 text-sm italic" data-v-50869779> No variants yet. Add your first variant (e.g., Original, Mild, Hot, etc.) </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(productForm).variants, (variant, index) => {
          _push(`<div class="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3" data-v-50869779><div class="flex justify-between items-center" data-v-50869779><h6 class="text-gray-900 font-medium" data-v-50869779>Flavor ${ssrInterpolate(index + 1)}</h6>`);
          if (unref(productForm).variants.length > 1) {
            _push(`<button type="button" class="text-red-600 hover:text-red-700 text-sm" data-v-50869779> Remove </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-50869779><div data-v-50869779><label class="block text-gray-700 text-sm font-medium mb-2" data-v-50869779>Flavor Name *</label><input${ssrRenderAttr("value", variant.name)} type="text" required class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Original, Mild, Hot, Spicy" data-v-50869779></div><div data-v-50869779><label class="block text-gray-700 text-sm font-medium mb-2" data-v-50869779>Price ($) *</label><input${ssrRenderAttr("value", variant.price)} type="number" step="0.01" min="0" required class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0.00" data-v-50869779></div></div>`);
          if (index === 0) {
            _push(`<div class="text-xs text-green-700 italic" data-v-50869779> ✓ This is the default flavor </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div><div data-v-50869779><label class="block text-gray-700 text-sm font-medium mb-2" data-v-50869779>Product Images</label><div class="border-2 border-dashed border-gray-300 rounded-lg p-4" data-v-50869779><input type="file" multiple accept="image/*" class="hidden" data-v-50869779><button type="button" class="w-full flex flex-col items-center justify-center py-4 text-gray-500 hover:text-gray-700 transition-colors" data-v-50869779><svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-50869779><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" data-v-50869779></path></svg><span class="text-sm font-medium" data-v-50869779>Click to upload images</span><span class="text-xs text-gray-400 mt-1" data-v-50869779>PNG, JPG, GIF up to 10MB each</span></button></div>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`</div><div class="space-y-3" data-v-50869779><div class="flex items-center" data-v-50869779><input${ssrIncludeBooleanAttr(Array.isArray(unref(productForm).is_active) ? ssrLooseContain(unref(productForm).is_active, null) : unref(productForm).is_active) ? " checked" : ""} type="checkbox" id="is_active" class="w-4 h-4 text-green-400 bg-white/10 border-white/20 rounded focus:ring-green-400 focus:ring-2" data-v-50869779><label for="is_active" class="ml-2 text-sm text-gray-700" data-v-50869779>Active Product</label></div><div class="flex items-center" data-v-50869779><input${ssrIncludeBooleanAttr(Array.isArray(unref(productForm).is_featured) ? ssrLooseContain(unref(productForm).is_featured, null) : unref(productForm).is_featured) ? " checked" : ""} type="checkbox" id="is_featured" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" data-v-50869779><label for="is_featured" class="ml-2 text-sm text-gray-700" data-v-50869779>Featured Product</label></div></div></div></div><div class="flex justify-end space-x-4 pt-6 border-t border-gray-200" data-v-50869779><button type="button" class="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors" data-v-50869779> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-50869779>`);
        if (unref(saving)) {
          _push(`<span data-v-50869779>${ssrInterpolate(unref(isEditing) ? "Updating..." : "Creating...")}</span>`);
        } else {
          _push(`<span data-v-50869779>${ssrInterpolate(unref(isEditing) ? "Update Product" : "Create Product")}</span>`);
        }
        _push(`</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showDeleteModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-v-50869779><div class="bg-white rounded-lg border w-full max-w-md shadow-xl" data-v-50869779><div class="p-6" data-v-50869779><div class="flex items-center mb-4" data-v-50869779><div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4" data-v-50869779><svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-50869779><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" data-v-50869779></path></svg></div><div data-v-50869779><h3 class="text-lg font-semibold text-gray-900" data-v-50869779>Delete Product</h3><p class="text-gray-600" data-v-50869779>This action cannot be undone</p></div></div><p class="text-gray-800 mb-6" data-v-50869779> Are you sure you want to delete &quot;<strong data-v-50869779>${ssrInterpolate(unref(productToDelete)?.name)}</strong>&quot;? This will permanently remove the product and all its associated data. </p><div class="flex justify-end space-x-4" data-v-50869779><button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors" data-v-50869779> Cancel </button><button${ssrIncludeBooleanAttr(unref(deleting)) ? " disabled" : ""} class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-50869779>`);
        if (unref(deleting)) {
          _push(`<span data-v-50869779>Deleting...</span>`);
        } else {
          _push(`<span data-v-50869779>Delete Product</span>`);
        }
        _push(`</button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showCategoryModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-v-50869779><div class="bg-white rounded-lg border w-full max-w-md shadow-xl" data-v-50869779><div class="p-6 border-b border-gray-200" data-v-50869779><h3 class="text-xl font-semibold text-gray-900" data-v-50869779>${ssrInterpolate(unref(isEditingCategory) ? "Edit Category" : "Create New Category")}</h3></div><form class="p-6 space-y-4" data-v-50869779><div data-v-50869779><label class="block text-gray-700 text-sm font-medium mb-2" data-v-50869779>Category Name *</label><input${ssrRenderAttr("value", unref(categoryForm).name)} type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter category name" data-v-50869779></div><div data-v-50869779><label class="block text-gray-700 text-sm font-medium mb-2" data-v-50869779>Parent Category</label><select class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-50869779><option value="" data-v-50869779${ssrIncludeBooleanAttr(Array.isArray(unref(categoryForm).parent_id) ? ssrLooseContain(unref(categoryForm).parent_id, "") : ssrLooseEqual(unref(categoryForm).parent_id, "")) ? " selected" : ""}>None (Top Level)</option><!--[-->`);
        ssrRenderList(unref(managedCategories).filter((c) => !c.parent_id && (!unref(isEditingCategory) || c.id !== unref(categoryForm).id)), (category) => {
          _push(`<option${ssrRenderAttr("value", category.id)} data-v-50869779${ssrIncludeBooleanAttr(Array.isArray(unref(categoryForm).parent_id) ? ssrLooseContain(unref(categoryForm).parent_id, category.id) : ssrLooseEqual(unref(categoryForm).parent_id, category.id)) ? " selected" : ""}>${ssrInterpolate(category.name)}</option>`);
        });
        _push(`<!--]--></select></div><div data-v-50869779><label class="block text-gray-700 text-sm font-medium mb-2" data-v-50869779>Description</label><textarea rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Optional category description" data-v-50869779>${ssrInterpolate(unref(categoryForm).description)}</textarea></div><div data-v-50869779><label class="block text-gray-700 text-sm font-medium mb-2" data-v-50869779>Color</label><div class="flex items-center space-x-3" data-v-50869779><input${ssrRenderAttr("value", unref(categoryForm).color)} type="color" class="w-16 h-10 border border-gray-300 rounded-md cursor-pointer" data-v-50869779><input${ssrRenderAttr("value", unref(categoryForm).color)} type="text" class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="#6B7280" data-v-50869779></div><p class="text-xs text-gray-500 mt-1" data-v-50869779>Choose a color to help identify this category</p></div><div class="flex items-center" data-v-50869779><input${ssrIncludeBooleanAttr(Array.isArray(unref(categoryForm).is_active) ? ssrLooseContain(unref(categoryForm).is_active, null) : unref(categoryForm).is_active) ? " checked" : ""} type="checkbox" id="category_is_active" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" data-v-50869779><label for="category_is_active" class="ml-2 text-sm text-gray-700" data-v-50869779>Active Category</label></div><div class="flex justify-end space-x-4 pt-4 border-t border-gray-200" data-v-50869779><button type="button" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors" data-v-50869779> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(savingCategory)) ? " disabled" : ""} class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-50869779>`);
        if (unref(savingCategory)) {
          _push(`<span data-v-50869779>${ssrInterpolate(unref(isEditingCategory) ? "Updating..." : "Creating...")}</span>`);
        } else {
          _push(`<span data-v-50869779>${ssrInterpolate(unref(isEditingCategory) ? "Update Category" : "Create Category")}</span>`);
        }
        _push(`</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showDeleteCategoryModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-v-50869779><div class="bg-white rounded-lg border w-full max-w-md shadow-xl" data-v-50869779><div class="p-6" data-v-50869779><div class="flex items-center mb-4" data-v-50869779><div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4" data-v-50869779><svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-50869779><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" data-v-50869779></path></svg></div><div data-v-50869779><h3 class="text-lg font-semibold text-gray-900" data-v-50869779>Delete Category</h3><p class="text-gray-600" data-v-50869779>This action cannot be undone</p></div></div><p class="text-gray-800 mb-4" data-v-50869779> Are you sure you want to delete &quot;<strong data-v-50869779>${ssrInterpolate(unref(categoryToDelete)?.name)}</strong>&quot;? </p>`);
        if (unref(categoryToDelete)) {
          _push(`<div class="bg-gray-50 rounded-lg p-3 mb-4" data-v-50869779><div class="flex items-center mb-2" data-v-50869779><div class="w-4 h-4 rounded-full mr-2" style="${ssrRenderStyle({ backgroundColor: unref(categoryToDelete).color || "#6B7280" })}" data-v-50869779></div><span class="text-sm font-medium text-gray-900" data-v-50869779>${ssrInterpolate(unref(categoryToDelete).name)}</span></div>`);
          if (unref(categoryToDelete).description) {
            _push(`<div class="text-xs text-gray-600 mb-2" data-v-50869779>${ssrInterpolate(unref(categoryToDelete).description)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="text-xs text-gray-500" data-v-50869779> Products in this category: ${ssrInterpolate(getProductCountForCategory(unref(categoryToDelete).id))}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (getProductCountForCategory(unref(categoryToDelete)?.id) > 0) {
          _push(`<div class="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4" data-v-50869779><div class="flex" data-v-50869779><svg class="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-50869779><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" data-v-50869779></path></svg><div class="text-sm text-yellow-700" data-v-50869779><p class="font-medium" data-v-50869779>Warning: This category has ${ssrInterpolate(getProductCountForCategory(unref(categoryToDelete).id))} product(s)</p><p data-v-50869779>Products will be moved to &quot;Uncategorized&quot; when this category is deleted.</p></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex justify-end space-x-4" data-v-50869779><button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors" data-v-50869779> Cancel </button><button${ssrIncludeBooleanAttr(unref(deletingCategory)) ? " disabled" : ""} class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-50869779>`);
        if (unref(deletingCategory)) {
          _push(`<span data-v-50869779>Deleting...</span>`);
        } else {
          _push(`<span data-v-50869779>Delete Category</span>`);
        }
        _push(`</button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(notification).show) {
        _push(`<div class="${ssrRenderClass([{
          "translate-x-0 opacity-100": unref(notification).show,
          "translate-x-full opacity-0": !unref(notification).show
        }, "fixed top-4 right-4 z-50 max-w-sm w-full bg-white/95 backdrop-blur-sm border border-white/20 rounded-xl shadow-2xl transition-all duration-300 transform"])}" data-v-50869779><div class="p-4" data-v-50869779><div class="flex items-start" data-v-50869779><div class="flex-shrink-0" data-v-50869779>`);
        if (unref(notification).type === "success") {
          _push(`<svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-50869779><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-50869779></path></svg>`);
        } else if (unref(notification).type === "error") {
          _push(`<svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-50869779><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-50869779></path></svg>`);
        } else if (unref(notification).type === "warning") {
          _push(`<svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-50869779><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" data-v-50869779></path></svg>`);
        } else {
          _push(`<svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-50869779><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-50869779></path></svg>`);
        }
        _push(`</div><div class="ml-3 w-0 flex-1" data-v-50869779><p class="${ssrRenderClass([{
          "text-green-800": unref(notification).type === "success",
          "text-red-800": unref(notification).type === "error",
          "text-yellow-800": unref(notification).type === "warning",
          "text-blue-800": unref(notification).type === "info"
        }, "text-sm font-medium"])}" data-v-50869779>${ssrInterpolate(unref(notification).message)}</p></div><div class="ml-4 flex-shrink-0 flex" data-v-50869779><button class="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none" data-v-50869779><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-50869779><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-50869779></path></svg></button></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/products.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const products = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-50869779"]]);

export { products as default };
//# sourceMappingURL=products-1_vBMR2c.mjs.map
