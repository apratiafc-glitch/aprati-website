import { computed, ref, readonly } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { u as useApi } from './useApi-CO9TAo9a.mjs';

const user = ref(null);
const token = ref(null);
const isAuthenticated = ref(false);
const useAuth = () => {
  const login = async (credentials) => {
    try {
      const { api } = useApi();
      const response = await api.auth.login(credentials);
      if (response.success && response.data) {
        user.value = response.data.user;
        token.value = response.data.token;
        isAuthenticated.value = true;
        if (false) ;
        return { success: true, data: response.data };
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Login failed"
      };
    }
  };
  const logout = () => {
    user.value = null;
    token.value = null;
    isAuthenticated.value = false;
  };
  const initAuth = () => {
  };
  const register = async (userData) => {
    try {
      const { api } = useApi();
      const response = await api.auth.register(userData);
      if (response.success && response.data) {
        user.value = response.data.user;
        token.value = response.data.token;
        isAuthenticated.value = true;
        if (false) ;
        return { success: true, data: response.data };
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Registration failed"
      };
    }
  };
  const isAdmin = computed(() => user.value?.role === "admin");
  const isUser = computed(() => user.value?.role === "user");
  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated: readonly(isAuthenticated),
    isAdmin,
    isUser,
    login,
    logout,
    register,
    initAuth
  };
};

export { useAuth as u };
//# sourceMappingURL=useAuth-GvylWPw3.mjs.map
