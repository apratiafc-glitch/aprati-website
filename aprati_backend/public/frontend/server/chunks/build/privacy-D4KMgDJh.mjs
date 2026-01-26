import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, computed, mergeProps, withCtx, createBlock, createTextVNode, openBlock, createVNode, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderComponent } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _imports_12, a as _imports_13, b as _imports_14, c as _imports_15, d as _imports_10, e as _imports_11 } from './virtual_public-B_jtVuV9.mjs';
import { u as useApi } from './useApi-CO9TAo9a.mjs';
import { a as useSeoMeta } from './server.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/ufo/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/h3/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/destr/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/hookable/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/ofetch/dist/node.mjs';
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
import './cookie-D4T41UgU.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/cookie-es/dist/index.mjs';
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
  __name: "privacy",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const currentLanguage = ref("en");
    useApi();
    const formatContent = (content) => {
      return content.replace(/\n/g, "<br>").replace(/^- (.+)$/gm, "<li>$1</li>").replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");
    };
    computed(() => {
      if (sections.value.length > 0) {
        const latest = sections.value.reduce((latest2, section) => {
          return new Date(section.updated_at) > new Date(latest2.updated_at) ? section : latest2;
        });
        return new Date(latest.updated_at).toLocaleDateString();
      }
      return (/* @__PURE__ */ new Date()).toLocaleDateString();
    });
    useSeoMeta({
      title: "Privacy Policy - Aprati Foods Cambodia",
      description: "Privacy policy for Aprati Foods Cambodia. Learn how we collect, use, and protect your personal information.",
      ogTitle: "Privacy Policy - Aprati Foods Cambodia",
      ogDescription: "Privacy policy for Aprati Foods Cambodia. Learn how we collect, use, and protect your personal information.",
      ogType: "website"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 relative overflow-hidden" }, _attrs))}><div class="absolute inset-0 overflow-hidden pointer-events-none"><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-1/6 left-1/6 w-20 h-20 object-contain opacity-15 animate-float"><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute bottom-1/4 right-1/6 w-20 h-20 object-contain opacity-20 animate-float-delayed"><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-1/3 right-1/4 w-16 h-16 object-contain opacity-15 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.5s" })}"><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute bottom-1/3 left-1/4 w-16 h-16 object-contain opacity-18 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1s" })}"><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-1/6 right-1/6 w-14 h-14 object-contain opacity-12 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.5s" })}"><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute bottom-1/6 left-1/3 w-16 h-16 object-contain opacity-16 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "2s" })}"><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-2/3 right-1/5 w-14 h-14 object-contain opacity-14 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.8s" })}"><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute bottom-2/5 left-1/5 w-16 h-16 object-contain opacity-17 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.3s" })}"><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-2/5 left-2/5 w-20 h-20 object-contain opacity-13 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.7s" })}"><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute bottom-3/5 right-2/5 w-14 h-14 object-contain opacity-11 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.4s" })}"><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-4/5 left-1/4 w-16 h-16 object-contain opacity-19 animate-float" style="${ssrRenderStyle({ "animation-delay": "2.1s" })}"><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute bottom-4/5 right-1/4 w-20 h-20 object-contain opacity-16 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.9s" })}"><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-1/5 left-3/5 w-14 h-14 object-contain opacity-12 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.4s" })}"><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute bottom-1/5 right-3/5 w-16 h-16 object-contain opacity-18 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.6s" })}"><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-3/5 left-1/8 w-20 h-20 object-contain opacity-14 animate-float" style="${ssrRenderStyle({ "animation-delay": "2.3s" })}"><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute bottom-3/4 right-1/8 w-16 h-16 object-contain opacity-15 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.1s" })}"><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-1/8 left-4/5 w-14 h-14 object-contain opacity-13 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.2s" })}"><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute bottom-1/8 right-4/5 w-16 h-16 object-contain opacity-17 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.6s" })}"></div><div class="bg-white shadow-sm"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="text-center"><h1 class="text-4xl font-bold text-gray-900 mb-4">${ssrInterpolate(currentLanguage.value === "km" ? "គោលការណ៍ភាពឯកជន" : "Privacy Policy")}</h1><p class="text-lg text-gray-600 max-w-3xl mx-auto">${ssrInterpolate(currentLanguage.value === "km" ? "ភាពឯកជនរបស់អ្នកមានសារៈសំខាន់សម្រាប់យើង។ គោលការណ៍នេះពន្យល់អំពីរបៀបដែលយើងប្រមូល ប្រើប្រាស់ និងការពារព័ត៌មានរបស់អ្នក។" : "Your privacy is important to us. This policy explains how we collect, use, and protect your information.")}</p><div class="mt-6 flex justify-center space-x-4"><button class="${ssrRenderClass([currentLanguage.value === "en" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200", "px-4 py-2 rounded-lg font-medium transition-colors"])}"> English </button><button class="${ssrRenderClass([currentLanguage.value === "km" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200", "px-4 py-2 rounded-lg font-medium transition-colors"])}"> ខ្មែរ (Khmer) </button></div></div></div></div><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div class="bg-white rounded-lg shadow-lg p-8 space-y-8">`);
      if (loading.value) {
        _push(`<div class="text-center py-12"><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div><p class="mt-2 text-gray-600">Loading privacy policy...</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (error.value) {
        _push(`<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(sections.value, (section) => {
        _push(`<section><h2 class="text-2xl font-bold text-gray-900 mb-4">${ssrInterpolate(section.title)}</h2><div class="prose prose-gray max-w-none"><div class="text-gray-700 whitespace-pre-line">${formatContent(section.content) ?? ""}</div></div></section>`);
      });
      _push(`<!--]-->`);
      if (!loading.value && !error.value && sections.value.length === 0) {
        _push(`<div><section><h2 class="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2><div class="prose prose-gray max-w-none"><p class="text-gray-700 mb-4"> We collect information you provide directly to us, such as when you: </p><ul class="list-disc pl-6 text-gray-700 space-y-2"><li>Create an account or register for our services</li><li>Apply for a position through our careers page</li><li>Contact us for customer support</li><li>Subscribe to our newsletter or promotional communications</li><li>Participate in surveys or feedback forms</li></ul></div></section><section><h2 class="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2><div class="prose prose-gray max-w-none"><p class="text-gray-700 mb-4"> We use the information we collect to: </p><ul class="list-disc pl-6 text-gray-700 space-y-2"><li>Provide, maintain, and improve our services</li><li>Process job applications and recruitment activities</li><li>Send you technical notices and security alerts</li><li>Respond to your comments, questions, and customer service requests</li><li>Communicate with you about products, services, and events</li><li>Monitor and analyze usage patterns and trends</li></ul></div></section><section><h2 class="text-2xl font-bold text-gray-900 mb-4">Information Sharing and Disclosure</h2><div class="prose prose-gray max-w-none"><p class="text-gray-700 mb-4"> We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances: </p><ul class="list-disc pl-6 text-gray-700 space-y-2"><li>With your explicit consent</li><li>To comply with legal obligations</li><li>To protect our rights and safety</li><li>With trusted service providers who assist in our operations</li></ul></div></section><section><h2 class="text-2xl font-bold text-gray-900 mb-4">Data Security</h2><div class="prose prose-gray max-w-none"><p class="text-gray-700 mb-4"> We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure. </p></div></section><section><h2 class="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2><div class="prose prose-gray max-w-none"><p class="text-gray-700 mb-4"> You have the right to: </p><ul class="list-disc pl-6 text-gray-700 space-y-2"><li>Access and update your personal information</li><li>Request deletion of your personal data</li><li>Opt-out of marketing communications</li><li>Request data portability</li><li>Lodge a complaint with supervisory authorities</li></ul></div></section><section><h2 class="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2><div class="prose prose-gray max-w-none"><p class="text-gray-700 mb-4"> We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookies through your browser settings. </p></div></section><section><h2 class="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2><div class="prose prose-gray max-w-none"><p class="text-gray-700 mb-4"> If you have any questions about this Privacy Policy, please contact us at: </p><div class="bg-gray-50 p-4 rounded-lg"><p class="text-gray-700"><strong>Aprati Foods Cambodia</strong><br> Email: privacy@aprati.com<br> Phone: +855 23 xxx xxx<br> Address: Phnom Penh, Cambodia </p></div></div></section></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="pt-8 border-t">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg> Back to Website `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 mr-2",
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
              ])),
              createTextVNode(" Back to Website ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/privacy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=privacy-D4KMgDJh.mjs.map
