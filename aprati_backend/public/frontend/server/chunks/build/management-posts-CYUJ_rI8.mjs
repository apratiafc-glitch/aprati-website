import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, computed, mergeProps, withCtx, createBlock, createTextVNode, openBlock, createVNode, unref, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { u as useApi } from './useApi-CO9TAo9a.mjs';
import { a as useSeoMeta } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/ufo/dist/index.mjs';
import './cookie-D4T41UgU.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/cookie-es/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/h3/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/destr/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/ohash/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/klona/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/ofetch/dist/node.mjs';
import '../_/nitro.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/hookable/dist/index.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/node-mock-http/dist/index.mjs';
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
  __name: "management-posts",
  __ssrInlineRender: true,
  setup(__props) {
    const { managementPosts: postsApi } = useApi();
    const posts = ref([]);
    const loading = ref(true);
    const error = ref("");
    const submitting = ref(false);
    const showCreateModal = ref(false);
    const showEditModal = ref(false);
    const showViewModal = ref(false);
    const viewingPost = ref(null);
    const editingPost = ref(null);
    const form = ref({
      name: "",
      // This will be the title
      description: "",
      is_active: true
    });
    ref(null);
    ref(null);
    ref("");
    ref(0);
    ref("");
    const uploadingImage = ref(false);
    const isEditing = computed(() => !!editingPost.value);
    const activePosts = computed(() => posts.value.filter((p) => p.is_active).length);
    const inactivePosts = computed(() => posts.value.filter((p) => !p.is_active).length);
    const thisMonthPosts = computed(() => {
      const now = /* @__PURE__ */ new Date();
      const thisMonth = now.getMonth();
      const thisYear = now.getFullYear();
      return posts.value.filter((p) => {
        const postDate = new Date(p.created_at);
        return postDate.getMonth() === thisMonth && postDate.getFullYear() === thisYear;
      }).length;
    });
    const getInitials = (name) => {
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const formatDetailedDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    useSeoMeta({
      title: "Management Posts - Admin - Aprati Food Company",
      description: "Admin panel for managing top management posts and announcements."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100" }, _attrs))} data-v-ac7dd75c><div class="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg sticky top-0 z-40" data-v-ac7dd75c><div class="max-w-7xl mx-auto px-6 py-6" data-v-ac7dd75c><div class="flex justify-between items-center" data-v-ac7dd75c><div class="space-y-1" data-v-ac7dd75c><h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-v-ac7dd75c> Leadership Team Management </h1><p class="text-slate-600" data-v-ac7dd75c>Manage executive profiles and team information</p></div><div class="flex items-center space-x-3" data-v-ac7dd75c>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/dashboard",
        class: "inline-flex items-center px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ac7dd75c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-ac7dd75c${_scopeId}></path></svg> Dashboard `);
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
              createTextVNode(" Dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl" data-v-ac7dd75c><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ac7dd75c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-ac7dd75c></path></svg> Add Post </button><button class="inline-flex items-center px-4 py-2.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-sm" data-v-ac7dd75c><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ac7dd75c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-ac7dd75c></path></svg> Refresh </button></div></div></div></div><div class="max-w-7xl mx-auto px-6 py-8" data-v-ac7dd75c><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-v-ac7dd75c><div class="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-white/20 hover:bg-white/80" data-v-ac7dd75c><div class="flex items-center justify-between" data-v-ac7dd75c><div data-v-ac7dd75c><div class="flex items-center space-x-3 mb-2" data-v-ac7dd75c><div class="p-2.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg" data-v-ac7dd75c><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ac7dd75c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-ac7dd75c></path></svg></div><div data-v-ac7dd75c><p class="text-sm font-medium text-slate-600" data-v-ac7dd75c>Total Posts</p><p class="text-2xl font-bold text-slate-900" data-v-ac7dd75c>${ssrInterpolate(unref(posts).length)}</p></div></div></div><div class="text-blue-500 opacity-20 group-hover:opacity-40 transition-opacity" data-v-ac7dd75c><svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" data-v-ac7dd75c><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" data-v-ac7dd75c></path></svg></div></div></div><div class="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-white/20 hover:bg-white/80" data-v-ac7dd75c><div class="flex items-center justify-between" data-v-ac7dd75c><div data-v-ac7dd75c><div class="flex items-center space-x-3 mb-2" data-v-ac7dd75c><div class="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg" data-v-ac7dd75c><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ac7dd75c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-ac7dd75c></path></svg></div><div data-v-ac7dd75c><p class="text-sm font-medium text-slate-600" data-v-ac7dd75c>Active</p><p class="text-2xl font-bold text-slate-900" data-v-ac7dd75c>${ssrInterpolate(unref(activePosts))}</p></div></div></div><div class="text-emerald-500 opacity-20 group-hover:opacity-40 transition-opacity" data-v-ac7dd75c><svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" data-v-ac7dd75c><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-v-ac7dd75c></path></svg></div></div></div><div class="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-white/20 hover:bg-white/80" data-v-ac7dd75c><div class="flex items-center justify-between" data-v-ac7dd75c><div data-v-ac7dd75c><div class="flex items-center space-x-3 mb-2" data-v-ac7dd75c><div class="p-2.5 bg-gradient-to-r from-slate-500 to-slate-600 rounded-xl shadow-lg" data-v-ac7dd75c><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ac7dd75c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" data-v-ac7dd75c></path></svg></div><div data-v-ac7dd75c><p class="text-sm font-medium text-slate-600" data-v-ac7dd75c>Inactive</p><p class="text-2xl font-bold text-slate-900" data-v-ac7dd75c>${ssrInterpolate(unref(inactivePosts))}</p></div></div></div><div class="text-slate-500 opacity-20 group-hover:opacity-40 transition-opacity" data-v-ac7dd75c><svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" data-v-ac7dd75c><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" data-v-ac7dd75c></path></svg></div></div></div><div class="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-white/20 hover:bg-white/80" data-v-ac7dd75c><div class="flex items-center justify-between" data-v-ac7dd75c><div data-v-ac7dd75c><div class="flex items-center space-x-3 mb-2" data-v-ac7dd75c><div class="p-2.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg" data-v-ac7dd75c><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ac7dd75c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-ac7dd75c></path></svg></div><div data-v-ac7dd75c><p class="text-sm font-medium text-slate-600" data-v-ac7dd75c>This Month</p><p class="text-2xl font-bold text-slate-900" data-v-ac7dd75c>${ssrInterpolate(unref(thisMonthPosts))}</p></div></div></div><div class="text-purple-500 opacity-20 group-hover:opacity-40 transition-opacity" data-v-ac7dd75c><svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" data-v-ac7dd75c><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" data-v-ac7dd75c></path></svg></div></div></div></div>`);
      if (unref(loading)) {
        _push(`<div class="flex flex-col items-center justify-center py-16" data-v-ac7dd75c><div class="relative" data-v-ac7dd75c><div class="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600" data-v-ac7dd75c></div><div class="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-blue-400" data-v-ac7dd75c></div></div><p class="mt-4 text-slate-600 font-medium" data-v-ac7dd75c>Loading posts...</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(error)) {
        _push(`<div class="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8 shadow-lg" data-v-ac7dd75c><div class="flex items-center" data-v-ac7dd75c><svg class="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ac7dd75c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-ac7dd75c></path></svg> ${ssrInterpolate(unref(error))}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(loading) && !unref(error)) {
        _push(`<div class="bg-white/70 backdrop-blur-sm shadow-xl rounded-3xl overflow-hidden border border-white/20" data-v-ac7dd75c><div class="px-8 py-6 border-b border-slate-200/50 bg-gradient-to-r from-slate-50 to-blue-50" data-v-ac7dd75c><div class="flex items-center justify-between" data-v-ac7dd75c><h3 class="text-xl font-semibold text-slate-900 flex items-center" data-v-ac7dd75c><svg class="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ac7dd75c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" data-v-ac7dd75c></path></svg> Management Posts </h3><span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium" data-v-ac7dd75c>${ssrInterpolate(unref(posts).length)} posts </span></div></div>`);
        if (unref(posts).length === 0) {
          _push(`<div class="text-center py-16" data-v-ac7dd75c><div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center" data-v-ac7dd75c><svg class="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ac7dd75c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-ac7dd75c></path></svg></div><h3 class="text-2xl font-semibold text-slate-900 mb-3" data-v-ac7dd75c>No posts yet</h3><p class="text-slate-600 mb-6 max-w-md mx-auto" data-v-ac7dd75c>Start by creating your first management post.</p><button class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg" data-v-ac7dd75c><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ac7dd75c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-ac7dd75c></path></svg> Add First Post </button></div>`);
        } else {
          _push(`<div class="divide-y divide-slate-200/50" data-v-ac7dd75c><!--[-->`);
          ssrRenderList(unref(posts), (post) => {
            _push(`<div class="group px-8 py-6 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-200" data-v-ac7dd75c><div class="flex items-center justify-between" data-v-ac7dd75c><div class="flex items-center space-x-4 flex-1" data-v-ac7dd75c><div class="relative" data-v-ac7dd75c>`);
            if (post.image_url) {
              _push(`<div class="w-16 h-16 rounded-2xl bg-cover bg-center border-2 border-white shadow-lg" style="${ssrRenderStyle({ backgroundImage: `url(${post.image_url})` })}" data-v-ac7dd75c></div>`);
            } else {
              _push(`<div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-white shadow-lg" data-v-ac7dd75c><span class="text-white text-xl font-bold" data-v-ac7dd75c>${ssrInterpolate(getInitials(post.name))}</span></div>`);
            }
            _push(`<div class="absolute -bottom-1 -right-1" data-v-ac7dd75c><div class="${ssrRenderClass([post.is_active ? "bg-emerald-500" : "bg-slate-400", "w-5 h-5 rounded-full border-2 border-white shadow-sm flex items-center justify-center"])}" data-v-ac7dd75c><div class="w-2 h-2 bg-white rounded-full" data-v-ac7dd75c></div></div></div></div><div class="flex-1 min-w-0" data-v-ac7dd75c><div class="flex items-center space-x-3 mb-1" data-v-ac7dd75c><h4 class="text-lg font-semibold text-slate-900 truncate" data-v-ac7dd75c>${ssrInterpolate(post.name)}</h4><span class="${ssrRenderClass([post.is_active ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-slate-100 text-slate-800 border-slate-200", "px-2.5 py-1 text-xs font-medium rounded-full border"])}" data-v-ac7dd75c>${ssrInterpolate(post.is_active ? "Active" : "Inactive")}</span></div><p class="text-slate-600 text-sm line-clamp-2 max-w-2xl" data-v-ac7dd75c>${ssrInterpolate(post.description)}</p><div class="flex items-center space-x-4 mt-2 text-xs text-slate-500" data-v-ac7dd75c><span class="flex items-center" data-v-ac7dd75c><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ac7dd75c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-ac7dd75c></path></svg> Created ${ssrInterpolate(formatDate(post.created_at))}</span></div></div></div><div class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" data-v-ac7dd75c><button class="p-2.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200" title="View Details" data-v-ac7dd75c><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ac7dd75c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-ac7dd75c></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-ac7dd75c></path></svg></button><button class="p-2.5 text-slate-600 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200" title="Edit" data-v-ac7dd75c><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ac7dd75c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-ac7dd75c></path></svg></button><button class="${ssrRenderClass([post.is_active ? "text-slate-600 hover:text-slate-700 hover:bg-slate-50" : "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50", "p-2.5 rounded-xl transition-all duration-200"])}"${ssrRenderAttr("title", post.is_active ? "Deactivate" : "Activate")} data-v-ac7dd75c>`);
            if (post.is_active) {
              _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ac7dd75c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" data-v-ac7dd75c></path></svg>`);
            } else {
              _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ac7dd75c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-ac7dd75c></path></svg>`);
            }
            _push(`</button><button class="p-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200" title="Delete" data-v-ac7dd75c><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ac7dd75c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1V4a1 1 0 00-1 1v3M4 7h16" data-v-ac7dd75c></path></svg></button></div></div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(showCreateModal) || unref(showEditModal)) {
        _push(`<div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50" data-v-ac7dd75c><div class="bg-white rounded-3xl max-w-2xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-white/20" data-v-ac7dd75c><div class="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6" data-v-ac7dd75c><div class="flex justify-between items-center" data-v-ac7dd75c><div data-v-ac7dd75c><h2 class="text-2xl font-bold text-white" data-v-ac7dd75c>${ssrInterpolate(unref(isEditing) ? "Edit Post" : "Add New Post")}</h2><p class="text-blue-100 mt-1" data-v-ac7dd75c>${ssrInterpolate(unref(isEditing) ? "Update post information" : "Add a new management post")}</p></div><button class="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl p-2 transition-all duration-200" data-v-ac7dd75c><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ac7dd75c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-ac7dd75c></path></svg></button></div></div><div class="p-8 max-h-[70vh] overflow-y-auto" data-v-ac7dd75c><form class="space-y-6" data-v-ac7dd75c><div data-v-ac7dd75c><label class="block text-sm font-semibold text-slate-700 mb-3" data-v-ac7dd75c>Title *</label><input${ssrRenderAttr("value", unref(form).name)} type="text" required class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white" placeholder="Enter title" data-v-ac7dd75c></div><div data-v-ac7dd75c><label class="block text-sm font-semibold text-slate-700 mb-3" data-v-ac7dd75c>Description *</label><textarea rows="6" required class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white resize-none" placeholder="Enter description..." data-v-ac7dd75c>${ssrInterpolate(unref(form).description)}</textarea></div><div class="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl" data-v-ac7dd75c><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-slate-300 rounded transition-all duration-200" data-v-ac7dd75c><div data-v-ac7dd75c><label class="text-sm font-medium text-slate-900" data-v-ac7dd75c> Active </label><p class="text-xs text-slate-600" data-v-ac7dd75c>This item will be visible on the public website</p></div></div><div class="flex justify-end space-x-4 pt-6 border-t border-slate-200" data-v-ac7dd75c><button type="button" class="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 font-medium" data-v-ac7dd75c> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(submitting) || unref(uploadingImage)) ? " disabled" : ""} class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl disabled:opacity-50 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl" data-v-ac7dd75c>`);
        if (unref(uploadingImage)) {
          _push(`<span class="flex items-center" data-v-ac7dd75c><svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" data-v-ac7dd75c><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-ac7dd75c></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-ac7dd75c></path></svg> Uploading image... </span>`);
        } else if (unref(submitting)) {
          _push(`<span class="flex items-center" data-v-ac7dd75c><svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" data-v-ac7dd75c><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-ac7dd75c></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-ac7dd75c></path></svg> ${ssrInterpolate(unref(isEditing) ? "Updating..." : "Creating...")}</span>`);
        } else {
          _push(`<span data-v-ac7dd75c>${ssrInterpolate(unref(isEditing) ? "Update Post" : "Add Post")}</span>`);
        }
        _push(`</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showViewModal) && unref(viewingPost)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" data-v-ac7dd75c><div class="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto" data-v-ac7dd75c><div class="p-6" data-v-ac7dd75c><div class="flex justify-between items-center mb-6" data-v-ac7dd75c><h2 class="text-2xl font-bold text-gray-900" data-v-ac7dd75c>Post Details</h2><button class="text-gray-400 hover:text-gray-600" data-v-ac7dd75c><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ac7dd75c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-ac7dd75c></path></svg></button></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8" data-v-ac7dd75c><div class="lg:col-span-1" data-v-ac7dd75c><div class="text-center mb-6" data-v-ac7dd75c>`);
        if (unref(viewingPost).image_url) {
          _push(`<div class="w-32 h-32 mx-auto rounded-full bg-cover bg-center border-4 border-white shadow-lg" style="${ssrRenderStyle({ backgroundImage: `url(${unref(viewingPost).image_url})` })}" data-v-ac7dd75c></div>`);
        } else {
          _push(`<div class="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-white shadow-lg" data-v-ac7dd75c><span class="text-white text-3xl font-bold" data-v-ac7dd75c>${ssrInterpolate(getInitials(unref(viewingPost).name))}</span></div>`);
        }
        _push(`<h3 class="text-xl font-bold text-gray-900 mt-4" data-v-ac7dd75c>${ssrInterpolate(unref(viewingPost).name)}</h3><p class="text-blue-600 font-semibold" data-v-ac7dd75c>${ssrInterpolate(unref(viewingPost).position)}</p><span class="${ssrRenderClass([unref(viewingPost).is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800", "inline-flex px-3 py-1 text-sm font-semibold rounded-full mt-2"])}" data-v-ac7dd75c>${ssrInterpolate(unref(viewingPost).is_active ? "Active" : "Inactive")}</span></div><div class="bg-gray-50 p-4 rounded-lg space-y-3" data-v-ac7dd75c>`);
        if (unref(viewingPost).department) {
          _push(`<div data-v-ac7dd75c><p class="text-sm text-gray-600" data-v-ac7dd75c>Department</p><p class="font-medium" data-v-ac7dd75c>${ssrInterpolate(unref(viewingPost).department)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(viewingPost).email) {
          _push(`<div data-v-ac7dd75c><p class="text-sm text-gray-600" data-v-ac7dd75c>Email</p><p class="font-medium" data-v-ac7dd75c><a${ssrRenderAttr("href", `mailto:${unref(viewingPost).email}`)} class="text-blue-600 hover:text-blue-800" data-v-ac7dd75c>${ssrInterpolate(unref(viewingPost).email)}</a></p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div data-v-ac7dd75c><p class="text-sm text-gray-600" data-v-ac7dd75c>Created</p><p class="font-medium" data-v-ac7dd75c>${ssrInterpolate(formatDetailedDate(unref(viewingPost).created_at))}</p></div><div data-v-ac7dd75c><p class="text-sm text-gray-600" data-v-ac7dd75c>Last Updated</p><p class="font-medium" data-v-ac7dd75c>${ssrInterpolate(formatDetailedDate(unref(viewingPost).updated_at))}</p></div></div></div><div class="lg:col-span-2 space-y-6" data-v-ac7dd75c><div data-v-ac7dd75c><h4 class="text-lg font-semibold text-gray-900 mb-3" data-v-ac7dd75c>Description</h4><div class="bg-gray-50 p-4 rounded-lg" data-v-ac7dd75c><p class="text-gray-700 whitespace-pre-line" data-v-ac7dd75c>${ssrInterpolate(unref(viewingPost).description)}</p></div></div>`);
        if (unref(viewingPost).bio) {
          _push(`<div data-v-ac7dd75c><h4 class="text-lg font-semibold text-gray-900 mb-3" data-v-ac7dd75c>Biography &amp; Experience</h4><div class="bg-gray-50 p-4 rounded-lg" data-v-ac7dd75c><div class="prose max-w-none" data-v-ac7dd75c><p class="text-gray-700 whitespace-pre-line leading-relaxed" data-v-ac7dd75c>${ssrInterpolate(unref(viewingPost).bio)}</p></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="flex justify-end space-x-4 pt-6 border-t mt-8" data-v-ac7dd75c><button class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" data-v-ac7dd75c> Close </button><button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" data-v-ac7dd75c> Edit Post </button></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/management-posts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const managementPosts = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ac7dd75c"]]);

export { managementPosts as default };
//# sourceMappingURL=management-posts-CYUJ_rI8.mjs.map
