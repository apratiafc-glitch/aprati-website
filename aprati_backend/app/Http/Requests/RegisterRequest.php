<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\Password;

class RegisterRequest extends SecureFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s]+$/'],
            'email' => ['required', 'email:rfc,dns', 'max:255', 'unique:users,email'],
            'password' => [
                'required',
                'string',
                'confirmed',
                Password::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
            ],
            'phone' => ['nullable', 'regex:/^([0-9\s\-\+\(\)]*)$/', 'min:10', 'max:20'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Name is required',
            'name.regex' => 'Name can only contain letters and spaces',
            'email.required' => 'Email address is required',
            'email.email' => 'Please provide a valid email address',
            'email.unique' => 'This email address is already registered',
            'password.required' => 'Password is required',
            'password.confirmed' => 'Password confirmation does not match',
            'phone.regex' => 'Please provide a valid phone number',
        ];
    }
}
