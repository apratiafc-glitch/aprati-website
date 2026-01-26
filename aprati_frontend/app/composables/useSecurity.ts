// Security Composable for Frontend
export const useSecurity = () => {
  /**
   * Sanitize HTML to prevent XSS attacks
   */
  const sanitizeHtml = (html: string): string => {
    const div = document.createElement('div')
    div.textContent = html
    return div.innerHTML
  }

  /**
   * Escape HTML entities
   */
  const escapeHtml = (text: string): string => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }
    return text.replace(/[&<>"']/g, m => map[m] || m)
  }

  /**
   * Validate email format
   */
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Validate phone number (basic)
   */
  const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
    return phoneRegex.test(phone)
  }

  /**
   * Validate password strength
   */
  const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number')
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push('Password must contain at least one special character (!@#$%^&*)')
    }
    
    return {
      valid: errors.length === 0,
      errors
    }
  }

  /**
   * Check if token is expired
   */
  const isTokenExpired = (): boolean => {
    const tokenExpiry = localStorage.getItem('token_expiry')
    if (!tokenExpiry) return false
    
    const expiryDate = new Date(tokenExpiry)
    return expiryDate < new Date()
  }

  /**
   * Secure storage operations
   */
  const secureStorage = {
    set: (key: string, value: any) => {
      try {
        const serialized = JSON.stringify(value)
        localStorage.setItem(key, serialized)
      } catch (error) {
        console.error('Storage error:', error)
      }
    },
    
    get: (key: string) => {
      try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
      } catch (error) {
        console.error('Storage retrieval error:', error)
        return null
      }
    },
    
    remove: (key: string) => {
      localStorage.removeItem(key)
    },
    
    clear: () => {
      localStorage.clear()
    }
  }

  /**
   * Generate CSRF token for forms
   */
  const generateCsrfToken = (): string => {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  }

  /**
   * Prevent clickjacking by checking if in iframe
   */
  const preventClickjacking = () => {
    if (window.self !== window.top && window.top) {
      window.top.location.href = window.self.location.href
    }
  }

  /**
   * Sanitize file upload
   */
  const validateFileUpload = (file: File, options: {
    maxSize?: number // in bytes
    allowedTypes?: string[]
  } = {}): { valid: boolean; error?: string } => {
    const { maxSize = 5 * 1024 * 1024, allowedTypes = [] } = options
    
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File size exceeds ${maxSize / 1024 / 1024}MB limit`
      }
    }
    
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type ${file.type} is not allowed`
      }
    }
    
    return { valid: true }
  }

  return {
    sanitizeHtml,
    escapeHtml,
    isValidEmail,
    isValidPhone,
    validatePassword,
    isTokenExpired,
    secureStorage,
    generateCsrfToken,
    preventClickjacking,
    validateFileUpload
  }
}
