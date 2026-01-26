import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, mergeProps, withCtx, createBlock, createTextVNode, openBlock, createVNode, unref, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { a as useSeoMeta, b as useRuntimeConfig } from './server.mjs';
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
  __name: "job-applications",
  __ssrInlineRender: true,
  setup(__props) {
    const { jobApplications: jobAppApi, careers: careerApi } = useApi();
    const applications = ref([]);
    const careers = ref([]);
    const statistics = ref({});
    const recentApplications = ref([]);
    const loading = ref(true);
    const error = ref("");
    const updating = ref(false);
    const filterStatus = ref("");
    const filterCareer = ref("");
    const searchQuery = ref("");
    const showViewModal = ref(false);
    const showStatusModal = ref(false);
    const showCVModal = ref(false);
    const viewingApplication = ref(null);
    const updatingApplication = ref(null);
    const viewingCV = ref(null);
    const statusForm = ref({
      status: "",
      admin_notes: ""
    });
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
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
    const formatStatus = (status) => {
      const statusMap = {
        pending: "Pending Review",
        reviewed: "Under Review",
        shortlisted: "Shortlisted",
        hired: "Hired",
        rejected: "Rejected"
      };
      return statusMap[status] || status;
    };
    const getStatusBadgeClass = (status) => {
      const classMap = {
        pending: "bg-yellow-100 text-yellow-800",
        reviewed: "bg-purple-100 text-purple-800",
        shortlisted: "bg-green-100 text-green-800",
        hired: "bg-emerald-100 text-emerald-800",
        rejected: "bg-red-100 text-red-800"
      };
      return classMap[status] || "bg-gray-100 text-gray-800";
    };
    const getCVFileType = (filename) => {
      const extension = filename.split(".").pop().toLowerCase();
      const typeMap = {
        "pdf": "PDF",
        "doc": "DOC",
        "docx": "DOCX"
      };
      return typeMap[extension] || extension.toUpperCase();
    };
    const getCVViewUrl = (application) => {
      const config = useRuntimeConfig();
      const apiBase = config.public.apiBase || "http://127.0.0.1:8000/api";
      return `${apiBase.replace("/api", "")}/storage/${application.cv_file_path}`;
    };
    useSeoMeta({
      title: "Job Applications - Admin - Aprati Food Company",
      description: "Admin panel for managing job applications and candidates."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div class="flex justify-between items-center mb-8"><div><h1 class="text-3xl font-bold text-gray-900">Job Applications</h1><p class="text-gray-600 mt-2">Manage job applications and candidates</p></div><div class="flex space-x-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/careers",
        class: "bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg> Back to Careers `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5 mr-2",
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
              createTextVNode(" Back to Careers ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(statistics).pending > 0) {
        _push(`<button class="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"><svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Mark All ${ssrInterpolate(unref(statistics).pending)} as Reviewed </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"><svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> Refresh </button></div></div><div class="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8"><div class="bg-white rounded-lg shadow p-6"><div class="flex items-center"><div class="p-2 bg-blue-100 rounded-lg"><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div><div class="ml-4"><p class="text-sm font-medium text-gray-600">Total</p><p class="text-2xl font-semibold text-gray-900">${ssrInterpolate(unref(statistics).total || 0)}</p></div></div></div><div class="bg-white rounded-lg shadow p-6"><div class="flex items-center"><div class="p-2 bg-yellow-100 rounded-lg"><svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div class="ml-4"><p class="text-sm font-medium text-gray-600">Pending</p><p class="text-2xl font-semibold text-gray-900">${ssrInterpolate(unref(statistics).pending || 0)}</p></div></div></div><div class="bg-white rounded-lg shadow p-6"><div class="flex items-center"><div class="p-2 bg-purple-100 rounded-lg"><svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></div><div class="ml-4"><p class="text-sm font-medium text-gray-600">Reviewed</p><p class="text-2xl font-semibold text-gray-900">${ssrInterpolate(unref(statistics).reviewed || 0)}</p></div></div></div><div class="bg-white rounded-lg shadow p-6"><div class="flex items-center"><div class="p-2 bg-green-100 rounded-lg"><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div class="ml-4"><p class="text-sm font-medium text-gray-600">Shortlisted</p><p class="text-2xl font-semibold text-gray-900">${ssrInterpolate(unref(statistics).shortlisted || 0)}</p></div></div></div><div class="bg-white rounded-lg shadow p-6"><div class="flex items-center"><div class="p-2 bg-emerald-100 rounded-lg"><svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.586l1.293-1.293a1 1 0 111.414 1.414L19 16.414V18a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1.586l-1.293 1.293a1 1 0 11-1.414-1.414L11 14.414V8a2 2 0 012-2h4a2 2 0 012 2z"></path></svg></div><div class="ml-4"><p class="text-sm font-medium text-gray-600">Hired</p><p class="text-2xl font-semibold text-gray-900">${ssrInterpolate(unref(statistics).hired || 0)}</p></div></div></div><div class="bg-white rounded-lg shadow p-6"><div class="flex items-center"><div class="p-2 bg-red-100 rounded-lg"><svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path></svg></div><div class="ml-4"><p class="text-sm font-medium text-gray-600">Rejected</p><p class="text-2xl font-semibold text-gray-900">${ssrInterpolate(unref(statistics).rejected || 0)}</p></div></div></div></div>`);
      if (unref(recentApplications).length > 0) {
        _push(`<div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"><div class="flex items-center"><svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span class="text-blue-800 font-medium">${ssrInterpolate(unref(recentApplications).length)} new application${ssrInterpolate(unref(recentApplications).length > 1 ? "s" : "")} in the last 24 hours </span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white rounded-lg shadow p-6 mb-8"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filterStatus)) ? ssrLooseContain(unref(filterStatus), "") : ssrLooseEqual(unref(filterStatus), "")) ? " selected" : ""}>All Statuses</option><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(unref(filterStatus)) ? ssrLooseContain(unref(filterStatus), "pending") : ssrLooseEqual(unref(filterStatus), "pending")) ? " selected" : ""}>Pending</option><option value="reviewed"${ssrIncludeBooleanAttr(Array.isArray(unref(filterStatus)) ? ssrLooseContain(unref(filterStatus), "reviewed") : ssrLooseEqual(unref(filterStatus), "reviewed")) ? " selected" : ""}>Reviewed</option><option value="shortlisted"${ssrIncludeBooleanAttr(Array.isArray(unref(filterStatus)) ? ssrLooseContain(unref(filterStatus), "shortlisted") : ssrLooseEqual(unref(filterStatus), "shortlisted")) ? " selected" : ""}>Shortlisted</option><option value="hired"${ssrIncludeBooleanAttr(Array.isArray(unref(filterStatus)) ? ssrLooseContain(unref(filterStatus), "hired") : ssrLooseEqual(unref(filterStatus), "hired")) ? " selected" : ""}>Hired</option><option value="rejected"${ssrIncludeBooleanAttr(Array.isArray(unref(filterStatus)) ? ssrLooseContain(unref(filterStatus), "rejected") : ssrLooseEqual(unref(filterStatus), "rejected")) ? " selected" : ""}>Rejected</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Filter by Career</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filterCareer)) ? ssrLooseContain(unref(filterCareer), "") : ssrLooseEqual(unref(filterCareer), "")) ? " selected" : ""}>All Careers</option><!--[-->`);
      ssrRenderList(unref(careers), (career) => {
        _push(`<option${ssrRenderAttr("value", career.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(filterCareer)) ? ssrLooseContain(unref(filterCareer), career.id) : ssrLooseEqual(unref(filterCareer), career.id)) ? " selected" : ""}>${ssrInterpolate(career.title_job)}</option>`);
      });
      _push(`<!--]--></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Search Applicant</label><input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Name or email..." class="w-full px-3 py-2 border border-gray-300 rounded-md"></div><div class="flex items-end"><button class="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"> Clear Filters </button></div></div></div>`);
      if (unref(loading)) {
        _push(`<div class="text-center py-12"><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div><p class="mt-2 text-gray-600">Loading applications...</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(error)) {
        _push(`<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(loading) && !unref(error)) {
        _push(`<div class="bg-white shadow rounded-lg overflow-hidden"><div class="px-6 py-4 border-b border-gray-200"><h3 class="text-lg font-medium text-gray-900"> Applications (${ssrInterpolate(unref(applications).length)}) </h3></div>`);
        if (unref(applications).length === 0) {
          _push(`<div class="text-center py-12"><svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg><h3 class="text-xl font-semibold text-gray-900 mb-2">No applications found</h3><p class="text-gray-600">No job applications match your current filters.</p></div>`);
        } else {
          _push(`<div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`);
          ssrRenderList(unref(applications), (application) => {
            _push(`<tr class="hover:bg-gray-50"><td class="px-6 py-4"><div><div class="text-sm font-medium text-gray-900">${ssrInterpolate(application.full_name)}</div><div class="text-sm text-gray-500">${ssrInterpolate(application.email)}</div></div></td><td class="px-6 py-4"><div class="text-sm text-gray-900">${ssrInterpolate(application.career?.title_job || "N/A")}</div><div class="text-sm text-gray-500">${ssrInterpolate(application.career?.position || "N/A")}</div></td><td class="px-6 py-4"><div class="text-sm text-gray-900">${ssrInterpolate(application.phone_number)}</div>`);
            if (application.telegram_number) {
              _push(`<div class="text-sm text-gray-500"> Telegram: ${ssrInterpolate(application.telegram_number)}</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</td><td class="px-6 py-4"><span class="${ssrRenderClass([getStatusBadgeClass(application.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}">${ssrInterpolate(formatStatus(application.status))}</span></td><td class="px-6 py-4 text-sm text-gray-500">${ssrInterpolate(formatDate(application.applied_at))}</td><td class="px-6 py-4 text-right text-sm font-medium"><div class="flex justify-end space-x-2"><button class="text-indigo-600 hover:text-indigo-900" title="View Details"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></button><button class="text-green-600 hover:text-green-900" title="Download CV"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button><button class="text-blue-600 hover:text-blue-900" title="Update Status"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button><button class="text-red-600 hover:text-red-900" title="Delete"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1V4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></td></tr>`);
          });
          _push(`<!--]--></tbody></table></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(showViewModal) && unref(viewingApplication)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"><div class="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto"><div class="p-6"><div class="flex justify-between items-center mb-6"><h2 class="text-2xl font-bold text-gray-900">Application Details</h2><button class="text-gray-400 hover:text-gray-600"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-1 space-y-6"><div><h3 class="text-lg font-semibold text-gray-900 mb-4">Applicant Information</h3><div class="bg-gray-50 p-4 rounded-lg space-y-4"><div><p class="text-sm text-gray-600">Full Name</p><p class="font-medium text-lg">${ssrInterpolate(unref(viewingApplication).full_name)}</p></div><div><p class="text-sm text-gray-600">Email Address</p><p class="font-medium"><a${ssrRenderAttr("href", `mailto:${unref(viewingApplication).email}`)} class="text-blue-600 hover:text-blue-800">${ssrInterpolate(unref(viewingApplication).email)}</a></p></div><div><p class="text-sm text-gray-600">Phone Number</p><p class="font-medium"><a${ssrRenderAttr("href", `tel:${unref(viewingApplication).phone_number}`)} class="text-blue-600 hover:text-blue-800">${ssrInterpolate(unref(viewingApplication).phone_number)}</a></p></div>`);
        if (unref(viewingApplication).telegram_number) {
          _push(`<div><p class="text-sm text-gray-600">Telegram</p><p class="font-medium">${ssrInterpolate(unref(viewingApplication).telegram_number)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div><p class="text-sm text-gray-600">Applied Date</p><p class="font-medium">${ssrInterpolate(formatDetailedDate(unref(viewingApplication).applied_at))}</p></div><div><p class="text-sm text-gray-600">Application Status</p><span class="${ssrRenderClass([getStatusBadgeClass(unref(viewingApplication).status), "inline-flex px-3 py-1 text-sm font-semibold rounded-full"])}">${ssrInterpolate(formatStatus(unref(viewingApplication).status))}</span></div></div></div><div><h3 class="text-lg font-semibold text-gray-900 mb-4">Position Information</h3><div class="bg-gray-50 p-4 rounded-lg space-y-3"><div><p class="text-sm text-gray-600">Job Title</p><p class="font-medium">${ssrInterpolate(unref(viewingApplication).career?.title_job || "N/A")}</p></div><div><p class="text-sm text-gray-600">Position Level</p><p class="font-medium">${ssrInterpolate(unref(viewingApplication).career?.position || "N/A")}</p></div><div><p class="text-sm text-gray-600">Department</p><p class="font-medium">${ssrInterpolate(unref(viewingApplication).career?.department || "N/A")}</p></div><div><p class="text-sm text-gray-600">Location</p><p class="font-medium">${ssrInterpolate(unref(viewingApplication).career?.location || "N/A")}</p></div><div><p class="text-sm text-gray-600">Job Type</p><p class="font-medium">${ssrInterpolate(unref(viewingApplication).career?.job_type || "N/A")}</p></div><div><p class="text-sm text-gray-600">Salary Range</p><p class="font-medium">${ssrInterpolate(unref(viewingApplication).career?.salary_range || "N/A")}</p></div></div></div><div><h3 class="text-lg font-semibold text-gray-900 mb-4">Actions</h3><div class="space-y-3"><button class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"> Update Status </button><button class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"> Download CV </button><button class="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"> View CV </button></div></div></div><div class="lg:col-span-2 space-y-6">`);
        if (unref(viewingApplication).cover_letter) {
          _push(`<div><h3 class="text-lg font-semibold text-gray-900 mb-4">Cover Letter</h3><div class="bg-gray-50 p-4 rounded-lg"><div class="prose max-w-none"><p class="text-gray-700 whitespace-pre-line leading-relaxed">${ssrInterpolate(unref(viewingApplication).cover_letter)}</p></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div><h3 class="text-lg font-semibold text-gray-900 mb-4">CV/Resume File</h3><div class="bg-gray-50 p-4 rounded-lg"><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><div class="flex-shrink-0"><svg class="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"></path></svg></div><div><p class="font-medium text-gray-900">${ssrInterpolate(unref(viewingApplication).cv_original_name)}</p><p class="text-sm text-gray-500">${ssrInterpolate(getCVFileType(unref(viewingApplication).cv_original_name))} Document</p></div></div><div class="flex space-x-2"><button class="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded hover:bg-purple-200 transition-colors"> View </button><button class="px-3 py-1 bg-green-100 text-green-700 text-sm rounded hover:bg-green-200 transition-colors"> Download </button></div></div></div></div><div><h3 class="text-lg font-semibold text-gray-900 mb-4">Job Details (Reference)</h3><div class="bg-gray-50 p-4 rounded-lg space-y-4"><div><h4 class="font-medium text-gray-900 mb-2">Job Description</h4><p class="text-sm text-gray-700 whitespace-pre-line">${ssrInterpolate(unref(viewingApplication).career?.job_description || "N/A")}</p></div><div><h4 class="font-medium text-gray-900 mb-2">Job Requirements</h4><p class="text-sm text-gray-700 whitespace-pre-line">${ssrInterpolate(unref(viewingApplication).career?.job_requirements || "N/A")}</p></div></div></div><div><h3 class="text-lg font-semibold text-gray-900 mb-4">Admin Notes</h3><div class="bg-yellow-50 p-4 rounded-lg">`);
        if (unref(viewingApplication).admin_notes) {
          _push(`<div class="mb-4"><h4 class="font-medium text-gray-900 mb-2">Current Notes</h4><p class="text-gray-700 whitespace-pre-line">${ssrInterpolate(unref(viewingApplication).admin_notes)}</p></div>`);
        } else {
          _push(`<div class="text-gray-500 italic mb-4"> No admin notes yet </div>`);
        }
        _push(`<button class="text-sm text-blue-600 hover:text-blue-800"> Add/Update Notes </button></div></div></div></div><div class="flex justify-end space-x-4 pt-6 border-t mt-8"><button class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"> Close </button><button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"> Update Status &amp; Notes </button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showStatusModal) && unref(updatingApplication)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"><div class="bg-white rounded-lg max-w-md w-full"><div class="p-6"><div class="flex justify-between items-center mb-6"><h2 class="text-xl font-bold text-gray-900">Update Application Status</h2><button class="text-gray-400 hover:text-gray-600"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><form class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-2">Status</label><select required class="w-full px-3 py-2 border border-gray-300 rounded-md"><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(unref(statusForm).status) ? ssrLooseContain(unref(statusForm).status, "pending") : ssrLooseEqual(unref(statusForm).status, "pending")) ? " selected" : ""}>Pending Review</option><option value="reviewed"${ssrIncludeBooleanAttr(Array.isArray(unref(statusForm).status) ? ssrLooseContain(unref(statusForm).status, "reviewed") : ssrLooseEqual(unref(statusForm).status, "reviewed")) ? " selected" : ""}>Under Review</option><option value="shortlisted"${ssrIncludeBooleanAttr(Array.isArray(unref(statusForm).status) ? ssrLooseContain(unref(statusForm).status, "shortlisted") : ssrLooseEqual(unref(statusForm).status, "shortlisted")) ? " selected" : ""}>Shortlisted</option><option value="hired"${ssrIncludeBooleanAttr(Array.isArray(unref(statusForm).status) ? ssrLooseContain(unref(statusForm).status, "hired") : ssrLooseEqual(unref(statusForm).status, "hired")) ? " selected" : ""}>Hired</option><option value="rejected"${ssrIncludeBooleanAttr(Array.isArray(unref(statusForm).status) ? ssrLooseContain(unref(statusForm).status, "rejected") : ssrLooseEqual(unref(statusForm).status, "rejected")) ? " selected" : ""}>Rejected</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Admin Notes</label><textarea rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Add notes about this status change...">${ssrInterpolate(unref(statusForm).admin_notes)}</textarea></div><div class="flex justify-end space-x-4 pt-4"><button type="button" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(updating)) ? " disabled" : ""} class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">${ssrInterpolate(unref(updating) ? "Updating..." : "Update Status")}</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showCVModal) && unref(viewingCV)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-60"><div class="bg-white rounded-lg max-w-5xl w-full max-h-[95vh] overflow-hidden"><div class="p-4 border-b border-gray-200"><div class="flex justify-between items-center"><div><h2 class="text-xl font-bold text-gray-900">CV Viewer</h2><p class="text-sm text-gray-600">${ssrInterpolate(unref(viewingCV).cv_original_name)} - ${ssrInterpolate(unref(viewingCV).full_name)}</p></div><div class="flex space-x-2"><button class="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"> Download </button><button class="text-gray-400 hover:text-gray-600"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div><div class="h-[80vh] overflow-auto">`);
        if (getCVFileType(unref(viewingCV).cv_original_name) === "PDF") {
          _push(`<div class="h-full"><iframe${ssrRenderAttr("src", getCVViewUrl(unref(viewingCV)))} class="w-full h-full border-0" title="CV Viewer"></iframe></div>`);
        } else {
          _push(`<div class="p-8 text-center"><svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"></path></svg><h3 class="text-lg font-semibold text-gray-900 mb-2">Preview Not Available</h3><p class="text-gray-600 mb-4"> This file type (${ssrInterpolate(getCVFileType(unref(viewingCV).cv_original_name))}) cannot be previewed in the browser. </p><button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"> Download to View </button></div>`);
        }
        _push(`</div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/job-applications.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=job-applications-C-K2CZHV.mjs.map
