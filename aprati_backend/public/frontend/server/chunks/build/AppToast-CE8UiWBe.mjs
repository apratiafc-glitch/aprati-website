import { mergeProps, unref, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { u as useToast } from './useToast-BHiNW5Rt.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = {
  __name: "AppToast",
  __ssrInlineRender: true,
  setup(__props) {
    const { toasts } = useToast();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed top-4 right-4 z-50 space-y-2" }, _attrs))} data-v-1f1116b8><div${ssrRenderAttrs({
        name: "toast",
        class: "space-y-2"
      })} data-v-1f1116b8>`);
      ssrRenderList(unref(toasts), (toast) => {
        _push(`<div class="${ssrRenderClass([
          "max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden transform transition-all duration-300",
          {
            "translate-x-0 opacity-100": toast.visible,
            "translate-x-full opacity-0": !toast.visible
          }
        ])}" data-v-1f1116b8><div class="p-4" data-v-1f1116b8><div class="flex items-start" data-v-1f1116b8><div class="flex-shrink-0" data-v-1f1116b8>`);
        if (toast.type === "success") {
          _push(`<svg class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1f1116b8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-1f1116b8></path></svg>`);
        } else if (toast.type === "error") {
          _push(`<svg class="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1f1116b8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-1f1116b8></path></svg>`);
        } else if (toast.type === "warning") {
          _push(`<svg class="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1f1116b8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" data-v-1f1116b8></path></svg>`);
        } else {
          _push(`<svg class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-1f1116b8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-1f1116b8></path></svg>`);
        }
        _push(`</div><div class="ml-3 w-0 flex-1 pt-0.5" data-v-1f1116b8><p class="${ssrRenderClass([
          "text-sm font-medium",
          {
            "text-green-900": toast.type === "success",
            "text-red-900": toast.type === "error",
            "text-yellow-900": toast.type === "warning",
            "text-blue-900": toast.type === "info"
          }
        ])}" data-v-1f1116b8>${ssrInterpolate(toast.message)}</p></div><div class="ml-4 flex-shrink-0 flex" data-v-1f1116b8><button class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" data-v-1f1116b8><span class="sr-only" data-v-1f1116b8>Close</span><svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-v-1f1116b8><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" data-v-1f1116b8></path></svg></button></div></div></div></div>`);
      });
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppToast.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1f1116b8"]]);

export { __nuxt_component_2 as _ };
//# sourceMappingURL=AppToast-CE8UiWBe.mjs.map
