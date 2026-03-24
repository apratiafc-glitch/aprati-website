-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 24, 2026 at 09:39 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aprati_website`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_contents`
--

CREATE TABLE `about_contents` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `about_contents`
--

INSERT INTO `about_contents` (`id`, `title`, `content`, `image_url`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES
(2, 'BRCGS', 'BRCGS is the leading provider of global supply chain assurance programmes recognised by thousands worldwide. We protect product integrity through the most globally trusted certification programmes.', '/storage/about-content/PHH8JD3ly3h74Oc1kyjxWOhqbZw6vxw3u7F3H691.png', 1, 1, '2026-03-20 01:55:21', '2026-03-20 01:55:21'),
(3, 'GHP', 'Good Hygiene Practices, or GHP, form the basis of all food hygiene systems that support the production of safe and suitable food. Food business operators must be aware of hazards that could affect their food and ensure that such hazards are properly managed to protect consumer health. GHP are the foundation of any effective food safety management programme, and implementing them gives food business operators a system for controlling food safety hazards.', '/storage/about-content/kZzTrzUnv7vw25nC8XaTiLsr9uV8aLxSG9jrI9T5.png', 1, 2, '2026-03-20 01:56:40', '2026-03-20 01:56:40'),
(4, 'HACCP', 'a systematic, preventive approach to food safety that identifies, evaluates, and controls biological, chemical, and physical hazards from production to consumption', '/storage/about-content/9dWAYMcwu1nobftXoXPO1SSXfMSDf6v463V0c6sd.png', 1, 3, '2026-03-20 01:57:23', '2026-03-20 01:57:23'),
(5, 'SA8000® Standard', 'The SA8000 Standard is the world’s leading social certification program. The SA8000 Standard and Certification System provide a framework for organizations of all types, in any industry, and in any country to conduct business in a way that is fair and decent for workers and to demonstrate their adherence to the highest social standards. Created by SAI in 1997 as the first credible social certification, it has led the industry for over 20 years.', '/storage/about-content/f6q1lR7uxB3EUJyHWdfGbKZvYWSVw59IrASeXyXE.png', 1, 5, '2026-03-20 01:58:13', '2026-03-20 01:58:13'),
(6, 'History of Aprati Foods (Cambodia) Ltd', 'Aprati Foods (Cambodia) Ltd, established in 2013 and located in the Phnom Penh Special Economic Zone, is a trailblazer in Cambodia’s confectionery industry. Drawing on over a century of expertise from the American Licorice Company, Aprati Foods was the first in the country to research and develop candy using American quality standards.\n\nThe company launched its first brand, Mocati, in 2017, offering coffee-flavored candies tailored to local tastes. Since then, Aprati has expanded its product range under the Frutati brand to include a variety of jelly candies, spicy and fruity snacks, and sour chews—all crafted to meet Cambodian flavor preferences. With a strong commitment to food safety and international quality standards, Aprati Foods is also exploring consumer health products, aiming to blend indulgence with wellness in its future innovations.', '/storage/about-content/o74SPxro3uHffn3pHv7aNm1bHb9QVgyKkFyOGkTk.jpg', 1, 1, '2026-03-20 02:00:56', '2026-03-20 02:00:56');

-- --------------------------------------------------------

--
-- Table structure for table `admin_otps`
--

CREATE TABLE `admin_otps` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `otp_code` varchar(6) NOT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `used` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_otps`
--

INSERT INTO `admin_otps` (`id`, `user_id`, `otp_code`, `expires_at`, `used`, `created_at`, `updated_at`) VALUES
(13, 1, '703785', '2026-03-24 01:19:41', 0, '2026-03-24 00:49:41', '2026-03-24 00:49:41');

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `established_year` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`, `slug`, `description`, `logo`, `cover_image`, `is_active`, `sort_order`, `established_year`, `created_at`, `updated_at`) VALUES
(1, 'Mocati', 'mocati', NULL, '/storage/brands/logos/w43cbaYOtxizfnyrIXNIvGVSUXhLiiem2roLf3Gz.png', '/storage/brands/covers/AhfJcO4PB9VdY2bHeE4VuZ8MaEXR4V59vnXZ68lh.png', 1, 0, 2026, '2026-03-20 00:11:41', '2026-03-20 00:11:41'),
(2, 'Sevati', 'sevati', NULL, '/storage/brands/logos/NIfLPYV37m8kpvbjdN4hVryWf9ERhMnPjOPI75GI.png', '/storage/brands/covers/8QLD5PwLHh9YtVeEqvJw6zFUstnzp6qptlQ3KX6S.png', 1, 0, 2026, '2026-03-20 01:50:07', '2026-03-20 01:50:07'),
(3, 'Frutati', 'frutati', NULL, '/storage/brands/logos/n6PDIJKvTJoLYMgBUGZpve178G5EVIsgSOw7OBmm.png', '/storage/brands/covers/LErNVrFvE5oSwZ0KkkMaB8PDv4561hgzBNcYCivc.png', 1, 0, 2026, '2026-03-20 01:50:28', '2026-03-20 01:50:28'),
(4, 'Aprati', 'aprati', NULL, '/storage/brands/logos/Vt4fQG4rwCwzSFUkGCey7ta5CSbsymVkrroUgWhv.png', '/storage/brands/covers/FEZ3hCMVTOEoxwU5K2ZurTF4tMbknGN6WTIN4JIQ.png', 1, 0, 2026, '2026-03-20 01:50:48', '2026-03-20 01:50:48');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `careers`
--

