import { _ as __nuxt_component_0 } from './nuxt-link-BAlktP_E.mjs';
import { ref, computed, mergeProps, unref, withCtx, createVNode, createBlock, openBlock, createTextVNode, useSSRContext } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/server-renderer/index.mjs';
import { _ as _imports_12, a as _imports_13, b as _imports_14, c as _imports_15, d as _imports_10, e as _imports_11 } from './virtual_public-B_jtVuV9.mjs';
import { u as useApi } from './useApi-CO9TAo9a.mjs';
import { a as useSeoMeta } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
  __name: "careers",
  __ssrInlineRender: true,
  setup(__props) {
    const { careers: careerApi, jobApplications: jobApplicationApi, utils } = useApi();
    useSeoMeta({
      title: "Careers - Aprati Food Company",
      description: "Join our team at Aprati Food Company. Explore career opportunities and build your future with us."
    });
    const careers2 = ref([]);
    const loading = ref(true);
    const error = ref("");
    const submitting = ref(false);
    const formError = ref("");
    const showCreateModal = ref(false);
    const showEditModal = ref(false);
    ref(null);
    const showJobDetailsModal = ref(false);
    const selectedJob = ref(null);
    const applicationSubmitted = ref(false);
    const submittingApplication = ref(false);
    const applicationError = ref("");
    const selectedCVFile = ref(null);
    const form = ref({
      title_job: "",
      career_information: "",
      job_description: "",
      job_requirements: "",
      salary_range: "",
      position: "",
      location: "",
      job_type: "Full-time",
      department: "",
      status: "active"
    });
    const applicationForm = ref({
      full_name: "",
      email: "",
      phone_number: "",
      telegram_number: "",
      cover_letter: "",
      cv_file: null
    });
    computed(() => {
      const user = utils.getCurrentUser();
      return user && user.role === "admin";
    });
    const formatFileSize = (bytes) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 relative overflow-hidden" }, _attrs))} data-v-2d9fd7e4><div class="absolute inset-0 overflow-hidden pointer-events-none" data-v-2d9fd7e4><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-1/6 left-1/6 w-20 h-20 object-contain opacity-15 animate-float" data-v-2d9fd7e4><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-1/4 right-1/6 w-20 h-20 object-contain opacity-18 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.5s" })}" data-v-2d9fd7e4><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute bottom-1/3 left-1/4 w-16 h-16 object-contain opacity-12 animate-float" style="${ssrRenderStyle({ "animation-delay": "1s" })}" data-v-2d9fd7e4><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute top-1/2 right-1/4 w-16 h-16 object-contain opacity-20 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.5s" })}" data-v-2d9fd7e4><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute bottom-1/6 right-1/3 w-14 h-14 object-contain opacity-16 animate-float" style="${ssrRenderStyle({ "animation-delay": "2s" })}" data-v-2d9fd7e4><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute top-2/3 left-1/6 w-20 h-20 object-contain opacity-14 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.8s" })}" data-v-2d9fd7e4><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute bottom-1/4 right-1/6 w-14 h-14 object-contain opacity-15 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.2s" })}" data-v-2d9fd7e4><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute top-3/4 left-1/3 w-16 h-16 object-contain opacity-18 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.8s" })}" data-v-2d9fd7e4><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-1/5 right-1/5 w-14 h-14 object-contain opacity-13 animate-float" style="${ssrRenderStyle({ "animation-delay": "2.3s" })}" data-v-2d9fd7e4><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute bottom-2/5 left-1/5 w-16 h-16 object-contain opacity-17 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.3s" })}" data-v-2d9fd7e4><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-2/5 left-2/5 w-20 h-20 object-contain opacity-10 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.4s" })}" data-v-2d9fd7e4><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute bottom-3/5 right-2/5 w-16 h-16 object-contain opacity-16 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.7s" })}" data-v-2d9fd7e4><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-4/5 left-1/4 w-14 h-14 object-contain opacity-12 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.9s" })}" data-v-2d9fd7e4><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute bottom-4/5 right-1/4 w-20 h-20 object-contain opacity-15 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.4s" })}" data-v-2d9fd7e4><img${ssrRenderAttr("src", _imports_14)} alt="" class="absolute top-1/3 left-2/3 w-16 h-16 object-contain opacity-18 animate-float" style="${ssrRenderStyle({ "animation-delay": "2.1s" })}" data-v-2d9fd7e4><img${ssrRenderAttr("src", _imports_15)} alt="" class="absolute bottom-1/5 right-2/3 w-14 h-14 object-contain opacity-14 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "1.6s" })}" data-v-2d9fd7e4><img${ssrRenderAttr("src", _imports_10)} alt="" class="absolute top-3/5 right-1/5 w-20 h-20 object-contain opacity-11 animate-float" style="${ssrRenderStyle({ "animation-delay": "0.9s" })}" data-v-2d9fd7e4><img${ssrRenderAttr("src", _imports_11)} alt="" class="absolute bottom-2/3 left-3/5 w-16 h-16 object-contain opacity-19 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "2.2s" })}" data-v-2d9fd7e4><img${ssrRenderAttr("src", _imports_12)} alt="" class="absolute top-1/8 right-3/4 w-14 h-14 object-contain opacity-13 animate-float" style="${ssrRenderStyle({ "animation-delay": "1.1s" })}" data-v-2d9fd7e4><img${ssrRenderAttr("src", _imports_13)} alt="" class="absolute bottom-1/8 left-3/4 w-16 h-16 object-contain opacity-17 animate-float-delayed" style="${ssrRenderStyle({ "animation-delay": "0.2s" })}" data-v-2d9fd7e4></div><section class="bg-blue-200 relative overflow-hidden py-24" data-v-2d9fd7e4><div class="absolute inset-0" data-v-2d9fd7e4><div class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" data-v-2d9fd7e4></div><div class="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-full blur-3xl animate-pulse delay-1000" data-v-2d9fd7e4></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-v-2d9fd7e4><div class="text-center" data-v-2d9fd7e4><div class="relative mb-8" data-v-2d9fd7e4><div class="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 border border-blue-200 text-blue-800 mb-6" data-v-2d9fd7e4><div class="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse" data-v-2d9fd7e4></div><span class="text-sm font-semibold tracking-wide uppercase" data-v-2d9fd7e4>Career Opportunities</span></div></div><h1 class="text-4xl lg:text-6xl font-black text-blue-500 mb-6 leading-tight" data-v-2d9fd7e4> Join Our <span class="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent" data-v-2d9fd7e4>Team</span></h1><p class="text-xl lg:text-2xl mb-8 text-blue-500 max-w-4xl mx-auto" data-v-2d9fd7e4> Build your future with Aprati Food Company and be part of our innovative journey. </p></div></div></section><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" data-v-2d9fd7e4>`);
      if (unref(loading)) {
        _push(`<div class="text-center py-20" data-v-2d9fd7e4><div class="relative" data-v-2d9fd7e4><div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600" data-v-2d9fd7e4></div></div><p class="mt-8 text-gray-600 text-lg font-medium" data-v-2d9fd7e4>Loading career opportunities...</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(error)) {
        _push(`<div class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 text-center" data-v-2d9fd7e4><svg class="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2d9fd7e4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-2d9fd7e4></path></svg> ${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(loading) && !unref(error)) {
        _push(`<div class="space-y-8" data-v-2d9fd7e4>`);
        if (unref(careers2).length === 0) {
          _push(`<div class="text-center py-20" data-v-2d9fd7e4><div class="max-w-3xl mx-auto" data-v-2d9fd7e4><div class="relative mb-12" data-v-2d9fd7e4><div class="w-32 h-32 mx-auto relative" data-v-2d9fd7e4><div class="absolute inset-0 rounded-full bg-gray-200" data-v-2d9fd7e4></div><div class="absolute inset-2 rounded-full bg-white flex items-center justify-center shadow-lg" data-v-2d9fd7e4><svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2d9fd7e4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.586l1.293-1.293a1 1 0 111.414 1.414L19 16.414V18a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1.586l-1.293 1.293a1 1 0 11-1.414-1.414L11 14.414V8a2 2 0 012-2h4a2 2 0 012 2z" data-v-2d9fd7e4></path></svg></div></div></div><h3 class="text-2xl font-semibold text-gray-900 mb-2" data-v-2d9fd7e4>No Job Openings Available</h3><p class="text-gray-600" data-v-2d9fd7e4> Currently there are no active job positions available. Please check back later or contact us directly. </p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="text-center mb-12" data-v-2d9fd7e4><div class="relative inline-block" data-v-2d9fd7e4><div class="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-2xl blur-sm" data-v-2d9fd7e4></div><div class="relative bg-white border-2 border-blue-300 rounded-2xl px-8 py-4 shadow-lg" data-v-2d9fd7e4><h2 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2" data-v-2d9fd7e4> Current Job <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-v-2d9fd7e4>Opportunities</span></h2><p class="text-gray-600 text-lg" data-v-2d9fd7e4>Discover your next career move with us</p></div></div></div>`);
        if (unref(careers2).length > 0) {
          _push(`<div class="space-y-8" data-v-2d9fd7e4><!--[-->`);
          ssrRenderList(unref(careers2), (career, index) => {
            _push(`<div class="group relative cursor-pointer" data-v-2d9fd7e4><div class="bg-white rounded-2xl shadow-md border border-blue-100 p-0.5 hover:shadow-lg transition-all duration-500 group-hover:scale-[1.005] flex justify-center items-center min-h-[250px] overflow-hidden" data-v-2d9fd7e4><div class="rounded-2xl w-full flex items-center justify-center overflow-hidden text-center" data-v-2d9fd7e4><div class="w-full flex justify-center text-center" data-v-2d9fd7e4><div class="flex flex-col justify-center items-center p-6 lg:p-8 text-center w-full max-w-2xl" data-v-2d9fd7e4><div class="mb-4 flex justify-center" data-v-2d9fd7e4><span class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-sm font-semibold" data-v-2d9fd7e4><div class="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse" data-v-2d9fd7e4></div> ${ssrInterpolate(career.department || "General")}</span></div><div class="text-center mb-6" data-v-2d9fd7e4><div class="relative inline-block" data-v-2d9fd7e4><div class="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-xl blur-sm" data-v-2d9fd7e4></div><div class="relative bg-white border-2 border-blue-300 rounded-xl px-6 py-3 shadow-md" data-v-2d9fd7e4><h3 class="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight" data-v-2d9fd7e4><span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-v-2d9fd7e4>${ssrInterpolate(career.title_job)}</span></h3></div></div></div><h3 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight" style="${ssrRenderStyle({ "display": "none" })}" data-v-2d9fd7e4>${ssrInterpolate(career.title_job)}</h3><p class="text-xl text-blue-600 font-semibold mb-6" data-v-2d9fd7e4>${ssrInterpolate(career.position)}</p><div class="prose prose-gray prose-lg max-w-none text-gray-600 leading-relaxed mb-6" data-v-2d9fd7e4><p class="line-clamp-3" data-v-2d9fd7e4>${ssrInterpolate(career.career_information)}</p></div><div class="flex flex-wrap gap-2 mb-8" data-v-2d9fd7e4><span class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium" data-v-2d9fd7e4>${ssrInterpolate(career.job_type)}</span><span class="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium" data-v-2d9fd7e4>${ssrInterpolate(career.salary_range)}</span></div><div class="flex items-center justify-center" data-v-2d9fd7e4>`);
            if (career.status === "active") {
              _push(`<button class="group/btn relative inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-1" data-v-2d9fd7e4><span class="relative z-10" data-v-2d9fd7e4>Apply Now</span><svg class="relative z-10 ml-3 w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2d9fd7e4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-2d9fd7e4></path></svg></button>`);
            } else {
              _push(`<button disabled class="group/btn relative inline-flex items-center px-8 py-4 rounded-2xl bg-gray-400 text-white font-bold cursor-not-allowed" data-v-2d9fd7e4><span class="relative z-10" data-v-2d9fd7e4>Position Closed</span></button>`);
            }
            _push(`</div></div></div></div></div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="mt-16" data-v-2d9fd7e4><div class="text-center mb-12" data-v-2d9fd7e4><h2 class="text-3xl font-bold text-gray-900 mb-6" data-v-2d9fd7e4>Why Work With Us?</h2><p class="text-xl text-gray-600" data-v-2d9fd7e4>Benefits and perks of joining our team</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-v-2d9fd7e4><div class="group text-center bg-white rounded-3xl p-8 shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300 hover:scale-105" data-v-2d9fd7e4><div class="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" data-v-2d9fd7e4><svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2d9fd7e4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" data-v-2d9fd7e4></path></svg></div><h3 class="text-xl font-semibold text-gray-900 mb-4" data-v-2d9fd7e4>Competitive Salary</h3><p class="text-gray-600 leading-relaxed" data-v-2d9fd7e4>Industry-leading compensation packages with performance bonuses</p></div><div class="group text-center bg-white rounded-3xl p-8 shadow-lg border border-emerald-200 hover:shadow-xl transition-all duration-300 hover:scale-105" data-v-2d9fd7e4><div class="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" data-v-2d9fd7e4><svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2d9fd7e4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" data-v-2d9fd7e4></path></svg></div><h3 class="text-xl font-semibold text-gray-900 mb-4" data-v-2d9fd7e4>Career Growth</h3><p class="text-gray-600 leading-relaxed" data-v-2d9fd7e4>Professional development opportunities and clear career progression paths</p></div><div class="group text-center bg-white rounded-3xl p-8 shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300 hover:scale-105" data-v-2d9fd7e4><div class="bg-gradient-to-br from-orange-400 to-orange-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" data-v-2d9fd7e4><svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2d9fd7e4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-2d9fd7e4></path></svg></div><h3 class="text-xl font-semibold text-gray-900 mb-4" data-v-2d9fd7e4>Great Team</h3><p class="text-gray-600 leading-relaxed" data-v-2d9fd7e4>Work with passionate professionals in a collaborative environment</p></div></div></section>`);
      if (!unref(loading) && unref(careers2).length > 0) {
        _push(`<div class="bg-gray-100 py-16 mt-16 -mx-4 sm:-mx-6 lg:-mx-8" data-v-2d9fd7e4><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-v-2d9fd7e4><h2 class="text-3xl font-bold text-gray-900 mb-6" data-v-2d9fd7e4>Ready to Join Our Team?</h2><p class="text-xl text-gray-600 mb-8" data-v-2d9fd7e4> Explore open positions and take the next step in your career journey with us. </p><div class="flex flex-col sm:flex-row gap-4 justify-center" data-v-2d9fd7e4>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/about",
          class: "group relative inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-green-700 to-green-900 text-white font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-green-700/25 transform hover:scale-105"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="relative z-10" data-v-2d9fd7e4${_scopeId}>Learn About Us</span><svg class="relative z-10 ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2d9fd7e4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-2d9fd7e4${_scopeId}></path></svg>`);
            } else {
              return [
                createVNode("span", { class: "relative z-10" }, "Learn About Us"),
                (openBlock(), createBlock("svg", {
                  class: "relative z-10 ml-3 w-6 h-6 transition-transform group-hover:translate-x-1",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 5l7 7-7 7"
                  })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/management",
          class: "group inline-flex items-center px-8 py-4 rounded-2xl border-2 border-gray-500 text-gray-700 font-bold text-lg transition-all duration-300 hover:bg-gray-100 hover:border-gray-400"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Meet Our Team <svg class="ml-3 w-6 h-6 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2d9fd7e4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-v-2d9fd7e4${_scopeId}></path></svg>`);
            } else {
              return [
                createTextVNode(" Meet Our Team "),
                (openBlock(), createBlock("svg", {
                  class: "ml-3 w-6 h-6 transition-transform group-hover:rotate-45",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(showCreateModal) || unref(showEditModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" data-v-2d9fd7e4><div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" data-v-2d9fd7e4><div class="p-6" data-v-2d9fd7e4><div class="flex justify-between items-center mb-6" data-v-2d9fd7e4><h2 class="text-2xl font-bold text-gray-900" data-v-2d9fd7e4>${ssrInterpolate(unref(showEditModal) ? "Edit Job Position" : "Create New Job Position")}</h2><button class="text-gray-400 hover:text-gray-600" data-v-2d9fd7e4><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2d9fd7e4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-2d9fd7e4></path></svg></button></div>`);
        if (unref(formError)) {
          _push(`<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6" data-v-2d9fd7e4>${ssrInterpolate(unref(formError))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<form class="space-y-6" data-v-2d9fd7e4><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-2d9fd7e4><div data-v-2d9fd7e4><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2d9fd7e4>Job Title *</label><input${ssrRenderAttr("value", unref(form).title_job)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Food Technologist" data-v-2d9fd7e4></div><div data-v-2d9fd7e4><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2d9fd7e4>Position *</label><input${ssrRenderAttr("value", unref(form).position)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Senior, Junior, Manager" data-v-2d9fd7e4></div></div><div data-v-2d9fd7e4><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2d9fd7e4>Career Information *</label><textarea required rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Brief overview of the career opportunity..." data-v-2d9fd7e4>${ssrInterpolate(unref(form).career_information)}</textarea></div><div data-v-2d9fd7e4><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2d9fd7e4>Job Description *</label><textarea required rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Detailed job description and responsibilities..." data-v-2d9fd7e4>${ssrInterpolate(unref(form).job_description)}</textarea></div><div data-v-2d9fd7e4><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2d9fd7e4>Job Requirements *</label><textarea required rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Required qualifications, skills, and experience..." data-v-2d9fd7e4>${ssrInterpolate(unref(form).job_requirements)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-2d9fd7e4><div data-v-2d9fd7e4><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2d9fd7e4>Salary Range *</label><input${ssrRenderAttr("value", unref(form).salary_range)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. $3000-5000" data-v-2d9fd7e4></div><div data-v-2d9fd7e4><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2d9fd7e4>Job Type</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-2d9fd7e4><option value="Full-time" data-v-2d9fd7e4${ssrIncludeBooleanAttr(Array.isArray(unref(form).job_type) ? ssrLooseContain(unref(form).job_type, "Full-time") : ssrLooseEqual(unref(form).job_type, "Full-time")) ? " selected" : ""}>Full-time</option><option value="Part-time" data-v-2d9fd7e4${ssrIncludeBooleanAttr(Array.isArray(unref(form).job_type) ? ssrLooseContain(unref(form).job_type, "Part-time") : ssrLooseEqual(unref(form).job_type, "Part-time")) ? " selected" : ""}>Part-time</option><option value="Contract" data-v-2d9fd7e4${ssrIncludeBooleanAttr(Array.isArray(unref(form).job_type) ? ssrLooseContain(unref(form).job_type, "Contract") : ssrLooseEqual(unref(form).job_type, "Contract")) ? " selected" : ""}>Contract</option><option value="Internship" data-v-2d9fd7e4${ssrIncludeBooleanAttr(Array.isArray(unref(form).job_type) ? ssrLooseContain(unref(form).job_type, "Internship") : ssrLooseEqual(unref(form).job_type, "Internship")) ? " selected" : ""}>Internship</option></select></div><div data-v-2d9fd7e4><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2d9fd7e4>Status</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" data-v-2d9fd7e4><option value="active" data-v-2d9fd7e4${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "active") : ssrLooseEqual(unref(form).status, "active")) ? " selected" : ""}>Active</option><option value="inactive" data-v-2d9fd7e4${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "inactive") : ssrLooseEqual(unref(form).status, "inactive")) ? " selected" : ""}>Inactive</option><option value="closed" data-v-2d9fd7e4${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "closed") : ssrLooseEqual(unref(form).status, "closed")) ? " selected" : ""}>Closed</option></select></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-2d9fd7e4><div data-v-2d9fd7e4><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2d9fd7e4>Department</label><input${ssrRenderAttr("value", unref(form).department)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. R&amp;D, Marketing, Quality Control" data-v-2d9fd7e4></div><div data-v-2d9fd7e4><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2d9fd7e4>Location</label><input${ssrRenderAttr("value", unref(form).location)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Phnom Penh, Siem Reap" data-v-2d9fd7e4></div></div><div class="flex justify-end space-x-4 pt-6" data-v-2d9fd7e4><button type="button" class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" data-v-2d9fd7e4> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(submitting)) ? " disabled" : ""} class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50" data-v-2d9fd7e4>${ssrInterpolate(unref(submitting) ? "Saving..." : unref(showEditModal) ? "Update Position" : "Create Position")}</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showJobDetailsModal)) {
        _push(`<div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn" data-v-2d9fd7e4><div class="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp" data-v-2d9fd7e4><div class="relative bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6" data-v-2d9fd7e4><button class="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:scale-110" data-v-2d9fd7e4><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2d9fd7e4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-2d9fd7e4></path></svg></button><div class="flex items-center pr-12" data-v-2d9fd7e4><div class="w-16 h-16 mr-6" data-v-2d9fd7e4><div class="w-full h-full rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center" data-v-2d9fd7e4><svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2d9fd7e4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.586l1.293-1.293a1 1 0 111.414 1.414L19 16.414V18a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1.586l-1.293 1.293a1 1 0 11-1.414-1.414L11 14.414V8a2 2 0 012-2h4a2 2 0 012 2z" data-v-2d9fd7e4></path></svg></div></div><div data-v-2d9fd7e4><h3 class="text-2xl lg:text-3xl font-bold text-white" data-v-2d9fd7e4>${ssrInterpolate(unref(selectedJob)?.title_job)}</h3><p class="text-white/80 text-lg mt-1" data-v-2d9fd7e4>${ssrInterpolate(unref(selectedJob)?.position)}</p><div class="flex items-center mt-2 text-white/70" data-v-2d9fd7e4><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2d9fd7e4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-v-2d9fd7e4></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-v-2d9fd7e4></path></svg><span class="text-sm" data-v-2d9fd7e4>${ssrInterpolate(unref(selectedJob)?.location || "Company Location")}</span></div></div></div></div><div class="overflow-y-auto max-h-[calc(90vh-140px)]" data-v-2d9fd7e4><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8" data-v-2d9fd7e4><div class="space-y-6" data-v-2d9fd7e4><div class="bg-gray-50 rounded-2xl p-6" data-v-2d9fd7e4><div class="flex items-center mb-4" data-v-2d9fd7e4><div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3" data-v-2d9fd7e4><svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2d9fd7e4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-2d9fd7e4></path></svg></div><h3 class="text-lg font-semibold text-gray-900" data-v-2d9fd7e4>Position Information</h3></div><div class="grid grid-cols-2 gap-4 text-sm" data-v-2d9fd7e4><div data-v-2d9fd7e4><span class="font-medium text-gray-700" data-v-2d9fd7e4>Position:</span><br data-v-2d9fd7e4><span class="text-gray-600" data-v-2d9fd7e4>${ssrInterpolate(unref(selectedJob)?.position)}</span></div><div data-v-2d9fd7e4><span class="font-medium text-gray-700" data-v-2d9fd7e4>Department:</span><br data-v-2d9fd7e4><span class="text-gray-600" data-v-2d9fd7e4>${ssrInterpolate(unref(selectedJob)?.department || "General")}</span></div><div data-v-2d9fd7e4><span class="font-medium text-gray-700" data-v-2d9fd7e4>Location:</span><br data-v-2d9fd7e4><span class="text-gray-600" data-v-2d9fd7e4>${ssrInterpolate(unref(selectedJob)?.location || "Company Location")}</span></div><div data-v-2d9fd7e4><span class="font-medium text-gray-700" data-v-2d9fd7e4>Job Type:</span><br data-v-2d9fd7e4><span class="text-gray-600" data-v-2d9fd7e4>${ssrInterpolate(unref(selectedJob)?.job_type)}</span></div><div class="col-span-2" data-v-2d9fd7e4><span class="font-medium text-gray-700" data-v-2d9fd7e4>Salary Range:</span><br data-v-2d9fd7e4><span class="text-gray-600" data-v-2d9fd7e4>${ssrInterpolate(unref(selectedJob)?.salary_range)}</span></div></div></div><div data-v-2d9fd7e4><div class="flex items-center mb-3" data-v-2d9fd7e4><div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3" data-v-2d9fd7e4><svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2d9fd7e4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-2d9fd7e4></path></svg></div><h3 class="text-lg font-semibold text-gray-900" data-v-2d9fd7e4>About This Role</h3></div><p class="text-gray-600 leading-relaxed" data-v-2d9fd7e4>${ssrInterpolate(unref(selectedJob)?.career_information)}</p></div><div data-v-2d9fd7e4><div class="flex items-center mb-3" data-v-2d9fd7e4><div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3" data-v-2d9fd7e4><svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2d9fd7e4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-2d9fd7e4></path></svg></div><h3 class="text-lg font-semibold text-gray-900" data-v-2d9fd7e4>Job Description</h3></div><p class="text-gray-600 whitespace-pre-line leading-relaxed" data-v-2d9fd7e4>${ssrInterpolate(unref(selectedJob)?.job_description)}</p></div><div data-v-2d9fd7e4><div class="flex items-center mb-3" data-v-2d9fd7e4><div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3" data-v-2d9fd7e4><svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2d9fd7e4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-2d9fd7e4></path></svg></div><h3 class="text-lg font-semibold text-gray-900" data-v-2d9fd7e4>Requirements</h3></div><p class="text-gray-600 whitespace-pre-line leading-relaxed" data-v-2d9fd7e4>${ssrInterpolate(unref(selectedJob)?.job_requirements)}</p></div></div><div class="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl border border-blue-200" data-v-2d9fd7e4><div class="flex items-center mb-6" data-v-2d9fd7e4><div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3" data-v-2d9fd7e4><svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2d9fd7e4><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-2d9fd7e4></path></svg></div><h3 class="text-lg font-semibold text-gray-900" data-v-2d9fd7e4>Apply for This Position</h3></div>`);
        if (unref(applicationSubmitted)) {
          _push(`<div class="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl mb-6" data-v-2d9fd7e4><div class="flex items-center" data-v-2d9fd7e4><svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20" data-v-2d9fd7e4><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-v-2d9fd7e4></path></svg><span class="font-semibold text-lg" data-v-2d9fd7e4>Application Submitted Successfully!</span></div><p class="mt-2 text-sm leading-relaxed" data-v-2d9fd7e4>We have received your application and will review it shortly. You will hear from us soon.</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref(applicationSubmitted)) {
          _push(`<form class="space-y-6" data-v-2d9fd7e4>`);
          if (unref(applicationError)) {
            _push(`<div class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl" data-v-2d9fd7e4><div class="flex items-center" data-v-2d9fd7e4><svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-2d9fd7e4><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" data-v-2d9fd7e4></path></svg><span class="font-medium" data-v-2d9fd7e4>${ssrInterpolate(unref(applicationError))}</span></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-2d9fd7e4><div data-v-2d9fd7e4><label class="block text-sm font-semibold text-gray-700 mb-2" data-v-2d9fd7e4>Full Name *</label><input${ssrRenderAttr("value", unref(applicationForm).full_name)} type="text" required class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Your full name" data-v-2d9fd7e4></div><div data-v-2d9fd7e4><label class="block text-sm font-semibold text-gray-700 mb-2" data-v-2d9fd7e4>Email Address *</label><input${ssrRenderAttr("value", unref(applicationForm).email)} type="email" required class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="your.email@example.com" data-v-2d9fd7e4></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-2d9fd7e4><div data-v-2d9fd7e4><label class="block text-sm font-semibold text-gray-700 mb-2" data-v-2d9fd7e4>Phone Number *</label><input${ssrRenderAttr("value", unref(applicationForm).phone_number)} type="tel" required class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="+855 12 345 678" data-v-2d9fd7e4></div><div data-v-2d9fd7e4><label class="block text-sm font-semibold text-gray-700 mb-2" data-v-2d9fd7e4>Telegram Number</label><input${ssrRenderAttr("value", unref(applicationForm).telegram_number)} type="text" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="@yourusername or +855123456" data-v-2d9fd7e4></div></div><div data-v-2d9fd7e4><label class="block text-sm font-semibold text-gray-700 mb-2" data-v-2d9fd7e4>CV/Resume *</label><input type="file" accept=".pdf,.doc,.docx" required class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" data-v-2d9fd7e4><p class="text-xs text-gray-500 mt-2" data-v-2d9fd7e4>Accepted formats: PDF, DOC, DOCX (Max: 5MB)</p>`);
          if (unref(selectedCVFile)) {
            _push(`<p class="text-sm text-emerald-600 mt-2 flex items-center" data-v-2d9fd7e4><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-2d9fd7e4><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" data-v-2d9fd7e4></path></svg> Selected: ${ssrInterpolate(unref(selectedCVFile).name)} (${ssrInterpolate(formatFileSize(unref(selectedCVFile).size))}) </p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div data-v-2d9fd7e4><label class="block text-sm font-semibold text-gray-700 mb-2" data-v-2d9fd7e4>Cover Letter</label><textarea rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" placeholder="Tell us why you&#39;re the perfect fit for this role..." data-v-2d9fd7e4>${ssrInterpolate(unref(applicationForm).cover_letter)}</textarea></div><div class="flex justify-end space-x-4 pt-6" data-v-2d9fd7e4><button type="button" class="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium" data-v-2d9fd7e4> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(submittingApplication)) ? " disabled" : ""} class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 font-bold" data-v-2d9fd7e4>${ssrInterpolate(unref(submittingApplication) ? "Submitting..." : "Submit Application")}</button></div></form>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/careers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const careers = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2d9fd7e4"]]);

export { careers as default };
//# sourceMappingURL=careers-C1NzEevq.mjs.map
