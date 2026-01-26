# Quick Security Setup Guide

## 🚀 Fast Implementation (5 Minutes)

### 1. Update `.env` (Backend)
```env
APP_ENV=production
APP_DEBUG=false
SESSION_SECURE_COOKIE=true
SANCTUM_STATEFUL_DOMAINS=localhost:3000,localhost:3001,sdev.apratifoods.asia
```

### 2. Clear and Cache Configuration
```bash
cd aprati_backend
php artisan config:clear
php artisan config:cache
php artisan route:cache
```

### 3. Verify Middleware Registration
The middleware is already configured in `bootstrap/app.php`. Just verify it's present.

### 4. Test Security Features

#### Test Rate Limiting:
```bash
# Send 70 rapid requests (should get 429 after 60)
for i in {1..70}; do curl http://localhost:8000/api/brands; done
```

#### Test Authentication:
```bash
# Try accessing protected route without token (should get 401)
curl http://localhost:8000/api/admin/users
```

#### Test CORS:
```bash
# Try from unauthorized origin (should be blocked)
curl -H "Origin: http://unauthorized-site.com" http://localhost:8000/api/brands
```

### 5. Update Your Auth Controller

Replace authentication logic in `AuthController.php`:

```php
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;

public function login(LoginRequest $request)
{
    $credentials = $request->validated();
    
    if (!Auth::attempt($credentials)) {
        return response()->json([
            'success' => false,
            'message' => 'Invalid credentials'
        ], 401);
    }
    
    $user = Auth::user();
    $token = $user->createToken('auth_token')->plainTextToken;
    
    return response()->json([
        'success' => true,
        'token' => $token,
        'user' => $user
    ]);
}

public function register(RegisterRequest $request)
{
    $validated = $request->validated();
    
    $user = User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => Hash::make($validated['password']),
        'phone' => $validated['phone'] ?? null,
    ]);
    
    $token = $user->createToken('auth_token')->plainTextToken;
    
    return response()->json([
        'success' => true,
        'token' => $token,
        'user' => $user
    ], 201);
}
```

### 6. Test Frontend Security

In your Vue components:
```vue
<script setup>
const { validatePassword, isValidEmail, escapeHtml } = useSecurity()

const checkPassword = (pwd) => {
  const { valid, errors } = validatePassword(pwd)
  if (!valid) {
    console.log('Password errors:', errors)
  }
}

const displayUserInput = (input) => {
  // Always escape before displaying user content
  return escapeHtml(input)
}
</script>
```

## ✅ Security Checklist

- [x] ✅ Authentication middleware with token validation
- [x] ✅ CORS configured with whitelisted domains
- [x] ✅ Security headers (X-Frame-Options, CSP, etc.)
- [x] ✅ Rate limiting (60 req/min default)
- [x] ✅ XSS protection (sanitization functions)
- [x] ✅ CSRF protection (Sanctum)
- [x] ✅ Input validation (Form Requests)
- [x] ✅ SQL injection prevention (Eloquent ORM)
- [x] ✅ Password strength requirements
- [x] ✅ Secure session management

## 🔥 Most Important Security Rules

1. **Never set `APP_DEBUG=true` in production**
2. **Always use HTTPS in production**
3. **Keep `APP_KEY` secret**
4. **Don't commit `.env` to git**
5. **Update dependencies regularly**
6. **Always validate and sanitize user input**
7. **Use parameterized queries (Eloquent)**
8. **Set strong password requirements**
9. **Implement rate limiting on sensitive endpoints**
10. **Log security events**

## 🆘 Emergency Actions

If you suspect a breach:
```bash
# 1. Block suspicious IPs in your firewall/server config

# 2. Revoke all tokens
php artisan sanctum:prune-expired --hours=0

# 3. Generate new APP_KEY
php artisan key:generate

# 4. Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# 5. Force password reset for all users
# Add this in your database or create a migration
UPDATE users SET password_reset_required = 1;
```

## 📞 Need Help?

See full documentation: `SECURITY_GUIDE.md`