CREATE TABLE `careers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title_job` varchar(255) NOT NULL,
  `career_information` text NOT NULL,
  `job_description` text NOT NULL,
  `job_requirements` text NOT NULL,
  `salary_range` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `job_type` varchar(255) NOT NULL DEFAULT 'Full-time',
  `department` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `careers`
--

INSERT INTO `careers` (`id`, `title_job`, `career_information`, `job_description`, `job_requirements`, `salary_range`, `position`, `location`, `job_type`, `department`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Warehouse & Inventory Assistant', 'Job Responsibilities', 'Assist in the day-to-day management of Finished Goods Inventory, ensuring accurate stock levels and proper (FEFO/FIFO).\nPerform receiving and releasing of finished goods; verify quantities, labels, and documentation against system records.\nPick, pack, and prepare finished products for dispatch according to picking lists and customer requirements.\nCoordinate with the logistics team to ensure safe and efficient loading and unloading of trucks.\nConduct regular cycle counts and assist in monthly physical inventory counts to ensure system accuracy versus physical stock.\nUpdate daily stock movements in the warehouse management system and maintain the stock movement list (Excel) to ensure real-time accuracy.\nEnsure all finished goods are stored in correct locations as per warehouse layout and are properly labeled and identified.\nCleaning pallets and preparation to ensure an adequate supply of clean and usable pallets is available for the production team daily.\nMaintain a clean and tidy work area; strictly follow 6S principles, BRC standards, and food safety requirements.\nInspect finished goods for damage or defects during handling and immediately report discrepancies to the supervisor.\nEnsure warehouse floors, racks, and aisles are clean and free of hazards; always keep the area clean and tidy.\nAssist in end-of-day checks to ensure warehouse doors are locked and equipment is powered down appropriately.\nBack up team members in other warehouse areas (e.g., raw materials) as needed and perform any other tasks assigned by management or the supervisor.', 'Experienced (minimum 1 year of job-related warehouse and inventory management, preferably with finished goods).\nBachelor’s Degree (in Management, Accounting, Business Administration, Logistics, Economics, or related fields).\nBasic to Intermediate level of Word (for reading instructions and reports), Excel (ability to update stock movement lists, use simple formulas, and maintain daily logs), Outlook (for basic internal communication), English (writing and communicating).\nNeed to drive Forklift for loading, unloading, and transferring goods to external warehouses.\nWillingness to learn 6S principles, BRC standards, and warehouse safety.\nAbility to clean, prepare, and supply pallets to the production team daily.\nWillingness to work as a team and back up team members in other areas (e.g., raw materials) as needed.\nAbility to work overtime when required by operational needs.\nHow to Apply:\nInterested candidates who meet the qualifications are invited to submit their CV, along with salary expectations, to:\nEmail: recruitment@apratifoods.asia\nTelegram: 096 7 583 532 /@VAN_NAK_CH\n078 585 887/ https://t.me/Reachie_xicma\n081 410 197/@nxttt_04', 'N/A', 'N/A', NULL, 'Full-time', NULL, 'active', '2026-03-20 02:55:22', '2026-03-20 02:55:22'),
(2, 'General Maintenance Technician', 'General Maintenance Technician', 'Job Responsibilities\n\nPreventive Maintenance (PM):\n Perform facilities maintenance such as electrical system, water supply system and other utilities\nUtility System Operation & Troubleshooting:\nPerform timely checking and inspection for utilities equipment/machine to ensure proactively rectification before operation.\nCorrective & Predictive Maintenance:\nPerform timely preventive maintenance on the utilities equipment to prevent unplanned downtime of the utilities that affects to the production\nFacility Maintenance:\nCoordinate and manage contractor working on-site to ensure safety and quality of the work delivered\nSafety, Compliance & Food Safety:\nEnsure operations comply with food safety standards (GMP, HACCP, hygiene requirements).\nCost Reduction & Continuous Improvement:\nSupport Project such as reduce maintenance cost, Reduce energy consumption, Improve PM effectiveness.\nDocumentation & Reporting:\nComplete maintenance checklists, logbooks, and work orders, Record parts usage and report low spare parts levels and Support maintenance reports related to downtime, PM completion, and utility performance.', 'Education: Bachelor’s degree of Mechanical, Electrical, or Mechatronics, or a related field\nWork Experience:\n– Minimum 2 years of experience in factory or utility maintenance (food factory preferred).\n– Experience Intermediate knowledge of boiler operations and mechanical systems.\nEducation:\nBachelor’s degree of Mechanical, Electrical, or Mechatronics, or a related field\nWork Experience:\n– Minimum 2 years of experience in factory or utility maintenance (food factory preferred).\n– Experience Intermediate knowledge of boiler operations and mechanical systems.\nEnglish Language Skills: Proficiency in English is essential for:\n– Effective communication\n– Understanding technical documentation and safety standards\n– Preparing reports and handling documentation tasks\nHow to Apply:\nInterested candidates who meet the qualifications are invited to submit their CV, along with salary expectations, to:\nEmail: recruitment@apratifoods.asia\nTelegram: 096 7 583 532 / @VAN_NAK_CH\n078 585 887/ https://t.me/Reachie_xicma\n081 410 197/ @nxttt_04', 'N/A', 'N/A', NULL, 'Full-time', NULL, 'active', '2026-03-20 02:56:28', '2026-03-20 02:56:28'),
(3, 'ER Technician', 'ER Technician', 'Job Responsibilities\n\n Production Equipment Support: Perform mechanical adjustments during start‑up, product changeover, troubleshooting and  Assist operators in machine setup, calibration, and parameter fine‑tuning, and  perform mechanical adjustments to ensure machines run smoothly and meet production targets\nElectricity monitoring & Troubleshooting: Monitor PLC HMI screens and system alarms throughout the shift, Identify abnormalities in sensors, actuators, interlocks, Identify, resolve basic mechanical and electrical issues, and Respond quickly to breakdowns to minimize downtime.\nPreventive & Corrective Maintenance: Conduct routine inspection of food‑processing equipment, Perform minor corrective maintenance to restore machine operation quickly, Support preventive maintenance tasks during planned downtime and record equipment conditions, recurring problems, and improvement suggestions.\nFood Safety, Hygiene & Compliance: Ensure all technical work complies with food safety standards (HACCP, GHP, hygiene protocols), Prevent contamination by following cleaning and sanitation requirements and  Follow all safety procedures, including Lock‑Out Tag‑Out (LOTO).\nDocumentation & Reporting: Log machine downtime, root causes, and actions taken into shift reports, Report major issues immediately to E&R Special list / the Production & Reliability Manager.\nTeamwork & Communication: Cooperate with Production Shift Coordinator, Quality Assurance team, maintenance teams Support training of new operators on basic machine handling and troubleshooting, and participate in problem‑solving activities and continuous improvement projects).', 'Education:\nBachelor’s degree of Mechanical, Electrical, or Mechatronics, or a related field\nWork Experience:\n– Minimum 2 years of experience in factory or utility maintenance (food factory preferred).\n– Experience Intermediate knowledge of boiler operations and mechanical systems.\nEnglish Language Skills: Proficiency in English is essential for:\n– Effective communication\n– Understanding technical documentation and safety standards\n– Preparing reports and handling documentation tasks\nHow to Apply:\nInterested candidates who meet the qualifications are invited to submit their CV, along with salary expectations, to:\nEmail: recruitment@apratifoods.asia\nTelegram: 096 7 583 532 / @VAN_NAK_CH\n078 585 887/https://t.me/Reachie_xicma\n081 410 197/ @nxttt_04', 'N/A', 'N/A', NULL, 'Full-time', NULL, 'active', '2026-03-20 02:58:48', '2026-03-20 02:58:48'),
(4, 'Accounting Specialist/Manager', 'Accounting Specialist/Manager', 'Job Description\n\nPrepare and ensure monthly tax declarations are completed accurately and submitted on time. \nEnsure annual tax declarations are submitted on time and with full accuracy. \nOversee monthly payroll calculations and processing. \nEnsure the accuracy of monthly closing reports, including the profit and loss statement and balance sheet. \nEnsure actual cost calculations for each product are performed correctly. \nSupervise Accounts Receivable (AR) and Accounts Payable (AP) staff to ensure records are accurate and completed on time. \nManage the fixed asset register, including physical counts and depreciation calculations. \nEnsure the accuracy of monthly inventory reporting (finished goods, raw materials, and packaging). \nTrain, develop, and motivate accounting staff to become professional accounting personnel. \nAudit Management: Liaise with external auditors and manage the audit process, ensuring timely completion and compliance with standards. \nTax Compliance: Liaise with and respond to General Department of Taxation (GDT) audits. \nSubmit annual financial reports to the Accounting and Audit Regulator (ACAR), ensuring all documentation is accurate and compliant. \nSupport the Finance & Administration Manager in budget preparation.', 'Requirements \n\nBachelor’s degree in Accounting, Finance, or a related field \n5+ years of relevant accounting experience, preferably in manufacturing or FMCG \nStrong knowledge of Cambodian tax regulations, including monthly and annual tax declarations and GDT audits \nHands-on experience in payroll processing, monthly closing, and financial reporting (P&L, Balance Sheet) \nProven ability in costing, inventory control, AR/AP management, and fixed asset management \nExperience in audit coordination and submission of statutory financial reports to ACAR \nAbility to supervise, train, and develop accounting staff into a professional team \nExperience in budget preparation and financial planning support \nProficient in accounting systems and Microsoft Excel \nStrong attention to detail, accuracy, compliance, and good communication skills \nBenefits \n\nSeniority follow labor law \nLunch at the company \nPhone allowances \nLeaves and Public Holidays follow labor law \nEducation: Company training, job training, associate development program   \nWorking Conditions: Mon-Sat (with two Saturday Off per month) \n\nTime: 8:00am – 5:00pm \nLocation: #P2-100, Royal Group Phnom Penh SEZ, Sangkat Phlerng Chhes Rotes, Khan Kambol, Phnom Penh \n\nHow to Apply:\n\nInterested candidates are invited to submit their CV via:\n\nEmail: recruitment@apratifoods.asia\n\nTelegram: 078 585 887 | 096 7 583 532 | 081 410 197', 'N/A', 'Manager', NULL, 'Full-time', NULL, 'active', '2026-03-20 02:59:42', '2026-03-20 02:59:42'),
(5, 'Online Sales and Customer Services Executive', 'Online Sales and Customer Services Executive', 'Job Description\n\nHandle incoming and outgoing calls professionally and efficiently.  \nGenerate revenue by making call to key Wholesale following the call-plan list assigned by line manager \nProvide accurate product, service, and promotion information to customers.  \nRecord customer orders, complaints, and feedback in the system.  \nResolve customer issues promptly or escalate to relevant departments when needed.  \nMaintain updated knowledge of company products, services, and policies.  \nEnsure high levels of customer satisfaction and service quality.  \nGenerate daily call reports and provide feedback to management.  \nSupport sales and distribution teams with order confirmations and follow-ups.  \nAchieve monthly and quarterly sales online targets as assigned. \nProvide support after-sales and resolve customer issues promptly. \nMaintain accurate online sales records, customer information, and reports in excel file. \nSupport ASM in collecting documents from SD to compile in logbook and submitting to Finance team.', 'Requirement\n\nBachelor’s degree in Business, Sales, Marketing, or\na related field.\nAt least 1–3 years of experience in customer\nservice, telesales, or sales support roles.\nStrong communication skills with proven ability to\nhandle inbound and outbound calls professionally.\nDemonstrated ability to achieve sales targets and\nmanage customer follow-ups effectively.\nProficient in Microsoft Excel and experienced in\nmaintaining accurate sales and customer records.\nGood coordination and problem-solving skills to\nwork with sales teams and internal departments.', 'N/A', 'N/A', NULL, 'Full-time', NULL, 'active', '2026-03-20 03:00:40', '2026-03-20 03:00:40');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Jelly', 'jelly', NULL, 1, '2026-03-20 02:15:29', '2026-03-20 02:15:29'),
(2, 'snack', 'snack', NULL, 1, '2026-03-20 02:22:11', '2026-03-20 02:22:11');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hero_slides`
--

CREATE TABLE `hero_slides` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `button_text` varchar(255) DEFAULT NULL,
  `button_link` varchar(255) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hero_slides`
--

INSERT INTO `hero_slides` (`id`, `title`, `subtitle`, `image`, `button_text`, `button_link`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'wellcome new design packaging', 'wellcome new design packaging', 'hero-slides/3CSzcgtwbrmW9EsjFBX0Bl5HWLasZbthqNgxAoC3.jpg', 'wellcome new design packaging', NULL, 0, 1, '2026-03-20 00:21:15', '2026-03-20 00:21:15'),
(2, 'កាន់តែពិសេស​ជាមួយរូបរាងថ្មី', NULL, 'hero-slides/8GBWT4ejHnj8EcDviIbdZ0N6eeqSzVaQDJXuqL7j.jpg', 'កាន់តែពិសេស​ជាមួយរូបរាងថ្មី', NULL, 0, 1, '2026-03-20 00:21:50', '2026-03-20 00:21:50'),
(3, 'Welcom', NULL, 'hero-slides/52A2r854Hlh3hhfp1rdxGRQCDNPGfq84MUPVJgsT.jpg', 'Welcom', NULL, 0, 1, '2026-03-23 02:25:33', '2026-03-23 02:25:33');

-- --------------------------------------------------------

--
-- Table structure for table `information_sections`
--

CREATE TABLE `information_sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `information_sections`
--

INSERT INTO `information_sections` (`id`, `title`, `description`, `image`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Welcome To Aprati Foods (Cambodia) Ltd', 'At Aprati Foods​​ (Cambodia) Ltd. “AFC”, we believe that standards provide associates with clear expectations. We believe that communicating clear expectations is a necessary step in creating a great place to work.  AFC uses international standards and develops internal standards, so that associates know what acceptable work looks, feels and tastes like.  Standards and expectations help to reveal problems; if we have no standards and expectations, then we have no problems. At AFC, we seek out problems by listening and responding to our consumers, customers, associates, suppliers and other stakeholders.  As part of building an enduring culture and achieving ORGANIZATIONAL EXCELLENCE, AFC wants all associates to be strong at finding problems and solving problems.  \n\nEvery associate makes many important decisions every day.  How do we make decisions at Aprati Foods?  AFC associates use five overarching decision-making priorities: Safety, Honesty, Quality, On-Time Delivery and Profit. These priorities are in rank order of importance:', '/storage/information-sections/1773991813.jpg', 1, '2026-03-20 00:19:35', '2026-03-20 02:00:04');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_applications`
--

CREATE TABLE `job_applications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `career_id` bigint(20) UNSIGNED NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `telegram_number` varchar(255) DEFAULT NULL,
  `cover_letter` text DEFAULT NULL,
  `cv_file_path` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `admin_notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `job_applications`
--

INSERT INTO `job_applications` (`id`, `career_id`, `full_name`, `email`, `phone_number`, `telegram_number`, `cover_letter`, `cv_file_path`, `status`, `admin_notes`, `created_at`, `updated_at`) VALUES
(1, 2, 'testing', 'testing@gmail.com', '000000', '000000', 'dsfdsfg', '/storage/cvs/1774000637_PO-0001 Top Management Committment R05 21-Dec-23.pdf', 'pending', NULL, '2026-03-20 02:57:17', '2026-03-20 02:57:17');

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `management_posts`
--

CREATE TABLE `management_posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `management_posts`
--

INSERT INTO `management_posts` (`id`, `name`, `description`, `bio`, `email`, `department`, `image`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'Privacy', 'What do we want to achieve? At AFC, we want to create more opportunities for more happiness for our consumers, customers, associates and community. Who do we want to be? At AFC, we want to be a team of people who do good work. We want to create a culture of problem solving and continuous improvement. How do we want to work? At AFC, we want to engage in cycles of rapid experimentation and problem-solving, which lead to long-term learning, continuous improvement and success. Responsibility: We are learning and improving. We contribute to the wellbeing of our community by being a socially & environmentally responsible company. Standards and Problem SolvingStandards: At Aprati Foods (Cambodia) Ltd. \"AFC\", we believe that standards provide associates with clear expectations. Communication: We believe that communicating clear expectations is a necessary step in creating a great place to work. Internal/International Standards: AFC uses international standards and develops internal standards, so that associates know what acceptable work looks, feels and tastes like. Finding Problems: Standards and expectations help to reveal problems; if we have no standards and expectations, then we have no problems. At AFC, we seek out problems by listening and responding to our consumers, customers, associates, suppliers and other stakeholders. Culture: As part of building a continuous-improvement culture, AFC wants all associates to be strong at finding problems and solving problems. Decision-Making Priorities (Ranked 1-5)Safety: AFC is committed to providing SAFETY. Safety means the safety of people. Safety is # 1. We produce safe food for consumers and create a safe and healthy workplace for our associates, contractors and visitors. Honesty: AFC is committed to working with HONESTY. We strive to conduct business lawfully, ethically and responsibly. Associates are encouraged to provide honest and frequent feedback. This includes following all legal/regulatory requirements, purchasing from reputable suppliers, and not allowing bribes. Quality: AFC is committed to delivering QUALITY. Quality is good work. We work to make quality, standard products that will create HAPPY CONSUMER EXPERIENCES. Quality also includes the confidentiality and integrity of critical information. On-Time Delivery: Products, services and information should reach external and internal customers on-time. Profit: AFC is committed to earning PROFIT by generating sufficient revenue and controlling costs. AFC does not compromise on Safety, Honesty, Quality or On-Time Delivery to earn a profit.', NULL, NULL, NULL, NULL, 1, 0, '2026-03-20 02:51:37', '2026-03-20 02:51:37');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_02_04_061038_create_brands_table', 1),
(5, '2026_02_04_061038_create_categories_table', 1),
(6, '2026_02_04_061039_create_products_table', 1),
(7, '2026_02_04_061041_create_hero_slides_table', 1),
(8, '2026_02_04_061042_create_information_sections_table', 1),
(9, '2026_02_04_063346_create_personal_access_tokens_table', 1),
(10, '2026_02_04_071342_add_details_to_brands_table', 1),
(11, '2026_02_04_071344_add_details_to_brands_table', 1),
(12, '2026_02_10_041808_create_careers_table', 1),
(13, '2026_02_10_042320_create_management_posts_table', 1),
(14, '2026_02_10_042726_create_about_contents_table', 1),
(15, '2026_02_10_080142_add_price_to_products_table', 1),
(16, '2026_02_10_080553_create_product_variants_table', 1),
(17, '2026_02_10_090000_create_promotion_banners_table', 1),
(18, '2026_02_16_075158_create_job_applications_table', 1),
(19, '2026_02_16_080431_create_notification_settings_table', 1),
(20, '2026_02_28_041130_add_google_id_to_users_table', 1),
(21, '2026_02_28_041132_create_admin_otps_table', 1),
(22, '2026_03_20_094822_create_privacy_contents_table', 2),
(23, '2026_03_23_061955_add_admin_notes_to_job_applications_table', 2),
(24, '2026_03_23_062635_create_settings_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `notification_settings`
--

CREATE TABLE `notification_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notification_settings`
--

INSERT INTO `notification_settings` (`id`, `key`, `value`, `created_at`, `updated_at`) VALUES
(1, 'telegram_bot_token', '', '2026-03-22 22:59:04', '2026-03-22 22:59:04'),
(2, 'telegram_chat_id', '', '2026-03-22 22:59:04', '2026-03-22 22:59:04');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(3, 'App\\Models\\User', 1, 'admin-token', '7cc84fa548c7d068e164856fd29d77abaa2391eeb7115545fd36f4be64d7c3c6', '[\"*\"]', '2026-03-23 03:05:42', NULL, '2026-03-22 22:55:40', '2026-03-23 03:05:42');

-- --------------------------------------------------------

--
-- Table structure for table `privacy_contents`
--

CREATE TABLE `privacy_contents` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `brand_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `brand_id`, `category_id`, `name`, `slug`, `description`, `price`, `image`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'ចាហួយស្វិត រសជាតិ កូឡា', '', NULL, 0.00, '/storage/products/3tJW6vCYLV5Ezs0NHkpWmpXbhvcRtssi9rjuCTNB.jpg', 1, '2026-03-20 02:16:49', '2026-03-20 02:16:49'),
(2, 1, 1, 'ចាហួយស្វិត រសជាតិ ស៊្រ្តបឺរឺ', '-1', NULL, 0.00, '/storage/products/xB9s4pvDyPzeORmOfNoycbc9KbCBZZnNttiNSiOX.png', 1, '2026-03-20 02:17:37', '2026-03-20 02:17:37'),
(3, 1, 1, 'ចាហួយស្វិត រសជាតិ ម៉ុងតុល', '-2', NULL, 0.00, '/storage/products/08KIAC2nxIn72L7rZwof1HyvRIE9QvkOBcJrYL7H.png', 1, '2026-03-20 02:18:31', '2026-03-20 02:18:31'),
(4, 3, 1, 'ចាហួយស្វិត​ រសជាតិត្របែក', '-3', NULL, 0.00, '/storage/products/UIugSlpSKboaPhmgClKz2zgFpw6GGmySR7bKHG0E.jpg', 1, '2026-03-20 02:19:13', '2026-03-20 02:19:13'),
(5, 3, 1, 'ចាហួយស្វិត​ រសជាតិព្រីង', '-4', NULL, 0.00, '/storage/products/AGyolavMCXWVWMN3lWKy18AYbp0rUreqH9ucAOQF.jpg', 1, '2026-03-20 02:19:36', '2026-03-20 02:19:36'),
(6, 3, 1, 'ចាហួយស្វិត​ រសជាតិគូលេន', '-5', NULL, 0.00, '/storage/products/HVbUsd3JxqjZFRRAfe7c97s5BLqu39eF8ZB8P8rs.jpg', 1, '2026-03-20 02:19:58', '2026-03-20 02:19:58'),
(7, 3, 1, 'ចាហួយស្វិត​ រសជាតិក្រូចពោធិ័សាត់', '-6', NULL, 0.00, '/storage/products/1qz977EIBYH9s7LDFFWCqDE34W58XCkP5WpoT4RQ.jpg', 1, '2026-03-20 02:20:34', '2026-03-20 02:20:34'),
(8, 3, 1, 'ចាហួយស្វិត​ រសជាតិអំពិលផ្អែម', '-7', NULL, 0.00, '/storage/products/CjFmx4a8n5YoYmZWiSLyl0GDdrYmtPA5KttvGizG.jpg', 1, '2026-03-20 02:20:57', '2026-03-20 02:20:57'),
(9, 2, 2, 'នំសារាយ​ សមុទ្រស្រួយ រសជាតិ ជូរហឺរ', '-8', NULL, 0.00, '/storage/products/54rKDDbK5koXpbXRktebGeoKpiAvzC39yhsWLxw6.png', 1, '2026-03-20 02:22:49', '2026-03-20 02:22:49'),
(10, 2, 2, 'នំសារាយ​ សមុទ្រស្រួយ រសជាតិ សារាយសមុទ្រ', '-9', NULL, 0.00, '/storage/products/eXBKNJZHAXMNZqlbu8EJdMIFwlzQI9IofiBkiGo4.png', 1, '2026-03-20 02:23:17', '2026-03-20 02:23:17');

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `stock_quantity` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_variants`
--

INSERT INTO `product_variants` (`id`, `product_id`, `name`, `price`, `is_default`, `is_active`, `stock_quantity`, `created_at`, `updated_at`) VALUES
(1, 1, 'Original', 0.00, 1, 1, 0, '2026-03-20 02:16:49', '2026-03-20 02:16:49'),
(2, 2, 'Original', 0.00, 1, 1, 0, '2026-03-20 02:17:37', '2026-03-20 02:17:37'),
(3, 3, 'Original', 0.00, 1, 1, 0, '2026-03-20 02:18:31', '2026-03-20 02:18:31'),
(4, 4, 'Original', 0.00, 1, 1, 0, '2026-03-20 02:19:14', '2026-03-20 02:19:14'),
(5, 5, 'Original', 0.00, 1, 1, 0, '2026-03-20 02:19:36', '2026-03-20 02:19:36'),
(6, 6, 'Original', 0.00, 1, 1, 0, '2026-03-20 02:19:58', '2026-03-20 02:19:58'),
(7, 7, 'Original', 0.00, 1, 1, 0, '2026-03-20 02:20:34', '2026-03-20 02:20:34'),
(8, 8, 'Original', 0.00, 1, 1, 0, '2026-03-20 02:20:57', '2026-03-20 02:20:57'),
(9, 9, 'Original', 0.00, 1, 1, 0, '2026-03-20 02:22:49', '2026-03-20 02:22:49'),
(10, 10, 'Original', 0.00, 1, 1, 0, '2026-03-20 02:23:17', '2026-03-20 02:23:17');

-- --------------------------------------------------------

--
-- Table structure for table `promotion_banners`
--

CREATE TABLE `promotion_banners` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `subtitle` text DEFAULT NULL,
  `image_path` varchar(255) NOT NULL,
  `background_color` varchar(255) NOT NULL DEFAULT '#EF4444',
  `text_color` varchar(255) NOT NULL DEFAULT 'text-white',
  `button_text` varchar(255) DEFAULT NULL,
  `button_link` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `promotion_banners`
--

INSERT INTO `promotion_banners` (`id`, `title`, `subtitle`, `image_path`, `background_color`, `text_color`, `button_text`, `button_link`, `is_active`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, 'banners/V94cc8QpA9HsAtRB90h10mWUWV2WLWhKH8h6UVM3.jpg', '#EF4444', 'text-blue-100', NULL, NULL, 1, '2026-03-20 01:37:11', '2026-03-20 01:37:11');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('APrVVQkaLKCzwpbdyMzvSQ3jZ3vopxGztzd6u90p', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNG12aXl3SGpadW1wcHpLYkZON1lWRFd0MkphR1F2WmN3c3pod0ZaUiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1774338771),
('F8vhH9bbkZrmj5Td2G7lqnT9wyoBfc8OSriWwGXy', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicHN6dzNsd3JMU1dwMHRjSjZrRkFpbGJMVjRTSGZxRUg2amRiOVdNMCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1774338588);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `group` varchar(255) NOT NULL DEFAULT 'general',
  `type` varchar(255) NOT NULL DEFAULT 'text',
  `label` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`, `group`, `type`, `label`, `description`, `created_at`, `updated_at`) VALUES
