import { a as useSeoMeta, _ as __nuxt_component_0$1 } from './server.mjs';
import { ref, watch, unref, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderClass } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { u as useApi } from './useApi-CO9TAo9a.mjs';
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
  __name: "brands",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Brand Management - Admin Dashboard",
      description: "Manage brands for Aprati Food Company"
    });
    const { brands: brandApi } = useApi();
    const brands = ref([]);
    const loading = ref(true);
    const showModal = ref(false);
    const showDeleteModal = ref(false);
    const isEditing = ref(false);
    const saving = ref(false);
    const deleting = ref(false);
    const brandToDelete = ref(null);
    const notification = ref({
      show: false,
      type: "success",
      // 'success', 'error', 'warning', 'info'
      message: "",
      timeout: null
    });
    const brandForm = ref({
      id: null,
      name: "",
      slug: "",
      description: "",
      logo: "",
      logoFile: null,
      cover_image: "",
      coverFile: null,
      is_active: true,
      sort_order: 0,
      established_year: 2024
      // Use static year to avoid hydration mismatch
    });
    ref(null);
    ref(null);
    const getDeleteButtonText = () => {
      if (!brandToDelete.value) return "Delete Brand";
      const userCount = brandToDelete.value.users_count || 0;
      const productCount = brandToDelete.value.products_count || 0;
      if (userCount > 0 && productCount > 0) {
        return `Delete Brand + ${userCount} User(s) + ${productCount} Product(s)`;
      } else if (userCount > 0) {
        return `Delete Brand + ${userCount} User(s)`;
      } else if (productCount > 0) {
        return `Delete Brand + ${productCount} Product(s)`;
      } else {
        return "Delete Brand";
      }
    };
    watch(() => brandForm.value.name, (newName) => {
      if (!isEditing.value) {
        brandForm.value.slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(`<!--[--><div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="mb-8"><div class="flex justify-between items-center"><div><h2 class="text-3xl font-bold text-gray-900 mb-2">Brand Portfolio</h2><p class="text-gray-600">Manage your company brands and their settings</p></div><button class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> Add New Brand </button></div></div><div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"><div class="px-6 py-4 border-b border-gray-200 bg-gray-50"><h3 class="text-lg font-semibold text-gray-900 flex items-center"> All Brands <span class="ml-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">${ssrInterpolate(unref(brands).length)}</span></h3></div><div class="overflow-x-auto">`);
      if (unref(loading)) {
        _push(`<div class="p-8 text-center"><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div><p class="text-gray-600">Loading brands...</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div></div></div>`);
      if (unref(showModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"><div class="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto"><div class="px-6 py-4 border-b border-gray-200"><div class="flex items-center justify-between"><div><h3 class="text-xl font-semibold text-gray-900">${ssrInterpolate(unref(isEditing) ? "Edit Brand" : "Create New Brand")}</h3><p class="text-gray-600 mt-1">${ssrInterpolate(unref(isEditing) ? "Update brand information" : "Add a new brand to your portfolio")}</p></div><button class="text-gray-400 hover:text-gray-600"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div><form class="px-6 py-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="md:col-span-2"><label class="block text-sm font-medium text-gray-700 mb-2">Brand Name</label><input${ssrRenderAttr("value", unref(brandForm).name)} type="text" required class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter brand name"></div><div class="md:col-span-2"><label class="block text-sm font-medium text-gray-700 mb-2">Slug (URL-friendly)</label><input${ssrRenderAttr("value", unref(brandForm).slug)} type="text" required readonly class="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-500 cursor-not-allowed" placeholder="Auto-generated from brand name"><p class="text-gray-500 text-xs mt-1">This field is automatically generated from the brand name</p></div><div class="md:col-span-2"><label class="block text-sm font-medium text-gray-700 mb-2">Description</label><textarea rows="4" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" placeholder="Enter brand description">${ssrInterpolate(unref(brandForm).description)}</textarea></div><div class="md:col-span-2"><label class="block text-sm font-medium text-gray-700 mb-2">Brand Logo</label><div class="flex items-center space-x-4"><div class="flex-1"><input type="file" accept="image/*" class="hidden"><button type="button" class="w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-6 text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-all flex flex-col items-center justify-center"><svg class="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg><span class="text-sm font-medium">Click to upload logo</span><span class="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</span></button></div>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`</div></div><div class="md:col-span-2"><label class="block text-sm font-medium text-gray-700 mb-2">Cover Image</label><div class="flex items-center space-x-4"><div class="flex-1"><input type="file" accept="image/*" class="hidden"><button type="button" class="w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-6 text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-all flex flex-col items-center justify-center"><svg class="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span class="text-sm font-medium">Click to upload cover image</span><span class="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</span></button></div>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`</div></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Established Year</label><input${ssrRenderAttr("value", unref(brandForm).established_year)} type="number" min="1900"${ssrRenderAttr("max", (/* @__PURE__ */ new Date()).getFullYear())} class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter established year"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Sort Order</label><input${ssrRenderAttr("value", unref(brandForm).sort_order)} type="number" min="0" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter sort order"></div><div class="md:col-span-2"><div class="flex items-center p-4 rounded-lg bg-gray-50 border border-gray-200"><input${ssrIncludeBooleanAttr(Array.isArray(unref(brandForm).is_active) ? ssrLooseContain(unref(brandForm).is_active, null) : unref(brandForm).is_active) ? " checked" : ""} type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"><div class="ml-3"><label class="text-gray-900 font-medium">Active Status</label><p class="text-gray-600 text-sm">Enable this brand for public visibility</p></div></div></div></div><div class="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-6"><button type="button" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">${ssrInterpolate(unref(saving) ? "Saving..." : unref(isEditing) ? "Update Brand" : "Create Brand")}</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showDeleteModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"><div class="bg-white rounded-lg max-w-md w-full"><div class="p-6"><div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full"><svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg></div><h3 class="text-xl font-semibold text-gray-900 mb-4 text-center">Delete Brand</h3>`);
        if (unref(brandToDelete)?.users_count > 0) {
          _push(`<div class="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"><div class="flex items-center space-x-2 text-yellow-800 mb-2"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg><span class="font-medium">Users Assigned Warning</span></div><p class="text-yellow-700 text-sm mb-2"> This brand has <strong>${ssrInterpolate(unref(brandToDelete).users_count)} assigned user(s)</strong>. Deleting the brand will not affect the users, but they will lose their brand assignment. </p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(brandToDelete)?.products_count > 0) {
          _push(`<div class="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg"><div class="flex items-center space-x-2 text-orange-800 mb-2"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg><span class="font-medium">Cascade Deletion Warning</span></div><p class="text-orange-700 text-sm"> Deleting this brand will <strong>permanently delete all ${ssrInterpolate(unref(brandToDelete).products_count)} product(s)</strong> belonging to this brand. </p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="text-gray-600 mb-6 text-center"> Are you sure you want to delete <span class="font-medium text-gray-900">&quot;${ssrInterpolate(unref(brandToDelete)?.name)}&quot;</span>? `);
        if (unref(brandToDelete)?.products_count > 0 || unref(brandToDelete)?.users_count > 0) {
          _push(`<span> This action cannot be undone. </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p><div class="flex justify-center space-x-3"><button class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"> Cancel </button><button${ssrIncludeBooleanAttr(unref(deleting)) ? " disabled" : ""} class="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">${ssrInterpolate(unref(deleting) ? "Deleting..." : getDeleteButtonText())}</button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(notification).show) {
        _push(`<div class="fixed top-4 right-4 z-50 max-w-md"><div class="${ssrRenderClass([{
          "bg-emerald-50 border-emerald-200": unref(notification).type === "success",
          "bg-red-50 border-red-200": unref(notification).type === "error",
          "bg-amber-50 border-amber-200": unref(notification).type === "warning",
          "bg-blue-50 border-blue-200": unref(notification).type === "info"
        }, "rounded-xl shadow-2xl border overflow-hidden transform transition-all duration-300 animate-in slide-in-from-right"])}"><div class="p-4"><div class="flex items-start"><div class="flex-shrink-0">`);
        if (unref(notification).type === "success") {
          _push(`<svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`);
        } else if (unref(notification).type === "error") {
          _push(`<svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`);
        } else if (unref(notification).type === "warning") {
          _push(`<svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg>`);
        } else {
          _push(`<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`);
        }
        _push(`</div><div class="ml-3 flex-1"><p class="${ssrRenderClass([{
          "text-emerald-800": unref(notification).type === "success",
          "text-red-800": unref(notification).type === "error",
          "text-amber-800": unref(notification).type === "warning",
          "text-blue-800": unref(notification).type === "info"
        }, "text-sm font-medium leading-5"])}">${ssrInterpolate(unref(notification).message)}</p></div><div class="ml-4 flex-shrink-0"><button class="${ssrRenderClass([{
          "text-emerald-400 hover:text-emerald-500 focus:ring-emerald-500": unref(notification).type === "success",
          "text-red-400 hover:text-red-500 focus:ring-red-500": unref(notification).type === "error",
          "text-amber-400 hover:text-amber-500 focus:ring-amber-500": unref(notification).type === "warning",
          "text-blue-400 hover:text-blue-500 focus:ring-blue-500": unref(notification).type === "info"
        }, "inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"])}"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/brands.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=brands-CCAIds6k.mjs.map
