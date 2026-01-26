# Web Application Security Implementation Guide

## Overview
This document outlines the comprehensive security measures implemented for the Aprati Foods web application (Nuxt.js + Laravel).

## 🛡️ Security Features Implemented

### 1. Authentication & Authorization

#### Frontend Authentication Middleware
**Location:** `aprati_frontend/app/middleware/auth.ts`

**Features:**
- ✅ Token validation and format verification
- ✅ Token expiration checking
- ✅ User data structure validation
- ✅ Role-based access control (Admin/User)
- ✅ Secure storage management
- ✅ Auto-redirect on authentication failure

**Usage:**
```typescript
// Protect a page with authentication
definePageMeta({
  middleware: 'auth'
})

// Protect admin-only pages
definePageMeta({
  middleware: 'auth',
  requiresAdmin: true
})
```

#### Backend Authentication
**Technology:** Laravel Sanctum with JWT tokens

**Configuration:** `aprati_backend/config/sanctum.php`
- Token-based authentication
- Stateful domains for SPA
- Secure cookie handling

### 2. CORS (Cross-Origin Resource Sharing)

**Location:** `aprati_backend/config/cors.php`

**Configuration:**
- ✅ Whitelisted origins (localhost, production domain)
- ✅ Pattern-based subdomain support
- ✅ Credentials support enabled
- ✅ Exposed headers configured
- ✅ 24-hour max age for preflight requests

**Allowed Origins:**
- http://localhost:3000, 3001
- https://sdev.apratifoods.asia
- https://apratifoods.asia
- https://*.apratifoods.asia (subdomains)

### 3. Security Headers

**Location:** `aprati_backend/app/Http/Middleware/SecurityHeaders.php`

**Implemented Headers:**

| Header | Value | Purpose |
|--------|-------|---------|
| X-Frame-Options | SAMEORIGIN | Prevent clickjacking |
| X-Content-Type-Options | nosniff | Prevent MIME sniffing |
| X-XSS-Protection | 1; mode=block | XSS protection (legacy) |
| Content-Security-Policy | Custom policy | Control resource loading |
| Strict-Transport-Security | max-age=31536000 | Force HTTPS |
| Referrer-Policy | strict-origin-when-cross-origin | Control referrer info |
| Permissions-Policy | Restricted | Disable unused features |

**CSP Policy:**
```
default-src 'self'
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
font-src 'self' data: https://fonts.gstatic.com
img-src 'self' data: https: blob:
connect-src 'self' https://sdev.apratifoods.asia
frame-ancestors 'self'
base-uri 'self'
form-action 'self'
```

### 4. Rate Limiting

**Location:** `aprati_backend/app/Http/Middleware/ApiRateLimiter.php`

**Features:**
- ✅ User-based rate limiting (authenticated users)
- ✅ IP-based rate limiting (unauthenticated users)
- ✅ Configurable limits per route
- ✅ Response headers with limit information
- ✅ 429 status code on limit exceeded

**Default Limits:**
- API routes: 60 requests per minute
- Login attempts: Can be configured per route

**Usage:**
```php
// In routes/api.php
Route::middleware(['api.rate.limit:100,60'])->group(function () {
    // 100 requests per 60 minutes
});
```

### 5. XSS (Cross-Site Scripting) Protection

#### Backend Protection
**Location:** `aprati_backend/app/Http/Requests/SecureFormRequest.php`

**Features:**
- ✅ Automatic HTML entity encoding
- ✅ Input sanitization
- ✅ Null byte removal
- ✅ Trim whitespace

#### Frontend Protection
**Location:** `aprati_frontend/app/composables/useSecurity.ts`

**Functions:**
```typescript
const { sanitizeHtml, escapeHtml } = useSecurity()

// Sanitize user input before display
const safe = sanitizeHtml(userInput)

// Escape HTML entities
const escaped = escapeHtml(dangerousString)
```

### 6. Input Validation & Sanitization

#### Backend Form Requests

**Base Request:** `app/Http/Requests/SecureFormRequest.php`
- Automatic input trimming
- Null byte removal
- HTML special characters encoding
- Standardized error responses

**Specific Requests:**
1. **LoginRequest** - Email and password validation
2. **RegisterRequest** - Strong password requirements, unique email

