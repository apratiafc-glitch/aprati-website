import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, mergeProps, withCtx, createBlock, openBlock, createVNode, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
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
  __name: "visitors",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Website Analytics - Aprati Food Company",
      description: "Website visitor analytics and statistics"
    });
    const loading = ref(true);
    const stats = ref({});
    const deviceStats = ref([]);
    const browserStats = ref([]);
    const popularPages = ref([]);
    const recentVisitors = ref([]);
    const getPercentage = (value, total) => {
      if (!total || total === 0) return 0;
      return value / total * 100;
    };
    const getDeviceColor = (device, isBg = false) => {
      const colors = {
        "desktop": isBg ? "bg-blue-500" : "bg-blue-100 text-blue-800",
        "mobile": isBg ? "bg-green-500" : "bg-green-100 text-green-800",
        "tablet": isBg ? "bg-purple-500" : "bg-purple-100 text-purple-800",
        "robot": isBg ? "bg-red-500" : "bg-red-100 text-red-800"
      };
      return colors[device?.toLowerCase()] || (isBg ? "bg-gray-500" : "bg-gray-100 text-gray-800");
    };
    const getBrowserColor = (browser, isBg = false) => {
      const colors = {
        "chrome": isBg ? "bg-blue-500" : "bg-blue-100 text-blue-800",
        "firefox": isBg ? "bg-orange-500" : "bg-orange-100 text-orange-800",
        "safari": isBg ? "bg-gray-500" : "bg-gray-100 text-gray-800",
        "edge": isBg ? "bg-indigo-500" : "bg-indigo-100 text-indigo-800",
        "opera": isBg ? "bg-red-500" : "bg-red-100 text-red-800"
      };
      return colors[browser?.toLowerCase()] || (isBg ? "bg-gray-500" : "bg-gray-100 text-gray-800");
    };
    const formatDate = (dateString) => {
      if (!dateString) return "Unknown";
      try {
        return new Date(dateString).toLocaleString();
      } catch (error) {
        return "Invalid Date";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><nav class="bg-white shadow-sm"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="flex items-center">`);
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
      _push(`<h1 class="text-2xl font-bold text-gray-900">Website Analytics</h1></div><div class="flex items-center space-x-4"><button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 text-blue-700 disabled:text-gray-400 rounded-lg transition-colors duration-200"><svg class="${ssrRenderClass([{ "animate-spin": loading.value }, "w-4 h-4 mr-2"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>`);
      if (loading.value) {
        _push(`<span>Loading...</span>`);
      } else {
        _push(`<span>Refresh</span>`);
      }
      _push(`</button></div></div></div></nav><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"><div class="bg-white rounded-lg shadow-lg p-6"><div class="flex items-center"><div class="p-3 rounded-full bg-blue-100"><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></div><div class="ml-4"><p class="text-sm font-medium text-gray-600">Total Visitors</p><p class="text-2xl font-semibold text-gray-900">`);
      if (loading.value) {
        _push(`<span class="animate-pulse bg-gray-200 rounded w-12 h-8 inline-block"></span>`);
      } else {
        _push(`<span>${ssrInterpolate(stats.value.total_visitors || 0)}</span>`);
      }
      _push(`</p></div></div></div><div class="bg-white rounded-lg shadow-lg p-6"><div class="flex items-center"><div class="p-3 rounded-full bg-green-100"><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg></div><div class="ml-4"><p class="text-sm font-medium text-gray-600">Today&#39;s Visitors</p><p class="text-2xl font-semibold text-gray-900">`);
      if (loading.value) {
        _push(`<span class="animate-pulse bg-gray-200 rounded w-12 h-8 inline-block"></span>`);
      } else {
        _push(`<span>${ssrInterpolate(stats.value.today_visitors || 0)}</span>`);
      }
      _push(`</p></div></div></div><div class="bg-white rounded-lg shadow-lg p-6"><div class="flex items-center"><div class="p-3 rounded-full bg-purple-100"><svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg></div><div class="ml-4"><p class="text-sm font-medium text-gray-600">This Week</p><p class="text-2xl font-semibold text-gray-900">`);
      if (loading.value) {
        _push(`<span class="animate-pulse bg-gray-200 rounded w-12 h-8 inline-block"></span>`);
      } else {
        _push(`<span>${ssrInterpolate(stats.value.week_visitors || 0)}</span>`);
      }
      _push(`</p></div></div></div><div class="bg-white rounded-lg shadow-lg p-6"><div class="flex items-center"><div class="p-3 rounded-full bg-orange-100"><svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 8l-2-2m0 0l2-2m-2 2h8m-8 0V9a4 4 0 118 0v6"></path></svg></div><div class="ml-4"><p class="text-sm font-medium text-gray-600">This Month</p><p class="text-2xl font-semibold text-gray-900">`);
      if (loading.value) {
        _push(`<span class="animate-pulse bg-gray-200 rounded w-12 h-8 inline-block"></span>`);
      } else {
        _push(`<span>${ssrInterpolate(stats.value.month_visitors || 0)}</span>`);
      }
      _push(`</p></div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"><div class="bg-white rounded-lg shadow-lg p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">Device Types</h3>`);
      if (loading.value) {
        _push(`<div class="space-y-3"><div class="animate-pulse bg-gray-200 rounded h-4 w-full"></div><div class="animate-pulse bg-gray-200 rounded h-4 w-3/4"></div><div class="animate-pulse bg-gray-200 rounded h-4 w-1/2"></div></div>`);
      } else {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(deviceStats.value, (device) => {
          _push(`<div class="flex items-center justify-between"><div class="flex items-center"><div class="${ssrRenderClass([getDeviceColor(device.device), "w-3 h-3 rounded-full mr-3"])}"></div><span class="text-sm font-medium text-gray-700 capitalize">${ssrInterpolate(device.device)}</span></div><div class="flex items-center space-x-2"><span class="text-sm text-gray-600">${ssrInterpolate(device.count)}</span><div class="w-16 bg-gray-200 rounded-full h-2"><div class="${ssrRenderClass([getDeviceColor(device.device, true), "h-2 rounded-full"])}" style="${ssrRenderStyle({ width: `${getPercentage(device.count, stats.value.total_visitors)}%` })}"></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div><div class="bg-white rounded-lg shadow-lg p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">Browser Types</h3>`);
      if (loading.value) {
        _push(`<div class="space-y-3"><div class="animate-pulse bg-gray-200 rounded h-4 w-full"></div><div class="animate-pulse bg-gray-200 rounded h-4 w-3/4"></div><div class="animate-pulse bg-gray-200 rounded h-4 w-1/2"></div></div>`);
      } else {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(browserStats.value, (browser) => {
          _push(`<div class="flex items-center justify-between"><div class="flex items-center"><div class="${ssrRenderClass([getBrowserColor(browser.browser), "w-3 h-3 rounded-full mr-3"])}"></div><span class="text-sm font-medium text-gray-700">${ssrInterpolate(browser.browser)}</span></div><div class="flex items-center space-x-2"><span class="text-sm text-gray-600">${ssrInterpolate(browser.count)}</span><div class="w-16 bg-gray-200 rounded-full h-2"><div class="${ssrRenderClass([getBrowserColor(browser.browser, true), "h-2 rounded-full"])}" style="${ssrRenderStyle({ width: `${getPercentage(browser.count, stats.value.total_visitors)}%` })}"></div></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div><div class="bg-white rounded-lg shadow-lg p-6 mb-8"><h3 class="text-lg font-semibold text-gray-900 mb-4">Popular Pages</h3>`);
      if (loading.value) {
        _push(`<div class="space-y-3"><div class="animate-pulse bg-gray-200 rounded h-4 w-full"></div><div class="animate-pulse bg-gray-200 rounded h-4 w-3/4"></div><div class="animate-pulse bg-gray-200 rounded h-4 w-1/2"></div></div>`);
      } else {
        _push(`<div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page URL</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visits</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`);
        ssrRenderList(popularPages.value, (page) => {
          _push(`<tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${ssrInterpolate(page.url || "Unknown")}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${ssrInterpolate(page.count)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${ssrInterpolate(getPercentage(page.count, stats.value.total_visitors).toFixed(1))}% </td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`</div><div class="bg-white rounded-lg shadow-lg p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Visitors</h3>`);
      if (loading.value) {
        _push(`<div class="space-y-3"><div class="animate-pulse bg-gray-200 rounded h-4 w-full"></div><div class="animate-pulse bg-gray-200 rounded h-4 w-3/4"></div><div class="animate-pulse bg-gray-200 rounded h-4 w-1/2"></div></div>`);
      } else {
        _push(`<div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Browser</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`);
        ssrRenderList(recentVisitors.value, (visitor) => {
          _push(`<tr><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${ssrInterpolate(formatDate(visitor.visited_at))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${ssrInterpolate(visitor.page_url || "Unknown")}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600"><span class="${ssrRenderClass([getDeviceColor(visitor.device_type), "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"])}">${ssrInterpolate(visitor.device_type || "Unknown")}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${ssrInterpolate(visitor.browser || "Unknown")}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${ssrInterpolate(visitor.country || "Unknown")}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/visitors.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=visitors-DPe93kev.mjs.map
