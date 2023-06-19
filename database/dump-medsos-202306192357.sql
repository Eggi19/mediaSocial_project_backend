-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: medsos
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,7,'bagus','2023-06-18 15:35:15','2023-06-18 15:35:15');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (2,1,7,'2023-06-18 15:34:35','2023-06-18 15:34:35'),(3,1,20,'2023-06-18 17:58:56','2023-06-18 17:58:56'),(4,6,20,'2023-06-18 19:13:56','2023-06-18 19:13:56'),(5,5,20,'2023-06-18 19:14:08','2023-06-18 19:14:08'),(8,8,20,'2023-06-18 19:22:24','2023-06-18 19:22:24'),(9,7,20,'2023-06-18 19:22:28','2023-06-18 19:22:28'),(10,9,20,'2023-06-18 19:23:02','2023-06-18 19:23:02'),(13,11,8,'2023-06-19 13:27:04','2023-06-19 13:27:04'),(14,10,8,'2023-06-19 13:27:10','2023-06-19 13:27:10'),(15,9,8,'2023-06-19 13:27:16','2023-06-19 13:27:16'),(16,7,8,'2023-06-19 13:27:19','2023-06-19 13:27:19'),(19,6,22,'2023-06-19 15:46:40','2023-06-19 15:46:40');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,20,'PIMG-16870674671211000000001.png','nonton spongebob','2023-06-18 05:51:07','2023-06-18 05:51:07'),(3,20,'PIMG-16870941149951000000001.jpeg','nonton spongebob','2023-06-18 13:15:15','2023-06-18 13:15:15'),(5,20,'PIMG-16871145314921000000000.jpeg','nonton spongebob','2023-06-18 18:55:31','2023-06-18 18:55:31'),(6,20,'PIMG-16871155753181000000001.jpeg','Web dev class members','2023-06-18 19:12:55','2023-06-18 19:12:55'),(7,20,'PIMG-16871159527481000000000.jpeg','test posting','2023-06-18 19:19:12','2023-06-18 19:19:12'),(8,20,'PIMG-16871159917641000000000.jpeg','test posting 2','2023-06-18 19:19:51','2023-06-18 19:19:51'),(9,20,'PIMG-16871160496231000000000.jpeg','test kucing','2023-06-18 19:20:49','2023-06-18 19:20:49'),(10,20,'PIMG-16871180784771000000000.jpeg','nonton spongebob','2023-06-18 19:54:38','2023-06-18 19:54:38'),(11,8,'PIMG-16871784986171000000001.jpeg','tiga anak anjing','2023-06-19 12:41:38','2023-06-19 13:59:37'),(13,8,'PIMG-16871833034261000000000.jpeg','postingan andi','2023-06-19 14:01:43','2023-06-19 14:01:43');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20230615055255-create-user.js'),('20230615071855-create-post.js'),('20230615071930-create-like.js'),('20230615072004-create-comment.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `isVerified` tinyint(1) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'eggiyapari@gmail.com','eggi','$2b$10$DAeOZwg5MYEYgeqbdXTohu9pLXwo3JeVnL12iXWfw00daCMBSrslm',0,'eggi yapari',NULL,NULL,'2023-06-15 07:27:40','2023-06-15 07:27:40'),(4,'eggiyapari19@gmail.com','Eggi19','$2b$10$wkvwFaaorhR662OysrWZWuL16e910ujocSCnOT5kgvEA2.jCWZZsS',0,'Eggi Yapari',NULL,NULL,'2023-06-15 08:12:47','2023-06-15 08:12:47'),(7,'lala@gmail.com','lala','$2b$10$3cGV7Ux9CP1RaQ/NtEHc6uMGHrdUWLIaJ732hTqAlGAzPVbxDy3uS',0,'Eggi Yapari',NULL,NULL,'2023-06-15 13:34:22','2023-06-15 13:34:22'),(8,'andi@gmail.com','andi','$2b$10$Jm9PGru/A9yDOgmVh5cQ8OE.H9QZbBLgy.IRarVeCQxc7KtPMmSiu',0,'andi jo',NULL,NULL,'2023-06-15 13:36:39','2023-06-15 13:36:39'),(20,'eggiyapari3661@gmail.com','D\'bloz','$2b$10$b3iWuV./LKdd1SrnuDX9HuMGzUn63tPMO2LYSw3thSpgiy4d0xh6S',1,'Eggi Eka Yapari','fullstack web dev','PIMG-16871565026281000000001.jpeg','2023-06-16 04:03:16','2023-06-19 15:51:45'),(22,'senja.anak01@gmail.com','lala123456','$2b$10$Qwj/jHNdVVebWtpfaiCSy.st33naLMd4FjWQtGJ8LaNRqA5EPJjAe',1,'Lala Winata','fullstack web dev','PIMG-16871897502701000000001.jpeg','2023-06-19 15:45:11','2023-06-19 15:49:27');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'medsos'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-19 23:57:11
