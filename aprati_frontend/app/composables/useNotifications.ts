import type { Notification } from '~/types'

export const useNotifications = () => {
  const notifications = useState<Notification[]>('notifications', () => [])

  const addNotification = (notification: Omit<Notification, 'id' | 'created_at'>) => {
    const id = Date.now().toString()
    const newNotification: Notification = {
      ...notification,
      id,
      created_at: new Date(),
      duration: notification.duration || 5000
    }

    notifications.value.push(newNotification)

    // Auto remove notification if not persistent
    if (!notification.persistent && newNotification.duration) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }

    return id
  }

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearNotifications = () => {
    notifications.value = []
  }

  // Helper methods for different notification types
  const success = (title: string, message?: string, options?: Partial<Notification>) => {
    return addNotification({ type: 'success', title, message, ...options })
  }

  const error = (title: string, message?: string, options?: Partial<Notification>) => {
    return addNotification({ type: 'error', title, message, ...options })
  }

  const warning = (title: string, message?: string, options?: Partial<Notification>) => {
    return addNotification({ type: 'warning', title, message, ...options })
  }

  const info = (title: string, message?: string, options?: Partial<Notification>) => {
    return addNotification({ type: 'info', title, message, ...options })
  }

  return {
    notifications: readonly(notifications),
    addNotification,
    removeNotification,
    clearNotifications,
    success,
    error,
    warning,
    info
  }
}
