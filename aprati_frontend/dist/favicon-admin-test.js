// Test script for favicon admin functionality
// Run this in browser console when logged in as admin

// Test 1: Fetch current favicon settings
async function testFaviconAPI() {
  console.log('🧪 Testing Favicon API...')

  try {
    // Test public endpoint
    const publicResponse = await fetch('/api/favicon-settings')
    const publicData = await publicResponse.json()
    console.log('✅ Public favicon config:', publicData)

    // Test admin endpoint (requires auth token)
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
    if (token) {
      const adminResponse = await fetch('/api/admin/favicon-settings', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })
      const adminData = await adminResponse.json()
      console.log('✅ Admin favicon settings:', adminData)
    } else {
      console.log('⚠️ No auth token found - login as admin first')
    }

  } catch (error) {
    console.error('❌ API test failed:', error)
  }
}

// Test 2: Initialize default settings
async function initializeDefaults() {
  console.log('🔧 Initializing default favicon settings...')

  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
  if (!token) {
    console.log('❌ No auth token found - login as admin first')
    return
  }

  try {
    const response = await fetch('/api/admin/favicon-settings/initialize-defaults', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
    const data = await response.json()
    console.log('✅ Initialize response:', data)
  } catch (error) {
    console.error('❌ Initialize failed:', error)
  }
}

// Test 3: Update a setting
async function updateSetting(key, value) {
  console.log(`📝 Updating setting ${key} to ${value}...`)

  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
  if (!token) {
    console.log('❌ No auth token found - login as admin first')
    return
  }

  try {
    const response = await fetch(`/api/admin/favicon-settings/${key}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ value })
    })
    const data = await response.json()
    console.log('✅ Update response:', data)
  } catch (error) {
    console.error('❌ Update failed:', error)
  }
}

// Usage examples:
// testFaviconAPI() - Test API endpoints
// initializeDefaults() - Initialize default settings
// updateSetting('favicon_title', 'New Title') - Update a setting

console.log('🎯 Favicon Admin Test Functions Loaded!')
console.log('Usage:')
console.log('- testFaviconAPI() - Test API endpoints')
console.log('- initializeDefaults() - Initialize default settings')
console.log('- updateSetting(key, value) - Update a specific setting')
