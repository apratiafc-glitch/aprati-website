import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { ExclamationTriangleIcon, UserIcon } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/@heroicons/vue/24/outline/esm/index.js';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Login - Aprati Food Company",
      description: "Sign in to your Aprati Food Company account"
    });
    const form = ref({
      email: "",
      password: "",
      remember: false
    });
    const loading = ref(false);
    const errors = ref({});
    const errorMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" }, _attrs))}><div class="sm:mx-auto sm:w-full sm:max-w-md"><div class="text-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-3xl font-bold text-blue-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Aprati Foods Cambodia `);
          } else {
            return [
              createTextVNode(" Aprati Foods Cambodia ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h2 class="mt-6 text-3xl font-extrabold text-gray-900"> Sign in to your account </h2><p class="mt-2 text-sm text-gray-600"> Or `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/register",
        class: "font-medium text-blue-600 hover:text-blue-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` create a new account `);
          } else {
            return [
              createTextVNode(" create a new account ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div><div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md"><div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"><form class="space-y-6"><div><label for="email" class="block text-sm font-medium text-gray-700"> Email address </label><div class="mt-1"><input id="email"${ssrRenderAttr("value", unref(form).email)} name="email" type="email" autocomplete="email" required class="${ssrRenderClass([{ "border-red-300": unref(errors).email }, "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"])}" placeholder="Enter your email">`);
      if (unref(errors).email) {
        _push(`<p class="mt-2 text-sm text-red-600">${ssrInterpolate(unref(errors).email)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><label for="password" class="block text-sm font-medium text-gray-700"> Password </label><div class="mt-1"><input id="password"${ssrRenderAttr("value", unref(form).password)} name="password" type="password" autocomplete="current-password" required class="${ssrRenderClass([{ "border-red-300": unref(errors).password }, "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"])}" placeholder="Enter your password">`);
      if (unref(errors).password) {
        _push(`<p class="mt-2 text-sm text-red-600">${ssrInterpolate(unref(errors).password)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex items-center justify-between"><div class="flex items-center"><input id="remember-me"${ssrIncludeBooleanAttr(Array.isArray(unref(form).remember) ? ssrLooseContain(unref(form).remember, null) : unref(form).remember) ? " checked" : ""} name="remember-me" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"><label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label></div><div class="text-sm">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/forgot-password",
        class: "font-medium text-blue-600 hover:text-blue-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Forgot your password? `);
          } else {
            return [
              createTextVNode(" Forgot your password? ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (unref(errorMessage)) {
        _push(`<div class="rounded-md bg-red-50 p-4"><div class="flex">`);
        _push(ssrRenderComponent(unref(ExclamationTriangleIcon), { class: "h-5 w-5 text-red-400" }, null, _parent));
        _push(`<div class="ml-3"><h3 class="text-sm font-medium text-red-800"> Login failed </h3><div class="mt-2 text-sm text-red-700">${ssrInterpolate(unref(errorMessage))}</div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">`);
      if (unref(loading)) {
        _push(`<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(loading) ? "Signing in..." : "Sign in")}</button></div></form><div class="mt-6"><div class="relative"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-300"></div></div><div class="relative flex justify-center text-sm"><span class="px-2 bg-white text-gray-500">Demo Credentials</span></div></div><div class="mt-4 grid grid-cols-1 gap-3"><button class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">`);
      _push(ssrRenderComponent(unref(UserIcon), { class: "h-5 w-5 mr-2 text-blue-500" }, null, _parent));
      _push(` Fill Admin Credentials </button><button class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">`);
      _push(ssrRenderComponent(unref(UserIcon), { class: "h-5 w-5 mr-2 text-green-500" }, null, _parent));
      _push(` Fill User Credentials </button></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-lwJciYb2.mjs.map
