import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { b as useRuntimeConfig, u as useHead } from './server.mjs';
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
  __name: "forgot-password",
  __ssrInlineRender: true,
  setup(__props) {
    const email = ref("");
    const loading = ref(false);
    const successMessage = ref("");
    const errorMessage = ref("");
    const config = useRuntimeConfig();
    config.public.apiBase;
    useHead({
      title: "Forgot Password - Aprati Foods",
      meta: [
        {
          name: "description",
          content: "Reset your Aprati Foods account password"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" }, _attrs))}><div class="max-w-md w-full space-y-8"><div><h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900"> Reset your password </h2><p class="mt-2 text-center text-sm text-gray-600"> Enter your email address and we&#39;ll send you a link to reset your password. </p></div>`);
      if (unref(successMessage)) {
        _push(`<div class="rounded-md bg-green-50 p-4"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></div><div class="ml-3"><p class="text-sm font-medium text-green-800">${ssrInterpolate(unref(successMessage))}</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(errorMessage)) {
        _push(`<div class="rounded-md bg-red-50 p-4"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg></div><div class="ml-3"><p class="text-sm font-medium text-red-800">${ssrInterpolate(unref(errorMessage))}</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form class="mt-8 space-y-6"><div class="rounded-md shadow-sm -space-y-px"><div><label for="email-address" class="sr-only">Email address</label><input id="email-address"${ssrRenderAttr("value", unref(email))} name="email" type="email" autocomplete="email" required class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Email address"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}></div></div><div><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed">`);
      if (unref(loading)) {
        _push(`<span class="absolute left-0 inset-y-0 flex items-center pl-3"><svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(loading) ? "Sending..." : "Send reset link")}</button></div><div class="flex items-center justify-between"><div class="text-sm">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/login",
        class: "font-medium text-blue-600 hover:text-blue-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ← Back to login `);
          } else {
            return [
              createTextVNode(" ← Back to login ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="text-sm">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/register",
        class: "font-medium text-blue-600 hover:text-blue-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Create account → `);
          } else {
            return [
              createTextVNode(" Create account → ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/forgot-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=forgot-password-D-QkAmkZ.mjs.map