**Example Usage:**
```php
public function store(RegisterRequest $request)
{
    $validated = $request->validated();
    // Data is already sanitized and validated
}
```

#### Frontend Validation
**Location:** `aprati_frontend/app/composables/useSecurity.ts`

**Available Validators:**
```typescript
const {
  isValidEmail,
  isValidPhone,
  validatePassword,
  validateFileUpload
} = useSecurity()

// Email validation
if (!isValidEmail(email)) {
  // Show error
}

// Password strength validation
const { valid, errors } = validatePassword(password)

// File upload validation
const { valid, error } = validateFileUpload(file, {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png']
})
```

### 7. CSRF Protection

**Laravel Built-in Protection:**
- ✅ Web routes protected by default
- ✅ API routes use Sanctum tokens
- ✅ CSRF cookie endpoint: `/sanctum/csrf-cookie`

**Frontend CSRF Token Generation:**
```typescript
const { generateCsrfToken } = useSecurity()
const token = generateCsrfToken()
```

### 8. SQL Injection Prevention

**Protection Methods:**
- ✅ Laravel Eloquent ORM (automatic parameter binding)
- ✅ Query builder with parameterized queries
- ✅ Input validation before database operations
- ✅ Type casting in models

**Safe Practices:**
```php
// ✅ SAFE - Using Eloquent
User::where('email', $email)->first()

// ✅ SAFE - Query builder with bindings
DB::table('users')->where('id', $id)->get()

// ❌ UNSAFE - Raw queries without bindings
DB::select("SELECT * FROM users WHERE id = $id")
```

### 9. File Upload Security

#### Backend Validation
- Maximum file size: 5MB (configurable)
- Allowed MIME types validation
- File extension validation
- Storage in non-public directories

#### Frontend Validation
```typescript
const { validateFileUpload } = useSecurity()

const result = validateFileUpload(file, {
  maxSize: 2 * 1024 * 1024, // 2MB
  allowedTypes: ['application/pdf', 'image/jpeg']
})
```

### 10. Session Security

**Configuration:** `aprati_backend/config/session.php`

**Settings:**
- ✅ Database-backed sessions
- ✅ 120-minute session lifetime
- ✅ HTTP-only cookies
- ✅ Secure cookies (HTTPS in production)
- ✅ Same-site cookie policy

### 11. Password Security

