import { ref, mergeProps, unref, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderList, ssrRenderClass } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { a as useSeoMeta } from './server.mjs';
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

const _sfc_main = {
  __name: "hero-images",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Hero Image Management - Admin"
    });
    const loading = ref(true);
    const uploading = ref(false);
    const updating = ref(false);
    const heroImages = ref([]);
    const activeHeroImage = ref(null);
    const imagePreview = ref(null);
    const showEditModal = ref(false);
    const newHeroForm = ref({
      title: "",
      alt_text: "",
      description: "",
      is_active: true
    });
    const editForm = ref({
      id: null,
      title: "",
      alt_text: "",
      description: "",
      is_active: false,
      image: null
    });
    ref(null);
    ref(null);
    const getImageUrl = (url) => {
      if (!url) return "/images/default-hero.svg";
      if (url.startsWith("/storage/")) {
        return `https://sdev.apratifoods.asia${url}`;
      }
      return url;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50" }, _attrs))}><div class="bg-white shadow"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="py-6"><h1 class="text-3xl font-bold text-gray-900">Hero Image Management</h1><p class="mt-2 text-gray-600">Manage the hero image displayed on the homepage</p></div></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">`);
      if (unref(activeHeroImage)) {
        _push(`<div class="bg-white rounded-lg shadow-lg mb-8"><div class="p-6"><h2 class="text-xl font-semibold text-gray-900 mb-4">Current Active Hero Image</h2><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><img${ssrRenderAttr("src", getImageUrl(unref(activeHeroImage).image_url))}${ssrRenderAttr("alt", unref(activeHeroImage).alt_text)} class="w-full h-64 object-cover rounded-lg shadow-md"></div><div class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Title</label><p class="text-gray-900">${ssrInterpolate(unref(activeHeroImage).title || "No title set")}</p></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Description</label><p class="text-gray-900">${ssrInterpolate(unref(activeHeroImage).description || "No description set")}</p></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Alt Text</label><p class="text-gray-900">${ssrInterpolate(unref(activeHeroImage).alt_text || "No alt text set")}</p></div><div class="flex space-x-4"><button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"> Edit Current Image </button></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white rounded-lg shadow-lg mb-8"><div class="p-6"><h2 class="text-xl font-semibold text-gray-900 mb-4">Upload New Hero Image</h2><form class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2">Hero Image</label><input type="file" accept="image/*" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required><p class="text-sm text-gray-500 mt-1">Recommended size: 1200x600px or larger. Max size: 5MB</p>`);
      if (unref(imagePreview)) {
        _push(`<div class="mt-4"><img${ssrRenderAttr("src", unref(imagePreview))} alt="Preview" class="w-full max-w-md h-48 object-cover rounded-lg shadow-md"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 mb-2">Title (Optional)</label><input${ssrRenderAttr("value", unref(newHeroForm).title)} type="text" placeholder="e.g., Premium Quality" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Alt Text</label><input${ssrRenderAttr("value", unref(newHeroForm).alt_text)} type="text" placeholder="e.g., Aprati Food Company Products" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required></div></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label><textarea rows="3" placeholder="e.g., Fresh Food Products" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">${ssrInterpolate(unref(newHeroForm).description)}</textarea></div><div class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(unref(newHeroForm).is_active) ? ssrLooseContain(unref(newHeroForm).is_active, null) : unref(newHeroForm).is_active) ? " checked" : ""} type="checkbox" id="setActive" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"><label for="setActive" class="ml-2 text-sm font-medium text-gray-700"> Set as active hero image immediately </label></div><div class="flex justify-end"><button type="submit"${ssrIncludeBooleanAttr(unref(uploading)) ? " disabled" : ""} class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50">`);
      if (unref(uploading)) {
        _push(`<span>Uploading...</span>`);
      } else {
        _push(`<span>Upload Hero Image</span>`);
      }
      _push(`</button></div></form></div></div><div class="bg-white rounded-lg shadow-lg"><div class="p-6"><h2 class="text-xl font-semibold text-gray-900 mb-4">All Hero Images</h2>`);
      if (unref(loading)) {
        _push(`<div class="text-center py-8"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div><p class="text-gray-600 mt-4">Loading hero images...</p></div>`);
      } else if (unref(heroImages).length === 0) {
        _push(`<div class="text-center py-8"><p class="text-gray-600">No hero images found. Upload your first one above.</p></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
        ssrRenderList(unref(heroImages), (image) => {
          _push(`<div class="${ssrRenderClass([{ "ring-2 ring-green-500": image.is_active }, "border border-gray-200 rounded-lg overflow-hidden"])}"><img${ssrRenderAttr("src", getImageUrl(image.image_url))}${ssrRenderAttr("alt", image.alt_text)} class="w-full h-48 object-cover"><div class="p-4"><div class="flex items-center justify-between mb-2"><h3 class="font-medium text-gray-900">${ssrInterpolate(image.title || "Untitled")}</h3>`);
          if (image.is_active) {
            _push(`<span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"> Active </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><p class="text-sm text-gray-600 mb-3">${ssrInterpolate(image.description || "No description")}</p><div class="flex space-x-2"><button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"> Edit </button>`);
          if (!image.is_active) {
            _push(`<button class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"> Set Active </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"> Delete </button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div></div>`);
      if (unref(showEditModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"><div class="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto"><div class="p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">Edit Hero Image</h3><form class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-2">Title</label><input${ssrRenderAttr("value", unref(editForm).title)} type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Alt Text</label><input${ssrRenderAttr("value", unref(editForm).alt_text)} type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Description</label><textarea rows="3" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">${ssrInterpolate(unref(editForm).description)}</textarea></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Replace Image (Optional)</label><input type="file" accept="image/*" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div><div class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(unref(editForm).is_active) ? ssrLooseContain(unref(editForm).is_active, null) : unref(editForm).is_active) ? " checked" : ""} type="checkbox" id="editSetActive" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"><label for="editSetActive" class="ml-2 text-sm font-medium text-gray-700"> Set as active hero image </label></div><div class="flex justify-end space-x-3 pt-4"><button type="button" class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(updating)) ? " disabled" : ""} class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50">`);
        if (unref(updating)) {
          _push(`<span>Updating...</span>`);
        } else {
          _push(`<span>Update</span>`);
        }
        _push(`</button></div></form></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/hero-images.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=hero-images-DqzSOnFL.mjs.map
