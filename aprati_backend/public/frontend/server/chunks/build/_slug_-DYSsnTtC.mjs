import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { computed, ref, mergeProps, unref, withCtx, createBlock, createTextVNode, openBlock, createVNode, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _imports_12, a as _imports_13, b as _imports_14, c as _imports_15, d as _imports_10, e as _imports_11 } from './virtual_public-B_jtVuV9.mjs';
import { g as useRoute, a as useSeoMeta, b as useRuntimeConfig } from './server.mjs';
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
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const runtimeConfig = useRuntimeConfig();
    route?.params?.slug || "";
    const isAdmin = computed(() => {
      return false;
    });
    const brand = ref(null);
    const products = ref([]);
    const loading = ref(true);
    const productsLoading = ref(false);
    const error = ref(null);
    const selectedCategoryFilter = ref("");
    const showProductModal = ref(false);
    const selectedProduct = ref(null);
    const currentProductImageIndex = ref(0);
    const currentProductImage = computed(() => {
      if (!selectedProduct.value?.images || selectedProduct.value.images.length === 0) return null;
      return selectedProduct.value.images[currentProductImageIndex.value];
    });
    const productsByCategory = computed(() => {
      if (!products.value || products.value.length === 0) return {};
      let filteredProducts = products.value;
      if (selectedCategoryFilter.value) {
        filteredProducts = products.value.filter((product) => {
          const categoryName = product.category?.name || "Uncategorized";
          return categoryName === selectedCategoryFilter.value;
        });
      }
      const grouped = {};
      filteredProducts.forEach((product) => {
        const categoryName = product.category?.name || "Uncategorized";
        const categoryColor = product.category?.color || "#6B7280";
        if (!grouped[categoryName]) {
          grouped[categoryName] = {
            name: categoryName,
            color: categoryColor,
            products: []
          };
        }
        grouped[categoryName].products.push(product);
      });
      return grouped;
    });
    computed(() => {
      if (!products.value || products.value.length === 0) return [];
      const categories = /* @__PURE__ */ new Set();
      products.value.forEach((product) => {
        const categoryName = product.category?.name || "Uncategorized";
        categories.add(categoryName);
      });
      return Array.from(categories).sort((a, b) => {
        if (a === "Uncategorized") return 1;
        if (b === "Uncategorized") return -1;
        return a.localeCompare(b);
      });
    });
    const sortedCategories = computed(() => {
      const categories = Object.keys(productsByCategory.value);
      return categories.sort((a, b) => {
        if (a === "Uncategorized") return 1;
        if (b === "Uncategorized") return -1;
        return a.localeCompare(b);
      });
    });
    const getBrandGradient = (slug2) => {
      const gradients = {
        "aprati": "bg-gradient-to-br from-blue-500 to-blue-600",
        "frutati": "bg-gradient-to-br from-green-500 to-green-600",
        "mocati": "bg-gradient-to-br from-orange-500 to-orange-600"
      };
      if (gradients[slug2]) {
        return gradients[slug2];
      }
      const colors = [
        "bg-gradient-to-br from-red-500 to-red-600",
        "bg-gradient-to-br from-orange-500 to-orange-600",
        "bg-gradient-to-br from-blue-600 to-blue-700",
        "bg-gradient-to-br from-green-600 to-green-700",
        "bg-gradient-to-br from-red-600 to-orange-600"
      ];
      let hash = 0;
      for (let i = 0; i < slug2.length; i++) {
        hash = (hash << 5) - hash + slug2.charCodeAt(i);
        hash = hash & hash;
      }
      return colors[Math.abs(hash) % colors.length];
    };
    const getImageUrl = (imagePath) => {
      if (!imagePath) return "";
      if (imagePath.startsWith("data:")) return imagePath;
      if (imagePath.startsWith("http")) return imagePath;
      if (imagePath.startsWith("/storage/")) {
        return `${runtimeConfig.public.apiBaseUrl}${imagePath}`;
      }
      return `${runtimeConfig.public.apiBaseUrl}/storage/${imagePath}`;
    };
    const formatSpecKey = (key) => {
      return key.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
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
      title: () => brand.value ? `${brand.value.name} - Aprati Food Company` : "Brand - Aprati Food Company",
      description: () => brand.value ? brand.value.description : "Premium food brand details"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 relative overflow-hidden" }, _attrs))} data-v-e7f45470><div class="absolute inset-0 overflow-hidden pointer-events-none z-5" data-v-e7f45470><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-[5%] left-[8%] w-20 h-20 object-contain opacity-18 animate-float" data-v-e7f45470><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-[8%] right-[10%] w-20 h-20 object-contain opacity-20 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.5s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-[12%] left-[18%] w-16 h-16 object-contain opacity-15 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.8s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute top-[15%] right-[15%] w-16 h-16 object-contain opacity-18 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.2s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-[20%] left-[12%] w-14 h-14 object-contain opacity-12 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.3s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute top-[25%] right-[12%] w-20 h-20 object-contain opacity-16 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.5s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-[30%] left-[22%] w-16 h-16 object-contain opacity-14 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.7s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-[35%] right-[18%] w-16 h-16 object-contain opacity-19 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.8s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-[40%] left-[15%] w-20 h-20 object-contain opacity-13 animate-float" style="${ssrRenderStyle({ "animation-delay": "1s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute top-[45%] right-[20%] w-20 h-20 object-contain opacity-17 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.4s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-[50%] left-[10%] w-14 h-14 object-contain opacity-14 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.4s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute top-[55%] right-[10%] w-20 h-20 object-contain opacity-20 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "2s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-[60%] left-[25%] w-16 h-16 object-contain opacity-16 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.6s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-[65%] right-[25%] w-14 h-14 object-contain opacity-18 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "2.2s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-[70%] left-[35%] w-16 h-16 object-contain opacity-15 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.9s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute top-[75%] right-[35%] w-16 h-16 object-contain opacity-17 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.1s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-[80%] left-[28%] w-14 h-14 object-contain opacity-13 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.9s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute top-[85%] right-[28%] w-20 h-20 object-contain opacity-19 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.3s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-[90%] left-[32%] w-20 h-20 object-contain opacity-17 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.6s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-[10%] right-[32%] w-16 h-16 object-contain opacity-16 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "2.1s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute bottom-[8%] left-[22%] w-20 h-20 object-contain opacity-18 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.7s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute bottom-[12%] right-[22%] w-16 h-16 object-contain opacity-14 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.8s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-[18%] left-[42%] w-16 h-16 object-contain opacity-16 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.9s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute top-[22%] right-[42%] w-20 h-20 object-contain opacity-18 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.6s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-[28%] left-[48%] w-14 h-14 object-contain opacity-15 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.5s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-[32%] right-[48%] w-16 h-16 object-contain opacity-17 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.9s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-[38%] left-[52%] w-20 h-20 object-contain opacity-14 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.2s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute top-[42%] right-[52%] w-14 h-14 object-contain opacity-19 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.7s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-[48%] left-[38%] w-16 h-16 object-contain opacity-13 animate-float" style="${ssrRenderStyle({ "animation-delay": "2.1s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute top-[52%] right-[38%] w-20 h-20 object-contain opacity-16 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.4s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-[58%] left-[45%] w-16 h-16 object-contain opacity-18 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.6s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-[62%] right-[45%] w-14 h-14 object-contain opacity-15 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.8s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-[68%] left-[55%] w-20 h-20 object-contain opacity-17 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.1s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute top-[72%] right-[55%] w-16 h-16 object-contain opacity-14 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.9s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-[78%] left-[62%] w-14 h-14 object-contain opacity-19 animate-float" style="${ssrRenderStyle({ "animation-delay": "2.3s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute top-[82%] right-[62%] w-20 h-20 object-contain opacity-16 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.5s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute bottom-[15%] left-[58%] w-16 h-16 object-contain opacity-18 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.8s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute bottom-[20%] right-[58%] w-20 h-20 object-contain opacity-15 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "2.2s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute bottom-[25%] left-[68%] w-14 h-14 object-contain opacity-17 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.3s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute bottom-[30%] right-[68%] w-16 h-16 object-contain opacity-13 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.4s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute bottom-[35%] left-[72%] w-20 h-20 object-contain opacity-16 animate-float" style="${ssrRenderStyle({ "animation-delay": "2s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute bottom-[40%] right-[72%] w-14 h-14 object-contain opacity-19 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.7s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute bottom-[45%] left-[78%] w-16 h-16 object-contain opacity-14 animate-float" style="${ssrRenderStyle({ "animation-delay": "1s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute bottom-[50%] right-[78%] w-20 h-20 object-contain opacity-18 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "2.4s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-[15%] left-[65%] w-16 h-16 object-contain opacity-16 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.7s" })}" data-v-e7f45470><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute top-[25%] right-[65%] w-14 h-14 object-contain opacity-15 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.6s" })}" data-v-e7f45470></div><div class="fixed inset-0 pointer-events-none z-0" data-v-e7f45470><div class="absolute inset-0 opacity-20" data-v-e7f45470><div class="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full blur-3xl animate-float" data-v-e7f45470></div><div class="absolute top-1/4 right-1/6 w-80 h-80 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full blur-3xl animate-float-delayed" data-v-e7f45470></div><div class="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full blur-3xl animate-float-slow" data-v-e7f45470></div><div class="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full blur-3xl animate-float animation-delay-500" data-v-e7f45470></div><div class="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-green-300 to-green-400 rounded-full blur-3xl animate-float-delayed animation-delay-700" data-v-e7f45470></div><div class="absolute top-1/3 right-1/3 w-88 h-88 bg-gradient-to-r from-red-300 to-red-400 rounded-full blur-3xl animate-float-slow animation-delay-300" data-v-e7f45470></div></div><div class="absolute inset-0 opacity-25" data-v-e7f45470><div class="absolute top-20 left-1/5 w-10 h-10 bg-pink-400 rounded-full animate-bounce shadow-xl" data-v-e7f45470></div><div class="absolute top-1/4 right-1/5 w-12 h-12 bg-purple-400 rounded-full animate-bounce animation-delay-400 shadow-xl" data-v-e7f45470></div><div class="absolute top-1/3 left-1/3 w-8 h-8 bg-blue-400 rounded-full animate-bounce animation-delay-700 shadow-xl" data-v-e7f45470></div><div class="absolute top-1/2 right-1/4 w-14 h-14 bg-yellow-400 rounded-full animate-bounce animation-delay-300 shadow-xl" data-v-e7f45470></div><div class="absolute top-2/3 left-1/6 w-10 h-10 bg-green-400 rounded-full animate-bounce animation-delay-900 shadow-xl" data-v-e7f45470></div><div class="absolute top-3/4 right-1/6 w-12 h-12 bg-red-400 rounded-full animate-bounce animation-delay-500 shadow-xl" data-v-e7f45470></div><div class="absolute bottom-20 left-1/4 w-9 h-9 bg-orange-400 rounded-full animate-bounce animation-delay-1000 shadow-xl" data-v-e7f45470></div><div class="absolute bottom-40 right-1/3 w-11 h-11 bg-pink-300 rounded-full animate-bounce animation-delay-400 shadow-xl" data-v-e7f45470></div></div><div class="absolute inset-0 opacity-30" data-v-e7f45470><div class="absolute top-24 left-1/4 w-16 h-20 bg-gradient-to-br from-pink-300 to-pink-400 rounded-2xl rotate-12 animate-wiggle animation-delay-300 shadow-lg" data-v-e7f45470></div><div class="absolute top-1/3 right-1/5 w-14 h-18 bg-gradient-to-br from-purple-300 to-purple-400 rounded-2xl -rotate-12 animate-wiggle animation-delay-700 shadow-lg" data-v-e7f45470></div><div class="absolute top-1/2 left-1/6 w-18 h-22 bg-gradient-to-br from-blue-300 to-blue-400 rounded-2xl rotate-45 animate-wiggle animation-delay-500 shadow-lg" data-v-e7f45470></div><div class="absolute top-2/3 right-1/4 w-16 h-20 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-2xl -rotate-45 animate-wiggle animation-delay-1000 shadow-lg" data-v-e7f45470></div><div class="absolute bottom-32 left-1/3 w-14 h-18 bg-gradient-to-br from-green-300 to-green-400 rounded-2xl rotate-12 animate-wiggle animation-delay-400 shadow-lg" data-v-e7f45470></div><div class="absolute bottom-48 right-1/6 w-16 h-20 bg-gradient-to-br from-red-300 to-red-400 rounded-2xl -rotate-12 animate-wiggle animation-delay-900 shadow-lg" data-v-e7f45470></div></div><div class="absolute inset-0 opacity-25" data-v-e7f45470><div class="absolute top-16 left-1/6 text-5xl animate-float animation-delay-300" data-v-e7f45470>🍬</div><div class="absolute top-24 right-1/8 text-4xl animate-spin animation-delay-700" data-v-e7f45470>🍭</div><div class="absolute top-32 left-1/4 text-6xl animate-pulse animation-delay-500" data-v-e7f45470>🍮</div><div class="absolute top-40 right-1/5 text-5xl animate-bounce animation-delay-900" data-v-e7f45470>🍡</div><div class="absolute top-48 left-1/3 text-4xl animate-wiggle animation-delay-400" data-v-e7f45470>🍰</div><div class="absolute top-56 right-1/4 text-5xl animate-float animation-delay-1000" data-v-e7f45470>🍬</div><div class="absolute top-1/4 left-1/8 text-4xl animate-bounce animation-delay-300" data-v-e7f45470>🍭</div><div class="absolute top-1/3 right-1/6 text-6xl animate-wiggle animation-delay-700" data-v-e7f45470>🍮</div><div class="absolute top-1/3 left-2/5 text-5xl animate-spin animation-delay-500" data-v-e7f45470>🍡</div><div class="absolute top-1/3 right-2/5 text-4xl animate-float animation-delay-1000" data-v-e7f45470>🍰</div><div class="absolute top-1/2 left-1/10 text-5xl animate-wiggle animation-delay-500" data-v-e7f45470>🍬</div><div class="absolute top-1/2 right-1/10 text-4xl animate-float animation-delay-300" data-v-e7f45470>🍭</div><div class="absolute top-1/2 left-1/2 text-6xl animate-spin animation-delay-700" data-v-e7f45470>🍮</div><div class="absolute top-1/2 right-1/3 text-5xl animate-pulse animation-delay-1000" data-v-e7f45470>🍡</div><div class="absolute top-2/3 left-1/5 text-6xl animate-float animation-delay-700" data-v-e7f45470>🍰</div><div class="absolute top-2/3 right-1/5 text-5xl animate-spin animation-delay-300" data-v-e7f45470>🍬</div><div class="absolute top-3/4 left-1/4 text-4xl animate-pulse animation-delay-1000" data-v-e7f45470>🍭</div><div class="absolute top-3/4 right-1/4 text-5xl animate-bounce animation-delay-500" data-v-e7f45470>🍮</div><div class="absolute bottom-32 left-1/6 text-5xl animate-spin animation-delay-400" data-v-e7f45470>🍡</div><div class="absolute bottom-40 right-1/6 text-4xl animate-pulse animation-delay-700" data-v-e7f45470>🍰</div><div class="absolute bottom-48 left-1/3 text-6xl animate-bounce animation-delay-300" data-v-e7f45470>🍬</div><div class="absolute bottom-56 right-1/3 text-5xl animate-wiggle animation-delay-1000" data-v-e7f45470>🍭</div><div class="absolute bottom-24 left-2/5 text-4xl animate-float animation-delay-500" data-v-e7f45470>🍮</div><div class="absolute bottom-28 right-2/5 text-5xl animate-spin animation-delay-900" data-v-e7f45470>🍡</div><div class="absolute top-1/5 left-3/4 text-4xl animate-float-slow animation-delay-300" data-v-e7f45470>🍰</div><div class="absolute top-2/5 right-3/4 text-5xl animate-bounce animation-delay-700" data-v-e7f45470>🍬</div><div class="absolute bottom-1/5 left-1/8 text-6xl animate-wiggle animation-delay-500" data-v-e7f45470>🍭</div><div class="absolute bottom-2/5 right-1/8 text-4xl animate-pulse animation-delay-1000" data-v-e7f45470>🍮</div><div class="absolute top-1/6 left-4/5 text-5xl animate-spin animation-delay-400" data-v-e7f45470>🍡</div><div class="absolute bottom-1/6 right-4/5 text-6xl animate-float animation-delay-900" data-v-e7f45470>🍰</div></div></div>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center items-center min-h-screen relative z-10" data-v-e7f45470><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" data-v-e7f45470></div><p class="ml-4 text-gray-600" data-v-e7f45470>Loading brand details...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="min-h-screen flex items-center justify-center relative z-10" data-v-e7f45470><div class="text-center" data-v-e7f45470><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e7f45470><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-e7f45470></path></svg><h3 class="mt-2 text-sm font-medium text-gray-900" data-v-e7f45470>${ssrInterpolate(unref(error) || "Brand Not Found")}</h3><p class="mt-1 text-sm text-gray-500" data-v-e7f45470>The brand you&#39;re looking for doesn&#39;t exist or has been removed.</p><div class="mt-6" data-v-e7f45470>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/brands",
          class: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="mr-2 -ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e7f45470${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-e7f45470${_scopeId}></path></svg> Back to All Brands `);
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
                createTextVNode(" Back to All Brands ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else if (unref(brand)) {
        _push(`<div class="relative z-10" data-v-e7f45470><section class="relative overflow-hidden py-32" data-v-e7f45470><div class="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 animate-pulse z-20" data-v-e7f45470></div>`);
        if (unref(brand).cover_image_url || unref(brand).cover_image) {
          _push(`<div class="absolute inset-0" data-v-e7f45470><img${ssrRenderAttr("src", getImageUrl(unref(brand).cover_image_url || unref(brand).cover_image))}${ssrRenderAttr("alt", `${unref(brand).name} cover`)} class="w-full h-full object-cover scale-105 animate-slow-zoom" data-v-e7f45470><div class="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-blue-500/20 to-blue-600/30" data-v-e7f45470></div></div>`);
        } else {
          _push(`<div class="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200" data-v-e7f45470><div class="absolute inset-0 overflow-hidden opacity-20" data-v-e7f45470><div class="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full blur-3xl animate-float" data-v-e7f45470></div><div class="absolute bottom-1/4 right-1/6 w-96 h-96 bg-gradient-to-r from-white to-blue-300 rounded-full blur-3xl animate-float-delayed" data-v-e7f45470></div><div class="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-300 to-blue-600 rounded-full blur-3xl animate-float-slow" data-v-e7f45470></div></div><div class="absolute inset-0 opacity-30" data-v-e7f45470><div class="absolute top-20 left-20 w-12 h-12 bg-white rounded-full animate-bounce shadow-2xl shadow-white/50" data-v-e7f45470></div><div class="absolute top-40 right-32 w-8 h-8 bg-blue-300 rounded-full animate-bounce animation-delay-500 shadow-2xl shadow-blue-300/50" data-v-e7f45470></div><div class="absolute top-60 left-1/3 w-10 h-10 bg-blue-400 rounded-full animate-bounce animation-delay-1000 shadow-2xl shadow-blue-400/50" data-v-e7f45470></div><div class="absolute bottom-40 left-1/4 w-14 h-14 bg-blue-500 rounded-full animate-bounce animation-delay-300 shadow-2xl shadow-blue-500/50" data-v-e7f45470></div></div></div>`);
        }
        _push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-v-e7f45470><div class="text-center" data-v-e7f45470><div class="relative mb-8" data-v-e7f45470><div class="inline-block relative" data-v-e7f45470><div class="relative px-8 py-4 text-xs font-black tracking-[0.3em] uppercase bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-full shadow-xl" style="${ssrRenderStyle({ "text-shadow": "0 2px 8px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.3)" })}" data-v-e7f45470><span class="relative z-10" data-v-e7f45470>🍬 Brand Details 🍬</span><div class="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full pointer-events-none" data-v-e7f45470></div><div class="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full animate-ping" data-v-e7f45470></div></div></div></div>`);
        if (unref(brand).logo_url || unref(brand).logo) {
          _push(`<div class="mb-8" data-v-e7f45470><div class="mx-auto w-40 h-40 bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-xl" data-v-e7f45470><img${ssrRenderAttr("src", getImageUrl(unref(brand).logo_url || unref(brand).logo))}${ssrRenderAttr("alt", unref(brand).name)} class="w-full h-full object-contain rounded-full" data-v-e7f45470></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h1 class="text-6xl lg:text-8xl font-black text-white mb-6 leading-none tracking-tighter" style="${ssrRenderStyle({ "text-shadow": "0 4px 12px rgba(0, 0, 0, 0.6), 0 2px 6px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.3)" })}" data-v-e7f45470>${ssrInterpolate(unref(brand).name)}</h1><div class="w-32 h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 mx-auto mb-8 rounded-full shadow-lg shadow-blue-500/50" data-v-e7f45470></div><p class="text-xl lg:text-2xl mb-8 text-white max-w-4xl mx-auto font-medium" style="${ssrRenderStyle({ "text-shadow": "0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3)" })}" data-v-e7f45470>${ssrInterpolate(unref(brand).description || "Premium quality products with innovative solutions.")}</p><div class="flex flex-col sm:flex-row gap-6 justify-center items-center" data-v-e7f45470>`);
        if (unref(brand).established_year) {
          _push(`<div class="relative inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-black tracking-wider uppercase shadow-lg" style="${ssrRenderStyle({ "text-shadow": "0 2px 6px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.3)" })}" data-v-e7f45470><svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e7f45470><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-e7f45470></path></svg> 🎂 Est. ${ssrInterpolate(unref(brand).established_year)} <div class="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-full pointer-events-none" data-v-e7f45470></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(brand).website) {
          _push(`<div data-v-e7f45470><a${ssrRenderAttr("href", unref(brand).website)} target="_blank" rel="noopener noreferrer" class="group relative inline-flex items-center px-12 py-6 bg-gradient-to-r from-white to-blue-100 text-blue-700 font-black text-sm tracking-wider uppercase transition-all duration-500 hover:scale-110 hover:shadow-xl rounded-full overflow-hidden" data-v-e7f45470><span class="relative z-10" data-v-e7f45470>🌐 Visit Website</span><svg class="relative z-10 ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e7f45470><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-v-e7f45470></path></svg><div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" data-v-e7f45470></div><div class="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-blue-300/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full animate-pulse" data-v-e7f45470></div></a></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></section><div class="bg-white border-b" data-v-e7f45470><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" data-v-e7f45470><nav class="flex" aria-label="Breadcrumb" data-v-e7f45470><ol class="flex items-center space-x-4" data-v-e7f45470><li data-v-e7f45470>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "text-gray-400 hover:text-gray-500"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="flex-shrink-0 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" data-v-e7f45470${_scopeId}><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" data-v-e7f45470${_scopeId}></path></svg><span class="sr-only" data-v-e7f45470${_scopeId}>Home</span>`);
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
        _push(`</li><li data-v-e7f45470><div class="flex items-center" data-v-e7f45470><svg class="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20" data-v-e7f45470><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-e7f45470></path></svg>`);
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
        _push(`</div></li><li data-v-e7f45470><div class="flex items-center" data-v-e7f45470><svg class="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20" data-v-e7f45470><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-e7f45470></path></svg><span class="ml-4 text-sm font-medium text-gray-500" data-v-e7f45470>${ssrInterpolate(unref(brand).name)}</span></div></li></ol></nav></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" data-v-e7f45470><div class="group relative cursor-pointer mb-8" data-v-e7f45470><div class="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-[1.01] overflow-hidden" data-v-e7f45470><div class="rounded-2xl overflow-hidden" data-v-e7f45470><div class="grid grid-cols-1 lg:grid-cols-7 gap-0 min-h-[400px]" data-v-e7f45470><div class="flex flex-col justify-center p-8 lg:p-12 lg:col-span-4 lg:order-1" data-v-e7f45470><div class="mb-6" data-v-e7f45470><span class="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-black tracking-wider uppercase shadow-lg" data-v-e7f45470><div class="w-2 h-2 bg-white rounded-full mr-3 animate-pulse" data-v-e7f45470></div> 🍬 Brand Story 🍬 </span></div><h3 class="text-4xl lg:text-5xl font-black mb-6 leading-none tracking-tighter" data-v-e7f45470><span class="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent" data-v-e7f45470>About</span> <span class="text-gray-900" data-v-e7f45470>${ssrInterpolate(unref(brand).name)}</span></h3><div class="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 mb-6 rounded-full shadow-lg shadow-blue-500/50" data-v-e7f45470></div><div class="prose prose-gray prose-lg max-w-none text-gray-600 leading-relaxed mb-8" data-v-e7f45470><p data-v-e7f45470>${ssrInterpolate(unref(brand).description || "This brand represents our commitment to quality and innovation in the food industry. We strive to bring you the best products that meet the highest standards of excellence.")}</p></div>`);
        if (unref(brand).established_year || unref(brand).website) {
          _push(`<div class="space-y-3 mb-8" data-v-e7f45470>`);
          if (unref(brand).established_year) {
            _push(`<div class="flex items-center" data-v-e7f45470><svg class="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e7f45470><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-e7f45470></path></svg><span class="text-gray-600" data-v-e7f45470>Established in ${ssrInterpolate(unref(brand).established_year)}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(brand).website) {
            _push(`<div class="flex items-center" data-v-e7f45470><svg class="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e7f45470><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" data-v-e7f45470></path></svg><a${ssrRenderAttr("href", unref(brand).website)} target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800" data-v-e7f45470> Visit Official Website </a></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="relative overflow-hidden rounded-2xl lg:col-span-3 lg:order-2" data-v-e7f45470><div class="h-full min-h-[400px] relative transition-all duration-700 group-hover:scale-105" data-v-e7f45470>`);
        if (unref(brand).cover_image_url || unref(brand).cover_image) {
          _push(`<div class="absolute inset-0" data-v-e7f45470><img${ssrRenderAttr("src", getImageUrl(unref(brand).cover_image_url || unref(brand).cover_image))}${ssrRenderAttr("alt", `${unref(brand).name} cover`)} class="absolute inset-0 w-full h-full object-cover" data-v-e7f45470></div>`);
        } else {
          _push(`<div class="${ssrRenderClass([
            "absolute inset-0",
            getBrandGradient(unref(brand).slug)
          ])}" data-v-e7f45470></div>`);
        }
        _push(`<div class="absolute inset-0 bg-black/20" data-v-e7f45470></div></div><div class="absolute top-6 right-6" data-v-e7f45470><div class="flex items-center space-x-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/30" data-v-e7f45470><h3 class="text-xs text-white font-bold opacity-95" data-v-e7f45470>${ssrInterpolate(unref(brand).name)}</h3><div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" data-v-e7f45470></div></div></div></div></div></div></div></div><div id="products" class="bg-white rounded-3xl shadow-lg overflow-hidden" data-v-e7f45470><div class="p-8 lg:p-12" data-v-e7f45470><div class="flex justify-between items-center mb-12" data-v-e7f45470><div data-v-e7f45470><div class="inline-block mb-4" data-v-e7f45470><span class="inline-block px-6 py-3 text-xs font-black tracking-[0.3em] uppercase bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-full shadow-lg" data-v-e7f45470> 🍬 Product Collection 🍬 </span></div><h2 class="text-4xl lg:text-5xl font-black mb-3 leading-none tracking-tighter" data-v-e7f45470><span class="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent" data-v-e7f45470>${ssrInterpolate(unref(brand).name)}</span> <span class="text-gray-900" data-v-e7f45470>Products</span></h2><div class="w-32 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 mb-3 rounded-full shadow-lg shadow-blue-500/50" data-v-e7f45470></div><p class="text-lg text-gray-600 font-medium" data-v-e7f45470>Discover our premium product collection</p></div><div class="flex items-center space-x-4" data-v-e7f45470>`);
        if (unref(isAdmin)) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/admin/brands/${unref(brand).slug}/products`,
            class: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl text-sm font-semibold flex items-center transition-all duration-300 transform hover:scale-105 shadow-lg"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e7f45470${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-e7f45470${_scopeId}></path></svg> Manage Products `);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    class: "w-4 h-4 mr-2",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                    })
                  ])),
                  createTextVNode(" Manage Products ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<button${ssrIncludeBooleanAttr(unref(productsLoading)) ? " disabled" : ""} class="flex items-center px-4 py-2 bg-green-100 hover:bg-green-200 disabled:bg-gray-100 text-green-700 disabled:text-gray-400 rounded-lg transition-colors duration-200" data-v-e7f45470><svg class="${ssrRenderClass([{ "animate-spin": unref(productsLoading) }, "w-4 h-4 mr-2"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e7f45470><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-e7f45470></path></svg>`);
        if (unref(productsLoading)) {
          _push(`<span data-v-e7f45470>Refreshing...</span>`);
        } else {
          _push(`<span data-v-e7f45470>Refresh Prices</span>`);
        }
        _push(`</button><div class="bg-blue-100 px-4 py-2 rounded-full" data-v-e7f45470><span class="text-sm font-semibold text-blue-800" data-v-e7f45470>${ssrInterpolate(unref(selectedCategoryFilter) ? Object.values(unref(productsByCategory)).reduce((total, cat) => total + cat.products.length, 0) : unref(products).length)} products </span></div></div></div>`);
        if (unref(productsLoading)) {
          _push(`<div class="text-center py-12" data-v-e7f45470><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" data-v-e7f45470></div><p class="mt-4 text-gray-600 text-lg" data-v-e7f45470>Loading products...</p></div>`);
        } else if (unref(products).length > 0) {
          _push(`<div class="space-y-8" data-v-e7f45470><!--[-->`);
          ssrRenderList(unref(sortedCategories), (categoryName) => {
            _push(`<div${ssrRenderAttr("id", `category-${categoryName.toLowerCase().replace(/\s+/g, "-")}`)} class="category-section" data-v-e7f45470><div class="category-bar rounded-2xl p-6 mb-6 overflow-hidden relative" style="${ssrRenderStyle({
              backgroundColor: unref(productsByCategory)[categoryName].color + "10"
            })}" data-v-e7f45470><div class="relative z-10 flex items-center justify-between" data-v-e7f45470><div class="flex items-center" data-v-e7f45470><div class="flex items-center mr-6" data-v-e7f45470><div class="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style="${ssrRenderStyle({ backgroundColor: unref(productsByCategory)[categoryName].color })}" data-v-e7f45470><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e7f45470><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-v-e7f45470></path></svg></div></div><div data-v-e7f45470><h3 class="text-2xl font-bold text-gray-900 mb-1" data-v-e7f45470>${ssrInterpolate(categoryName)}</h3><p class="text-gray-600 text-sm" data-v-e7f45470> Explore our ${ssrInterpolate(categoryName.toLowerCase())} product collection </p></div></div><div class="flex items-center space-x-4" data-v-e7f45470><div class="text-center" data-v-e7f45470><div class="text-2xl font-bold" style="${ssrRenderStyle({ color: unref(productsByCategory)[categoryName].color })}" data-v-e7f45470>${ssrInterpolate(unref(productsByCategory)[categoryName].products.length)}</div><div class="text-xs text-gray-500 font-medium" data-v-e7f45470>Products</div></div><div class="w-3 h-16 rounded-full shadow-inner" style="${ssrRenderStyle({ backgroundColor: unref(productsByCategory)[categoryName].color })}" data-v-e7f45470></div></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-4" data-v-e7f45470><!--[-->`);
            ssrRenderList(unref(productsByCategory)[categoryName].products, (product) => {
              _push(`<div class="group relative bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1" data-v-e7f45470><div class="aspect-square bg-gray-50 rounded-xl mb-4 flex items-center justify-center p-4 shadow-sm group-hover:shadow-md transition-shadow overflow-hidden" data-v-e7f45470>`);
              if (product.images && product.images.length > 0) {
                _push(`<div class="w-full h-full" data-v-e7f45470><img${ssrRenderAttr("src", getImageUrl(product.images[0]))}${ssrRenderAttr("alt", product.name)} class="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500" data-v-e7f45470></div>`);
              } else {
                _push(`<div class="text-gray-400 text-center" data-v-e7f45470><svg class="h-16 w-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e7f45470><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" data-v-e7f45470></path></svg><p class="text-sm" data-v-e7f45470>No Image</p></div>`);
              }
              _push(`</div><div class="space-y-3" data-v-e7f45470><h4 class="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors leading-tight" data-v-e7f45470>${ssrInterpolate(product.name)}</h4><p class="text-gray-600 text-sm leading-relaxed line-clamp-2" data-v-e7f45470>${ssrInterpolate(product.short_description || product.description)}</p><div class="flex items-center justify-between pt-2" data-v-e7f45470><div class="flex flex-col" data-v-e7f45470>`);
              if (product.sku) {
                _push(`<div class="text-xs text-gray-500" data-v-e7f45470> SKU: ${ssrInterpolate(product.sku)}</div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div>`);
              if (getProductPrice(product)) {
                _push(`<div class="text-xl font-bold text-blue-600" data-v-e7f45470> $${ssrInterpolate(getProductPrice(product))}</div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<div class="flex items-center text-blue-600 text-sm font-semibold group-hover:text-blue-700" data-v-e7f45470><span class="mr-1" data-v-e7f45470>View</span><svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e7f45470><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-e7f45470></path></svg></div></div></div></div>`);
            });
            _push(`<!--]--></div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="text-center py-16" data-v-e7f45470><div class="bg-gray-100 rounded-2xl p-12 max-w-md mx-auto" data-v-e7f45470><svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e7f45470><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" data-v-e7f45470></path></svg><h3 class="text-xl font-semibold text-gray-900 mb-2" data-v-e7f45470>No products yet</h3><p class="text-gray-600" data-v-e7f45470>Products for this brand will appear here when available.</p></div></div>`);
        }
        _push(`</div></div><div class="mt-16 text-center" data-v-e7f45470>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/brands",
          class: "group relative inline-flex items-center px-12 py-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-black text-sm tracking-wider uppercase transition-all duration-500 hover:scale-110 hover:shadow-xl rounded-full overflow-hidden"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="mr-3 h-5 w-5 transition-transform group-hover:-translate-x-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e7f45470${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-e7f45470${_scopeId}></path></svg><span class="relative z-10" data-v-e7f45470${_scopeId}>🍭 Explore All Brands</span><div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" data-v-e7f45470${_scopeId}></div><div class="absolute inset-0 bg-gradient-to-br from-blue-300/30 to-blue-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full animate-pulse" data-v-e7f45470${_scopeId}></div>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "mr-3 h-5 w-5 transition-transform group-hover:-translate-x-2 relative z-10",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "3",
                    d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                  })
                ])),
                createVNode("span", { class: "relative z-10" }, "🍭 Explore All Brands"),
                createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none" }),
                createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-blue-300/30 to-blue-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full animate-pulse" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showProductModal) && unref(selectedProduct)) {
        _push(`<div class="fixed inset-0 z-50 overflow-y-auto" data-v-e7f45470><div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" data-v-e7f45470></div><div class="flex min-h-screen items-center justify-center p-4 sm:p-6" data-v-e7f45470><div class="relative w-full max-w-6xl mx-auto" data-v-e7f45470><div class="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-500 scale-100" data-v-e7f45470><div class="relative bg-gradient-to-r from-blue-600 to-purple-600" data-v-e7f45470><div class="relative z-10 p-8 lg:p-12" data-v-e7f45470><button class="absolute top-8 right-8 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group border border-white/20" data-v-e7f45470><svg class="w-6 h-6 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e7f45470><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-e7f45470></path></svg></button><div class="inline-flex items-center px-5 py-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold mb-6" data-v-e7f45470><div class="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse" data-v-e7f45470></div><span class="uppercase tracking-wide" data-v-e7f45470>Product Details</span></div><h2 class="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight" data-v-e7f45470>${ssrInterpolate(unref(selectedProduct).name)}</h2><div class="flex flex-wrap gap-4 items-center mb-4" data-v-e7f45470>`);
        if (unref(selectedProduct).sku) {
          _push(`<div class="inline-flex items-center px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold" data-v-e7f45470><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e7f45470><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" data-v-e7f45470></path></svg> SKU: ${ssrInterpolate(unref(selectedProduct).sku)}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (getProductPrice(unref(selectedProduct))) {
          _push(`<div class="inline-flex items-center px-4 py-2 rounded-xl bg-orange-500/20 backdrop-blur-sm border border-orange-300/30 text-orange-100 text-sm font-semibold" data-v-e7f45470><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e7f45470><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" data-v-e7f45470></path></svg> $${ssrInterpolate(getProductPrice(unref(selectedProduct)))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><p class="text-lg text-white/90 font-medium max-w-2xl leading-relaxed" data-v-e7f45470>${ssrInterpolate(unref(selectedProduct).short_description || "Premium quality product with innovative design")}</p></div></div><div class="relative bg-white" data-v-e7f45470><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12" data-v-e7f45470><div class="space-y-4" data-v-e7f45470><div class="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-lg" data-v-e7f45470>`);
        if (unref(selectedProduct).images && unref(selectedProduct).images.length > 0) {
          _push(`<div data-v-e7f45470><img${ssrRenderAttr("src", getImageUrl(unref(currentProductImage)))}${ssrRenderAttr("alt", unref(selectedProduct).name)} class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" data-v-e7f45470></div>`);
        } else {
          _push(`<div class="w-full h-full flex items-center justify-center text-gray-400" data-v-e7f45470><div class="text-center" data-v-e7f45470><svg class="h-24 w-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e7f45470><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" data-v-e7f45470></path></svg><p class="text-lg" data-v-e7f45470>No Image Available</p></div></div>`);
        }
        _push(`</div>`);
        if (unref(selectedProduct).images && unref(selectedProduct).images.length > 1) {
          _push(`<div class="grid grid-cols-4 gap-2" data-v-e7f45470><!--[-->`);
          ssrRenderList(unref(selectedProduct).images, (image, index) => {
            _push(`<button class="${ssrRenderClass([unref(currentProductImageIndex) === index ? "border-blue-500" : "border-transparent hover:border-gray-300", "aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors"])}" data-v-e7f45470><img${ssrRenderAttr("src", getImageUrl(image))}${ssrRenderAttr("alt", `${unref(selectedProduct).name} view ${index + 1}`)} class="w-full h-full object-cover" data-v-e7f45470></button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="space-y-6" data-v-e7f45470>`);
        if (unref(selectedProduct).description) {
          _push(`<div class="bg-gray-50 rounded-2xl p-6" data-v-e7f45470><h3 class="text-xl font-bold text-gray-900 mb-4" data-v-e7f45470>Description</h3><div class="prose prose-gray max-w-none text-gray-700 leading-relaxed" data-v-e7f45470><p class="whitespace-pre-line" data-v-e7f45470>${ssrInterpolate(unref(selectedProduct).description)}</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="bg-gray-50 rounded-2xl p-6" data-v-e7f45470><h3 class="text-xl font-bold text-gray-900 mb-4" data-v-e7f45470>Product Information</h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-v-e7f45470>`);
        if (unref(selectedProduct).weight) {
          _push(`<div class="flex flex-col" data-v-e7f45470><span class="text-sm font-medium text-gray-500 mb-1" data-v-e7f45470>Weight</span><span class="text-sm text-gray-900 bg-white px-3 py-2 rounded-lg" data-v-e7f45470>${ssrInterpolate(unref(selectedProduct).weight)} kg</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(selectedProduct).category) {
          _push(`<div class="flex flex-col" data-v-e7f45470><span class="text-sm font-medium text-gray-500 mb-1" data-v-e7f45470>Category</span><div class="flex flex-wrap gap-2" data-v-e7f45470><span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200" style="${ssrRenderStyle({ backgroundColor: unref(selectedProduct).category.color + "20", borderColor: unref(selectedProduct).category.color, color: unref(selectedProduct).category.color })}" data-v-e7f45470>${ssrInterpolate(unref(selectedProduct).category.name || "Uncategorized")}</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex flex-col" data-v-e7f45470><span class="text-sm font-medium text-gray-500 mb-1" data-v-e7f45470>Brand</span><span class="text-sm text-gray-900 bg-white px-3 py-2 rounded-lg" data-v-e7f45470>${ssrInterpolate(unref(brand).name)}</span></div><div class="flex flex-col" data-v-e7f45470><span class="text-sm font-medium text-gray-500 mb-1" data-v-e7f45470>Status</span><span class="text-sm text-green-700 bg-green-100 px-3 py-2 rounded-lg" data-v-e7f45470>Active Product</span></div></div>`);
        if (unref(selectedProduct).is_featured) {
          _push(`<div class="mt-4 pt-4 border-t border-gray-200" data-v-e7f45470><div class="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-orange-100 text-orange-800" data-v-e7f45470><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-e7f45470><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-v-e7f45470></path></svg> Featured Product </div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(selectedProduct).technical_specs && Object.keys(unref(selectedProduct).technical_specs).length > 0) {
          _push(`<div class="bg-gray-50 rounded-2xl p-6" data-v-e7f45470><h3 class="text-xl font-bold text-gray-900 mb-4" data-v-e7f45470>Technical Specifications</h3><div class="grid grid-cols-1 gap-3" data-v-e7f45470><!--[-->`);
          ssrRenderList(unref(selectedProduct).technical_specs, (value, key) => {
            _push(`<div class="flex justify-between py-2 px-3 bg-white rounded-lg" data-v-e7f45470><span class="font-medium text-gray-900" data-v-e7f45470>${ssrInterpolate(formatSpecKey(key))}:</span><span class="text-gray-600" data-v-e7f45470>${ssrInterpolate(value)}</span></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="border-t border-gray-100 p-8 lg:p-12" data-v-e7f45470><div class="flex flex-col sm:flex-row gap-4 items-center justify-between" data-v-e7f45470><div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto" data-v-e7f45470><button class="group relative inline-flex items-center px-8 py-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-lg transition-all duration-300 hover:shadow-sm transform hover:scale-105 border border-gray-200" data-v-e7f45470><svg class="mr-3 w-5 h-5 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e7f45470><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-e7f45470></path></svg><span data-v-e7f45470>Close</span></button></div><div class="flex items-center space-x-6 text-gray-500" data-v-e7f45470><div class="flex items-center space-x-2" data-v-e7f45470><div class="w-2 h-2 bg-blue-500 rounded-full" data-v-e7f45470></div><span class="text-sm font-medium" data-v-e7f45470>${ssrInterpolate(unref(brand).name)} Product</span></div><div class="flex items-center space-x-2" data-v-e7f45470><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e7f45470><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-e7f45470></path></svg><span class="text-sm font-medium" data-v-e7f45470>Quality Assured</span></div></div></div></div><div class="h-1 bg-gradient-to-r from-blue-600 to-purple-600" data-v-e7f45470></div></div></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/brands/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e7f45470"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-DYSsnTtC.mjs.map
