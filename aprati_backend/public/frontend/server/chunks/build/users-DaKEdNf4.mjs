import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, reactive, computed, mergeProps, withCtx, createBlock, openBlock, createVNode, unref, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { debounce } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/lodash-es/lodash.js';
import { u as useHead, b as useRuntimeConfig } from './server.mjs';
import { u as useApi } from './useApi-CO9TAo9a.mjs';
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
import './cookie-D4T41UgU.mjs';
import 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/cookie-es/dist/index.mjs';

const _sfc_main = {
  __name: "users",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Admin Users - Aprati Food Company",
      description: "Manage administrator accounts and permissions"
    });
    const loading = ref(false);
    const formLoading = ref(false);
    const users = ref([]);
    const brands = ref([]);
    const stats = ref({
      totalAdmins: 0,
      activeAdmins: 0,
      brandAdmins: 0,
      recentUsers: 0
    });
    const pagination = ref({
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 0,
      from: 0,
      to: 0
    });
    const filters = reactive({
      search: "",
      role: "",
      is_active: ""
    });
    const showCreateModal = ref(false);
    const showEditModal = ref(false);
    const showDeleteModal = ref(false);
    const userToDelete = ref(null);
    ref(null);
    const formError = ref("");
    const userForm = reactive({
      name: "",
      email: "",
      password: "",
      role: "admin",
      phone: "",
      address: "",
      is_active: true,
      brand_id: null
    });
    const currentUser = ref(null);
    const api = useApi();
    const loadUsers = async (page = 1) => {
      loading.value = true;
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          per_page: pagination.value.per_page.toString()
        });
        if (filters.search) params.append("search", filters.search);
        if (filters.role) params.append("role", filters.role);
        if (filters.is_active !== "") params.append("is_active", filters.is_active);
        const response = await api.request(`/users?${params.toString()}`);
        if (response.success || response.status === "success") {
          const data = response.data;
          users.value = data.users.data || data.users || [];
          if (data.users && data.users.current_page !== void 0) {
            pagination.value = {
              current_page: data.users.current_page,
              last_page: data.users.last_page,
              per_page: data.users.per_page,
              total: data.users.total,
              from: data.users.from,
              to: data.users.to
            };
          }
          loadStats();
        }
      } catch (error) {
        console.error("Failed to load users:", error);
        showNotification("Failed to load users", "error");
      } finally {
        loading.value = false;
      }
    };
    const loadStats = async () => {
      try {
        const adminUsers = users.value.filter((user) => user.role === "admin" || user.role === "brand_admin");
        stats.value = {
          totalAdmins: adminUsers.length,
          activeAdmins: adminUsers.filter((user) => user.is_active).length,
          brandAdmins: adminUsers.filter((user) => user.role === "brand_admin").length,
          recentUsers: adminUsers.filter((user) => {
            const created = new Date(user.created_at);
            const now = /* @__PURE__ */ new Date();
            const diffTime = Math.abs(now - created);
            const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
            return diffDays <= 7;
          }).length
        };
      } catch (error) {
        console.error("Failed to load stats:", error);
      }
    };
    debounce(() => {
      loadUsers(1);
    }, 500);
    const visiblePages = computed(() => {
      const current = pagination.value.current_page;
      const last = pagination.value.last_page;
      const pages = [];
      for (let i = Math.max(1, current - 2); i <= Math.min(last, current + 2); i++) {
        pages.push(i);
      }
      return pages;
    });
    const getProfileImageUrl = (imagePath) => {
      if (!imagePath) return "";
      if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
        return imagePath;
      }
      const runtimeConfig = useRuntimeConfig();
      const baseUrl = runtimeConfig.public.apiBaseUrl?.replace("/api", "") || "https://sdev.apratifoods.asia";
      return imagePath.startsWith("/storage/") ? `${baseUrl}${imagePath}` : `${baseUrl}/storage/${imagePath}`;
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const showNotification = (message, type = "info") => {
      console.log(`${type.toUpperCase()}: ${message}`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50" }, _attrs))}><nav class="bg-white shadow-sm border-b"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="flex items-center space-x-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: "text-gray-600 hover:text-gray-900"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5",
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
      _push(`<h1 class="text-2xl font-bold text-gray-900">Admin Management</h1></div><div class="flex items-center space-x-4"><span class="text-gray-600">Welcome, ${ssrInterpolate(unref(currentUser)?.name || "Admin")}</span><button class="text-red-600 hover:text-red-800">Logout</button></div></div></div></nav><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="bg-white rounded-lg shadow-lg p-6 mb-8"><div class="flex justify-between items-center"><div><h2 class="text-3xl font-bold text-gray-900">Admin Users</h2><p class="text-gray-600 mt-2">Manage administrator accounts and permissions</p></div><button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg><span>Add New Admin</span></button></div></div><div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"><div class="bg-white rounded-lg shadow-lg p-6"><div class="flex items-center"><div class="p-3 rounded-full bg-blue-100"><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg></div><div class="ml-4"><p class="text-sm font-medium text-gray-600">Total Admins</p><p class="text-2xl font-semibold text-gray-900">${ssrInterpolate(unref(stats).totalAdmins || 0)}</p></div></div></div><div class="bg-white rounded-lg shadow-lg p-6"><div class="flex items-center"><div class="p-3 rounded-full bg-green-100"><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div class="ml-4"><p class="text-sm font-medium text-gray-600">Active Admins</p><p class="text-2xl font-semibold text-gray-900">${ssrInterpolate(unref(stats).activeAdmins || 0)}</p></div></div></div><div class="bg-white rounded-lg shadow-lg p-6"><div class="flex items-center"><div class="p-3 rounded-full bg-purple-100"><svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div><div class="ml-4"><p class="text-sm font-medium text-gray-600">Brand Admins</p><p class="text-2xl font-semibold text-gray-900">${ssrInterpolate(unref(stats).brandAdmins || 0)}</p></div></div></div><div class="bg-white rounded-lg shadow-lg p-6"><div class="flex items-center"><div class="p-3 rounded-full bg-orange-100"><svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div class="ml-4"><p class="text-sm font-medium text-gray-600">Recent Users</p><p class="text-2xl font-semibold text-gray-900">${ssrInterpolate(unref(stats).recentUsers || 0)}</p></div></div></div></div><div class="bg-white rounded-lg shadow-lg p-6 mb-8"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-2">Search</label><input${ssrRenderAttr("value", unref(filters).search)} type="text" placeholder="Search by name or email..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Role</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filters).role) ? ssrLooseContain(unref(filters).role, "") : ssrLooseEqual(unref(filters).role, "")) ? " selected" : ""}>All Roles</option><option value="admin"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).role) ? ssrLooseContain(unref(filters).role, "admin") : ssrLooseEqual(unref(filters).role, "admin")) ? " selected" : ""}>Admin</option><option value="brand_admin"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).role) ? ssrLooseContain(unref(filters).role, "brand_admin") : ssrLooseEqual(unref(filters).role, "brand_admin")) ? " selected" : ""}>Brand Admin</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Status</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filters).is_active) ? ssrLooseContain(unref(filters).is_active, "") : ssrLooseEqual(unref(filters).is_active, "")) ? " selected" : ""}>All Status</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).is_active) ? ssrLooseContain(unref(filters).is_active, "1") : ssrLooseEqual(unref(filters).is_active, "1")) ? " selected" : ""}>Active</option><option value="0"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).is_active) ? ssrLooseContain(unref(filters).is_active, "0") : ssrLooseEqual(unref(filters).is_active, "0")) ? " selected" : ""}>Inactive</option></select></div><div class="flex items-end"><button class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"> Apply Filters </button></div></div></div><div class="bg-white rounded-lg shadow-lg overflow-hidden"><div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200">`);
      if (unref(loading)) {
        _push(`<!--[-->`);
        ssrRenderList(5, (n) => {
          _push(`<tr><td class="px-6 py-4 whitespace-nowrap"><div class="animate-pulse flex items-center"><div class="h-10 w-10 bg-gray-200 rounded-full"></div><div class="ml-4"><div class="h-4 bg-gray-200 rounded w-24 mb-2"></div><div class="h-3 bg-gray-200 rounded w-16"></div></div></div></td><td class="px-6 py-4 whitespace-nowrap"><div class="animate-pulse h-4 bg-gray-200 rounded w-32"></div></td><td class="px-6 py-4 whitespace-nowrap"><div class="animate-pulse h-4 bg-gray-200 rounded w-20"></div></td><td class="px-6 py-4 whitespace-nowrap"><div class="animate-pulse h-6 bg-gray-200 rounded w-16"></div></td><td class="px-6 py-4 whitespace-nowrap"><div class="animate-pulse h-4 bg-gray-200 rounded w-20"></div></td><td class="px-6 py-4 whitespace-nowrap"><div class="animate-pulse h-4 bg-gray-200 rounded w-24"></div></td><td class="px-6 py-4 whitespace-nowrap"><div class="animate-pulse flex space-x-2"><div class="h-8 w-8 bg-gray-200 rounded"></div><div class="h-8 w-8 bg-gray-200 rounded"></div></div></td></tr>`);
        });
        _push(`<!--]-->`);
      } else if (unref(users).length === 0) {
        _push(`<tr><td colspan="7" class="px-6 py-12 text-center text-gray-500"><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg><p class="mt-4 text-lg font-medium">No users found</p><p class="text-gray-400">Get started by adding a new admin user.</p></td></tr>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(unref(users), (user) => {
          _push(`<tr class="hover:bg-gray-50"><td class="px-6 py-4 whitespace-nowrap"><div class="flex items-center">`);
          if (user.profile_image) {
            _push(`<img${ssrRenderAttr("src", getProfileImageUrl(user.profile_image))}${ssrRenderAttr("alt", user.name)} class="h-10 w-10 rounded-full object-cover">`);
          } else {
            _push(`<div class="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center"><svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7-7h14a7 7 0 00-7-7z"></path></svg></div>`);
          }
          _push(`<div class="ml-4"><div class="text-sm font-medium text-gray-900">${ssrInterpolate(user.name)}</div><div class="text-sm text-gray-500">${ssrInterpolate(user.phone || "No phone")}</div></div></div></td><td class="px-6 py-4 whitespace-nowrap"><div class="text-sm text-gray-900">${ssrInterpolate(user.email)}</div></td><td class="px-6 py-4 whitespace-nowrap"><span class="${ssrRenderClass([{
            "bg-red-100 text-red-800": user.role === "admin",
            "bg-blue-100 text-blue-800": user.role === "brand_admin",
            "bg-gray-100 text-gray-800": user.role === "user"
          }, "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}">${ssrInterpolate(user.role === "brand_admin" ? "Brand Admin" : user.role.charAt(0).toUpperCase() + user.role.slice(1))}</span></td><td class="px-6 py-4 whitespace-nowrap"><div class="text-sm text-gray-900">${ssrInterpolate(user.brand?.name || (user.role === "brand_admin" ? "No Brand Assigned" : "N/A"))}</div></td><td class="px-6 py-4 whitespace-nowrap"><span class="${ssrRenderClass([{
            "bg-green-100 text-green-800": user.is_active,
            "bg-red-100 text-red-800": !user.is_active
          }, "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}">${ssrInterpolate(user.is_active ? "Active" : "Inactive")}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ssrInterpolate(formatDate(user.created_at))}</td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium"><div class="flex space-x-2"><button class="text-blue-600 hover:text-blue-900" title="Edit user"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button><button class="${ssrRenderClass(user.is_active ? "text-red-600 hover:text-red-900" : "text-green-600 hover:text-green-900")}"${ssrRenderAttr("title", user.is_active ? "Deactivate user" : "Activate user")}>`);
          if (user.is_active) {
            _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"></path></svg>`);
          } else {
            _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`);
          }
          _push(`</button>`);
          if (user.id !== unref(currentUser)?.id) {
            _push(`<button class="text-red-600 hover:text-red-900" title="Delete user"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></td></tr>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</tbody></table></div>`);
      if (unref(pagination).total > unref(pagination).per_page) {
        _push(`<div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"><div class="flex-1 flex justify-between sm:hidden"><button${ssrIncludeBooleanAttr(unref(pagination).current_page <= 1) ? " disabled" : ""} class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"> Previous </button><button${ssrIncludeBooleanAttr(unref(pagination).current_page >= unref(pagination).last_page) ? " disabled" : ""} class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"> Next </button></div><div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"><div><p class="text-sm text-gray-700"> Showing ${ssrInterpolate(unref(pagination).from)} to ${ssrInterpolate(unref(pagination).to)} of ${ssrInterpolate(unref(pagination).total)} results </p></div><div><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination"><button${ssrIncludeBooleanAttr(unref(pagination).current_page <= 1) ? " disabled" : ""} class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"> Previous </button><!--[-->`);
        ssrRenderList(unref(visiblePages), (page) => {
          _push(`<button class="${ssrRenderClass([{
            "bg-blue-50 border-blue-500 text-blue-600": page === unref(pagination).current_page,
            "bg-white border-gray-300 text-gray-500 hover:bg-gray-50": page !== unref(pagination).current_page
          }, "relative inline-flex items-center px-4 py-2 border text-sm font-medium"])}">${ssrInterpolate(page)}</button>`);
        });
        _push(`<!--]--><button${ssrIncludeBooleanAttr(unref(pagination).current_page >= unref(pagination).last_page) ? " disabled" : ""} class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"> Next </button></nav></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (unref(showCreateModal) || unref(showEditModal)) {
        _push(`<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"><div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"><div class="mt-3"><h3 class="text-lg font-medium text-gray-900 mb-4">${ssrInterpolate(unref(showCreateModal) ? "Create New Admin User" : "Edit User")}</h3><form><div class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-1"> Name <span class="text-red-500">*</span></label><input${ssrRenderAttr("value", unref(userForm).name)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter full name"></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Email <span class="text-red-500">*</span></label><input${ssrRenderAttr("value", unref(userForm).email)} type="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter email address"></div>`);
        if (unref(showCreateModal)) {
          _push(`<div><label class="block text-sm font-medium text-gray-700 mb-1"> Password <span class="text-red-500">*</span></label><input${ssrRenderAttr("value", unref(userForm).password)} type="password" required minlength="8" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter password (min 8 characters)"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div><label class="block text-sm font-medium text-gray-700 mb-1"> Role <span class="text-red-500">*</span></label><select required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(userForm).role) ? ssrLooseContain(unref(userForm).role, "") : ssrLooseEqual(unref(userForm).role, "")) ? " selected" : ""}>Select role</option><option value="admin"${ssrIncludeBooleanAttr(Array.isArray(unref(userForm).role) ? ssrLooseContain(unref(userForm).role, "admin") : ssrLooseEqual(unref(userForm).role, "admin")) ? " selected" : ""}>Admin</option><option value="brand_admin"${ssrIncludeBooleanAttr(Array.isArray(unref(userForm).role) ? ssrLooseContain(unref(userForm).role, "brand_admin") : ssrLooseEqual(unref(userForm).role, "brand_admin")) ? " selected" : ""}>Brand Admin</option></select></div>`);
        if (unref(userForm).role === "brand_admin") {
          _push(`<div><label class="block text-sm font-medium text-gray-700 mb-1"> Brand <span class="text-red-500">*</span></label><select required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(userForm).brand_id) ? ssrLooseContain(unref(userForm).brand_id, "") : ssrLooseEqual(unref(userForm).brand_id, "")) ? " selected" : ""}>Select brand</option><!--[-->`);
          ssrRenderList(unref(brands), (brand) => {
            _push(`<option${ssrRenderAttr("value", brand.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(userForm).brand_id) ? ssrLooseContain(unref(userForm).brand_id, brand.id) : ssrLooseEqual(unref(userForm).brand_id, brand.id)) ? " selected" : ""}>${ssrInterpolate(brand.name)}</option>`);
          });
          _push(`<!--]--></select><p class="text-sm text-gray-500 mt-1">Brand admins can only manage content for their assigned brand.</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div><label class="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label><input${ssrRenderAttr("value", unref(userForm).phone)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter phone number"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Address (Optional)</label><textarea rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter address">${ssrInterpolate(unref(userForm).address)}</textarea></div><div class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(unref(userForm).is_active) ? ssrLooseContain(unref(userForm).is_active, null) : unref(userForm).is_active) ? " checked" : ""} type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"><label class="ml-2 block text-sm text-gray-900">Active user</label></div></div>`);
        if (unref(formError)) {
          _push(`<div class="mt-4 text-red-600 text-sm">${ssrInterpolate(unref(formError))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex justify-end space-x-3 mt-6"><button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(formLoading)) ? " disabled" : ""} class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50">${ssrInterpolate(unref(formLoading) ? "Saving..." : unref(showCreateModal) ? "Create User" : "Update User")}</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showDeleteModal)) {
        _push(`<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"><div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"><div class="mt-3 text-center"><svg class="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg><h3 class="text-lg font-medium text-gray-900 mt-4">Delete User</h3><p class="text-sm text-gray-500 mt-2"> Are you sure you want to delete <strong>${ssrInterpolate(unref(userToDelete)?.name)}</strong>? </p><p class="text-xs text-gray-400 mt-1"><strong>Note:</strong> If the user has associated data, they will be deactivated instead of deleted. </p><div class="flex justify-center space-x-3 mt-6"><button class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"> Cancel </button><button class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"> Delete User </button></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/users.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=users-DaKEdNf4.mjs.map
