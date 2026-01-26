import { ref, mergeProps, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';

const _sfc_main = {
  __name: "about_new",
  __ssrInlineRender: true,
  setup(__props) {
    const posts = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const selectedPost = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><div class="bg-white border-b border-gray-200"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"><h1 class="text-4xl font-bold text-gray-900 mb-4">About Us</h1><p class="text-xl text-gray-600 max-w-3xl mx-auto"> Learn more about Aprati Food Company and our commitment to quality. </p></div></div><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">`);
      if (loading.value) {
        _push(`<div class="text-center py-12"><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div><p class="mt-2 text-gray-600">Loading content...</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (error.value) {
        _push(`<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8">${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value && !error.value && posts.value.length > 0) {
        _push(`<div class="space-y-8"><!--[-->`);
        ssrRenderList(posts.value, (post) => {
          _push(`<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6"><h2 class="text-2xl font-bold text-gray-900 mb-4">${ssrInterpolate(post.name || post.title)}</h2><p class="text-gray-700 leading-relaxed mb-6">${ssrInterpolate(post.description)}</p><button class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors"> Read More <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value && !error.value && posts.value.length === 0) {
        _push(`<div class="text-center py-16"><svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg><h3 class="text-lg font-medium text-gray-900 mb-2">No content available</h3><p class="text-gray-500">Check back later for updates about our company.</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (selectedPost.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"><div class="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto"><div class="p-6"><div class="flex justify-between items-center mb-4"><h3 class="text-2xl font-bold text-gray-900">${ssrInterpolate(selectedPost.value.name || selectedPost.value.title)}</h3><button class="text-gray-400 hover:text-gray-600"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><p class="text-gray-700 leading-relaxed">${ssrInterpolate(selectedPost.value.description)}</p></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about_new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about_new-CokjwS5D.mjs.map
