import { b as useRuntimeConfig } from './server.mjs';
import { u as useCookie } from './cookie-D4T41UgU.mjs';

const useApi = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || "https://sdev.apratifoods.asia/api";
  const getAuthToken = () => {
    const tokenCookie = useCookie("auth-token");
    if (tokenCookie.value) {
      console.log("🔑 Auth token found in cookie:", tokenCookie.value.substring(0, 20) + "...");
      return tokenCookie.value;
    }
    console.log("❌ No auth token found in cookies or localStorage");
    return "";
  };
  const request = async (endpoint, options = {}) => {
    const token = getAuthToken();
    console.log("📡 Making API request:", {
      endpoint,
      method: options.method || "GET",
      hasToken: !!token,
      tokenPreview: token ? token.substring(0, 20) + "..." : "None"
    });
    try {
      const isFormData = options.body instanceof FormData;
      const headers = {
        "Accept": "application/json",
        ...token && { "Authorization": `Bearer ${token}` },
        ...options.headers
      };
      if (!isFormData && options.body) {
        headers["Content-Type"] = "application/json";
      }
      const response = await $fetch(`${apiBase}${endpoint}`, {
        ...options,
        headers,
        body: options.body,
        method: options.method || "GET"
      });
      if (response.success === true) {
        return { success: true, data: response.data, message: response.message };
      } else if (response.success === false) {
        return { success: false, error: response.message, errors: response.errors };
      }
      if (response.status === "success") {
        return { success: true, data: response.data, message: response.message };
      } else if (response.status === "error") {
        return { success: false, error: response.message, errors: response.errors };
      }
      return { success: true, data: response };
    } catch (error) {
      console.error("API Error:", error);
      if (error.status === 422 || error.statusCode === 422) {
        const errorData = error.data || error.response?.data;
        console.log("422 Error - Raw error:", error);
        console.log("422 Error - Error data:", errorData);
        if (errorData) {
          return {
            success: false,
            error: errorData.message || "Validation failed",
            errors: errorData.errors || {}
          };
        }
      }
      if (error.data && error.data.status === "error") {
        return { success: false, error: error.data.message, errors: error.data.errors };
      }
      if (error.data && error.data.message) {
        return { success: false, error: error.data.message };
      }
      return { success: false, error: error.message || "An error occurred" };
    }
  };
  const brands = {
    // Get all brands (admin endpoint for full access)
    getAll: () => request("/admin/brands"),
    // Get public brands (for frontend display)
    getPublic: () => request("/brands"),
    // Get single brand
    get: (id) => request(`/brands/${id}`),
    // Create brand
    create: (data) => request("/admin/brands", {
      method: "POST",
      body: data
    }),
    // Create brand with file upload
    createWithFile: (formData) => request("/admin/brands", {
      method: "POST",
      body: formData
    }),
    // Update brand
    update: (id, data) => request(`/admin/brands/${id}`, {
      method: "PUT",
      body: data
    }),
    // Update brand with file upload
    updateWithFile: (id, formData) => request(`/admin/brands/${id}`, {
      method: "POST",
      // Using POST with _method=PUT for file uploads
      body: formData
    }),
    // Delete brand
    delete: (id) => request(`/admin/brands/${id}`, {
      method: "DELETE"
    })
  };
  const users = {
    // Get all users (admin only)
    getAll: () => request("/users"),
    // Create user
    create: (data) => request("/users", {
      method: "POST",
      body: data
    }),
    // Update user
    update: (id, data) => request(`/users/${id}`, {
      method: "PUT",
      body: data
    }),
    // Delete user
    delete: (id) => request(`/users/${id}`, {
      method: "DELETE"
    }),
    // Toggle user status
    toggleStatus: (id) => request(`/users/${id}/toggle-status`, {
      method: "POST"
    })
  };
  const auth = {
    // Regular login
    login: (credentials) => request("/login", {
      method: "POST",
      body: credentials
    }),
    // Admin login (specific endpoint for admin authentication)
    adminLogin: (credentials) => request("/admin/login", {
      method: "POST",
      body: credentials
    }),
    // Register
    register: (data) => request("/register", {
      method: "POST",
      body: data
    }),
    // Logout
    logout: () => request("/logout", {
      method: "POST"
    }),
    // Get user profile
    profile: () => request("/user"),
    // Get current user (me endpoint)
    me: () => request("/me")
  };
  const products = {
    // Get all products
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/products${query ? `?${query}` : ""}`);
    },
    // Get single product
    get: (id) => request(`/products/${id}`),
    // Create product
    create: (data) => request("/admin/products", {
      method: "POST",
      body: data
    }),
    // Update product
    update: (id, data) => request(`/admin/products/${id}`, {
      method: "PUT",
      body: data
    }),
    // Delete product
    delete: (id) => request(`/admin/products/${id}`, {
      method: "DELETE"
    }),
    // Search products
    search: (query) => request("/products/search", {
      method: "POST",
      body: { query }
    })
  };
  const dashboard = {
    // Get admin dashboard stats
    stats: () => request("/admin/dashboard")
  };
  const careers = {
    // Get all active careers (public endpoint)
    getAll: () => request("/careers"),
    // Get all careers for admin
    adminGetAll: () => request("/admin/careers"),
    // Get single career
    get: (id) => request(`/careers/${id}`),
    // Get careers by department
    getByDepartment: (department) => request(`/careers/department/${department}`),
    // Create career (admin only)
    create: (data) => request("/admin/careers", {
      method: "POST",
      body: JSON.stringify(data)
    }),
    // Update career (admin only)
    update: (id, data) => request(`/admin/careers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),
    // Delete career (admin only)
    delete: (id) => request(`/admin/careers/${id}`, {
      method: "DELETE"
    })
  };
  const utils = {
    // Check if user is authenticated
    isAuthenticated: () => {
      const tokenCookie = useCookie("auth-token");
      if (tokenCookie.value) return true;
      return false;
    },
    // Check if user is admin
    isAdmin: () => {
      const userCookie = useCookie("auth-user");
      if (userCookie.value?.role === "admin") return true;
      return false;
    },
    // Get current user
    getCurrentUser: () => {
      const userCookie = useCookie("auth-user");
      if (userCookie.value) return userCookie.value;
      return null;
    },
    // Clear auth data from both systems
    clearAuth: () => {
      const tokenCookie = useCookie("auth-token");
      const userCookie = useCookie("auth-user");
      tokenCookie.value = null;
      userCookie.value = null;
    },
    // Get current auth status for debugging
    getAuthStatus: () => {
      const token = getAuthToken();
      const hasToken = !!token;
      const user = utils.getCurrentUser();
      return {
        authenticated: hasToken,
        token: token ? token.substring(0, 20) + "..." : null,
        user,
        tokenLength: token ? token.length : 0,
        isAdmin: utils.isAdmin()
      };
    },
    // Debug authentication
    debugAuth: () => {
      console.log("🔍 Auth Debug:", utils.getAuthStatus());
      return utils.getAuthStatus();
    },
    // Sync localStorage to cookies (for consistency)
    syncAuth: () => {
    }
  };
  const jobApplications = {
    // Submit job application (public endpoint)
    apply: (careerId, formData) => request(`/careers/${careerId}/apply`, {
      method: "POST",
      body: formData
      // FormData for file upload
    }),
    // Get single application
    get: (id) => request(`/job-applications/${id}`),
    // Admin endpoints
    adminGetAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      const endpoint = query ? `/admin/job-applications?${query}` : "/admin/job-applications";
      return request(endpoint);
    },
    // Get application statistics (admin only)
    getStatistics: () => request("/admin/job-applications/statistics"),
    // Get recent applications (admin only)
    getRecent: () => request("/admin/job-applications/recent"),
    // Update application status (admin only)
    updateStatus: (id, data) => request(`/admin/job-applications/${id}/status`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),
    // Delete application (admin only)
    delete: (id) => request(`/admin/job-applications/${id}`, {
      method: "DELETE"
    }),
    // Download CV file (admin only)
    downloadCV: async (id) => {
      const token = getAuthToken();
      try {
        const response = await fetch(`${apiBase}/admin/job-applications/${id}/download-cv`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (!response.ok) {
          try {
            const errorData = await response.json();
            throw new Error(errorData.error || errorData.message || "Failed to download CV");
          } catch (jsonError) {
            throw new Error(`Failed to download CV (${response.status})`);
          }
        }
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.error || errorData.message || "Failed to download CV");
        }
        const blob = await response.blob();
        const filename = response.headers.get("Content-Disposition")?.split("filename=")[1]?.replace(/"/g, "") || "cv.pdf";
        const url = (void 0).URL.createObjectURL(blob);
        const a = (void 0).createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = filename;
        (void 0).body.appendChild(a);
        a.click();
        (void 0).URL.revokeObjectURL(url);
        (void 0).body.removeChild(a);
        return { success: true, message: "CV downloaded successfully" };
      } catch (error) {
        console.error("Download CV error:", error);
        return { success: false, error: error.message };
      }
    },
    // Get CV view URL (admin only)
    getCVViewURL: (id) => {
      const token = getAuthToken();
      return `${apiBase}/admin/job-applications/${id}/view-cv?token=${token}`;
    }
  };
  const managementPosts = {
    // Get all posts (public endpoint)
    getAll: () => request("/management-posts"),
    // Get single post
    get: (id) => request(`/management-posts/${id}`),
    // Admin endpoints
    adminGetAll: () => request("/admin/management-posts"),
    // Create post (admin only)
    create: (data) => request("/admin/management-posts", {
      method: "POST",
      body: JSON.stringify(data)
    }),
    // Update post (admin only)
    update: (id, data) => request(`/admin/management-posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),
    // Delete post (admin only)
    delete: (id) => request(`/admin/management-posts/${id}`, {
      method: "DELETE"
    }),
    // Toggle status (admin only)
    toggleStatus: (id) => request(`/admin/management-posts/${id}/toggle-status`, {
      method: "PUT"
    }),
    // Upload image (admin only)
    uploadImage: (formData) => request("/admin/management-posts/upload-image", {
      method: "POST",
      body: formData
    })
  };
  const aboutContent = {
    // Public endpoints
    getAll: () => request("/about-content"),
    getByKey: (key) => request(`/about-content/${key}`),
    // Admin endpoints
    adminGetAll: () => request("/admin/about-contents"),
    create: (data) => request("/admin/about-contents", {
      method: "POST",
      body: JSON.stringify(data)
    }),
    get: (id) => request(`/admin/about-contents/${id}`),
    update: (id, data) => request(`/admin/about-contents/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),
    delete: (id) => request(`/admin/about-contents/${id}`, {
      method: "DELETE"
    }),
    initializeDefaults: () => request("/admin/about-contents/initialize-defaults", {
      method: "POST"
    }),
    // Upload image for about content
    uploadImage: (contentId, formData, options = {}) => request(`/admin/about-contents/${contentId}/upload-image`, {
      method: "POST",
      body: formData,
      // Don't set headers - let the request function handle auth headers and Content-Type
      ...options
    })
  };
  const privacyContent = {
    getAll: () => request("/privacy-content"),
    adminGetAll: () => request("/admin/privacy-content"),
    get: (id) => request(`/admin/privacy-content/${id}`),
    create: (data) => request("/admin/privacy-content", {
      method: "POST",
      body: JSON.stringify(data)
    }),
    update: (id, data) => request(`/admin/privacy-content/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),
    delete: (id) => request(`/admin/privacy-content/${id}`, {
      method: "DELETE"
    })
  };
  const categories = {
    // Get all categories (public endpoint)
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/categories${query ? `?${query}` : ""}`);
    },
    // Get single category
    get: (slug) => request(`/categories/${slug}`),
    // Get category with products
    getWithProducts: (slug, params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/categories/${slug}/products${query ? `?${query}` : ""}`);
    },
    // Admin endpoints
    adminGetAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/admin/categories${query ? `?${query}` : ""}`);
    },
    // Create category (admin only)
    create: (data) => request("/admin/categories", {
      method: "POST",
      body: data
    }),
    // Update category (admin only)
    update: (slug, data) => request(`/admin/categories/${slug}`, {
      method: "PUT",
      body: data
    }),
    // Delete category (admin only)
    delete: (slug) => request(`/admin/categories/${slug}`, {
      method: "DELETE"
    }),
    // Get category statistics (admin only)
    getStats: () => request("/admin/categories-stats"),
    // Toggle category status (admin only)
    toggleStatus: (slug) => request(`/admin/categories/${slug}/toggle-status`, {
      method: "PUT"
    }),
    // Reorder categories (admin only)
    reorder: (data) => request("/admin/categories/reorder", {
      method: "PUT",
      body: data
    })
  };
  const favicon = {
    // Get all favicon settings (admin only)
    getAll: () => request("/admin/favicon-settings"),
    // Get single favicon setting
    get: (key) => request(`/admin/favicon-settings/${key}`),
    // Create favicon setting
    create: (data) => request("/admin/favicon-settings", {
      method: "POST",
      body: data
    }),
    // Update favicon setting
    update: (key, data) => request(`/admin/favicon-settings/${key}`, {
      method: "PUT",
      body: data
    }),
    // Delete favicon setting
    delete: (key) => request(`/admin/favicon-settings/${key}`, {
      method: "DELETE"
    }),
    // Toggle favicon setting status
    toggle: (key) => request(`/admin/favicon-settings/${key}/toggle`, {
      method: "POST"
    }),
    // Upload favicon image
    uploadImage: (formData) => request("/admin/favicon-settings/upload-image", {
      method: "POST",
      body: formData
    }),
    // Initialize default favicon settings
    initializeDefaults: () => request("/admin/favicon-settings/initialize-defaults", {
      method: "POST"
    }),
    // Get public favicon configuration
    getConfig: () => request("/favicon-settings")
  };
  return {
    // Auth methods
    getAuthToken,
    // API methods
    request,
    brands,
    users,
    auth,
    products,
    categories,
    dashboard,
    careers,
    jobApplications,
    managementPosts,
    aboutContent,
    privacyContent,
    favicon,
    utils
  };
};

export { useApi as u };
//# sourceMappingURL=useApi-CO9TAo9a.mjs.map
