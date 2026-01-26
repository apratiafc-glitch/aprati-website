import { readonly, ref, nextTick } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';

const toasts = ref([]);
let toastId = 0;
const useToast = () => {
  const showToast = (message, type = "info", duration = 5e3) => {
    const id = ++toastId;
    const toast = {
      id,
      message,
      type,
      // 'success', 'error', 'warning', 'info'
      duration,
      visible: false
    };
    toasts.value.push(toast);
    nextTick(() => {
      const toastElement = toasts.value.find((t) => t.id === id);
      if (toastElement) {
        toastElement.visible = true;
      }
    });
    if (duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, duration);
    }
    return id;
  };
  const hideToast = (id) => {
    const toastIndex = toasts.value.findIndex((t) => t.id === id);
    if (toastIndex > -1) {
      toasts.value[toastIndex].visible = false;
      setTimeout(() => {
        const index = toasts.value.findIndex((t) => t.id === id);
        if (index > -1) {
          toasts.value.splice(index, 1);
        }
      }, 300);
    }
  };
  const clearAllToasts = () => {
    toasts.value.forEach((toast) => {
      toast.visible = false;
    });
    setTimeout(() => {
      toasts.value.splice(0);
    }, 300);
  };
  return {
    toasts: readonly(toasts),
    showToast,
    hideToast,
    clearAllToasts
  };
};

export { useToast as u };
//# sourceMappingURL=useToast-BHiNW5Rt.mjs.map
