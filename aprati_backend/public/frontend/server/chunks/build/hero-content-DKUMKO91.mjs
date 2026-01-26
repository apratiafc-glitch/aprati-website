import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, computed, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderList, ssrRenderClass } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { a as useSeoMeta } from './server.mjs';
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

const _sfc_main = {
  __name: "hero-content",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Hero Content Management - Admin",
      description: "Manage hero section content for the website"
    });
    const loading = ref(false);
    const heroContents = ref([]);
    const activeHeroContent = ref(null);
    const showEditModal = ref(false);
    const errorMessage = ref("");
    const newContentForm = ref({
      title: "",
      subtitle: "",
      primary_button_text: "",
      primary_button_link: "",
      secondary_button_text: "",
      secondary_button_link: "",
      is_active: false
    });
    const editForm = ref({
      id: null,
      title: "",
      subtitle: "",
      primary_button_text: "",
      primary_button_link: "",
      secondary_button_text: "",
      secondary_button_link: "",
      is_active: false
    });
    const activeContentCount = computed(() => {
      return heroContents.value.filter((content) => content.is_active).length;
    });
    const inactiveContentCount = computed(() => {
      return heroContents.value.filter((content) => !content.is_active).length;
    });
    const totalContentCount = computed(() => {
      return heroContents.value.length;
    });
    const showPreviewModal = ref(false);
    const previewContent = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50 py-6" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="mb-8"><div class="md:flex md:items-center md:justify-between"><div class="flex-1 min-w-0"><h1 class="text-3xl font-bold text-gray-900">Hero Content Management</h1><p class="mt-2 text-gray-600">Manage the main hero section content displayed on the homepage</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: "text-blue-600 hover:text-blue-700 transition-colors font-medium"
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
      _push(`<div class="mt-4 flex md:mt-0 md:ml-4"><div class="grid grid-cols-3 gap-4 text-center"><div class="bg-blue-50 rounded-lg p-3 min-w-0"><div class="text-2xl font-bold text-blue-600">${ssrInterpolate(unref(totalContentCount))}</div><div class="text-sm text-blue-600">Total</div></div><div class="bg-green-50 rounded-lg p-3 min-w-0"><div class="text-2xl font-bold text-green-600">${ssrInterpolate(unref(activeContentCount))}</div><div class="text-sm text-green-600">Active</div></div><div class="bg-orange-50 rounded-lg p-3 min-w-0"><div class="text-2xl font-bold text-orange-600">${ssrInterpolate(unref(inactiveContentCount))}</div><div class="text-sm text-orange-600">Inactive</div></div></div></div></div></div>`);
      if (unref(activeHeroContent)) {
        _push(`<div class="bg-white rounded-lg shadow-sm border mb-8 p-6"><div class="flex justify-between items-center mb-4"><h2 class="text-xl font-semibold text-gray-900">Current Active Content</h2><div class="flex space-x-2"><button class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors"> Preview </button><button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"> Edit Active Content </button></div></div><div class="bg-gray-50 rounded-lg p-4"><div class="mb-4"><h3 class="font-medium text-gray-700">Title:</h3><div class="text-lg font-bold">${unref(activeHeroContent).title ?? ""}</div></div><div class="mb-4"><h3 class="font-medium text-gray-700">Subtitle:</h3><p class="text-gray-600">${ssrInterpolate(unref(activeHeroContent).subtitle)}</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><h3 class="font-medium text-gray-700">Primary Button:</h3><p class="text-sm text-gray-600">${ssrInterpolate(unref(activeHeroContent).primary_button_text)} → ${ssrInterpolate(unref(activeHeroContent).primary_button_link)}</p></div><div><h3 class="font-medium text-gray-700">Secondary Button:</h3><p class="text-sm text-gray-600">${ssrInterpolate(unref(activeHeroContent).secondary_button_text)} → ${ssrInterpolate(unref(activeHeroContent).secondary_button_link)}</p></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white rounded-lg shadow-sm border mb-8"><div class="px-6 py-4 border-b border-gray-200"><h2 class="text-xl font-semibold text-gray-900">Add New Hero Content</h2></div><div class="p-6"><form class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2"> Title (HTML allowed) </label><input${ssrRenderAttr("value", unref(newContentForm).title)} type="text" required placeholder="Welcome to &lt;span class=&quot;text-yellow-300&quot;&gt;Aprati&lt;/span&gt; Food Company" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"><p class="text-xs text-gray-500 mt-1">You can use HTML tags like &lt;span class=&quot;text-yellow-300&quot;&gt;...&lt;/span&gt;</p></div><div><label class="block text-sm font-medium text-gray-700 mb-2"> Subtitle </label><textarea rows="3" placeholder="Enhanced introduction website with advanced product search..." class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">${ssrInterpolate(unref(newContentForm).subtitle)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-2"> Primary Button Text </label><input${ssrRenderAttr("value", unref(newContentForm).primary_button_text)} type="text" required placeholder="Explore Our Brands" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div><div><label class="block text-sm font-medium text-gray-700 mb-2"> Primary Button Link </label><input${ssrRenderAttr("value", unref(newContentForm).primary_button_link)} type="text" required placeholder="/brands" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-2"> Secondary Button Text </label><input${ssrRenderAttr("value", unref(newContentForm).secondary_button_text)} type="text" required placeholder="Join Our Team" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div><div><label class="block text-sm font-medium text-gray-700 mb-2"> Secondary Button Link </label><input${ssrRenderAttr("value", unref(newContentForm).secondary_button_link)} type="text" required placeholder="/careers" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div></div><div class="flex items-center space-x-4"><label class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(unref(newContentForm).is_active) ? ssrLooseContain(unref(newContentForm).is_active, null) : unref(newContentForm).is_active) ? " checked" : ""} type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"><span class="ml-2 text-sm text-gray-700">Set as active immediately</span></label></div><div class="flex justify-end"><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors">`);
      if (unref(loading)) {
        _push(`<span>Creating...</span>`);
      } else {
        _push(`<span>Create Hero Content</span>`);
      }
      _push(`</button></div></form></div></div><div class="bg-white rounded-lg shadow-sm border"><div class="px-6 py-4 border-b border-gray-200"><h2 class="text-xl font-semibold text-gray-900">All Hero Contents</h2></div><div class="p-6">`);
      if (unref(errorMessage)) {
        _push(`<div class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg></div><div class="ml-3"><h3 class="text-sm font-medium text-red-800">Error</h3><div class="mt-2 text-sm text-red-700"><p>${ssrInterpolate(unref(errorMessage))}</p></div><div class="mt-4"><div class="-mx-2 -my-1.5 flex"><button class="bg-red-50 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none"> Retry </button><button class="ml-3 bg-red-50 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none"> Dismiss </button></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(loading)) {
        _push(`<div class="text-center py-8"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div><p class="mt-2 text-gray-500">Loading...</p></div>`);
      } else if (unref(heroContents).length === 0) {
        _push(`<div class="text-center py-8"><p class="text-gray-500">No hero contents found. Create your first one above.</p></div>`);
      } else {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(heroContents), (content) => {
          _push(`<div class="${ssrRenderClass([{ "border-green-500 bg-green-50": content.is_active }, "border border-gray-200 rounded-lg p-4"])}"><div class="flex items-start justify-between"><div class="flex-1"><div class="flex items-center space-x-2 mb-2"><div class="font-medium">${content.title ?? ""}</div>`);
          if (content.is_active) {
            _push(`<span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"> Active </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><p class="text-gray-600 text-sm mb-2">${ssrInterpolate(content.subtitle)}</p><div class="text-xs text-gray-500 space-x-4"><span>${ssrInterpolate(content.primary_button_text)} → ${ssrInterpolate(content.primary_button_link)}</span><span>${ssrInterpolate(content.secondary_button_text)} → ${ssrInterpolate(content.secondary_button_link)}</span></div></div><div class="flex items-center space-x-2 ml-4"><button class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors"> Preview </button>`);
          if (!content.is_active) {
            _push(`<button class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"> Set Active </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"> Edit </button><button class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"> Delete </button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
      if (unref(showEditModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-screen overflow-y-auto"><div class="p-6 border-b border-gray-200"><h3 class="text-lg font-semibold text-gray-900">Edit Hero Content</h3></div><div class="p-6"><form class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2">Title (HTML allowed)</label><input${ssrRenderAttr("value", unref(editForm).title)} type="text" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Subtitle</label><textarea rows="3" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">${ssrInterpolate(unref(editForm).subtitle)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-2">Primary Button Text</label><input${ssrRenderAttr("value", unref(editForm).primary_button_text)} type="text" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Primary Button Link</label><input${ssrRenderAttr("value", unref(editForm).primary_button_link)} type="text" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-2">Secondary Button Text</label><input${ssrRenderAttr("value", unref(editForm).secondary_button_text)} type="text" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Secondary Button Link</label><input${ssrRenderAttr("value", unref(editForm).secondary_button_link)} type="text" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div></div><div class="flex items-center space-x-4"><label class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(unref(editForm).is_active) ? ssrLooseContain(unref(editForm).is_active, null) : unref(editForm).is_active) ? " checked" : ""} type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"><span class="ml-2 text-sm text-gray-700">Set as active</span></label></div><div class="flex justify-end space-x-3"><button type="button" class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors">`);
        if (unref(loading)) {
          _push(`<span>Updating...</span>`);
        } else {
          _push(`<span>Update Content</span>`);
        }
        _push(`</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showPreviewModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"><div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"><div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center"><h3 class="text-lg font-medium text-gray-900">Preview Hero Content</h3><button class="text-gray-400 hover:text-gray-600"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
        if (unref(previewContent)) {
          _push(`<div class="p-6"><div class="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white rounded-lg overflow-hidden"><div class="absolute inset-0 bg-black opacity-20"></div><div class="relative px-8 py-16"><div class="text-center"><h1 class="text-4xl lg:text-5xl font-bold mb-6 leading-tight">${unref(previewContent).title ?? ""}</h1><p class="text-xl mb-8 text-blue-100">${ssrInterpolate(unref(previewContent).subtitle)}</p><div class="flex flex-col sm:flex-row gap-4 justify-center"><div class="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center">${ssrInterpolate(unref(previewContent).primary_button_text)}</div><div class="border-2 border-white hover:bg-white hover:text-blue-800 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center">${ssrInterpolate(unref(previewContent).secondary_button_text)}</div></div></div></div></div><div class="mt-6 bg-gray-50 rounded-lg p-4"><h4 class="font-medium text-gray-900 mb-2">Content Details:</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"><div><span class="font-medium text-gray-700">Primary Button:</span><span class="text-gray-600 ml-2">${ssrInterpolate(unref(previewContent).primary_button_text)} → ${ssrInterpolate(unref(previewContent).primary_button_link)}</span></div><div><span class="font-medium text-gray-700">Secondary Button:</span><span class="text-gray-600 ml-2">${ssrInterpolate(unref(previewContent).secondary_button_text)} → ${ssrInterpolate(unref(previewContent).secondary_button_link)}</span></div><div><span class="font-medium text-gray-700">Status:</span><span class="${ssrRenderClass([unref(previewContent).is_active ? "text-green-600" : "text-gray-600", "ml-2"])}">${ssrInterpolate(unref(previewContent).is_active ? "Active" : "Inactive")}</span></div></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/hero-content.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=hero-content-DKUMKO91.mjs.map
