import { ref, nextTick, readonly } from 'vue'

const toasts = ref([])
let toastId = 0

export const useToast = () => {
  const showToast = (message, type = 'info', duration = 5000) => {
    const id = ++toastId
    const toast = {
      id,
      message,
      type, // 'success', 'error', 'warning', 'info'
      duration,
      visible: false
    }

    toasts.value.push(toast)

    // Show toast with animation
    nextTick(() => {
      const toastElement = toasts.value.find(t => t.id === id)
      if (toastElement) {
        toastElement.visible = true
      }
    })

    // Auto-remove toast
    if (duration > 0) {
      setTimeout(() => {
        hideToast(id)
      }, duration)
    }

    return id
  }

  const hideToast = (id) => {
    const toastIndex = toasts.value.findIndex(t => t.id === id)
    if (toastIndex > -1) {
      toasts.value[toastIndex].visible = false
      // Remove from array after animation
      setTimeout(() => {
        const index = toasts.value.findIndex(t => t.id === id)
        if (index > -1) {
          toasts.value.splice(index, 1)
        }
      }, 300)
    }
  }

  const clearAllToasts = () => {
    toasts.value.forEach(toast => {
      toast.visible = false
    })
    setTimeout(() => {
      toasts.value.splice(0)
    }, 300)
  }

  return {
    toasts: readonly(toasts),
    showToast,
    hideToast,
    clearAllToasts
  }
}
