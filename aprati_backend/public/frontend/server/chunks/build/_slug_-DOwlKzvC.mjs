import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, computed, mergeProps, unref, withCtx, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _imports_12, a as _imports_13, b as _imports_14, c as _imports_15, d as _imports_10, e as _imports_11 } from './virtual_public-B_jtVuV9.mjs';
import { g as useRoute, a as useSeoMeta, b as useRuntimeConfig } from './server.mjs';
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
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const runtimeConfig = useRuntimeConfig();
    const product = ref(null);
    const loading = ref(true);
    const error = ref(false);
    const currentImageIndex = ref(0);
    const selectedVariant = ref({});
    const productVariants = ref([]);
    route.params.slug;
    const currentImage = computed(() => {
      if (product.value?.images && product.value.images.length > 0) {
        return product.value.images[currentImageIndex.value];
      }
      if (product.value?.image_url) {
        return product.value.image_url;
      }
      return null;
    });
    const getImageUrl = (imagePath) => {
      if (!imagePath) return "/images/default-info.jpg";
      if (imagePath.startsWith("data:")) return imagePath;
      if (imagePath.startsWith("http")) return imagePath;
      if (imagePath.startsWith("/storage/")) return `${runtimeConfig.public.apiBaseUrl}${imagePath}`;
      return imagePath;
    };
    const formatSpecKey = (key) => {
      return key.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    };
    const getCurrentPrice = () => {
      if (productVariants.value && productVariants.value.length > 0) {
        const originalVariant = productVariants.value.find(
          (variant) => variant.name && variant.name.toLowerCase().includes("original")
        );
        if (originalVariant && originalVariant.price) {
          return originalVariant.price;
        }
      }
      return selectedVariant.value.price || product.value?.price || 0;
    };
    useSeoMeta({
      title: () => product.value ? `${product.value.name} - ${product.value.brand?.name || "Aprati"} - Aprati Food Company` : "Product - Aprati Food Company",
      description: () => product.value ? product.value.short_description || product.value.description : "Premium food product details"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 relative overflow-hidden" }, _attrs))}><div class="absolute inset-0 overflow-hidden pointer-events-none"><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-1/6 left-1/6 w-20 h-20 object-contain opacity-15 animate-float"><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-1/4 right-1/6 w-20 h-20 object-contain opacity-18 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.5s" })}"><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute bottom-1/3 left-1/4 w-16 h-16 object-contain opacity-12 animate-float" style="${ssrRenderStyle({ "animation-delay": "1s" })}"><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute top-1/2 right-1/4 w-16 h-16 object-contain opacity-20 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.5s" })}"><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute bottom-1/6 right-1/3 w-14 h-14 object-contain opacity-16 animate-float" style="${ssrRenderStyle({ "animation-delay": "2s" })}"><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute top-2/3 left-1/6 w-20 h-20 object-contain opacity-14 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.8s" })}"><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute bottom-1/4 right-1/6 w-14 h-14 object-contain opacity-15 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.2s" })}"><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-3/4 left-1/3 w-16 h-16 object-contain opacity-18 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.8s" })}"><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-1/5 right-1/5 w-20 h-20 object-contain opacity-13 animate-float" style="${ssrRenderStyle({ "animation-delay": "2.3s" })}"><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute bottom-2/5 left-1/5 w-16 h-16 object-contain opacity-17 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.3s" })}"><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-2/5 left-2/5 w-14 h-14 object-contain opacity-10 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.4s" })}"><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute bottom-3/5 right-2/5 w-20 h-20 object-contain opacity-16 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.7s" })}"><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-4/5 left-1/4 w-16 h-16 object-contain opacity-12 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.9s" })}"><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute bottom-4/5 right-1/4 w-14 h-14 object-contain opacity-15 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.4s" })}"><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-1/3 left-2/3 w-16 h-16 object-contain opacity-18 animate-float" style="${ssrRenderStyle({ "animation-delay": "2.1s" })}"><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute bottom-1/5 right-2/3 w-20 h-20 object-contain opacity-14 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.6s" })}"></div>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center items-center min-h-screen"><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div><p class="ml-4 text-gray-600">Loading product details...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="min-h-screen flex items-center justify-center"><div class="text-center"><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg><h3 class="mt-2 text-sm font-medium text-gray-900">Product Not Found</h3><p class="mt-1 text-sm text-gray-500">The product you&#39;re looking for doesn&#39;t exist or has been removed.</p><div class="mt-6">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/brands",
          class: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="mr-2 -ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg> Back to Brands `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "mr-2 -ml-1 h-4 w-4",
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
                ])),
                createTextVNode(" Back to Brands ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else if (unref(product)) {
        _push(`<div><div class="bg-white border-b"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"><nav class="flex" aria-label="Breadcrumb"><ol class="flex items-center space-x-4"><li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "text-gray-400 hover:text-gray-500"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="flex-shrink-0 h-5 w-5" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"${_scopeId}></path></svg><span class="sr-only"${_scopeId}>Home</span>`);
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
        _push(`</li><li><div class="flex items-center"><svg class="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/brands",
          class: "ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Brands `);
            } else {
              return [
                createTextVNode(" Brands ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></li>`);
        if (unref(product).brand) {
          _push(`<li><div class="flex items-center"><svg class="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/brands/${unref(product).brand.slug}`,
            class: "ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(product).brand.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(product).brand.name), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<li><div class="flex items-center"><svg class="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg><span class="ml-4 text-sm font-medium text-gray-500">${ssrInterpolate(unref(product).name)}</span></div></li></ol></nav></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="grid grid-cols-1 lg:grid-cols-2 gap-8"><div class="space-y-4"><div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">`);
        if (unref(product).images && unref(product).images.length > 0 || unref(product).image_url) {
          _push(`<div><img${ssrRenderAttr("src", getImageUrl(unref(currentImage)))}${ssrRenderAttr("alt", unref(product).name)} class="w-full h-full object-cover"></div>`);
        } else {
          _push(`<div class="w-full h-full flex items-center justify-center text-gray-400"><div class="text-center"><svg class="h-24 w-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg><p class="text-lg">No Image Available</p></div></div>`);
        }
        _push(`</div>`);
        if (unref(product).images && unref(product).images.length > 1) {
          _push(`<div class="grid grid-cols-4 gap-2"><!--[-->`);
          ssrRenderList(unref(product).images, (image, index) => {
            _push(`<button class="${ssrRenderClass([unref(currentImageIndex) === index ? "border-blue-500" : "border-transparent hover:border-gray-300", "aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors"])}"><img${ssrRenderAttr("src", getImageUrl(image))}${ssrRenderAttr("alt", `${unref(product).name} view ${index + 1}`)} class="w-full h-full object-cover"></button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="space-y-6">`);
        if (unref(product).brand) {
          _push(`<div class="flex flex-col items-center space-y-3">`);
          if (unref(product).brand.logo_url || unref(product).brand.logo) {
            _push(`<img${ssrRenderAttr("src", getImageUrl(unref(product).brand.logo_url || unref(product).brand.logo))}${ssrRenderAttr("alt", unref(product).brand.name)} class="w-20 h-20 object-contain">`);
          } else {
            _push(`<!---->`);
          }
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/brands/${unref(product).brand.slug}`,
            class: "text-blue-600 hover:text-blue-800 font-medium text-lg text-center"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(product).brand.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(product).brand.name), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="bg-white rounded-lg border border-gray-200 p-6 space-y-4"><h3 class="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>`);
        if (unref(product).name) {
          _push(`<div class="flex flex-col"><span class="text-sm font-medium text-gray-500 mb-1">Product Name</span><span class="text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded">${ssrInterpolate(unref(product).name)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">`);
        if (unref(product).sku) {
          _push(`<div class="flex flex-col"><span class="text-sm font-medium text-gray-500 mb-1">SKU</span><span class="text-sm text-gray-900 font-mono bg-grasy-50 px-2 py-1 rounded">${ssrInterpolate(unref(product).sku)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(selectedVariant).price || unref(product).price) {
          _push(`<div class="flex flex-col"><span class="text-sm font-medium text-gray-500 mb-1">Price</span><span class="text-sm font-mono bg-blue-50 px-2 py-1 rounded text-blue-700 font-semibold">$${ssrInterpolate(getCurrentPrice())}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(product).weight) {
          _push(`<div class="flex flex-col"><span class="text-sm font-medium text-gray-500 mb-1">Weight</span><span class="text-sm text-gray-900 bg-gray-50 px-2 py-1 rounded">${ssrInterpolate(unref(product).weight)} kg</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(product).brand) {
          _push(`<div class="flex flex-col"><span class="text-sm font-medium text-gray-500 mb-1">Brand</span><span class="text-sm text-gray-900 bg-gray-50 px-2 py-1 rounded">${ssrInterpolate(unref(product).brand.name)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(product).category) {
          _push(`<div class="flex flex-col"><span class="text-sm font-medium text-gray-500 mb-1">Category</span><span class="text-sm text-gray-900 bg-gray-50 px-2 py-1 rounded">${ssrInterpolate(unref(product).category)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(productVariants).length > 0) {
          _push(`<div class="flex flex-col"><span class="text-sm font-medium text-gray-500 mb-1">Available Variants</span><span class="text-sm text-gray-900 bg-gray-50 px-2 py-1 rounded">${ssrInterpolate(unref(productVariants).length)} flavor${ssrInterpolate(unref(productVariants).length > 1 ? "s" : "")}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex flex-col"><span class="text-sm font-medium text-gray-500 mb-1">Product Status</span><span class="text-sm text-green-700 bg-green-50 px-2 py-1 rounded">Active Product</span></div></div>`);
        if (unref(product).is_featured) {
          _push(`<div class="mt-4 pt-4 border-t border-gray-200"><div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800"><svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg> Featured Product </div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
        if (unref(product).description) {
          _push(`<div class="mt-12"><div class="bg-white rounded-lg shadow-lg p-8"><h2 class="text-2xl font-bold text-gray-900 mb-6">Product Description</h2><div class="prose max-w-none text-gray-600"><p class="whitespace-pre-line">${ssrInterpolate(unref(product).description)}</p></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(product).technical_specs && Object.keys(unref(product).technical_specs).length > 0) {
          _push(`<div class="mt-8"><div class="bg-white rounded-lg shadow-lg p-8"><h2 class="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><!--[-->`);
          ssrRenderList(unref(product).technical_specs, (value, key) => {
            _push(`<div class="flex justify-between py-2 border-b border-gray-200"><span class="font-medium text-gray-900">${ssrInterpolate(formatSpecKey(key))}:</span><span class="text-gray-600">${ssrInterpolate(value)}</span></div>`);
          });
          _push(`<!--]--></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="mt-8 text-center"><div class="flex justify-center items-center space-x-4"><a href="https://t.me/aprati_order_bot" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-8 py-3 border border-transparent text-base font-bold rounded-lg text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"><svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> Order Now </a><button${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="flex items-center px-4 py-2 bg-green-100 hover:bg-green-200 disabled:bg-gray-100 text-green-700 disabled:text-gray-400 rounded-lg transition-colors duration-200"><svg class="${ssrRenderClass([{ "animate-spin": unref(loading) }, "w-4 h-4 mr-2"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>`);
        if (unref(loading)) {
          _push(`<span>Refreshing...</span>`);
        } else {
          _push(`<span>Refresh Price</span>`);
        }
        _push(`</button>`);
        if (unref(product).brand) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/brands/${unref(product).brand.slug}`,
            class: "inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg class="mr-2 -ml-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg> Back to ${ssrInterpolate(unref(product).brand.name)} Products `);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    class: "mr-2 -ml-1 h-5 w-5",
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
                  ])),
                  createTextVNode(" Back to " + toDisplayString(unref(product).brand.name) + " Products ", 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-DOwlKzvC.mjs.map
