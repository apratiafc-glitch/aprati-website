<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class SecureFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Handle a failed validation attempt.
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422)
        );
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation()
    {
        // Trim all string inputs
        $input = $this->all();
        
        array_walk_recursive($input, function (&$value) {
            if (is_string($value)) {
                $value = trim($value);
                // Remove null bytes
                $value = str_replace(chr(0), '', $value);
            }
        });
        
        $this->replace($input);
    }

    /**
     * Sanitize input data
     */
    protected function sanitize(array $data): array
    {
        array_walk_recursive($data, function (&$value) {
            if (is_string($value)) {
                // Basic XSS prevention
                $value = htmlspecialchars($value, ENT_QUOTES | ENT_HTML5, 'UTF-8');
            }
        });
        
        return $data;
    }

    /**
     * Common validation rules
     */
    protected function commonRules(): array
    {
        return [
            'email' => ['email:rfc,dns', 'max:255'],
            'password' => ['min:8', 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/'],
            'phone' => ['regex:/^([0-9\s\-\+\(\)]*)$/', 'min:10', 'max:20'],
            'url' => ['url:http,https', 'max:2048'],
            'file' => ['file', 'max:5120'], // 5MB max
            'image' => ['image', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'], // 2MB max
        ];
    }
}
