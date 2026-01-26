-- Add Telegram Login Fields to users table
-- Run this in phpMyAdmin SQL tab

ALTER TABLE `users` 
ADD COLUMN `telegram_id` VARCHAR(255) NULL AFTER `email`,
ADD COLUMN `telegram_username` VARCHAR(255) NULL AFTER `telegram_id`,
ADD COLUMN `telegram_first_name` VARCHAR(255) NULL AFTER `telegram_username`,
ADD COLUMN `telegram_last_name` VARCHAR(255) NULL AFTER `telegram_first_name`,
ADD COLUMN `telegram_photo_url` VARCHAR(255) NULL AFTER `telegram_last_name`,
ADD COLUMN `auth_provider` VARCHAR(255) DEFAULT 'email' AFTER `password`,
ADD UNIQUE KEY `telegram_id_unique` (`telegram_id`);

-- Add OTP/2FA Fields to users table
ALTER TABLE `users`
ADD COLUMN `telegram_chat_id` VARCHAR(255) NULL AFTER `telegram_photo_url`,
ADD COLUMN `otp_code` VARCHAR(255) NULL AFTER `telegram_chat_id`,
ADD COLUMN `otp_expires_at` TIMESTAMP NULL AFTER `otp_code`,
ADD COLUMN `two_factor_enabled` TINYINT(1) DEFAULT 0 AFTER `otp_expires_at`;
