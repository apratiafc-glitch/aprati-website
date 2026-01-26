// User types
export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'brand_admin' | 'user'
  phone?: string
  address?: string
  is_active: boolean
  brand_id?: number
  brand?: Brand
  email_verified_at?: string
  created_at: string
  updated_at: string
}

// Brand types
export interface Brand {
  id: number
  name: string
  slug: string
  description?: string
  logo?: string
  website?: string
  is_active: boolean
  sort_order: number
  meta_title?: string
  meta_description?: string
  established_year?: number
  products_count?: number
  created_at: string
  updated_at: string
  deleted_at?: string
}

// Product types
export interface Product {
  id: number
  brand_id: number
  brand?: Brand
  name: string
  slug: string
  sku?: string
  part_number?: string
  description?: string
  short_description?: string
  price?: number
  cost_price?: number
  stock_quantity: number
  min_stock_level: number
  max_stock_level: number
  weight?: number
  dimensions?: {
    length?: number
    width?: number
    height?: number
    unit?: string
  }
  category?: string
  subcategory?: string
  technical_specs?: Record<string, any>
  images?: string[]
  is_active: boolean
  is_featured: boolean
  meta_title?: string
  meta_description?: string
  tags?: string[]
  created_at: string
  updated_at: string
  deleted_at?: string
}

// Job types
export interface Job {
  id: number
  title: string
  slug: string
  department: string
  location: string
  employment_type: 'full-time' | 'part-time' | 'contract' | 'internship'
  experience_level: 'entry' | 'mid' | 'senior' | 'executive'
  salary_range?: string
  description: string
  requirements?: string[]
  benefits?: string[]
  application_deadline: string
  is_active: boolean
  created_by: number
  creator?: User
  applications_count?: number
  created_at: string
  updated_at: string
}

// Job Application types
export interface JobApplication {
  id: number
  job_id: number
  job?: Job
  user_id?: number
  user?: User
  applicant_name: string
  applicant_email: string
  applicant_phone?: string
  cover_letter?: string
  resume_path: string
  portfolio_url?: string
  expected_salary?: number
  availability_date?: string
  status: 'pending' | 'reviewing' | 'interview' | 'accepted' | 'rejected'
  notes?: string
  reviewed_by?: number
  reviewer?: User
  reviewed_at?: string
  created_at: string
  updated_at: string
}

// Inventory Movement types
export interface InventoryMovement {
  id: number
  product_id: number
  product?: Product
  type: 'in' | 'out' | 'adjustment'
  quantity: number
  reference?: string
  notes?: string
  created_by: number
  creator?: User
  created_at: string
  updated_at: string
}

// API Response types
export interface ApiResponse<T = any> {
  status: 'success' | 'error'
  message?: string
  data?: T
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T = any> {
  data: T[]
  current_page: number
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: {
    url?: string
    label: string
    active: boolean
  }[]
  next_page_url?: string
  path: string
  per_page: number
  prev_page_url?: string
  to: number
  total: number
}

// Search types
export interface SearchFilters {
  query?: string
  brand_id?: number
  category?: string
  min_price?: number
  max_price?: number
  in_stock?: boolean
  is_featured?: boolean
  technical_specs?: Record<string, any>
}

export interface SearchResponse {
  products: PaginatedResponse<Product>
  brands: Brand[]
  categories: string[]
  filters: SearchFilters
}

// Notification types
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  persistent?: boolean
  created_at: Date
}

// Form types
export interface ContactForm {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface JobApplicationForm {
  job_id: number
  applicant_name: string
  applicant_email: string
  applicant_phone?: string
  cover_letter?: string
  resume: File
  portfolio_url?: string
  expected_salary?: number
  availability_date?: string
}
