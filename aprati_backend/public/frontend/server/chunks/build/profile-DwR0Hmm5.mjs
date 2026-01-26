import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, mergeProps, withCtx, createBlock, openBlock, createVNode, unref, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { b as useRuntimeConfig } from './server.mjs';
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
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const uploading = ref(false);
    const message = ref("");
    const messageType = ref("success");
    const hasChanges = ref(false);
    const currentUser = ref(null);
    const formData = ref({
      name: "",
      email: "",
      phone: "",
      address: ""
    });
    const passwordData = ref({
      current_password: "",
      new_password: "",
      new_password_confirmation: ""
    });
    const getCurrentProfileImage = () => {
      const imagePath = currentUser.value?.profile_image;
      if (!imagePath) return null;
      if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
        return imagePath;
      }
      const runtimeConfig = useRuntimeConfig();
      const baseUrl = runtimeConfig.public.apiBase?.replace("/api", "") || "http://127.0.0.1:8000";
      return imagePath.startsWith("/storage/") ? `${baseUrl}${imagePath}` : `${baseUrl}/storage/${imagePath}`;
    };
    const getRoleLabel = (role) => {
      const roleLabels = {
        "admin": "Administrator",
        "brand_admin": "Brand Administrator",
        "user": "User"
      };
      return roleLabels[role] || role;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50" }, _attrs))}><nav class="bg-white shadow-sm"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="flex items-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: "text-blue-600 hover:text-blue-800 mr-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-6 h-6",
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
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="text-2xl font-bold text-gray-900">Admin Profile</h1></div><div class="flex items-center space-x-4"><button${ssrIncludeBooleanAttr(unref(loading) || !unref(hasChanges)) ? " disabled" : ""} class="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 text-blue-700 disabled:text-gray-400 rounded-lg transition-colors duration-200"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>`);
      if (unref(loading)) {
        _push(`<span>Saving...</span>`);
      } else {
        _push(`<span>Save Changes</span>`);
      }
      _push(`</button></div></div></div></nav>`);
      if (unref(message)) {
        _push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"><div class="${ssrRenderClass([
          "p-4 rounded-md",
          unref(messageType) === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
        ])}">${ssrInterpolate(unref(message))}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="bg-white rounded-lg shadow-lg overflow-hidden"><div class="px-6 py-4 border-b border-gray-200"><h3 class="text-lg font-semibold text-gray-900">Profile Information</h3><p class="text-gray-600">Update your account details and profile picture</p></div><div class="p-6"><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-1"><h4 class="text-sm font-medium text-gray-700 mb-4">Profile Picture</h4><div class="flex flex-col items-center"><div class="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4">`);
      if (getCurrentProfileImage()) {
        _push(`<img${ssrRenderAttr("src", getCurrentProfileImage())}${ssrRenderAttr("alt", unref(formData).name)} class="w-full h-full object-cover">`);
      } else {
        _push(`<div class="w-full h-full flex items-center justify-center text-gray-400"><svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>`);
      }
      _push(`</div><div class="flex flex-col space-y-2 w-full"><input type="file" accept="image/*" class="hidden"><button${ssrIncludeBooleanAttr(unref(uploading)) ? " disabled" : ""} class="w-full px-4 py-2 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 text-blue-700 disabled:text-gray-400 rounded-lg transition-colors duration-200 text-sm">`);
      if (unref(uploading)) {
        _push(`<span>Uploading...</span>`);
      } else {
        _push(`<span>${ssrInterpolate(unref(currentUser)?.profile_image ? "Change Picture" : "Upload Picture")}</span>`);
      }
      _push(`</button>`);
      if (unref(currentUser)?.profile_image) {
        _push(`<button${ssrIncludeBooleanAttr(unref(uploading)) ? " disabled" : ""} class="w-full px-4 py-2 bg-red-100 hover:bg-red-200 disabled:bg-gray-100 text-red-700 disabled:text-gray-400 rounded-lg transition-colors duration-200 text-sm"> Remove Picture </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="text-xs text-gray-500 mt-2 text-center"> Recommended: Square image, at least 400x400px<br> Max size: 2MB (JPG, PNG, GIF) </p></div></div><div class="lg:col-span-2"><div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label><input${ssrRenderAttr("value", unref(formData).name)} type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your full name"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label><input${ssrRenderAttr("value", unref(formData).email)} type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your email address"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label><input${ssrRenderAttr("value", unref(formData).phone)} type="tel" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your phone number"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Address</label><textarea rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your address">${ssrInterpolate(unref(formData).address)}</textarea></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Role</label><input${ssrRenderAttr("value", getRoleLabel(unref(currentUser)?.role))} type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500" readonly><p class="text-xs text-gray-500 mt-1">Role cannot be changed from this page</p></div></div></div></div></div></div><div class="bg-white rounded-lg shadow-lg overflow-hidden mt-8"><div class="px-6 py-4 border-b border-gray-200"><h3 class="text-lg font-semibold text-gray-900">Change Password</h3><p class="text-gray-600">Update your account password for security</p></div><div class="p-6"><div class="max-w-lg space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2">Current Password</label><input${ssrRenderAttr("value", unref(passwordData).current_password)} type="password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your current password"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">New Password</label><input${ssrRenderAttr("value", unref(passwordData).new_password)} type="password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your new password"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label><input${ssrRenderAttr("value", unref(passwordData).new_password_confirmation)} type="password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Confirm your new password"></div><button${ssrIncludeBooleanAttr(unref(loading) || !unref(passwordData).current_password || !unref(passwordData).new_password || !unref(passwordData).new_password_confirmation) ? " disabled" : ""} class="flex items-center px-4 py-2 bg-green-100 hover:bg-green-200 disabled:bg-gray-100 text-green-700 disabled:text-gray-400 rounded-lg transition-colors duration-200"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m0 0a2 2 0 01-2 2m2-2h-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V9z"></path></svg> Change Password </button></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=profile-DwR0Hmm5.mjs.map
