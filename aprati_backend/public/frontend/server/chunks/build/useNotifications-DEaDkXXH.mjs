import { readonly, toRef, isRef } from 'file://D:/xammp/htdocs/aprati_web_backup/aprati_frontend/node_modules/vue/index.mjs';
import { d as useNuxtApp } from './server.mjs';

const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useNotifications = () => {
  const notifications = useState("notifications", () => []);
  const addNotification = (notification) => {
    const id = Date.now().toString();
    const newNotification = {
      ...notification,
      id,
      created_at: /* @__PURE__ */ new Date(),
      duration: notification.duration || 5e3
    };
    notifications.value.push(newNotification);
    if (!notification.persistent && newNotification.duration) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }
    return id;
  };
  const removeNotification = (id) => {
    const index = notifications.value.findIndex((n) => n.id === id);
    if (index > -1) {
      notifications.value.splice(index, 1);
    }
  };
  const clearNotifications = () => {
    notifications.value = [];
  };
  const success = (title, message, options) => {
    return addNotification({ type: "success", title, message, ...options });
  };
  const error = (title, message, options) => {
    return addNotification({ type: "error", title, message, ...options });
  };
  const warning = (title, message, options) => {
    return addNotification({ type: "warning", title, message, ...options });
  };
  const info = (title, message, options) => {
    return addNotification({ type: "info", title, message, ...options });
  };
  return {
    notifications: readonly(notifications),
    addNotification,
    removeNotification,
    clearNotifications,
    success,
    error,
    warning,
    info
  };
};

export { useNotifications as u };
//# sourceMappingURL=useNotifications-DEaDkXXH.mjs.map
