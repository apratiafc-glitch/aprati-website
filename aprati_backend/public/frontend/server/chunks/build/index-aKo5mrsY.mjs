import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, computed, mergeProps, unref, withCtx, createBlock, createVNode, openBlock, createCommentVNode, toDisplayString, createTextVNode, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _imports_12, a as _imports_13, b as _imports_14, c as _imports_15, d as _imports_10, e as _imports_11 } from './virtual_public-B_jtVuV9.mjs';
import { a as useSeoMeta, b as useRuntimeConfig } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/ufo/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/h3/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/destr/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/hookable/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/ofetch/dist/node.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const runtimeConfig = useRuntimeConfig();
    const products = ref([]);
    const brands = ref([]);
    const categories = ref([]);
    const loading = ref(true);
    const pagination = ref({});
    const filters = ref({
      search: "",
      brand_id: "",
      category: "",
      featured: false,
      page: 1
    });
    const visiblePages = computed(() => {
      const current = pagination.value.current_page || 1;
      const total = pagination.value.last_page || 1;
      const delta = 2;
      const range = [];
      for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
        range.push(i);
      }
      return range;
    });
    const getImageUrl = (imagePath) => {
      if (!imagePath) return "";
      if (imagePath.startsWith("data:")) return imagePath;
      if (imagePath.startsWith("http")) return imagePath;
      if (imagePath.startsWith("/storage/")) {
        return `${runtimeConfig.public.apiBaseUrl}${imagePath}`;
      }
      return `${runtimeConfig.public.apiBaseUrl}/storage/${imagePath}`;
    };
    const handleProductImageError = (event, product) => {
      return;
    };
    const getProductPrice = (product) => {
      if (product.variants && product.variants.length > 0) {
        const originalVariant = product.variants.find(
          (variant) => variant.name && variant.name.toLowerCase().includes("original")
        );
        if (originalVariant && originalVariant.price) {
          return originalVariant.price;
        }
      }
      if (product.price) return product.price;
      if (product.variants && product.variants.length > 0) {
        const variantWithPrice = product.variants.find((variant) => variant.price);
        return variantWithPrice ? variantWithPrice.price : null;
      }
      return null;
    };
    useSeoMeta({
      title: "All Products - Aprati Food Company",
      description: "Browse our complete collection of premium food products from all brands including Aprati, Frutati, and Mocati."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 relative overflow-hidden" }, _attrs))} data-v-bf7cfcb9><div class="absolute inset-0 overflow-hidden pointer-events-none" data-v-bf7cfcb9><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-1/6 left-1/6 w-20 h-20 object-contain opacity-15 animate-float" data-v-bf7cfcb9><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-1/4 right-1/6 w-20 h-20 object-contain opacity-18 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.5s" })}" data-v-bf7cfcb9><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-1/3 left-1/4 w-16 h-16 object-contain opacity-12 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.8s" })}" data-v-bf7cfcb9><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute top-2/5 right-1/4 w-16 h-16 object-contain opacity-16 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.2s" })}" data-v-bf7cfcb9><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-1/2 left-1/3 w-14 h-14 object-contain opacity-10 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.3s" })}" data-v-bf7cfcb9><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute top-3/5 right-1/3 w-20 h-20 object-contain opacity-14 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.5s" })}" data-v-bf7cfcb9><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute bottom-1/4 left-1/5 w-16 h-16 object-contain opacity-13 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.7s" })}" data-v-bf7cfcb9><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute bottom-1/3 right-1/5 w-16 h-16 object-contain opacity-17 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.8s" })}" data-v-bf7cfcb9><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-1/5 right-2/5 w-20 h-20 object-contain opacity-11 animate-float" style="${ssrRenderStyle({ "animation-delay": "1s" })}" data-v-bf7cfcb9><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute bottom-2/5 left-2/5 w-20 h-20 object-contain opacity-15 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.4s" })}" data-v-bf7cfcb9><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-3/4 left-1/6 w-14 h-14 object-contain opacity-12 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.4s" })}" data-v-bf7cfcb9><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute bottom-1/5 right-1/6 w-20 h-20 object-contain opacity-18 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "2s" })}" data-v-bf7cfcb9><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-2/3 right-3/5 w-16 h-16 object-contain opacity-14 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.6s" })}" data-v-bf7cfcb9><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute bottom-1/6 left-3/5 w-14 h-14 object-contain opacity-16 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "2.2s" })}" data-v-bf7cfcb9><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-1/2 right-1/5 w-16 h-16 object-contain opacity-13 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.9s" })}" data-v-bf7cfcb9><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute bottom-2/6 left-1/4 w-16 h-16 object-contain opacity-15 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.1s" })}" data-v-bf7cfcb9><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-4/5 right-2/5 w-14 h-14 object-contain opacity-11 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.9s" })}" data-v-bf7cfcb9><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute bottom-3/5 right-1/4 w-20 h-20 object-contain opacity-17 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.3s" })}" data-v-bf7cfcb9></div><div class="bg-white border-b" data-v-bf7cfcb9><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-v-bf7cfcb9><div class="flex justify-between items-center" data-v-bf7cfcb9><div data-v-bf7cfcb9><h1 class="text-3xl font-bold text-gray-900" data-v-bf7cfcb9>All Products</h1><p class="mt-2 text-gray-600" data-v-bf7cfcb9>Discover our complete range of premium food products</p></div><div class="text-sm text-gray-500" data-v-bf7cfcb9>${ssrInterpolate(unref(pagination).total || unref(products).length)} products </div></div></div></div><div class="bg-white border-b" data-v-bf7cfcb9><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" data-v-bf7cfcb9><nav class="flex" aria-label="Breadcrumb" data-v-bf7cfcb9><ol class="flex items-center space-x-4" data-v-bf7cfcb9><li data-v-bf7cfcb9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-gray-400 hover:text-gray-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="flex-shrink-0 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" data-v-bf7cfcb9${_scopeId}><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" data-v-bf7cfcb9${_scopeId}></path></svg><span class="sr-only" data-v-bf7cfcb9${_scopeId}>Home</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "flex-shrink-0 h-5 w-5",
                fill: "currentColor",
                viewBox: "0 0 20 20"
              }, [
                createVNode("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" })
              ])),
              createVNode("span", { class: "sr-only" }, "Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-bf7cfcb9><div class="flex items-center" data-v-bf7cfcb9><svg class="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20" data-v-bf7cfcb9><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-bf7cfcb9></path></svg><span class="ml-4 text-sm font-medium text-gray-500" data-v-bf7cfcb9>Products</span></div></li></ol></nav></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" data-v-bf7cfcb9><div class="bg-white rounded-lg shadow p-6 mb-6" data-v-bf7cfcb9><div class="grid grid-cols-1 md:grid-cols-4 gap-4" data-v-bf7cfcb9><div class="md:col-span-2" data-v-bf7cfcb9><label class="block text-sm font-medium text-gray-700 mb-2" data-v-bf7cfcb9>Search Products</label><input${ssrRenderAttr("value", unref(filters).search)} type="text" placeholder="Search by name, SKU, or description..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-bf7cfcb9></div><div data-v-bf7cfcb9><label class="block text-sm font-medium text-gray-700 mb-2" data-v-bf7cfcb9>Brand</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-bf7cfcb9><option value="" data-v-bf7cfcb9${ssrIncludeBooleanAttr(Array.isArray(unref(filters).brand_id) ? ssrLooseContain(unref(filters).brand_id, "") : ssrLooseEqual(unref(filters).brand_id, "")) ? " selected" : ""}>All Brands</option><!--[-->`);
      ssrRenderList(unref(brands), (brand) => {
        _push(`<option${ssrRenderAttr("value", brand.id)} data-v-bf7cfcb9${ssrIncludeBooleanAttr(Array.isArray(unref(filters).brand_id) ? ssrLooseContain(unref(filters).brand_id, brand.id) : ssrLooseEqual(unref(filters).brand_id, brand.id)) ? " selected" : ""}>${ssrInterpolate(brand.name)}</option>`);
      });
      _push(`<!--]--></select></div><div data-v-bf7cfcb9><label class="block text-sm font-medium text-gray-700 mb-2" data-v-bf7cfcb9>Category</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-bf7cfcb9><option value="" data-v-bf7cfcb9${ssrIncludeBooleanAttr(Array.isArray(unref(filters).category) ? ssrLooseContain(unref(filters).category, "") : ssrLooseEqual(unref(filters).category, "")) ? " selected" : ""}>All Categories</option><!--[-->`);
      ssrRenderList(unref(categories), (category) => {
        _push(`<option${ssrRenderAttr("value", category)} data-v-bf7cfcb9${ssrIncludeBooleanAttr(Array.isArray(unref(filters).category) ? ssrLooseContain(unref(filters).category, category) : ssrLooseEqual(unref(filters).category, category)) ? " selected" : ""}>${ssrInterpolate(category)}</option>`);
      });
      _push(`<!--]--></select></div></div></div></div>`);
      if (unref(loading)) {
        _push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-bf7cfcb9><div class="text-center py-12" data-v-bf7cfcb9><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" data-v-bf7cfcb9></div><p class="mt-4 text-gray-600" data-v-bf7cfcb9>Loading products...</p></div></div>`);
      } else if (unref(products).length > 0) {
        _push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12" data-v-bf7cfcb9><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-v-bf7cfcb9><!--[-->`);
        ssrRenderList(unref(products), (product) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: product.id,
            to: `/products/${product.slug}`,
            class: "bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer group"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden" data-v-bf7cfcb9${_scopeId}>`);
                if (product.images && product.images.length > 0) {
                  _push2(`<div data-v-bf7cfcb9${_scopeId}><img${ssrRenderAttr("src", getImageUrl(product.images[0]))}${ssrRenderAttr("alt", product.name)} class="max-w-full max-h-full object-cover group-hover:scale-105 transition-transform" data-v-bf7cfcb9${_scopeId}></div>`);
                } else {
                  _push2(`<div class="text-gray-400" data-v-bf7cfcb9${_scopeId}><svg class="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-bf7cfcb9${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" data-v-bf7cfcb9${_scopeId}></path></svg></div>`);
                }
                _push2(`</div>`);
                if (product.brand) {
                  _push2(`<div class="flex items-center mb-2" data-v-bf7cfcb9${_scopeId}>`);
                  if (product.brand.logo_url || product.brand.logo) {
                    _push2(`<img${ssrRenderAttr("src", getImageUrl(product.brand.logo_url || product.brand.logo))}${ssrRenderAttr("alt", product.brand.name)} class="w-5 h-5 object-contain mr-2" data-v-bf7cfcb9${_scopeId}>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<span class="text-xs text-blue-600 font-medium" data-v-bf7cfcb9${_scopeId}>${ssrInterpolate(product.brand.name)}</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<h3 class="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors" data-v-bf7cfcb9${_scopeId}>${ssrInterpolate(product.name)}</h3><p class="text-sm text-gray-600 mb-3 line-clamp-2" data-v-bf7cfcb9${_scopeId}>${ssrInterpolate(product.short_description || product.description)}</p><div class="mb-3" data-v-bf7cfcb9${_scopeId}>`);
                if (getProductPrice(product)) {
                  _push2(`<div class="text-lg font-bold text-green-600" data-v-bf7cfcb9${_scopeId}> $${ssrInterpolate(getProductPrice(product).toFixed(2))}</div>`);
                } else {
                  _push2(`<div class="text-sm text-gray-500" data-v-bf7cfcb9${_scopeId}> Price not available </div>`);
                }
                _push2(`</div><div class="space-y-1" data-v-bf7cfcb9${_scopeId}>`);
                if (product.sku) {
                  _push2(`<div class="text-xs text-gray-500" data-v-bf7cfcb9${_scopeId}> SKU: ${ssrInterpolate(product.sku)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="flex items-center justify-between" data-v-bf7cfcb9${_scopeId}><div class="text-xs text-gray-500" data-v-bf7cfcb9${_scopeId}>${ssrInterpolate(product.stock_quantity > 0 ? "In Stock" : "Out of Stock")}</div>`);
                if (product.is_featured) {
                  _push2(`<div class="flex items-center text-xs text-orange-600" data-v-bf7cfcb9${_scopeId}><svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" data-v-bf7cfcb9${_scopeId}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-v-bf7cfcb9${_scopeId}></path></svg> Featured </div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              } else {
                return [
                  createVNode("div", { class: "aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden" }, [
                    product.images && product.images.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("img", {
                        src: getImageUrl(product.images[0]),
                        alt: product.name,
                        class: "max-w-full max-h-full object-cover group-hover:scale-105 transition-transform",
                        onError: ($event) => handleProductImageError()
                      }, null, 40, ["src", "alt", "onError"])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-gray-400"
                    }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-12 w-12",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        })
                      ]))
                    ]))
                  ]),
                  product.brand ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex items-center mb-2"
                  }, [
                    product.brand.logo_url || product.brand.logo ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: getImageUrl(product.brand.logo_url || product.brand.logo),
                      alt: product.brand.name,
                      class: "w-5 h-5 object-contain mr-2",
                      onError: _ctx.handleBrandLogoError
                    }, null, 40, ["src", "alt", "onError"])) : createCommentVNode("", true),
                    createVNode("span", { class: "text-xs text-blue-600 font-medium" }, toDisplayString(product.brand.name), 1)
                  ])) : createCommentVNode("", true),
                  createVNode("h3", { class: "font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors" }, toDisplayString(product.name), 1),
                  createVNode("p", { class: "text-sm text-gray-600 mb-3 line-clamp-2" }, toDisplayString(product.short_description || product.description), 1),
                  createVNode("div", { class: "mb-3" }, [
                    getProductPrice(product) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-lg font-bold text-green-600"
                    }, " $" + toDisplayString(getProductPrice(product).toFixed(2)), 1)) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-sm text-gray-500"
                    }, " Price not available "))
                  ]),
                  createVNode("div", { class: "space-y-1" }, [
                    product.sku ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-xs text-gray-500"
                    }, " SKU: " + toDisplayString(product.sku), 1)) : createCommentVNode("", true),
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "text-xs text-gray-500" }, toDisplayString(product.stock_quantity > 0 ? "In Stock" : "Out of Stock"), 1),
                      product.is_featured ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center text-xs text-orange-600"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-3 h-3 mr-1",
                          fill: "currentColor",
                          viewBox: "0 0 20 20"
                        }, [
                          createVNode("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
                        ])),
                        createTextVNode(" Featured ")
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
        if (unref(pagination) && unref(pagination).last_page > 1) {
          _push(`<div class="mt-12 flex justify-center" data-v-bf7cfcb9><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination" data-v-bf7cfcb9><button${ssrIncludeBooleanAttr(unref(pagination).current_page === 1) ? " disabled" : ""} class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" data-v-bf7cfcb9><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" data-v-bf7cfcb9><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" data-v-bf7cfcb9></path></svg></button><!--[-->`);
          ssrRenderList(unref(visiblePages), (page) => {
            _push(`<button class="${ssrRenderClass([page === unref(pagination).current_page ? "z-10 bg-blue-50 border-blue-500 text-blue-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50", "relative inline-flex items-center px-4 py-2 border text-sm font-medium"])}" data-v-bf7cfcb9>${ssrInterpolate(page)}</button>`);
          });
          _push(`<!--]--><button${ssrIncludeBooleanAttr(unref(pagination).current_page === unref(pagination).last_page) ? " disabled" : ""} class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" data-v-bf7cfcb9><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" data-v-bf7cfcb9><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-bf7cfcb9></path></svg></button></nav></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-v-bf7cfcb9><div class="text-center" data-v-bf7cfcb9><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-bf7cfcb9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" data-v-bf7cfcb9></path></svg><h3 class="mt-2 text-sm font-medium text-gray-900" data-v-bf7cfcb9>No products found</h3><p class="mt-1 text-sm text-gray-500" data-v-bf7cfcb9>Try adjusting your search or filter criteria.</p><div class="mt-6" data-v-bf7cfcb9>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/brands",
          class: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Browse by Brand `);
            } else {
              return [
                createTextVNode(" Browse by Brand ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bf7cfcb9"]]);

export { index as default };
//# sourceMappingURL=index-aKo5mrsY.mjs.map