(1, 'site_name', 'Aprati Foods (Cambodia) Ltd', 'site_info', 'text', 'Site Name', NULL, '2026-03-22 23:28:45', '2026-03-23 00:41:10'),
(2, 'site_description', 'Premium Quality Food Products', 'site_info', 'textarea', 'Site Description', NULL, '2026-03-22 23:28:45', '2026-03-23 00:41:10'),
(3, 'meta_title', 'Aprati Foods - Welcome', 'site_info', 'text', 'Meta Title', NULL, '2026-03-22 23:28:45', '2026-03-23 00:41:10'),
(4, 'phone', '+855 87 300 040', 'contact_info', 'phone', 'Phone', NULL, '2026-03-22 23:28:45', '2026-03-23 00:41:10'),
(5, 'email', 'info@apratifoods.asia', 'contact_info', 'email', 'Email', NULL, '2026-03-22 23:28:45', '2026-03-23 00:41:10'),
(6, 'address', 'Phnom Penh, Cambodia', 'contact_info', 'textarea', 'Address', NULL, '2026-03-22 23:28:45', '2026-03-23 00:41:10'),
(7, 'google_maps_url', '', 'contact_info', 'url', 'Google Maps URL', NULL, '2026-03-22 23:28:45', '2026-03-23 00:41:10'),
(8, 'facebook', 'https://facebook.com/apratifoods', 'social_links', 'url', 'Facebook', NULL, '2026-03-22 23:28:45', '2026-03-23 00:41:10'),
(9, 'instagram', 'https://instagram.com/apratifoods', 'social_links', 'url', 'Instagram', NULL, '2026-03-22 23:28:45', '2026-03-23 00:41:10'),
(10, 'linkedin', '', 'social_links', 'url', 'LinkedIn', NULL, '2026-03-22 23:28:45', '2026-03-23 00:41:10'),
(11, 'youtube', '', 'social_links', 'url', 'YouTube', NULL, '2026-03-22 23:28:45', '2026-03-23 00:41:10'),
(12, 'header_logo', '/images/Company Logo-01.png', 'branding', 'image', 'Header Logo', NULL, '2026-03-22 23:28:45', '2026-03-23 00:26:36'),
(13, 'company_name', 'Aprati Foods', 'branding', 'text', 'Company Name', NULL, '2026-03-22 23:28:45', '2026-03-23 00:26:36'),
(14, 'tagline', 'Premium Quality', 'branding', 'text', 'Tagline', NULL, '2026-03-22 23:28:45', '2026-03-23 00:26:36'),
(15, 'enable_search', 'true', 'search', 'boolean', 'Enable Search', NULL, '2026-03-22 23:28:45', '2026-03-23 00:26:36'),
(16, 'search_placeholder', 'Search products...', 'search', 'text', 'Search Placeholder', NULL, '2026-03-22 23:28:45', '2026-03-23 00:26:36'),
(17, 'footer_phone', '+855 87 300 040', 'contact', 'phone', 'Phone', NULL, '2026-03-22 23:28:45', '2026-03-23 00:41:10'),
(18, 'footer_email', 'info@apratifoods.asia', 'contact', 'email', 'Email', NULL, '2026-03-22 23:28:45', '2026-03-23 00:41:10'),
(19, 'footer_address', 'Phnom Penh, Cambodia', 'contact', 'textarea', 'Address', NULL, '2026-03-22 23:28:45', '2026-03-23 00:41:10'),
(20, 'footer_facebook', 'https://facebook.com/apratifoods', 'social', 'url', 'Facebook', NULL, '2026-03-22 23:28:45', '2026-03-23 00:41:10'),
(21, 'footer_instagram', 'https://instagram.com/apratifoods', 'social', 'url', 'Instagram', NULL, '2026-03-22 23:28:45', '2026-03-23 00:41:10'),
(22, 'footer_copyright', '© 2026 Aprati Foods (Cambodia) Ltd', 'company', 'textarea', 'Copyright', NULL, '2026-03-22 23:28:45', '2026-03-23 00:26:36'),
(23, 'footer_logo', '/images/Company Logo-01.png', 'company', 'image', 'Footer Logo', NULL, '2026-03-22 23:28:45', '2026-03-23 00:26:36'),
(24, 'contact_phone', '+855 87 300 040', 'contact', 'text', 'Contact Phone', NULL, '2026-03-22 23:41:51', '2026-03-23 00:41:10'),
(25, 'contact_email', 'info@apratifoods.asia', 'contact', 'text', 'Contact Email', NULL, '2026-03-22 23:41:51', '2026-03-23 00:41:10'),
(26, 'contact_address_line1', 'Phnom Penh, Cambodia', 'contact', 'text', 'Address Line 1', NULL, '2026-03-22 23:41:51', '2026-03-23 00:41:10'),
(27, 'business_hours_monday_friday', '8:00 AM - 5:00 PM', 'contact', 'text', 'Hours Mon-Fri', NULL, '2026-03-22 23:41:51', '2026-03-23 00:41:10'),
(28, 'social_facebook', 'https://facebook.com/apratifoods', 'social', 'text', 'Facebook URL', NULL, '2026-03-22 23:41:51', '2026-03-23 00:41:10'),
(29, 'social_instagram', 'https://instagram.com/apratifoods', 'social', 'text', 'Instagram URL', NULL, '2026-03-22 23:41:51', '2026-03-23 00:41:10'),
(30, 'company_description', 'Premium Quality Food Products', 'company', 'textarea', 'Company Bio', NULL, '2026-03-22 23:41:51', '2026-03-23 00:41:10'),
(31, 'footer_description', 'Premium Quality Food Products', 'company', 'textarea', 'Footer Description', NULL, '2026-03-22 23:41:51', '2026-03-23 00:41:10'),
(32, 'social_linkedin', '', 'social', 'text', 'LinkedIn URL', NULL, '2026-03-22 23:54:59', '2026-03-22 23:54:59'),
(33, 'business_hours_saturday', '8:00 AM - 5:00 PM', 'contact', 'text', 'Hours Saturday', NULL, '2026-03-23 00:31:11', '2026-03-23 00:41:10'),
(34, 'business_hours_sunday', 'Closed', 'contact', 'text', 'Hours Sunday', NULL, '2026-03-23 00:31:11', '2026-03-23 00:41:10'),
(35, 'business_hours_mon_fri', '8:00 AM - 5:00 PM', 'contact_info', 'text', 'Business Hours Mon-Fri', NULL, '2026-03-23 00:31:11', '2026-03-23 00:41:10'),
(36, 'business_hours_sat', '8:00 AM - 5:00 PM', 'contact_info', 'text', 'Business Hours Sat', NULL, '2026-03-23 00:31:11', '2026-03-23 00:41:10'),
(37, 'business_hours_sun', 'Closed', 'contact_info', 'text', 'Business Hours Sun', NULL, '2026-03-23 00:31:11', '2026-03-23 00:41:10');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `google_id`, `avatar`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Aprati Admin', 'aprati.afc@gmail.com', '115171171915635654479', 'https://lh3.googleusercontent.com/a/ACg8ocLqe8MvzxIlnU8Qyl66_VDLoP8JTM-k0eA8eeANMHhe4j3yGs6V=s96-c', NULL, '$2y$12$JDyXmwOmPcSBrca9MjJ9s.CjL3O2/UBvk74cHpEYY9DadvGXyBVkW', 'admin', NULL, '2026-03-19 03:07:12', '2026-03-19 03:13:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_contents`
--
ALTER TABLE `about_contents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_otps`
--
ALTER TABLE `admin_otps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_otps_user_id_foreign` (`user_id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `brands_slug_unique` (`slug`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `careers`
--
ALTER TABLE `careers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `hero_slides`
--
ALTER TABLE `hero_slides`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `information_sections`
--
ALTER TABLE `information_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_applications`
--
ALTER TABLE `job_applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_applications_career_id_foreign` (`career_id`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `management_posts`
--
ALTER TABLE `management_posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification_settings`
--
ALTER TABLE `notification_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `notification_settings_key_unique` (`key`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `privacy_contents`
--
ALTER TABLE `privacy_contents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_slug_unique` (`slug`),
  ADD KEY `products_brand_id_foreign` (`brand_id`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_variants_product_id_foreign` (`product_id`);

--
-- Indexes for table `promotion_banners`
--
ALTER TABLE `promotion_banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_key_unique` (`key`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_contents`
--
ALTER TABLE `about_contents`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `admin_otps`
--
ALTER TABLE `admin_otps`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `careers`
--
ALTER TABLE `careers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hero_slides`
--
ALTER TABLE `hero_slides`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `information_sections`
--
ALTER TABLE `information_sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_applications`
--
ALTER TABLE `job_applications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `management_posts`
--
ALTER TABLE `management_posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `notification_settings`
--
ALTER TABLE `notification_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `privacy_contents`
--
ALTER TABLE `privacy_contents`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `promotion_banners`
--
ALTER TABLE `promotion_banners`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_otps`
--
ALTER TABLE `admin_otps`
  ADD CONSTRAINT `admin_otps_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `job_applications`
--
ALTER TABLE `job_applications`
  ADD CONSTRAINT `job_applications_career_id_foreign` FOREIGN KEY (`career_id`) REFERENCES `careers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