**Requirements:**
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character (!@#$%^&*)

**Hashing:**
- ✅ Bcrypt with 12 rounds (Laravel default)
- ✅ Automatic password hashing in User model

### 12. Environment Security

**Important:** Never commit `.env` file to version control!

**Secure `.env` Configuration:**
```env
APP_ENV=production
APP_DEBUG=false  # MUST be false in production
APP_KEY=base64:... # Generate with: php artisan key:generate

# Use strong database credentials
DB_PASSWORD=strong_random_password

# Secure session settings
SESSION_DRIVER=database
SESSION_ENCRYPT=false
SESSION_SECURE_COOKIE=true  # For HTTPS
```

## 🚀 Implementation Checklist

### Backend Setup

1. **Register Middleware in `bootstrap/app.php`:**
```php
$middleware->alias([
    'security.headers' => \App\Http\Middleware\SecurityHeaders::class,
    'api.rate.limit' => \App\Http\Middleware\ApiRateLimiter::class,
]);

$middleware->use([
    \App\Http\Middleware\SecurityHeaders::class,
]);

$middleware->api([
    \App\Http\Middleware\CorsMiddleware::class,
    'api.rate.limit:60',
]);
```

2. **Update Controllers to Use Form Requests:**
```php
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;

public function login(LoginRequest $request)
{
    $validated = $request->validated();
    // Your login logic
}
```

3. **Enable CORS in `.env`:**
```env
SANCTUM_STATEFUL_DOMAINS=localhost:3000,localhost:3001,sdev.apratifoods.asia
```

### Frontend Setup

1. **Import Security Composable:**
```typescript
// In your components
<script setup>
const { escapeHtml, isValidEmail, validatePassword } = useSecurity()
</script>
```

2. **Apply Authentication Middleware:**
```typescript
// pages/admin/dashboard.vue
definePageMeta({
  middleware: 'auth',
  requiresAdmin: true
})
```

3. **Use Secure Storage:**
```typescript
const { secureStorage } = useSecurity()

// Store data
secureStorage.set('userData', user)

// Retrieve data
const user = secureStorage.get('userData')
```

## 🔒 Production Deployment Checklist

### Required Actions Before Deployment

- [ ] Set `APP_ENV=production` in `.env`
- [ ] Set `APP_DEBUG=false` in `.env`
- [ ] Generate new `APP_KEY`: `php artisan key:generate`
- [ ] Configure HTTPS/SSL certificate
- [ ] Update `SANCTUM_STATEFUL_DOMAINS` with production domain
- [ ] Set strong database password
- [ ] Enable `SESSION_SECURE_COOKIE=true`
- [ ] Configure proper file permissions (755 for directories, 644 for files)
- [ ] Set storage and cache directories writable: `chmod -R 775 storage bootstrap/cache`
- [ ] Run: `php artisan config:cache`
- [ ] Run: `php artisan route:cache`
- [ ] Run: `php artisan view:cache`
- [ ] Remove development tools/packages
- [ ] Set up automated backups
- [ ] Configure logging and monitoring
- [ ] Test all security features in staging environment

### Web Server Configuration

#### Apache (.htaccess)
```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Prevent directory listing
Options -Indexes

# Protect sensitive files
<FilesMatch "^\.env$">
    Order allow,deny
    Deny from all
</FilesMatch>
```

#### Nginx
```nginx
# Force HTTPS
server {
    listen 80;
    server_name apratifoods.asia www.apratifoods.asia;
    return 301 https://$server_name$request_uri;
}

# HTTPS configuration
server {
    listen 443 ssl http2;
    server_name apratifoods.asia www.apratifoods.asia;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Deny access to sensitive files
    location ~ /\.env {
        deny all;
    }
}
```

## 🧪 Testing Security

### Manual Testing

1. **Test Authentication:**
   - Try accessing protected routes without login
   - Test token expiration
   - Test invalid token format

2. **Test Rate Limiting:**
   - Send multiple rapid requests to API
   - Verify 429 response after limit

3. **Test CORS:**
   - Make cross-origin requests from different domains
   - Verify only allowed origins can access API

4. **Test XSS Protection:**
   - Try submitting `<script>alert('XSS')</script>`
   - Verify output is sanitized

5. **Test Input Validation:**
   - Submit invalid email formats
   - Submit weak passwords
   - Try uploading invalid file types

### Automated Security Scanning

**Recommended Tools:**
1. **OWASP ZAP** - Automated security scanner
2. **Burp Suite** - Web vulnerability scanner
3. **Laravel Security Checker** - `composer require --dev enlightn/security-checker`

```bash
# Run security checker
php artisan security:check
```

## 📊 Monitoring & Logging

### Enable Security Logging

```php
// In controllers or middleware
\Log::warning('Suspicious activity', [
    'ip' => $request->ip(),
    'user_agent' => $request->userAgent(),
    'url' => $request->fullUrl(),
]);
```

### Monitor These Events:
- Failed login attempts
- Rate limit hits
- Invalid token access attempts
- File upload failures
- Validation errors

## 🆘 Incident Response

### If Security Breach Detected:

1. **Immediate Actions:**
   - Block suspicious IP addresses
   - Revoke all user tokens
   - Change `APP_KEY`
   - Force password reset for all users

2. **Investigation:**
   - Review security logs
   - Identify vulnerability
   - Assess damage scope

3. **Remediation:**
   - Patch vulnerability
   - Update dependencies
   - Restore from clean backup if needed

4. **Prevention:**
   - Update security measures
   - Conduct security audit
   - Train development team

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Laravel Security Best Practices](https://laravel.com/docs/11.x/security)
- [Nuxt Security Guide](https://nuxt.com/docs/guide/going-further/security)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

## 🔄 Regular Maintenance

### Weekly:
- Review security logs
- Check for failed login attempts
- Monitor rate limit violations

### Monthly:
- Update dependencies: `composer update` and `npm update`
- Review and rotate API keys
- Check SSL certificate expiry

### Quarterly:
- Conduct security audit
- Penetration testing
- Review and update security policies
- Training for development team

---

## Contact

For security concerns, please contact: security@apratifoods.asia

**Remember:** Security is an ongoing process, not a one-time implementation!
