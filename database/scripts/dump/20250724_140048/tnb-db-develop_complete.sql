-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host:<VPS-IP>    Database: tnb-db-develop
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.24.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `tnb-db-develop`
--

/*!40000 DROP DATABASE IF EXISTS `tnb-db-develop`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `tnb-db-develop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `tnb-db-develop`;

--
-- Table structure for table `callcenterqueue`
--

DROP TABLE IF EXISTS `callcenterqueue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `callcenterqueue` (
  `queue_id` int NOT NULL AUTO_INCREMENT,
  `fk_person` int DEFAULT NULL,
  `call_type` enum('Outbound','Inbound') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `agent_group` enum('Roofing','Tax') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` enum('Pending','Completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'Pending',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`queue_id`) USING BTREE,
  KEY `fk_person` (`fk_person`) USING BTREE,
  CONSTRAINT `callcenterqueue_ibfk_1` FOREIGN KEY (`fk_person`) REFERENCES `person` (`pk_person`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `callcenterqueue`
--

LOCK TABLES `callcenterqueue` WRITE;
/*!40000 ALTER TABLE `callcenterqueue` DISABLE KEYS */;
/*!40000 ALTER TABLE `callcenterqueue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `pk_category` int NOT NULL AUTO_INCREMENT,
  `status` int NOT NULL DEFAULT '1',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_category`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (18,0,'Home Specialty2','test1','2025-04-15 21:47:18','2025-04-15 21:47:18'),(25,1,'Residencial','residencial','2025-04-19 20:07:24','2025-04-19 20:07:24'),(29,1,'Contruccion','Descrip','2025-04-27 00:30:24','2025-04-27 01:05:36'),(31,1,'Electricity','dsadasdas','2025-05-11 05:07:21','2025-05-11 05:07:21');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client_type`
--

DROP TABLE IF EXISTS `client_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_type` (
  `pk_client_type` int NOT NULL AUTO_INCREMENT,
  `status` int DEFAULT '1',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_client_type`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_type`
--

LOCK TABLES `client_type` WRITE;
/*!40000 ALTER TABLE `client_type` DISABLE KEYS */;
INSERT INTO `client_type` VALUES (1,1,'Residencial','Residencial','2025-04-20 11:56:49','2025-04-20 11:56:57'),(2,1,'Commercial','Commercial','2025-04-20 11:56:49','2025-04-20 18:59:54');
/*!40000 ALTER TABLE `client_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client_type_questions`
--

DROP TABLE IF EXISTS `client_type_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_type_questions` (
  `pk_question` int NOT NULL AUTO_INCREMENT,
  `fk_client_type` int NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_question`),
  KEY `fk_questions_client_type` (`fk_client_type`),
  CONSTRAINT `fk_questions_client_type` FOREIGN KEY (`fk_client_type`) REFERENCES `client_type` (`pk_client_type`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_type_questions`
--

LOCK TABLES `client_type_questions` WRITE;
/*!40000 ALTER TABLE `client_type_questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `client_type_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `company_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_departments`
--

DROP TABLE IF EXISTS `company_departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_departments` (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `fk_company` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `status` tinyint(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_departments`
--

LOCK TABLES `company_departments` WRITE;
/*!40000 ALTER TABLE `company_departments` DISABLE KEYS */;
/*!40000 ALTER TABLE `company_departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `pk_contact` int NOT NULL AUTO_INCREMENT,
  `fk_person` int DEFAULT NULL,
  `is_commercial` int DEFAULT '0' COMMENT 'Cliente comercial? 0 = No, 1 =Si',
  `entry` int DEFAULT NULL COMMENT 'Via de entrada a la base de datos: 1 = App Mobile',
  `status` int DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_contact`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (2,2,0,1,1,'2025-05-09 14:41:43','2025-05-09 14:41:43'),(7,35,0,1,1,'2025-05-16 23:40:21','2025-05-16 23:40:21'),(8,36,0,1,1,'2025-05-17 00:10:30','2025-05-17 00:10:30'),(9,37,0,1,1,'2025-05-29 02:00:29','2025-05-29 02:00:29'),(10,38,0,1,1,'2025-05-29 02:01:20','2025-05-29 02:01:20'),(11,39,0,1,1,'2025-06-08 15:32:34','2025-06-08 15:32:34'),(12,40,0,1,1,'2025-06-09 19:42:01','2025-06-09 19:42:01'),(13,41,0,1,1,'2025-06-09 19:44:19','2025-06-09 19:44:19'),(14,42,0,1,1,'2025-06-11 21:05:34','2025-06-11 21:05:34'),(15,43,0,1,1,'2025-06-21 01:27:02','2025-06-21 01:27:02'),(16,44,0,1,1,'2025-06-24 22:29:07','2025-06-24 22:29:07'),(17,45,0,1,1,'2025-06-24 22:33:32','2025-06-24 22:33:32'),(18,46,0,1,1,'2025-06-24 22:34:30','2025-06-24 22:34:30'),(19,47,0,1,1,'2025-06-24 22:36:05','2025-06-24 22:36:05'),(20,48,0,1,1,'2025-06-24 22:39:38','2025-06-24 22:39:38'),(21,49,0,1,1,'2025-06-24 22:41:34','2025-06-24 22:41:34'),(22,50,0,1,1,'2025-06-24 22:44:42','2025-06-24 22:44:42'),(23,51,0,1,1,'2025-06-24 22:45:14','2025-06-24 22:45:14'),(24,52,0,1,1,'2025-06-24 22:47:54','2025-06-24 22:47:54'),(25,53,0,1,1,'2025-06-24 22:57:02','2025-06-24 22:57:02'),(26,54,0,1,1,'2025-06-24 23:18:35','2025-06-24 23:18:35'),(27,55,0,1,1,'2025-06-25 00:27:10','2025-06-25 00:27:10'),(28,56,0,1,1,'2025-06-29 00:47:08','2025-06-29 00:47:08'),(29,57,0,1,1,'2025-07-02 23:20:44','2025-07-02 23:20:44'),(30,58,0,1,1,'2025-07-09 16:50:46','2025-07-09 16:50:46'),(31,59,0,1,1,'2025-07-11 16:48:07','2025-07-11 16:48:07'),(32,60,0,1,1,'2025-07-19 22:07:28','2025-07-19 22:07:28');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
  `pk_country` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_country`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES (1,'United States',0,'2025-04-22 18:11:11','2025-06-24 20:57:49');
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country_city`
--

DROP TABLE IF EXISTS `country_city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country_city` (
  `pk_city` int NOT NULL AUTO_INCREMENT,
  `fk_state` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_city`) USING BTREE,
  KEY `fk_localities_state` (`fk_state`),
  CONSTRAINT `fk_localities_state` FOREIGN KEY (`fk_state`) REFERENCES `country_states` (`pk_state`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country_city`
--

LOCK TABLES `country_city` WRITE;
/*!40000 ALTER TABLE `country_city` DISABLE KEYS */;
INSERT INTO `country_city` VALUES (1,1,'Dallas',1,'2025-04-23 01:38:35','2025-06-23 16:39:10'),(3,1,'Houston',1,'2025-06-23 16:49:13','2025-06-23 16:49:52');
/*!40000 ALTER TABLE `country_city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country_states`
--

DROP TABLE IF EXISTS `country_states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country_states` (
  `pk_state` int NOT NULL AUTO_INCREMENT,
  `fk_country` int DEFAULT NULL,
  `internal_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_state`) USING BTREE,
  KEY `fk_states_country` (`fk_country`),
  CONSTRAINT `fk_states_country` FOREIGN KEY (`fk_country`) REFERENCES `countries` (`pk_country`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country_states`
--

LOCK TABLES `country_states` WRITE;
/*!40000 ALTER TABLE `country_states` DISABLE KEYS */;
INSERT INTO `country_states` VALUES (1,1,'111','Texas',1,'2025-04-23 01:39:34','2025-04-23 01:39:34');
/*!40000 ALTER TABLE `country_states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `invoice_id` int NOT NULL AUTO_INCREMENT,
  `fk_quote` int DEFAULT NULL,
  `invoice_amount` decimal(10,2) DEFAULT NULL,
  `invoice_status` enum('Pending','Paid') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'Pending',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`invoice_id`) USING BTREE,
  KEY `fk_quote` (`fk_quote`) USING BTREE,
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`fk_quote`) REFERENCES `quotes` (`quote_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leads`
--

DROP TABLE IF EXISTS `leads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leads` (
  `lead_id` int NOT NULL AUTO_INCREMENT,
  `fk_person` int DEFAULT NULL,
  `lead_source` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lead_status` enum('New','Qualified','Disqualified') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'New',
  `roof_age` int DEFAULT NULL,
  `insurance_coverage` tinyint(1) DEFAULT NULL,
  `visible_damage` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`lead_id`) USING BTREE,
  KEY `fk_person` (`fk_person`) USING BTREE,
  CONSTRAINT `leads_ibfk_1` FOREIGN KEY (`fk_person`) REFERENCES `person` (`pk_person`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leads`
--

LOCK TABLES `leads` WRITE;
/*!40000 ALTER TABLE `leads` DISABLE KEYS */;
/*!40000 ALTER TABLE `leads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locality_type`
--

DROP TABLE IF EXISTS `locality_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locality_type` (
  `pk_type` int NOT NULL AUTO_INCREMENT,
  `status` tinyint(1) DEFAULT '1',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_type`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locality_type`
--

LOCK TABLES `locality_type` WRITE;
/*!40000 ALTER TABLE `locality_type` DISABLE KEYS */;
INSERT INTO `locality_type` VALUES (1,1,'Town',NULL,'2025-04-23 01:38:14','2025-04-23 01:38:14'),(2,1,'City',NULL,'2025-04-23 01:38:31','2025-04-23 01:38:31');
/*!40000 ALTER TABLE `locality_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `menu_id` int NOT NULL AUTO_INCREMENT,
  `fk_father_menu` int DEFAULT NULL,
  `internal_code` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `icon_flag` tinyint(1) DEFAULT '1',
  `status` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fk_user_created` int DEFAULT NULL,
  `fk_user_modified` int DEFAULT NULL,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_actions`
--

DROP TABLE IF EXISTS `menu_actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_actions` (
  `action_id` int NOT NULL AUTO_INCREMENT,
  `fk_user` int NOT NULL,
  `fk_menu` int NOT NULL,
  `can_read` tinyint(1) DEFAULT '1',
  `can_write` tinyint(1) DEFAULT '0',
  `can_update` tinyint(1) DEFAULT '0',
  `can_delete` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`action_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_actions`
--

LOCK TABLES `menu_actions` WRITE;
/*!40000 ALTER TABLE `menu_actions` DISABLE KEYS */;
/*!40000 ALTER TABLE `menu_actions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mobile_campaigns`
--

DROP TABLE IF EXISTS `mobile_campaigns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mobile_campaigns` (
  `pk_campaigns` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text,
  `image_url` text,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_campaigns`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mobile_campaigns`
--

LOCK TABLES `mobile_campaigns` WRITE;
/*!40000 ALTER TABLE `mobile_campaigns` DISABLE KEYS */;
INSERT INTO `mobile_campaigns` VALUES (10,'Tu Tiempo Vale Oro x','Deja que nuestra app se encargue de tus tareas mientras tú disfrutas de lo que realmente importa.edit','/images/campaigns/campaign-1753369157472-772740856.jpg','2025-07-22 00:00:00','2025-07-31 00:00:00',1,'2025-07-23 12:48:37','2025-07-24 10:59:17'),(19,'Tu Vida, Simplificada: Soluciones al Alcance de tu Mano','Menos tareas, más vida. Tu tiempo es oro, déjanos encárgarnos del resto','/images/campaigns/campaign-1753297622969-586064736.png','2025-07-21 00:00:00','2025-07-31 00:00:00',1,'2025-07-23 15:06:48','2025-07-23 15:07:02'),(20,'Expertos Confiables a un Clic: Calidad y Seguridad Garantizada','Tranquilidad garantizada. Profesionales verificados a tu disposición.','/images/campaigns/campaign-1753297827548-7300898.png','2025-07-01 00:00:00','2025-07-23 00:00:00',1,'2025-07-23 15:10:18','2025-07-24 10:25:45'),(21,'Tu Comunidad, Tu App: Impulsa lo Local, Conéctate Fácil','Apoya tu comunidad. Encuentra talentos locales a tu puerta.','/images/campaigns/campaign-1753298568398-315556693.png','2025-07-08 00:00:00','2025-07-31 00:00:00',1,'2025-07-23 15:22:38','2025-07-23 15:22:48'),(24,'Oferta Navideña edit','Descrption edit','/images/campaigns/campaign-1753370118677-583303320.png','2025-11-14 23:00:00','2026-01-05 23:00:00',1,'2025-07-24 11:12:36','2025-07-24 11:15:18');
/*!40000 ALTER TABLE `mobile_campaigns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mobile_service_requests`
--

DROP TABLE IF EXISTS `mobile_service_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mobile_service_requests` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `fk_user` int DEFAULT NULL,
  `service_type` int DEFAULT NULL,
  `service_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `latitude` decimal(10,6) DEFAULT NULL,
  `longitude` decimal(10,6) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  KEY `fk_user` (`fk_user`),
  CONSTRAINT `mobile_service_requests_ibfk_1` FOREIGN KEY (`fk_user`) REFERENCES `users` (`pk_user`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mobile_service_requests`
--

LOCK TABLES `mobile_service_requests` WRITE;
/*!40000 ALTER TABLE `mobile_service_requests` DISABLE KEYS */;
INSERT INTO `mobile_service_requests` VALUES (16,NULL,5,'Tengo inconvenientes en mi techo después de la lluvia ','Av los Apamates',10.424286,-64.164919,0,'2025-05-17 02:45:49',NULL),(17,NULL,2,'Trgthhjuh vghbh','Vujjoib',10.424286,-64.164919,0,'2025-05-17 03:02:29',NULL),(18,NULL,10,'Bynhyhy','Gtgvhh',10.424286,-64.164919,0,'2025-05-17 03:04:42',NULL),(19,NULL,5,'Test descripción ','Ur Antonio Jose',10.424269,-64.164906,0,'2025-06-08 14:51:59',NULL),(20,NULL,1,'This is a description','my address test 123',-17.394482,-66.171794,0,'2025-06-09 19:46:54',NULL),(21,NULL,1,'string','string',0.000000,0.000000,NULL,'2025-06-27 23:12:30',NULL),(22,NULL,1,'Test Des','Cumana',10.424244,-64.164895,NULL,'2025-06-28 22:21:15',NULL),(23,NULL,1,'Descrição ','Test Address ',10.424247,-64.164893,NULL,'2025-06-28 22:33:22',NULL),(24,28,2,'Tesvhhh','Jujjj',10.424247,-64.164893,NULL,'2025-06-28 22:48:33',NULL),(25,28,1,'Yyy','Hhyh',10.424247,-64.164893,NULL,'2025-06-28 23:12:54',NULL),(26,28,1,'Test','Test',10.424246,-64.164900,NULL,'2025-06-28 23:23:26',NULL),(27,28,2,'Terr','Cgvh',10.424246,-64.164900,NULL,'2025-06-29 00:12:31',NULL),(28,28,3,'Tgyy','Fttg',10.424246,-64.164900,NULL,'2025-06-29 00:13:53',NULL),(29,28,4,'Yyhh','Tthhh',10.424246,-64.164900,NULL,'2025-06-29 00:16:48',NULL),(30,28,11,'Tttttt','Ffggg',10.424246,-64.164900,NULL,'2025-06-29 00:20:10',NULL),(31,28,9,'Servicio de agua ','Dirección ',10.424246,-64.164900,NULL,'2025-06-29 00:21:10',NULL),(32,28,10,'Service Tax','Adreggg',10.424246,-64.164900,NULL,'2025-06-29 00:22:54',NULL),(33,111,3,'Test Sevice','Adress',10.424245,-64.164898,NULL,'2025-06-29 00:48:13',NULL),(34,111,3,'Test hvac','Tesy',10.424245,-64.164898,NULL,'2025-06-29 00:48:51',NULL),(35,31,1,'Hi, My insurance don’t want to pay for my Roof and I need help ASAP due I have a water Leak…\n','9101 LBJ Freeway Dallas Texas 75243',30.045582,-95.369741,NULL,'2025-07-03 00:38:51',NULL);
/*!40000 ALTER TABLE `mobile_service_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person` (
  `pk_person` int NOT NULL AUTO_INCREMENT,
  `status` int NOT NULL DEFAULT '1',
  `first_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `middle_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_person`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (1,1,'Franklin Edit','Edit ','Parra edit','0000-00-00','2025-01-31 15:29:00','2025-01-31 19:41:23'),(2,1,'Johann','Jose','Gonzalez','0000-00-00','2025-01-31 19:55:26','2025-01-31 19:55:27'),(3,0,'string','string','string','0000-00-00','2025-01-31 20:49:53','2025-01-31 20:52:52'),(4,0,'string','string','string','0000-00-00','2025-01-31 20:53:02','2025-01-31 20:53:03'),(5,1,'',NULL,'','0000-00-00','2025-01-31 20:54:26','2025-01-31 20:54:27'),(6,1,'',NULL,'','0000-00-00','2025-01-31 20:57:06','2025-01-31 20:57:07'),(7,1,'',NULL,'','0000-00-00','2025-01-31 21:01:06','2025-01-31 21:01:07'),(8,1,'',NULL,'','0000-00-00','2025-01-31 21:28:16','2025-01-31 21:28:16'),(9,1,'',NULL,'','0000-00-00','2025-01-31 21:34:20','2025-01-31 21:34:21'),(10,1,'',NULL,'','0000-00-00','2025-01-31 21:48:07','2025-01-31 21:48:08'),(11,1,'',NULL,'','0000-00-00','2025-01-31 22:03:30','2025-01-31 22:03:31'),(12,1,'',NULL,'','0000-00-00','2025-01-31 22:24:03','2025-01-31 22:24:04'),(13,1,'',NULL,'','0000-00-00','2025-01-31 22:35:43','2025-01-31 22:35:44'),(15,1,'',NULL,'','0000-00-00','2025-02-04 22:19:04','2025-02-04 22:19:04'),(16,1,'',NULL,'','0000-00-00','2025-02-04 23:11:32','2025-02-04 23:11:32'),(17,1,'',NULL,'','0000-00-00','2025-02-04 23:38:47','2025-02-04 23:38:48'),(18,1,'',NULL,'','0000-00-00','2025-02-05 21:56:44','2025-02-05 21:56:49'),(19,1,'',NULL,'','0000-00-00','2025-02-06 22:23:12','2025-02-06 22:23:13'),(20,1,'',NULL,'','0000-00-00','2025-02-06 22:41:38','2025-02-06 22:41:39'),(21,1,'',NULL,'','0000-00-00','2025-02-06 22:43:08','2025-02-06 22:43:10'),(22,1,'',NULL,'','0000-00-00','2025-02-07 21:00:26','2025-02-07 21:00:26'),(23,1,'',NULL,'','0000-00-00','2025-02-07 21:02:55','2025-02-07 21:02:56'),(24,1,'',NULL,'','0000-00-00','2025-02-07 22:47:38','2025-02-07 22:47:38'),(25,1,'',NULL,'','0000-00-00','2025-02-07 23:05:03','2025-02-07 23:05:03'),(26,1,'',NULL,'','0000-00-00','2025-02-07 23:06:20','2025-02-07 23:06:20'),(27,1,'',NULL,'','0000-00-00','2025-02-12 22:55:47','2025-02-12 22:55:48'),(28,1,'',NULL,'','0000-00-00','2025-02-13 20:41:11','2025-02-13 20:41:12'),(29,1,'',NULL,'','0000-00-00','2025-02-13 20:43:52','2025-02-13 20:43:52'),(30,1,'',NULL,'','0000-00-00','2025-02-28 17:03:45','2025-02-28 17:08:43'),(31,1,'Johann','','Gonzalez',NULL,'2025-05-09 01:09:54','2025-05-09 01:09:54'),(32,1,'Sara','Luisa','Oca',NULL,'2025-05-09 01:14:43','2025-05-09 01:14:43'),(33,1,'Jimmy','Nataniel','Requena Llorentty',NULL,'2025-05-10 21:19:54','2025-05-10 21:19:54'),(34,1,'Jose','','Rodriguez',NULL,'2025-05-16 23:21:40','2025-05-16 23:21:40'),(35,1,'Yoleida','','Gamez',NULL,'2025-05-16 23:40:19','2025-05-16 23:40:19'),(36,1,'Génesis','','González',NULL,'2025-05-17 00:10:28','2025-05-17 00:10:28'),(37,1,'Johann','','González ',NULL,'2025-05-29 02:00:21','2025-05-29 02:00:21'),(38,1,'Johann test','','González test',NULL,'2025-05-29 02:01:18','2025-05-29 02:01:18'),(39,1,'Test ','','Domingo ',NULL,'2025-06-08 15:32:34','2025-06-08 15:32:34'),(40,1,'Rudy','','Rojas',NULL,'2025-06-09 19:42:01','2025-06-09 19:42:01'),(41,1,'Rudy','','Rojas',NULL,'2025-06-09 19:44:19','2025-06-09 19:44:19'),(42,1,'James','','Gosling',NULL,'2025-06-11 21:05:34','2025-06-11 21:05:34'),(43,1,'Aline','','Gonzalez',NULL,'2025-06-21 01:27:02','2025-06-21 01:27:02'),(44,1,'Josh','','Smith',NULL,'2025-06-24 22:29:06','2025-06-24 22:29:06'),(45,1,'Josh','','Smith ',NULL,'2025-06-24 22:33:32','2025-06-24 22:33:32'),(46,1,'Josh','','Smith ',NULL,'2025-06-24 22:34:30','2025-06-24 22:34:30'),(47,1,'Josh','','Smith ',NULL,'2025-06-24 22:36:05','2025-06-24 22:36:05'),(48,1,'Test 2','','Test 2',NULL,'2025-06-24 22:39:37','2025-06-24 22:39:37'),(49,1,'Test3','','Test3',NULL,'2025-06-24 22:41:33','2025-06-24 22:41:33'),(50,1,'Test3','','Test3',NULL,'2025-06-24 22:44:42','2025-06-24 22:44:42'),(51,1,'Test3','','Test3',NULL,'2025-06-24 22:45:14','2025-06-24 22:45:14'),(52,1,'Test3','','Test3',NULL,'2025-06-24 22:47:53','2025-06-24 22:47:53'),(53,1,'Prueba ','','Prueba ',NULL,'2025-06-24 22:57:02','2025-06-24 22:57:02'),(54,1,'Test4','','Test4',NULL,'2025-06-24 23:18:35','2025-06-24 23:18:35'),(55,1,'Test t','','Test t',NULL,'2025-06-25 00:27:10','2025-06-25 00:27:10'),(56,1,'Aaron','','González ',NULL,'2025-06-29 00:47:08','2025-06-29 00:47:08'),(57,1,'Luis','','Mendez',NULL,'2025-07-02 23:20:44','2025-07-02 23:20:44'),(58,1,'Alex','','Arce',NULL,'2025-07-09 16:50:46','2025-07-09 16:50:46'),(59,1,'Test','','Test',NULL,'2025-07-11 16:48:07','2025-07-11 16:48:07'),(60,1,'Juan','','Gallegos ',NULL,'2025-07-19 22:07:28','2025-07-19 22:07:28');
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_address`
--

DROP TABLE IF EXISTS `person_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person_address` (
  `pk_address` int NOT NULL AUTO_INCREMENT,
  `fk_person` int NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_primary` tinyint(1) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `country` int DEFAULT NULL,
  `state` int DEFAULT NULL,
  `city` int DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_address`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_address`
--

LOCK TABLES `person_address` WRITE;
/*!40000 ALTER TABLE `person_address` DISABLE KEYS */;
INSERT INTO `person_address` VALUES (1,2,'Urb Antonio Jose',1,1,NULL,NULL,NULL,NULL,NULL,'2025-05-08 20:44:52','2025-05-08 20:44:52'),(2,2,'Av el islote',0,1,NULL,NULL,NULL,NULL,NULL,'2025-05-08 20:45:17','2025-05-08 20:45:17'),(4,0,'string',0,1,NULL,NULL,NULL,NULL,NULL,'2025-05-17 00:03:10','2025-05-17 00:03:10'),(5,36,'Los cocos',0,1,NULL,NULL,NULL,NULL,NULL,'2025-05-17 00:10:33','2025-07-10 16:40:49'),(6,37,'Av las flores',1,1,NULL,NULL,NULL,NULL,NULL,'2025-05-29 02:00:39','2025-05-29 02:00:39'),(7,38,'Av las flores',0,1,NULL,NULL,NULL,NULL,NULL,'2025-05-29 02:01:22','2025-07-09 16:42:52'),(8,39,'CRGM+6W3, Cumaná, Sucre, Venezuela',1,1,NULL,NULL,NULL,NULL,NULL,'2025-06-08 15:32:35','2025-06-08 15:32:35'),(9,40,'Westfield 123',1,1,NULL,NULL,NULL,NULL,NULL,'2025-06-09 19:42:01','2025-06-09 19:42:01'),(10,41,'Houston 123',1,1,NULL,NULL,NULL,NULL,NULL,'2025-06-09 19:44:20','2025-06-09 19:44:20'),(11,42,'Stafford',1,1,NULL,NULL,NULL,NULL,NULL,'2025-06-11 21:05:34','2025-06-11 21:05:34'),(12,20,'Test',1,1,11.00000000,-67.00000000,1,2,2,'2025-06-21 00:58:25','2025-06-21 00:58:25'),(13,46,'Test Address ',1,1,0.00000000,0.00000000,1,1,1,'2025-06-24 22:34:31','2025-06-24 22:34:31'),(14,47,'Test Address ',1,1,0.00000000,0.00000000,1,1,1,'2025-06-24 22:36:06','2025-06-24 22:36:06'),(15,48,'Test 2',1,1,0.00000000,0.00000000,1,1,1,'2025-06-24 22:39:38','2025-06-24 22:39:38'),(16,51,'CRGM+6W3, Cumaná, Sucre, Venezuela',1,1,10.00000000,-64.00000000,0,0,0,'2025-06-24 22:45:15','2025-06-24 22:45:15'),(17,52,'75201, Dallas, Texas, United States',1,1,0.00000000,0.00000000,1,1,3,'2025-06-24 22:47:55','2025-06-24 22:47:55'),(18,53,'75201, Dallas, Texas, United States',0,1,33.00000000,-97.00000000,1,1,1,'2025-06-24 22:57:03','2025-07-10 17:12:53'),(19,54,'75201, Dallas, Texas, United States',1,1,0.00000000,0.00000000,1,1,1,'2025-06-24 23:18:36','2025-06-24 23:18:36'),(20,55,'75201, Dallas, Texas, United States',1,1,32.77666473,-96.79698944,1,1,1,'2025-06-25 00:27:11','2025-06-25 00:27:11'),(21,56,'CRGM+6W3, Cumaná, Sucre, Venezuela',0,1,10.42427380,-64.16491960,0,0,0,'2025-06-29 00:47:09','2025-07-08 16:36:42'),(22,57,'Clarkgate Dr, 4214 Clarkgate Dr, Spring, TX, United States',1,1,30.04556156,-95.36977554,1,0,0,'2025-07-02 23:20:44','2025-07-02 23:20:44'),(23,56,'CRGM+6W3, Cumaná, Sucre, Venezuela',0,1,NULL,NULL,NULL,NULL,NULL,'2025-07-08 16:36:42','2025-07-09 17:05:37'),(24,38,'Av las flores test',1,1,NULL,NULL,NULL,NULL,NULL,'2025-07-09 16:42:52','2025-07-09 16:42:52'),(25,58,'Calle Alto de la Alianza, 1470, Cochabamba, Departamento de Cochabamba, Bolivia',1,1,-17.39451020,-66.17181180,1,1,3,'2025-07-09 16:50:46','2025-07-09 16:50:46'),(26,56,'CRGM+6W3, Cumaná, Sucre, Venezuela',1,1,NULL,NULL,NULL,NULL,NULL,'2025-07-09 17:05:37','2025-07-09 17:05:37'),(27,36,'Los cocos',1,1,NULL,NULL,NULL,NULL,NULL,'2025-07-10 16:40:49','2025-07-10 16:40:49'),(28,53,'75201, Dallas, Texas, United Statesc',1,1,NULL,NULL,NULL,NULL,NULL,'2025-07-10 17:12:53','2025-07-10 17:12:53'),(29,59,'79088, Vigo Park, Texas, United States',1,1,34.52311707,-101.80310059,1,1,3,'2025-07-11 16:48:08','2025-07-11 16:48:08'),(30,60,'Highway 6 S, 7700 Highway 6 S, Houston, TX, United States',1,1,29.69502167,-95.64392500,1,0,0,'2025-07-19 22:07:29','2025-07-19 22:07:29');
/*!40000 ALTER TABLE `person_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_answers`
--

DROP TABLE IF EXISTS `person_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person_answers` (
  `pk_answer` int NOT NULL AUTO_INCREMENT,
  `fk_person` int NOT NULL,
  `fk_question` int NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_answer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_answers`
--

LOCK TABLES `person_answers` WRITE;
/*!40000 ALTER TABLE `person_answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `person_answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_emails`
--

DROP TABLE IF EXISTS `person_emails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person_emails` (
  `pk_email` int NOT NULL AUTO_INCREMENT,
  `fk_person` int NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_primary` tinyint(1) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_email`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_emails`
--

LOCK TABLES `person_emails` WRITE;
/*!40000 ALTER TABLE `person_emails` DISABLE KEYS */;
INSERT INTO `person_emails` VALUES (1,2,'jjcreacion@gmail.com',1,1,'2025-05-08 17:34:52','2025-05-08 17:34:52'),(2,2,'string2@gmail.com',0,0,'2025-05-08 17:36:10','2025-05-08 17:38:20'),(4,36,'genesis@gmail.com',1,1,'2025-05-17 00:10:31','2025-05-17 00:10:31'),(5,37,'Johann@gmail.com',1,1,'2025-05-29 02:00:37','2025-05-29 02:00:37'),(6,38,'Johann@gmail.com',1,1,'2025-05-29 02:01:21','2025-05-29 02:01:21'),(7,39,'Tttt@gmail.com',1,1,'2025-06-08 15:32:34','2025-06-08 15:32:34'),(8,40,'rudy.rs1@gmail.com',1,1,'2025-06-09 19:42:01','2025-06-09 19:42:01'),(9,41,'rudy.rs1@gmail.com',1,1,'2025-06-09 19:44:20','2025-06-09 19:44:20'),(10,42,'rudy.hxc@gmail.com',1,1,'2025-06-11 21:05:34','2025-06-11 21:05:34'),(11,43,'alinegonzalez@gmail.com',1,1,'2025-06-21 01:27:02','2025-06-21 01:27:02'),(12,44,'Yeueuei@gmail.com',1,1,'2025-06-24 22:29:07','2025-06-24 22:29:07'),(13,45,'Yehshsh@gmail.com',1,1,'2025-06-24 22:33:32','2025-06-24 22:33:32'),(14,46,'Yehshsh@gmail.com',1,1,'2025-06-24 22:34:31','2025-06-24 22:34:31'),(15,47,'Yehshsh@gmail.com',1,1,'2025-06-24 22:36:06','2025-06-24 22:36:06'),(16,48,'ttttttt@gmail.com',1,1,'2025-06-24 22:39:38','2025-06-24 22:39:38'),(17,49,'Tuytti@gmail.com',1,1,'2025-06-24 22:41:34','2025-06-24 22:41:34'),(18,50,'Tuytti@gmail.com',1,1,'2025-06-24 22:44:42','2025-06-24 22:44:42'),(19,51,'Tuytti@gmail.com',1,1,'2025-06-24 22:45:15','2025-06-24 22:45:15'),(20,52,'Tjngjvjj@gmail.com',1,1,'2025-06-24 22:47:54','2025-06-24 22:47:54'),(21,53,'Trrttt@gmail.com',1,1,'2025-06-24 22:57:03','2025-06-24 22:57:03'),(22,54,'Jreb@gmail.com',1,1,'2025-06-24 23:18:36','2025-06-24 23:18:36'),(23,55,'Twbshhh@gmail.com',1,1,'2025-06-25 00:27:10','2025-06-25 00:27:10'),(24,56,'Aarongonzalez@gmail.com',1,1,'2025-06-29 00:47:09','2025-06-29 00:47:09'),(25,57,'Vc9m1df349@wyoxafp.com',1,1,'2025-07-02 23:20:44','2025-07-02 23:20:44'),(26,58,'rudy_rs1@msn.com',1,1,'2025-07-09 16:50:46','2025-07-09 16:50:46'),(27,59,'Jynhy@gmail.com',1,1,'2025-07-11 16:48:08','2025-07-11 16:48:08'),(28,60,'Juangallegos73@gmail.com',1,1,'2025-07-19 22:07:28','2025-07-19 22:07:28');
/*!40000 ALTER TABLE `person_emails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_insurance`
--

DROP TABLE IF EXISTS `person_insurance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person_insurance` (
  `insurance_id` int NOT NULL AUTO_INCREMENT,
  `fk_person` int NOT NULL,
  `insurance_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fk_insurance` int DEFAULT NULL,
  `policy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `policy_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date_loss` date DEFAULT NULL,
  `deductible` double DEFAULT NULL,
  `claim` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mortgage_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mortgage_loan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `full_adj_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `full_adj_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `inspection_date` date DEFAULT NULL,
  `desk_adj_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `desk_adj_phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `desk_adj_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`insurance_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_insurance`
--

LOCK TABLES `person_insurance` WRITE;
/*!40000 ALTER TABLE `person_insurance` DISABLE KEYS */;
/*!40000 ALTER TABLE `person_insurance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_insurance_claims`
--

DROP TABLE IF EXISTS `person_insurance_claims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person_insurance_claims` (
  `claim_id` int NOT NULL AUTO_INCREMENT,
  `fk_project` int DEFAULT NULL,
  `claim_status` enum('Pending','In Progress','Completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'Pending',
  `estimated_cost` decimal(10,2) DEFAULT NULL,
  `out_of_pocket` decimal(10,2) DEFAULT NULL,
  `financing_option` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`claim_id`) USING BTREE,
  KEY `fk_project` (`fk_project`) USING BTREE,
  CONSTRAINT `person_insurance_claims_ibfk_1` FOREIGN KEY (`fk_project`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_insurance_claims`
--

LOCK TABLES `person_insurance_claims` WRITE;
/*!40000 ALTER TABLE `person_insurance_claims` DISABLE KEYS */;
/*!40000 ALTER TABLE `person_insurance_claims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_notes`
--

DROP TABLE IF EXISTS `person_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person_notes` (
  `pk_note` int NOT NULL AUTO_INCREMENT,
  `fk_contact` int DEFAULT NULL,
  `fk_user` int DEFAULT '103' COMMENT '103 es un ID para un usuario autenticado (simulacion de autenticacion)',
  `note` varchar(1024) DEFAULT NULL,
  `is_priority` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_note`),
  KEY `person_notes_contact_FK` (`fk_contact`),
  KEY `person_notes_users_FK` (`fk_user`),
  CONSTRAINT `person_notes_contact_FK` FOREIGN KEY (`fk_contact`) REFERENCES `contact` (`pk_contact`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `person_notes_users_FK` FOREIGN KEY (`fk_user`) REFERENCES `users` (`pk_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_notes`
--

LOCK TABLES `person_notes` WRITE;
/*!40000 ALTER TABLE `person_notes` DISABLE KEYS */;
INSERT INTO `person_notes` VALUES (1,12,103,'Esta es una primera nota (sin prioridad)',0,'2025-06-28 00:37:13',NULL),(2,12,103,'Esta es una segunda nota (con prioridad)',1,'2025-06-28 00:37:50',NULL),(3,12,103,'this is a third note widthout priority',0,'2025-06-28 00:38:47',NULL),(4,12,103,'this is a fourth note with priority',1,'2025-06-28 00:40:19',NULL),(5,17,103,'Test',0,'2025-07-10 00:35:14',NULL);
/*!40000 ALTER TABLE `person_notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_phones`
--

DROP TABLE IF EXISTS `person_phones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person_phones` (
  `pk_phone` int NOT NULL AUTO_INCREMENT,
  `fk_person` int NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_primary` tinyint(1) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_phone`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_phones`
--

LOCK TABLES `person_phones` WRITE;
/*!40000 ALTER TABLE `person_phones` DISABLE KEYS */;
INSERT INTO `person_phones` VALUES (1,2,'0424-0884292',1,1,'2025-05-08 19:58:04','2025-05-08 19:58:04'),(2,2,'0416-00489502',0,1,'2025-05-08 19:58:59','2025-05-08 19:58:59'),(4,56,'04163456767',0,1,'2025-07-08 16:36:42','2025-07-09 17:05:37'),(5,38,'Test',1,1,'2025-07-09 16:42:52','2025-07-09 16:42:52'),(6,56,'04163456767',1,1,'2025-07-09 17:05:37','2025-07-09 17:05:37'),(7,36,'04121566778',1,1,'2025-07-10 16:40:49','2025-07-10 16:40:49'),(8,53,'01463677',1,1,'2025-07-10 17:12:53','2025-07-10 17:12:53');
/*!40000 ALTER TABLE `person_phones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `pk_profile` int NOT NULL AUTO_INCREMENT,
  `fk_user` int DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `alias` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone_extension` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `code_zip` int DEFAULT NULL,
  `industry` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `source` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `url_profile_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `url_banner_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_profile`) USING BTREE,
  UNIQUE KEY `REL_f77dd7e0edbc85b598e728e4d5` (`fk_user`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (1,2,'Client',NULL,'Client ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2025-04-03 12:01:12','2025-04-03 12:01:17');
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `project_id` int NOT NULL AUTO_INCREMENT,
  `fk_prospect` int DEFAULT NULL,
  `project_status` enum('Open','Closed Won','Closed Lost') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'Open',
  `contract_signed` tinyint(1) DEFAULT '0',
  `assigned_engineer` int DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_id`) USING BTREE,
  KEY `fk_prospect` (`fk_prospect`) USING BTREE,
  KEY `assigned_engineer` (`assigned_engineer`) USING BTREE,
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`fk_prospect`) REFERENCES `prospects` (`prospect_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`assigned_engineer`) REFERENCES `users` (`pk_user`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prospects`
--

DROP TABLE IF EXISTS `prospects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prospects` (
  `prospect_id` int NOT NULL AUTO_INCREMENT,
  `fk_lead` int DEFAULT NULL,
  `tax_service_interest` tinyint(1) DEFAULT NULL,
  `inspection_status` enum('Pending','Scheduled','Completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'Pending',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`prospect_id`) USING BTREE,
  KEY `fk_lead` (`fk_lead`) USING BTREE,
  CONSTRAINT `prospects_ibfk_1` FOREIGN KEY (`fk_lead`) REFERENCES `leads` (`lead_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prospects`
--

LOCK TABLES `prospects` WRITE;
/*!40000 ALTER TABLE `prospects` DISABLE KEYS */;
/*!40000 ALTER TABLE `prospects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotes`
--

DROP TABLE IF EXISTS `quotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotes` (
  `quote_id` int NOT NULL AUTO_INCREMENT,
  `fk_project` int DEFAULT NULL,
  `fk_user_quote` int DEFAULT NULL,
  `quote_amount` double(10,2) DEFAULT NULL,
  `quote_status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'Pending',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`quote_id`) USING BTREE,
  KEY `fk_project` (`fk_project`) USING BTREE,
  CONSTRAINT `quotes_ibfk_1` FOREIGN KEY (`fk_project`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotes`
--

LOCK TABLES `quotes` WRITE;
/*!40000 ALTER TABLE `quotes` DISABLE KEYS */;
/*!40000 ALTER TABLE `quotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_assigments`
--

DROP TABLE IF EXISTS `request_assigments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request_assigments` (
  `assigment_id` int NOT NULL AUTO_INCREMENT,
  `fk_request` int NOT NULL,
  `fk_profile` int NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`assigment_id`),
  KEY `Index_withRequest` (`fk_request`) USING BTREE,
  KEY `Index_withProfile` (`fk_profile`) USING BTREE,
  CONSTRAINT `fk_assigWithProfile` FOREIGN KEY (`fk_profile`) REFERENCES `profile` (`pk_profile`),
  CONSTRAINT `fk_assigWithRequest` FOREIGN KEY (`fk_request`) REFERENCES `requests` (`request_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_assigments`
--

LOCK TABLES `request_assigments` WRITE;
/*!40000 ALTER TABLE `request_assigments` DISABLE KEYS */;
/*!40000 ALTER TABLE `request_assigments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_images`
--

DROP TABLE IF EXISTS `request_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request_images` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `fk_request` int NOT NULL,
  `url_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`image_id`),
  KEY `request_images_mobile_service_requests_FK` (`fk_request`),
  CONSTRAINT `request_images_mobile_service_requests_FK` FOREIGN KEY (`fk_request`) REFERENCES `mobile_service_requests` (`request_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_images`
--

LOCK TABLES `request_images` WRITE;
/*!40000 ALTER TABLE `request_images` DISABLE KEYS */;
INSERT INTO `request_images` VALUES (7,20,'/images/service-request/images-1750986484455-520566905.jpg',1,'2025-06-27 01:08:04','2025-06-27 01:08:04'),(8,20,'/images/service-request/images-1750986484457-484762390.png',1,'2025-06-27 01:08:05','2025-06-27 01:08:05'),(9,20,'/images/service-request/images-1751043142281-797809301.png',1,'2025-06-27 16:52:22','2025-06-27 16:52:22'),(10,20,'/images/service-request/images-1751043142286-971224691.png',1,'2025-06-27 16:52:22','2025-06-27 16:52:22'),(11,16,'/images/service-request/images-1751051473728-765423179.png',1,'2025-06-27 19:11:13','2025-06-27 19:11:13'),(12,30,'/images/service-request/images-1751156411526-167051708.jpeg',1,'2025-06-29 00:20:12','2025-06-29 00:20:12'),(13,31,'/images/service-request/images-1751156470580-360129630.jpeg',1,'2025-06-29 00:21:10','2025-06-29 00:21:10'),(14,34,'/images/service-request/images-1751158134190-731489253.jpeg',1,'2025-06-29 00:48:54','2025-06-29 00:48:54'),(15,34,'/images/service-request/images-1751158134191-367969396.jpeg',1,'2025-06-29 00:48:54','2025-06-29 00:48:54'),(16,35,'/images/service-request/images-1751503131555-49062734.jpg',1,'2025-07-03 00:38:51','2025-07-03 00:38:51');
/*!40000 ALTER TABLE `request_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_location`
--

DROP TABLE IF EXISTS `request_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request_location` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `fk_request` int DEFAULT NULL,
  `url_google_map` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `latitude` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`location_id`),
  KEY `FK_4fc9ca492d7ccaf5ab83c27bece` (`fk_request`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_location`
--

LOCK TABLES `request_location` WRITE;
/*!40000 ALTER TABLE `request_location` DISABLE KEYS */;
INSERT INTO `request_location` VALUES (1,1,'www.google.com','-1',1,NULL,'2025-04-03 12:00:53','2025-04-03 12:00:54');
/*!40000 ALTER TABLE `request_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_priority`
--

DROP TABLE IF EXISTS `request_priority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request_priority` (
  `priority_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fk_request` int DEFAULT NULL,
  PRIMARY KEY (`priority_id`),
  UNIQUE KEY `REL_5e9f365017a2e7a84f27cd26f3` (`fk_request`),
  CONSTRAINT `FK_5e9f365017a2e7a84f27cd26f31` FOREIGN KEY (`fk_request`) REFERENCES `requests` (`request_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_priority`
--

LOCK TABLES `request_priority` WRITE;
/*!40000 ALTER TABLE `request_priority` DISABLE KEYS */;
INSERT INTO `request_priority` VALUES (1,'Normal','Normal',1,'2025-04-03 12:05:15','2025-04-03 12:05:18',NULL);
/*!40000 ALTER TABLE `request_priority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `fk_person` int DEFAULT NULL,
  `fk_priority` int DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Pending',
  `date_request` timestamp NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`request_id`),
  KEY `FK_7e7179fd7cb6928cd3ef88991ee` (`fk_person`),
  KEY `REL_dd28cd694f725a3587f80bddca` (`fk_priority`) USING BTREE,
  CONSTRAINT `FK_7e7179fd7cb6928cd3ef88991ee` FOREIGN KEY (`fk_person`) REFERENCES `person` (`pk_person`),
  CONSTRAINT `FK_dd28cd694f725a3587f80bddca6` FOREIGN KEY (`fk_priority`) REFERENCES `request_priority` (`priority_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` VALUES (1,1,1,'1','0000-00-00 00:00:00','Hola Mundo asd asd asd asd asd sad asd ','2025-04-03 12:05:25','2025-04-20 17:04:53'),(2,1,1,'1','2025-04-15 19:21:56','Mundo','2025-04-14 19:22:42','2025-04-14 19:22:42');
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `fk_project` int DEFAULT NULL,
  `fk_user_comment` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`) USING BTREE,
  KEY `fk_project` (`fk_project`) USING BTREE,
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`fk_project`) REFERENCES `projects` (`project_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `reviews_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `internal_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `pk_service` int NOT NULL AUTO_INCREMENT,
  `fk_sub_category` int DEFAULT NULL,
  `fk_service_type` int DEFAULT NULL,
  `fk_client_type` int DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_service`) USING BTREE,
  KEY `REL_9ffcb14ff05fad3bee45e2fb13` (`fk_sub_category`) USING BTREE,
  KEY `fk_services_service_type` (`fk_service_type`),
  KEY `fk_services_client_type` (`fk_client_type`),
  CONSTRAINT `fk_services_client_type` FOREIGN KEY (`fk_client_type`) REFERENCES `client_type` (`pk_client_type`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_services_service_type` FOREIGN KEY (`fk_service_type`) REFERENCES `services_type` (`pk_services_type`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_subcatec` FOREIGN KEY (`fk_sub_category`) REFERENCES `sub_category` (`pk_sub_category`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (6,6,1,1,1,'Roofx','Roofx','2025-04-22 22:07:07','2025-04-27 20:44:23'),(7,9,1,1,1,'test 1','test 1','2025-04-27 02:19:23','2025-04-27 20:49:10'),(8,6,1,1,1,'test 2','testxx','2025-04-27 02:22:02','2025-04-27 20:49:29'),(10,9,1,1,1,'test final editvvv','test final editxxxvvv','2025-04-27 20:48:44','2025-04-27 20:52:08');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services_addons`
--

DROP TABLE IF EXISTS `services_addons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services_addons` (
  `pk_service_addon` int NOT NULL AUTO_INCREMENT,
  `fk_service` int DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_retail` int DEFAULT NULL,
  `content_web` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` double DEFAULT NULL,
  `status` int DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_service_addon`),
  KEY `fk_addons_service` (`fk_service`),
  CONSTRAINT `fk_addons_service` FOREIGN KEY (`fk_service`) REFERENCES `services` (`pk_service`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services_addons`
--

LOCK TABLES `services_addons` WRITE;
/*!40000 ALTER TABLE `services_addons` DISABLE KEYS */;
INSERT INTO `services_addons` VALUES (1,5,'test','test',1,'test',1,1,'2025-04-20 12:08:04','2025-04-23 01:06:38'),(5,6,'Techos y ventanas','test descripjjjjj',1,'contet',10,1,'2025-04-29 00:04:20','2025-04-29 14:19:02'),(7,6,'Paredes','Paredes des',0,'paredes content web',10,1,'2025-04-29 00:13:32','2025-04-29 14:31:11'),(8,6,'test add on 2cccccc','test',0,'test',34,1,'2025-04-29 00:25:42','2025-04-29 14:42:05'),(9,6,'test add on 4','ssss',1,'ssss',444,1,'2025-04-29 00:26:14','2025-04-29 00:26:14'),(11,7,'Ventanas 45grados','hhh',1,'jjjj',30,1,'2025-04-29 00:38:26','2025-04-29 14:34:51'),(12,6,'Test add on44444','fffff',0,'',0,1,'2025-04-29 02:48:02','2025-04-29 02:52:17'),(13,6,'ttttttdddddd','desdddd',0,'ddddddd',0,1,'2025-04-29 02:52:01','2025-04-29 02:55:39'),(14,7,'new add on','',0,'',0,1,'2025-04-29 14:42:36','2025-04-29 14:42:36'),(15,7,'new2 edit','',0,'',0,1,'2025-04-29 14:44:31','2025-04-29 14:44:47'),(16,8,'Nuevo','',0,'',0,1,'2025-04-29 14:51:03','2025-04-29 14:51:03'),(17,8,'Nuevo Edit 2','edit des',1,'edit 2',30,1,'2025-04-29 14:51:06','2025-04-29 14:56:20');
/*!40000 ALTER TABLE `services_addons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services_type`
--

DROP TABLE IF EXISTS `services_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services_type` (
  `pk_services_type` int NOT NULL AUTO_INCREMENT,
  `status` int DEFAULT '1',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_services_type`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services_type`
--

LOCK TABLES `services_type` WRITE;
/*!40000 ALTER TABLE `services_type` DISABLE KEYS */;
INSERT INTO `services_type` VALUES (1,1,'Tipo1','Tipo 1','2025-04-20 11:58:49','2025-04-20 11:58:49');
/*!40000 ALTER TABLE `services_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state_counties`
--

DROP TABLE IF EXISTS `state_counties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `state_counties` (
  `countie_id` int NOT NULL AUTO_INCREMENT,
  `fk_state` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`countie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state_counties`
--

LOCK TABLES `state_counties` WRITE;
/*!40000 ALTER TABLE `state_counties` DISABLE KEYS */;
/*!40000 ALTER TABLE `state_counties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_info`
--

DROP TABLE IF EXISTS `status_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_info` (
  `pk_status` int NOT NULL AUTO_INCREMENT,
  `is_enabled` tinyint(1) NOT NULL DEFAULT '1',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_info`
--

LOCK TABLES `status_info` WRITE;
/*!40000 ALTER TABLE `status_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `status_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_category`
--

DROP TABLE IF EXISTS `sub_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_category` (
  `pk_sub_category` int NOT NULL AUTO_INCREMENT,
  `fk_category` int DEFAULT NULL,
  `status` int DEFAULT '1',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_sub_category`) USING BTREE,
  KEY `sub_category_category_FK` (`fk_category`),
  CONSTRAINT `sub_category_category_FK` FOREIGN KEY (`fk_category`) REFERENCES `category` (`pk_category`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_category`
--

LOCK TABLES `sub_category` WRITE;
/*!40000 ALTER TABLE `sub_category` DISABLE KEYS */;
INSERT INTO `sub_category` VALUES (5,25,0,'stringww','stringww','2025-04-20 17:58:01','2025-04-27 01:13:00'),(6,25,0,'Test update name','Test update Descrip','2025-04-20 18:02:34','2025-04-21 13:44:29'),(9,18,1,'Sub Category','test','2025-04-22 23:26:46','2025-04-22 23:26:46'),(10,18,1,'Sub Category Home','test f','2025-04-22 23:28:55','2025-04-22 23:29:30'),(11,25,1,'Test newwwwww','Test neweeee','2025-04-27 01:21:01','2025-04-27 01:21:30');
/*!40000 ALTER TABLE `sub_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_service_localities`
--

DROP TABLE IF EXISTS `user_service_localities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_service_localities` (
  `relation_id` int NOT NULL AUTO_INCREMENT,
  `fk_user_service` int NOT NULL,
  `fk_locality` int NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`relation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_service_localities`
--

LOCK TABLES `user_service_localities` WRITE;
/*!40000 ALTER TABLE `user_service_localities` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_service_localities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_services`
--

DROP TABLE IF EXISTS `user_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_services` (
  `relation_id` int NOT NULL AUTO_INCREMENT,
  `fk_user` int NOT NULL,
  `fk_service` int NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`relation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_services`
--

LOCK TABLES `user_services` WRITE;
/*!40000 ALTER TABLE `user_services` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `pk_user` int NOT NULL AUTO_INCREMENT,
  `fk_person` int DEFAULT NULL,
  `fk_profile` int DEFAULT '1',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `validate_email` int NOT NULL DEFAULT '0',
  `validate_phone` int NOT NULL DEFAULT '0',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `img_profile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_user`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,2,1,'a1',1,0,0,'alexismorales86@gmail.com','a1','','images/profiles/file-1751502289789-660907294.jpg','2025-01-31 22:03:30','2025-01-31 22:03:30'),(3,13,1,'a2',0,0,0,'','','',NULL,'2025-01-31 22:35:43','2025-01-31 22:35:44'),(5,15,1,'a3',1,1,0,'','','',NULL,'2025-02-04 22:19:04','2025-02-04 22:19:04'),(6,16,1,'a4',1,0,0,'jesusconde@gmail.com','','',NULL,'2025-02-04 23:11:32','2025-02-04 23:11:33'),(21,NULL,1,NULL,1,0,0,'jjcreacion@gmail.com','$2b$10$nr4PPfaCGu3QMUWTYgAr.OFsA80YkdZzeD/kma6NvCrLnjonDj8UW',NULL,NULL,'2025-05-09 02:24:55','2025-05-09 02:24:55'),(24,2,1,NULL,1,0,0,'string@gmail.com','12345678',NULL,NULL,'2025-05-09 02:56:48','2025-05-09 02:56:48'),(25,2,1,NULL,1,0,0,'string3@gmail.com','12345678',NULL,NULL,'2025-05-09 03:37:24','2025-05-09 03:37:24'),(26,2,1,NULL,1,0,0,'string5@gmail.com','$2b$10$ZYWcnHd2GobydzodjwEZkulTyw2UmFdPrSo3ZAsKezfYhzzy1huaS',NULL,NULL,'2025-05-09 03:43:57','2025-05-09 03:43:57'),(27,33,1,NULL,1,0,0,'jimrequena@bolivianotech.com','$2b$10$CGOc1O40zfpp1hPtOuEvFOJsRLJO0szFvQmaT5eycgO.kV621SBJS',NULL,NULL,'2025-05-10 21:21:27','2025-05-10 21:21:27'),(28,2,1,NULL,1,0,0,'saraoca@gmail.com','$2b$10$EX9fp3heeJEtVHDdLCH6/.HRikhZDhjV/mOPlUoRsqJqVS1WR5fYK',NULL,NULL,'2025-05-13 02:00:55','2025-05-13 02:00:55'),(29,35,1,NULL,1,0,0,'Yoleida@gmail.com','$2b$10$nUFB7.zC3kGFPTIzxVrDz.iFaKbXQX8MsuJirGbkpexCIS8TVeF76',NULL,NULL,'2025-05-16 23:40:25','2025-05-16 23:40:25'),(30,36,1,NULL,1,0,0,'genesis@gmail.com','$2b$10$QQzaxtveUhElIJvenDl.v.e3bkHE3i9RrYdRFhPoD6TESdGXSDwy6',NULL,'images/profiles/file-1752165622941-698966852.jpg','2025-05-17 00:10:34','2025-05-17 00:10:34'),(31,38,1,NULL,1,0,0,'Johann@gmail.com','$2b$10$ulG/6dgummFDbdZhJEVodeQc7v0H1fZ61uGvC6p8SuUqyvNGdVnjK',NULL,'images/profiles/file-1751995420257-961850057.jpg','2025-05-29 02:01:27','2025-05-29 02:01:27'),(100,34,1,NULL,1,0,0,'aaron@gmail.com','$2b$10$ufAO8P4iphT/UlR/G5mf9.l4cmg.AbUODOdhYmL2ViZCT8qMzwgVq',NULL,NULL,'2025-05-29 23:39:35','2025-05-29 23:39:35'),(101,39,1,NULL,1,0,0,'Tttt@gmail.com','$2b$10$QYQqztypnlwNbeVDPKwA/OGxN3ylxtVAiDKCwetfdZ8KdRibdTR6y',NULL,NULL,'2025-06-08 15:32:35','2025-06-08 15:32:35'),(102,41,1,NULL,1,0,0,'rudy.rs1@gmail.com','$2b$10$i7PQA5zJyIrZa/TgJ0BKI.PsObAUHvENV/BQRHEEIHdJwz8P/rumS','65123456',NULL,'2025-06-09 19:44:20','2025-06-09 19:44:20'),(103,42,1,NULL,1,0,0,'rudy.hxc@gmail.com','$2b$10$yqS/0Ttz3biICqDH8rfGfOK26pXEClZHpojUjueapt6AdCssuEE..','797123456',NULL,'2025-06-11 21:05:35','2025-06-11 21:05:35'),(104,47,1,NULL,1,0,0,'Yehshsh@gmail.com','$2b$10$uGUHwMtsnIXbDv8gbnO2D.0J0N4FZuv97vM.HJPxOw/MH28yq7tEa',NULL,NULL,'2025-06-24 22:36:06','2025-06-24 22:36:06'),(105,48,1,NULL,1,0,0,'ttttttt@gmail.com','$2b$10$L9TfSj7rpUXpaa.Qd7vtFOmtN/wj2X3xBBDPayaU19nvGIAQspqeS',NULL,NULL,'2025-06-24 22:39:38','2025-06-24 22:39:38'),(106,51,1,NULL,1,0,0,'Tuytti@gmail.com','$2b$10$7vbj6ostLck677KatFfsGO/N/NFl6DKoMr01Eq02QEiqjW5oYEgwy',NULL,NULL,'2025-06-24 22:45:15','2025-06-24 22:45:15'),(107,52,1,NULL,1,0,0,'Tjngjvjj@gmail.com','$2b$10$0FJyuSvX59rlbyet54TMNuik8pebeCmf3Jkk2nBDiUp88CnvVbiw.',NULL,NULL,'2025-06-24 22:47:56','2025-06-24 22:47:56'),(108,53,1,NULL,1,0,0,'Trrttt@gmail.com','$2b$10$7Os.qSuj2FaGSN26BhQNiOGXQ1ks6yT0T7A7AK5FFWdYlcWrZXbOq',NULL,'images/profiles/file-1752167546638-403069242.jpg','2025-06-24 22:57:03','2025-06-24 22:57:03'),(110,55,1,NULL,1,0,0,'Twbshhh@gmail.com','$2b$10$q/5/9BzP0M2coz8Tm2fO6.fLdc8Jtu.3NbLAh2TQ9gn2klv2q9bO6',NULL,NULL,'2025-06-25 00:27:11','2025-06-25 00:27:11'),(111,56,1,NULL,1,0,0,'Aarongonzalez@gmail.com','$2b$10$pBos4Lj7Qlu0uA2gHwMA2eXEPayl296bYanqcqH2zgigOGYdtZiMW',NULL,'images/profiles/file-1752080733236-627119015.jpg','2025-06-29 00:47:09','2025-06-29 00:47:09'),(112,57,1,NULL,1,0,0,'Vc9m1df349@wyoxafp.com','$2b$10$sPbizVtVQe67WKIiFhVbIO9XNucdGhhU20zeFNb0MAaozFNg3o4qq',NULL,NULL,'2025-07-02 23:20:44','2025-07-02 23:20:44'),(113,58,1,NULL,1,0,0,'rudy_rs1@msn.com','$2b$10$Bk/DgAngVvQqLxhrSmB6KORXWp.zc5TWP7fRDOjP7cTlQpwBHJjVW',NULL,NULL,'2025-07-09 16:50:47','2025-07-09 16:50:47'),(114,59,1,NULL,1,0,0,'Jynhy@gmail.com','$2b$10$8jXlo5ATdUpV0w650tYuLuQRo8QFtZHrKRv1FCdqO0xW7Tdct/qVS',NULL,NULL,'2025-07-11 16:48:08','2025-07-11 16:48:08'),(115,60,1,NULL,1,0,0,'Juangallegos73@gmail.com','$2b$10$PIoVrspbA/cf7xvg3MqP6eBCzzAn4h45L0T4xkZjy.2./LmM1DA9.',NULL,NULL,'2025-07-19 22:07:29','2025-07-19 22:07:29');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'tnb-db-develop'
--

--
-- Dumping routines for database 'tnb-db-develop'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-24 14:02:21
