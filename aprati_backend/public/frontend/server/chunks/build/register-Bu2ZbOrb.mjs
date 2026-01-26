import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { ExclamationTriangleIcon, CheckCircleIcon } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/@heroicons/vue/24/outline/esm/index.js';
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
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Register - Aprati Food Company",
      description: "Create your Aprati Food Company account"
    });
    const form = ref({
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      address: "",
      terms: false
    });
    const loading = ref(false);
    const errors = ref({});
    const errorMessage = ref("");
    const successMessage = ref("");
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
      _push(`<h2 class="mt-6 text-3xl font-extrabold text-gray-900"> Create your account </h2><p class="mt-2 text-sm text-gray-600"> Or `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/login",
        class: "font-medium text-blue-600 hover:text-blue-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` sign in to your existing account `);
          } else {
            return [
              createTextVNode(" sign in to your existing account ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div><div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md"><div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"><form class="space-y-6"><div><label for="name" class="block text-sm font-medium text-gray-700"> Full Name </label><div class="mt-1"><input id="name"${ssrRenderAttr("value", unref(form).name)} name="name" type="text" autocomplete="name" required class="${ssrRenderClass([{ "border-red-300": unref(errors).name }, "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"])}" placeholder="Enter your full name">`);
      if (unref(errors).name) {
        _push(`<p class="mt-2 text-sm text-red-600">${ssrInterpolate(unref(errors).name)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><label for="email" class="block text-sm font-medium text-gray-700"> Email address </label><div class="mt-1"><input id="email"${ssrRenderAttr("value", unref(form).email)} name="email" type="email" autocomplete="email" required class="${ssrRenderClass([{ "border-red-300": unref(errors).email }, "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"])}" placeholder="Enter your email">`);
      if (unref(errors).email) {
        _push(`<p class="mt-2 text-sm text-red-600">${ssrInterpolate(unref(errors).email)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><label for="phone" class="block text-sm font-medium text-gray-700"> Phone Number </label><div class="mt-1"><input id="phone"${ssrRenderAttr("value", unref(form).phone)} name="phone" type="tel" autocomplete="tel" class="${ssrRenderClass([{ "border-red-300": unref(errors).phone }, "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"])}" placeholder="Enter your phone number">`);
      if (unref(errors).phone) {
        _push(`<p class="mt-2 text-sm text-red-600">${ssrInterpolate(unref(errors).phone)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><label for="password" class="block text-sm font-medium text-gray-700"> Password </label><div class="mt-1"><input id="password"${ssrRenderAttr("value", unref(form).password)} name="password" type="password" autocomplete="new-password" required class="${ssrRenderClass([{ "border-red-300": unref(errors).password }, "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"])}" placeholder="Create a password">`);
      if (unref(errors).password) {
        _push(`<p class="mt-2 text-sm text-red-600">${ssrInterpolate(unref(errors).password)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><label for="password_confirmation" class="block text-sm font-medium text-gray-700"> Confirm Password </label><div class="mt-1"><input id="password_confirmation"${ssrRenderAttr("value", unref(form).password_confirmation)} name="password_confirmation" type="password" autocomplete="new-password" required class="${ssrRenderClass([{ "border-red-300": unref(errors).password_confirmation }, "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"])}" placeholder="Confirm your password">`);
      if (unref(errors).password_confirmation) {
        _push(`<p class="mt-2 text-sm text-red-600">${ssrInterpolate(unref(errors).password_confirmation)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><label for="address" class="block text-sm font-medium text-gray-700"> Address (Optional) </label><div class="mt-1"><textarea id="address" name="address" rows="2" class="${ssrRenderClass([{ "border-red-300": unref(errors).address }, "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"])}" placeholder="Enter your address">${ssrInterpolate(unref(form).address)}</textarea>`);
      if (unref(errors).address) {
        _push(`<p class="mt-2 text-sm text-red-600">${ssrInterpolate(unref(errors).address)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex items-center"><input id="terms"${ssrIncludeBooleanAttr(Array.isArray(unref(form).terms) ? ssrLooseContain(unref(form).terms, null) : unref(form).terms) ? " checked" : ""} name="terms" type="checkbox" required class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"><label for="terms" class="ml-2 block text-sm text-gray-900"> I agree to the `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/terms",
        class: "text-blue-600 hover:text-blue-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Terms and Conditions`);
          } else {
            return [
              createTextVNode("Terms and Conditions")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` and `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/privacy",
        class: "text-blue-600 hover:text-blue-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Privacy Policy`);
          } else {
            return [
              createTextVNode("Privacy Policy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</label></div>`);
      if (unref(errorMessage)) {
        _push(`<div class="rounded-md bg-red-50 p-4"><div class="flex">`);
        _push(ssrRenderComponent(unref(ExclamationTriangleIcon), { class: "h-5 w-5 text-red-400" }, null, _parent));
        _push(`<div class="ml-3"><h3 class="text-sm font-medium text-red-800"> Registration failed </h3><div class="mt-2 text-sm text-red-700">${ssrInterpolate(unref(errorMessage))}</div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(successMessage)) {
        _push(`<div class="rounded-md bg-green-50 p-4"><div class="flex">`);
        _push(ssrRenderComponent(unref(CheckCircleIcon), { class: "h-5 w-5 text-green-400" }, null, _parent));
        _push(`<div class="ml-3"><h3 class="text-sm font-medium text-green-800"> Registration successful! </h3><div class="mt-2 text-sm text-green-700">${ssrInterpolate(unref(successMessage))}</div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">`);
      if (unref(loading)) {
        _push(`<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(loading) ? "Creating account..." : "Create account")}</button></div></form></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-Bu2ZbOrb.mjs.map
