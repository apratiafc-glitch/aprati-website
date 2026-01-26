import { _ as __nuxt_component_0$1 } from './server.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { useSSRContext, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as __nuxt_component_2 } from './AppToast-CE8UiWBe.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
import './useToast-BHiNW5Rt.mjs';

const _sfc_main$1 = {
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const appFooterSettings = ref({});
    const dynamicBrands = ref([]);
    const adminProfileImage = ref(null);
    const getImageUrl = (path) => {
      if (!path) return "";
      if (path.startsWith("http")) return path;
      return `https://sdev.apratifoods.asia${path}`;
    };
    const getProfileImageUrl = (path) => getImageUrl(path);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-black text-white py-16 border-t border-gray-800" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-1 md:grid-cols-4 gap-12"><div class="md:col-span-1">`);
      if (unref(appFooterSettings).footer_logo || unref(adminProfileImage)) {
        _push(`<img${ssrRenderAttr("src", unref(appFooterSettings).footer_logo ? getImageUrl(unref(appFooterSettings).footer_logo) : unref(adminProfileImage) ? getProfileImageUrl(unref(adminProfileImage)) : "/images/logo-footer.png")} alt="Aprati Foods" class="h-12 w-auto mb-6 opacity-90 hover:opacity-100 transition-opacity">`);
      } else {
        _push(`<h3 class="text-2xl font-display font-bold uppercase mb-6">Aprati Foods</h3>`);
      }
      _push(`<p class="text-gray-400 text-sm leading-relaxed mb-6">${ssrInterpolate(unref(appFooterSettings).footer_description || "Enhanced introduction website with advanced product search, career management, and comprehensive inventory system.")}</p><div class="flex space-x-4">`);
      if (unref(appFooterSettings).social_links?.facebook) {
        _push(`<a${ssrRenderAttr("href", unref(appFooterSettings).social_links.facebook)} target="_blank" class="text-gray-400 hover:text-white transition-colors"><span class="sr-only">Facebook</span><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path></svg></a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><h4 class="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6 font-display">Company</h4><ul class="space-y-3"><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about",
        class: "text-gray-300 hover:text-orange-500 transition-colors text-sm font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`About`);
          } else {
            return [
              createTextVNode("About")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/careers",
        class: "text-gray-300 hover:text-green-600 transition-colors text-sm font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Careers`);
          } else {
            return [
              createTextVNode("Careers")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/management",
        class: "text-gray-300 hover:text-blue-600 transition-colors text-sm font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Management`);
          } else {
            return [
              createTextVNode("Management")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact",
        class: "text-gray-300 hover:text-red-500 transition-colors text-sm font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Contact`);
          } else {
            return [
              createTextVNode("Contact")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div><h4 class="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6 font-display">Brands</h4><ul class="space-y-3"><!--[-->`);
      ssrRenderList(unref(dynamicBrands).slice(0, 5), (brand) => {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/brands/${brand.slug}`,
          class: "text-gray-300 hover:text-orange-500 transition-colors text-sm font-medium"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(brand.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(brand.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div><div><h4 class="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6 font-display">Legal</h4><ul class="space-y-3"><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/privacy",
        class: "text-gray-300 hover:text-white transition-colors text-sm"
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
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/terms",
        class: "text-gray-300 hover:text-white transition-colors text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Terms of Service`);
          } else {
            return [
              createTextVNode("Terms of Service")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li><span class="text-gray-500 text-sm">© ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Aprati Foods. All rights reserved</span></li></ul></div></div></div></footer>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      const _component_AppFooter = _sfc_main$1;
      const _component_AppToast = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white" }, _attrs))} data-v-7b9e5820>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`<main data-v-7b9e5820>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      _push(ssrRenderComponent(_component_AppToast, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7b9e5820"]]);

export { _default as default };
//# sourceMappingURL=default-B6TWrFKy.mjs.map
