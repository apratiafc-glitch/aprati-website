import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, watch, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderList, ssrLooseContain } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { g as useRoute, a as useSeoMeta } from './server.mjs';
import { u as useApi } from './useApi-CO9TAo9a.mjs';
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
import './cookie-D4T41UgU.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/cookie-es/dist/index.mjs';

const _sfc_main = {
  __name: "products",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { brands: brandApi, products: productApi } = useApi();
    route.params.slug;
    const brand = ref(null);
    const products = ref([]);
    const loading = ref(true);
    const productsLoading = ref(false);
    const showModal = ref(false);
    const showDeleteModal = ref(false);
    const isEditing = ref(false);
    const saving = ref(false);
    const deleting = ref(false);
    const productToDelete = ref(null);
    const productForm = ref({
      id: null,
      brand_id: null,
      name: "",
      slug: "",
      sku: "",
      part_number: "",
      description: "",
      short_description: "",
      price: null,
      cost_price: null,
      stock_quantity: 0,
      min_stock_level: 0,
      max_stock_level: 0,
      weight: null,
      category: "",
      images: [""],
      is_active: true,
      is_featured: false
    });
    const getDisplayPrice = (product) => {
      if (product.variants && product.variants.length > 0) {
        const originalVariant = product.variants.find(
          (variant) => variant.name && variant.name.toLowerCase().includes("original")
        );
        if (originalVariant && originalVariant.price) {
          return originalVariant.price;
        }
      }
      return product.price || "0.00";
    };
    const getOriginalVariantPrice = (product) => {
      if (product.variants && product.variants.length > 0) {
        const originalVariant = product.variants.find(
          (variant) => variant.name && variant.name.toLowerCase().includes("original")
        );
        return originalVariant ? originalVariant.price : null;
      }
      return null;
    };
    const getImageUrl = (imagePath) => {
      if (!imagePath) return "";
      if (imagePath.startsWith("http")) return imagePath;
      if (imagePath.startsWith("/storage/")) return `https://sdev.apratifoods.asia${imagePath}`;
      return `https://sdev.apratifoods.asia/${imagePath}`;
    };
    watch(() => productForm.value.name, (newName) => {
      if (!isEditing.value) {
        productForm.value.slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      }
    });
    useSeoMeta({
      title: () => brand.value ? `${brand.value.name} Products - Admin` : "Brand Products - Admin",
      description: "Manage products for brand"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><nav class="bg-white shadow-b"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="flex items-center space-x-4">`);
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
      _push(`<div class="h-6 w-px bg-gray-300"></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/brands",
        class: "text-blue-600 hover:text-blue-800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` All Brands `);
          } else {
            return [
              createTextVNode(" All Brands ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(brand)?.name)} Products </h1></div><div class="flex items-center space-x-4"><button${ssrIncludeBooleanAttr(unref(loading) || unref(productsLoading)) ? " disabled" : ""} class="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 text-blue-700 disabled:text-gray-400 rounded-lg transition-colors duration-200"><svg class="${ssrRenderClass([{ "animate-spin": unref(productsLoading) }, "w-4 h-4 mr-2"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>`);
      if (unref(productsLoading)) {
        _push(`<span>Refreshing...</span>`);
      } else {
        _push(`<span>Refresh</span>`);
      }
      _push(`</button><span class="text-gray-600">Welcome, Admin</span><button class="text-red-600 hover:text-red-800">Logout</button></div></div></div></nav>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center items-center py-12"><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div><p class="ml-4 text-gray-600">Loading brand and products...</p></div>`);
      } else if (unref(brand)) {
        _push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="bg-white rounded-lg shadow-lg p-6 mb-8"><div class="flex items-center justify-between"><div class="flex items-center">`);
        if (unref(brand).logo_url) {
          _push(`<div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4"><img${ssrRenderAttr("src", unref(brand).logo_url)}${ssrRenderAttr("alt", unref(brand).name)} class="max-w-full max-h-full object-contain"></div>`);
        } else {
          _push(`<div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4"><svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg></div>`);
        }
        _push(`<div><h2 class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(brand).name)}</h2><p class="text-gray-600 mt-1">${ssrInterpolate(unref(brand).description || "No description available")}</p><div class="flex items-center mt-2"><span class="${ssrRenderClass([unref(brand).is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800", "px-2 py-1 text-xs font-semibold rounded-full"])}">${ssrInterpolate(unref(brand).is_active ? "Active" : "Inactive")}</span>`);
        if (unref(brand).established_year) {
          _push(`<span class="ml-3 text-sm text-gray-500"> Est. ${ssrInterpolate(unref(brand).established_year)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div><div class="text-right"><div class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(products).length)}</div><div class="text-sm text-gray-600">Total Products</div></div></div></div><div class="bg-white rounded-lg shadow-lg p-6 mb-8"><div class="flex justify-between items-center"><div><h3 class="text-xl font-bold text-gray-900">Products Management</h3><p class="text-gray-600">Manage products for ${ssrInterpolate(unref(brand).name)}</p></div><button class="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> Add New Product </button></div></div><div class="bg-white rounded-lg shadow-lg overflow-hidden"><div class="px-6 py-4 border-b border-gray-200"><div class="flex items-center justify-between"><h4 class="text-lg font-semibold text-gray-900">All Products</h4><div class="flex items-center space-x-4"><span class="text-sm text-gray-600">${ssrInterpolate(unref(products).length)} products</span>`);
        if (unref(productsLoading)) {
          _push(`<div class="flex items-center"><div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div><span class="ml-2 text-sm text-gray-600">Loading...</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div><div class="overflow-x-auto">`);
        if (unref(productsLoading)) {
          _push(`<div class="p-12 text-center"><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div><p class="text-gray-600">Loading products...</p></div>`);
        } else {
          _push(`<table class="w-full"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200">`);
          if (unref(products).length === 0) {
            _push(`<tr><td colspan="6" class="px-6 py-12 text-center"><div class="flex flex-col items-center"><svg class="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg><h3 class="text-lg font-medium text-gray-900 mb-2">No products found</h3><p class="text-gray-600 mb-4">Create your first product for ${ssrInterpolate(unref(brand).name)}</p><button class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> Add First Product </button></div></td></tr>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--[-->`);
          ssrRenderList(unref(products), (product) => {
            _push(`<tr class="hover:bg-gray-50"><td class="px-6 py-4"><div class="flex items-center"><div class="w-12 h-12 bg-gray-100 rounded-lg mr-4 flex-shrink-0">`);
            if (product.images && product.images.length > 0) {
              _push(`<img${ssrRenderAttr("src", getImageUrl(product.images[0]))}${ssrRenderAttr("alt", product.name)} class="w-full h-full object-cover rounded-lg">`);
            } else {
              _push(`<div class="w-full h-full flex items-center justify-center text-gray-400"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>`);
            }
            _push(`</div><div><div class="text-sm font-medium text-gray-900">${ssrInterpolate(product.name)}</div><div class="text-sm text-gray-500">${ssrInterpolate(product.sku || "No SKU")}</div><div class="text-xs text-gray-400 mt-1">${ssrInterpolate(product.category || "Uncategorized")}</div></div></div></td><td class="px-6 py-4 whitespace-nowrap"><div class="text-sm font-medium text-gray-900"> $${ssrInterpolate(getDisplayPrice(product))}</div>`);
            if (product.cost_price) {
              _push(`<div class="text-xs text-gray-500">Cost: $${ssrInterpolate(product.cost_price)}</div>`);
            } else {
              _push(`<!---->`);
            }
            if (getOriginalVariantPrice(product)) {
              _push(`<div class="text-xs text-blue-600"> Original: $${ssrInterpolate(getOriginalVariantPrice(product))}</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</td><td class="px-6 py-4 whitespace-nowrap"><div class="text-sm text-gray-900">${ssrInterpolate(product.stock_quantity || 0)}</div>`);
            if (product.min_stock_level) {
              _push(`<div class="text-xs text-gray-500">Min: ${ssrInterpolate(product.min_stock_level)}</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</td><td class="px-6 py-4 whitespace-nowrap"><span class="${ssrRenderClass([product.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800", "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"])}">${ssrInterpolate(product.is_active ? "Active" : "Inactive")}</span>`);
            if (product.is_featured) {
              _push(`<div class="mt-1"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"> Featured </span></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ssrInterpolate(_ctx.formatDate(product.created_at))}</td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium"><div class="flex items-center space-x-3"><button class="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg> Edit </button><button class="inline-flex items-center px-3 py-1 border border-red-300 text-sm font-medium rounded-lg text-red-700 bg-white hover:bg-red-50 transition-colors"><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg> Delete </button></div></td></tr>`);
          });
          _push(`<!--]--></tbody></table>`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"><div class="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto shadow-xl"><div class="px-6 py-4 border-b border-gray-200 bg-gray-50"><div class="flex items-center justify-between"><h3 class="text-lg font-semibold text-gray-900">${ssrInterpolate(unref(isEditing) ? "Edit Product" : "Add New Product")}</h3><button class="text-gray-400 hover:text-gray-600 transition-colors"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div><form class="px-6 py-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-2">Product Name *</label><input${ssrRenderAttr("value", unref(productForm).name)} type="text" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter product name"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">SKU</label><input${ssrRenderAttr("value", unref(productForm).sku)} type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Product SKU"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Part Number</label><input${ssrRenderAttr("value", unref(productForm).part_number)} type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Part number"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Category</label><input${ssrRenderAttr("value", unref(productForm).category)} type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Product category"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Short Description</label><textarea rows="2" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Brief product description">${ssrInterpolate(unref(productForm).short_description)}</textarea></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Description</label><textarea rows="4" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Detailed product description">${ssrInterpolate(unref(productForm).description)}</textarea></div></div><div class="space-y-4"><div class="grid grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-2">Price *</label><input${ssrRenderAttr("value", unref(productForm).price)} type="number" step="0.01" min="0" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0.00"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Cost Price</label><input${ssrRenderAttr("value", unref(productForm).cost_price)} type="number" step="0.01" min="0" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0.00"></div></div><div class="grid grid-cols-3 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-2">Stock</label><input${ssrRenderAttr("value", unref(productForm).stock_quantity)} type="number" min="0" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Min Stock</label><input${ssrRenderAttr("value", unref(productForm).min_stock_level)} type="number" min="0" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Max Stock</label><input${ssrRenderAttr("value", unref(productForm).max_stock_level)} type="number" min="0" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0"></div></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label><input${ssrRenderAttr("value", unref(productForm).weight)} type="number" step="0.01" min="0" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0.00"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Product Images (URLs)</label><div class="space-y-2"><!--[-->`);
        ssrRenderList(unref(productForm).images, (image, index) => {
          _push(`<div class="flex gap-2"><input${ssrRenderAttr("value", unref(productForm).images[index])} type="url" class="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://example.com/image.jpg"><button type="button" class="px-3 py-2 text-red-600 hover:text-red-800"> Remove </button></div>`);
        });
        _push(`<!--]--><button type="button" class="text-blue-600 hover:text-blue-800 text-sm"> + Add Image URL </button></div></div><div class="space-y-3"><div class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(unref(productForm).is_active) ? ssrLooseContain(unref(productForm).is_active, null) : unref(productForm).is_active) ? " checked" : ""} type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"><label class="ml-2 block text-sm text-gray-900">Active</label></div><div class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(unref(productForm).is_featured) ? ssrLooseContain(unref(productForm).is_featured, null) : unref(productForm).is_featured) ? " checked" : ""} type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"><label class="ml-2 block text-sm text-gray-900">Featured Product</label></div></div></div></div><div class="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200 bg-gray-50 px-6 py-4"><button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors">`);
        if (unref(saving)) {
          _push(`<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(unref(saving) ? "Saving..." : unref(isEditing) ? "Update Product" : "Create Product")}</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showDeleteModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-white rounded-lg max-w-md w-full mx-4 shadow-xl"><div class="px-6 py-4 border-b border-gray-200"><h3 class="text-lg font-semibold text-gray-900">Delete Product</h3></div><div class="px-6 py-4"><div class="flex items-center mb-4"><div class="flex-shrink-0"><svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5C3.312 17.333 4.271 19 5.81 19z"></path></svg></div><div class="ml-3"><p class="text-gray-600"> Are you sure you want to delete &quot;<strong>${ssrInterpolate(unref(productToDelete)?.name)}</strong>&quot;? This action cannot be undone. </p></div></div></div><div class="px-6 py-4 bg-gray-50 flex justify-end space-x-3 rounded-b-lg"><button class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"> Cancel </button><button${ssrIncludeBooleanAttr(unref(deleting)) ? " disabled" : ""} class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors">`);
        if (unref(deleting)) {
          _push(`<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(unref(deleting) ? "Deleting..." : "Delete Product")}</button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/brands/[slug]/products.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=products-Df-VeqrS.mjs.map
