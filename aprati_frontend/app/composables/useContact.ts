export const useContact = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase || 'http://127.0.0.1:8000/api'

  // Reactive contact data
  const contactData = ref({
    contact: {},
    company: {},
    social: {},
    businessHours: {}
  })

  // Loading state
  const loading = ref(false)
  const error = ref('')

  // Load contact/footer settings
  const loadContactData = async () => {
    try {
      loading.value = true
      error.value = ''

      const api = useApi()
      const timestamp = Date.now()
      const response = await api.request(`/footer-settings?ts=${timestamp}`)

      if (response.success && response.data) {
        contactData.value = {
          ...contactData.value,
          ...response.data
        }

        // Transform business hours from contact group
        if (response.data.contact) {
          const businessHours = {}
          if (response.data.contact.business_hours_monday_friday) {
            businessHours['Monday - Friday'] = response.data.contact.business_hours_monday_friday
          }
          if (response.data.contact.business_hours_saturday) {
            businessHours['Saturday'] = response.data.contact.business_hours_saturday
          }
          if (response.data.contact.business_hours_sunday) {
            businessHours['Sunday'] = response.data.contact.business_hours_sunday
          }

          // Fallback to defaults if no data
          if (Object.keys(businessHours).length === 0) {
            businessHours['Monday - Friday'] = '8:00 AM - 6:00 PM'
            businessHours['Saturday'] = '9:00 AM - 4:00 PM'
            businessHours['Sunday'] = 'Closed'
          }

          contactData.value.businessHours = businessHours
        }
      } else {
        throw new Error('Failed to load contact data')
      }
    } catch (err) {
      console.error('Error loading contact data:', err)
      error.value = 'Failed to load contact information'
    } finally {
      loading.value = false
    }
  }

  // Format address as single string
  const getFormattedAddress = computed(() => {
    const contact = contactData.value.contact || {}
    const addressParts = [
      contact.contact_address_line1,
      contact.contact_address_line2,
      contact.contact_address_line3
    ].filter(Boolean)

    return addressParts.length > 0
      ? addressParts.join(', ')
      : '123 Food Street, Phnom Penh, Cambodia'
  })

  // Get phone number
  const getPhone = computed(() => {
    return contactData.value.contact?.contact_phone || '+855 12 345 678'
  })

  // Get email
  const getEmail = computed(() => {
    return contactData.value.contact?.contact_email || 'info@aprati.com'
  })

  // Get company description
  const getCompanyDescription = computed(() => {
    return contactData.value.company?.company_description ||
      'Enhanced introduction website with advanced product search, career management, and comprehensive inventory system for the modern food industry.'
  })

  // Get social links
  const getSocialLinks = computed(() => {
    return contactData.value.social || {}
  })

  // Submit contact form (placeholder for future implementation)
  const submitContactForm = async (formData) => {
    try {
      loading.value = true
      error.value = ''

      // TODO: Implement contact form submission API
      // For now, just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000))

      return { success: true, message: 'Message sent successfully!' }
    } catch (err) {
      console.error('Error submitting contact form:', err)
      error.value = 'Failed to send message'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  return {
    contactData: readonly(contactData),
    loading: readonly(loading),
    error: readonly(error),
    loadContactData,
    getFormattedAddress,
    getPhone,
    getEmail,
    getCompanyDescription,
    getSocialLinks,
    submitContactForm
  }
}
