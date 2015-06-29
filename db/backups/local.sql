-- MySQL dump 10.13  Distrib 5.6.23, for osx10.10 (x86_64)
--
-- Host: localhost    Database: edify
-- ------------------------------------------------------
-- Server version	5.6.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skills` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `skill_name` varchar(255) DEFAULT NULL,
  `skill_description` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `skills_skill_name_unique` (`skill_name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,'css','css description','2015-06-29 10:09:17','2015-06-29 10:09:17'),(2,'javascript','javascript description','2015-06-29 10:09:17','2015-06-29 10:09:17'),(3,'ruby','ruby description','2015-06-29 10:09:17','2015-06-29 10:09:17'),(4,'python','python description','2015-06-29 10:09:17','2015-06-29 10:09:17'),(5,'databases','database description','2015-06-29 10:09:17','2015-06-29 10:09:17'),(6,'algorithms','algorithm description','2015-06-29 10:09:17','2015-06-29 10:09:17'),(7,'electronics','electronic description','2015-06-29 10:09:17','2015-06-29 10:09:17'),(9,'fabrication','fabrication','2015-06-29 10:09:17','2015-06-29 10:09:17');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `github_id` varchar(255) DEFAULT NULL,
  `blurb` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `zip` varchar(5) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'colin','casparsons@gmail.com','ultralame','I like to do stuff','https://avatars.githubusercontent.com/u/690729?v=3','94601','2015-06-29 10:09:17','2015-06-29 10:09:17'),(2,'jp','theboss@canadatopcondoms.com','baka101','I also like to do stuff','https://avatars.githubusercontent.com/u/7163397?v=3','94115','2015-06-29 10:09:17','2015-06-29 10:09:17'),(3,'sally','asdf@aol.com','sol33t','wait a minute...','https://avatars.githubusercontent.com/u/10736577?v=3',NULL,'2015-06-29 10:09:17','2015-06-29 10:09:17'),(4,'mikemsrk','min2033@gmail.com','10214595','','https://avatars.githubusercontent.com/u/10214595?v=3',NULL,'2015-06-29 10:09:30','2015-06-29 10:09:30');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_learn_skills`
--

DROP TABLE IF EXISTS `users_learn_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_learn_skills` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(255) DEFAULT NULL,
  `skill_id` int(255) DEFAULT NULL,
  `blurb` varchar(255) DEFAULT NULL,
  `skill_level` int(255) DEFAULT NULL,
  `stars` int(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_learn_skills`
--

LOCK TABLES `users_learn_skills` WRITE;
/*!40000 ALTER TABLE `users_learn_skills` DISABLE KEYS */;
INSERT INTO `users_learn_skills` VALUES (1,1,1,'im good',1,3,'2015-06-29 10:09:17','2015-06-29 10:09:17'),(2,1,3,'im ok',5,0,'2015-06-29 10:09:17','2015-06-29 10:09:17'),(3,3,3,NULL,0,NULL,'2015-06-29 10:09:17','2015-06-29 10:09:17'),(4,3,1,NULL,0,NULL,'2015-06-29 10:09:17','2015-06-29 10:09:17'),(5,4,1,NULL,1,NULL,'2015-06-29 10:13:42','2015-06-29 10:13:42'),(6,4,3,NULL,1,NULL,'2015-06-29 10:14:54','2015-06-29 10:14:54'),(7,4,2,NULL,1,NULL,'2015-06-29 10:14:55','2015-06-29 10:14:55');
/*!40000 ALTER TABLE `users_learn_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_like_learners`
--

DROP TABLE IF EXISTS `users_like_learners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_like_learners` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `voter_id` int(255) DEFAULT NULL,
  `learn_skill_id` int(255) DEFAULT NULL,
  `learner_id` int(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_like_learners`
--

LOCK TABLES `users_like_learners` WRITE;
/*!40000 ALTER TABLE `users_like_learners` DISABLE KEYS */;
INSERT INTO `users_like_learners` VALUES (1,3,1,2,'2015-06-29 10:09:17','2015-06-29 10:09:17'),(2,1,1,2,'2015-06-29 10:09:17','2015-06-29 10:09:17'),(3,7,1,2,'2015-06-29 10:09:17','2015-06-29 10:09:17');
/*!40000 ALTER TABLE `users_like_learners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_like_teachers`
--

DROP TABLE IF EXISTS `users_like_teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_like_teachers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `voter_id` int(255) DEFAULT NULL,
  `teach_skill_id` int(255) DEFAULT NULL,
  `teacher_id` int(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_like_teachers`
--

LOCK TABLES `users_like_teachers` WRITE;
/*!40000 ALTER TABLE `users_like_teachers` DISABLE KEYS */;
INSERT INTO `users_like_teachers` VALUES (1,7,1,1,'2015-06-29 10:09:17','2015-06-29 10:09:17'),(2,3,1,2,'2015-06-29 10:09:17','2015-06-29 10:09:17'),(3,2,1,3,'2015-06-29 10:09:17','2015-06-29 10:09:17');
/*!40000 ALTER TABLE `users_like_teachers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_teach_skills`
--

DROP TABLE IF EXISTS `users_teach_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_teach_skills` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(255) DEFAULT NULL,
  `skill_id` int(255) DEFAULT NULL,
  `blurb` varchar(255) DEFAULT NULL,
  `skill_level` int(255) DEFAULT NULL,
  `stars` int(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_teach_skills`
--

LOCK TABLES `users_teach_skills` WRITE;
/*!40000 ALTER TABLE `users_teach_skills` DISABLE KEYS */;
INSERT INTO `users_teach_skills` VALUES (1,2,1,'im very good',7,10,'2015-06-29 10:09:17','2015-06-29 10:09:17'),(2,2,3,'wat',3,1,'2015-06-29 10:09:17','2015-06-29 10:09:17'),(3,4,1,NULL,1,NULL,'2015-06-29 10:13:48','2015-06-29 10:13:48'),(4,4,2,NULL,1,NULL,'2015-06-29 10:13:49','2015-06-29 10:13:49'),(5,4,4,NULL,1,NULL,'2015-06-29 10:14:58','2015-06-29 10:14:58'),(6,4,5,NULL,1,NULL,'2015-06-29 10:14:59','2015-06-29 10:14:59');
/*!40000 ALTER TABLE `users_teach_skills` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-06-29 10:16:14
