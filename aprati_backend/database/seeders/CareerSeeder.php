<?php

namespace Database\Seeders;

use App\Models\Career;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CareerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $careers = [
            [
                'title_job' => 'Food Technologist',
                'position' => 'Senior Level',
                'career_information' => 'Lead product development and ensure quality standards across our brand portfolio. Join our innovative R&D team.',
                'job_description' => 'As a Food Technologist, you will be responsible for developing new food products, improving existing formulations, ensuring compliance with food safety regulations, conducting quality control tests, and collaborating with cross-functional teams to bring innovative products to market.',
                'job_requirements' => 'Bachelor\'s degree in Food Science, Food Technology, or related field. Minimum 3 years of experience in food product development. Knowledge of food safety regulations and quality control procedures. Strong analytical and problem-solving skills. Experience with food processing equipment and techniques.',
                'salary_range' => '$4,000 - $6,000',
                'location' => 'Phnom Penh',
                'job_type' => 'Full-time',
                'department' => 'R&D Department',
                'status' => 'active'
            ],
            [
                'title_job' => 'Brand Manager',
                'position' => 'Mid Level',
                'career_information' => 'Drive brand strategy and marketing initiatives for our premium food brands. Shape the future of our brand portfolio.',
                'job_description' => 'The Brand Manager will develop and execute comprehensive brand strategies, manage marketing campaigns, analyze market trends, coordinate with advertising agencies, monitor brand performance metrics, and ensure consistent brand messaging across all marketing channels.',
                'job_requirements' => 'Bachelor\'s degree in Marketing, Business Administration, or related field. 2-4 years of brand management or marketing experience. Strong understanding of consumer behavior and market research. Excellent communication and project management skills. Experience with digital marketing platforms.',
                'salary_range' => '$3,500 - $5,500',
                'location' => 'Phnom Penh',
                'job_type' => 'Full-time',
                'department' => 'Marketing',
                'status' => 'active'
            ],
            [
                'title_job' => 'Quality Assurance Specialist',
                'position' => 'Mid Level',
                'career_information' => 'Ensure our products meet the highest quality and safety standards. Be part of our commitment to excellence.',
                'job_description' => 'The Quality Assurance Specialist will implement and maintain quality management systems, conduct product inspections and audits, develop quality control procedures, investigate quality issues, prepare quality reports, and ensure compliance with food safety standards and regulations.',
                'job_requirements' => 'Bachelor\'s degree in Food Science, Chemistry, or related field. 2-3 years of experience in quality assurance or quality control. Knowledge of HACCP, ISO standards, and food safety regulations. Strong attention to detail and analytical skills. Experience with quality management software.',
                'salary_range' => '$3,000 - $4,500',
                'location' => 'Siem Reap',
                'job_type' => 'Full-time',
                'department' => 'Quality Control',
                'status' => 'active'
            ],
            [
                'title_job' => 'Production Supervisor',
                'position' => 'Supervisor Level',
                'career_information' => 'Lead our production teams and ensure efficient manufacturing operations across our facilities.',
                'job_description' => 'The Production Supervisor will oversee daily production activities, manage production teams, ensure production targets are met, implement safety procedures, coordinate with maintenance teams, monitor equipment performance, and ensure product quality standards are maintained throughout the production process.',
                'job_requirements' => 'Bachelor\'s degree in Engineering, Manufacturing, or related field. 3-5 years of supervisory experience in manufacturing or food production. Strong leadership and team management skills. Knowledge of production planning and lean manufacturing principles. Understanding of safety regulations and procedures.',
                'salary_range' => '$3,800 - $5,200',
                'location' => 'Battambang',
                'job_type' => 'Full-time',
                'department' => 'Production',
                'status' => 'active'
            ],
            [
                'title_job' => 'Marketing Intern',
                'position' => 'Entry Level',
                'career_information' => 'Start your career in marketing with hands-on experience in the food industry. Perfect opportunity for fresh graduates.',
                'job_description' => 'The Marketing Intern will assist with social media management, support marketing campaign execution, conduct market research, help with content creation, assist in event planning and execution, and support the marketing team with various administrative tasks and special projects.',
                'job_requirements' => 'Currently pursuing or recently completed a degree in Marketing, Communications, or related field. Strong interest in digital marketing and social media. Good communication skills in English and Khmer. Basic knowledge of design software is a plus. Enthusiasm to learn and grow in the marketing field.',
                'salary_range' => '$400 - $600',
                'location' => 'Phnom Penh',
                'job_type' => 'Internship',
                'department' => 'Marketing',
                'status' => 'active'
            ]
        ];

        foreach ($careers as $career) {
            Career::create($career);
        }
    }
}
