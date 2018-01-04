-- MySQL dump 10.13  Distrib 5.6.36, for Linux (x86_64)
--
-- Host: localhost    Database: test_okr_CMoney
-- ------------------------------------------------------
-- Server version	5.7.14-google-log

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
-- Current Database: `test_okr_CMoney`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `test_okr_CMoney` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;

USE `test_okr_CMoney`;

--
-- Table structure for table `act_like`
--

DROP TABLE IF EXISTS `act_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `act_like` (
  `Act_Like_ID` varchar(65) COLLATE utf8_bin NOT NULL COMMENT '讚ＩＤ(Obj_ID+^p^L00000)',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT '按讚者_UUID',
  `Obj_ID` varchar(56) COLLATE utf8_bin NOT NULL COMMENT '所屬目標ID',
  `Emp_Name` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '按讚者_姓名',
  `Img_URL` text COLLATE utf8_bin NOT NULL COMMENT '按讚者_圖片URL',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用',
  PRIMARY KEY (`Act_Like_ID`),
  KEY `Emp_UUID` (`Emp_UUID`),
  KEY `Obj_ID` (`Obj_ID`),
  CONSTRAINT `act_like_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`),
  CONSTRAINT `act_like_ibfk_2` FOREIGN KEY (`Obj_ID`) REFERENCES `objective` (`Obj_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `act_like`
--

LOCK TABLES `act_like` WRITE;
/*!40000 ALTER TABLE `act_like` DISABLE KEYS */;
INSERT INTO `act_like` VALUES ('34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^L0','cb11bdce-f05a-11e7-8c66-42010a8c007d','34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','林庭緯','https://storage.googleapis.com/okrs-sys-emp-img/1514966146604帥庭緯.jpg',0),('34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^L1','efd026ce-f05a-11e7-8c66-42010a8c007d','34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','張辰豪','https://storage.googleapis.com/okrs-sys-emp-img/1515046968105frank.png',0),('54e72894-f04a-11e7-80e0-74d02b1dfe7c^p^C001^p^2018Q1O0^p^L0','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','54e72894-f04a-11e7-80e0-74d02b1dfe7c^p^C001^p^2018Q1O0','吳侑庭','https://storage.googleapis.com/okrs-sys-emp-img/1514963613113tmp1.jpg',0),('abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^L0','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','吳侑庭','https://storage.googleapis.com/okrs-sys-emp-img/1514963613113tmp1.jpg',1),('abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^L1','cb11bdce-f05a-11e7-8c66-42010a8c007d','abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','林庭緯','https://storage.googleapis.com/okrs-sys-emp-img/1514966146604帥庭緯.jpg',0),('abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^L2','34d839bb-f05b-11e7-8c66-42010a8c007d','abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','黃聖方','https://storage.googleapis.com/okrs-sys-emp-img/15149667012831430112.jpg',0),('abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^L3','34f1dfd6-f060-11e7-8c66-42010a8c007d','abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','林品均','https://vignette.wikia.nocookie.net/peanuts/images/d/dc/Woodstock.gif/revision/latest?cb=20090301022138',1),('abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^L4','efd026ce-f05a-11e7-8c66-42010a8c007d','abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','張辰豪','https://storage.googleapis.com/okrs-sys-emp-img/1515046968105frank.png',0),('bf962f65-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^L0','bf962f65-efa2-11e7-9108-74d02b1dfe7c','bf962f65-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','陳建銘','https://storage.googleapis.com/okrs-sys-emp-img/1514962449691S__4349969.gif',0);
/*!40000 ALTER TABLE `act_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity` (
  `Atv_ID` varchar(64) COLLATE utf8_bin NOT NULL COMMENT '歷史ID(Obj_ID+^p^A0000)',
  `Obj_ID` varchar(56) COLLATE utf8_bin NOT NULL COMMENT '所屬目標id',
  `Atv_Time` datetime NOT NULL COMMENT '活動新增時間',
  `Atv_Text` text COLLATE utf8_bin NOT NULL COMMENT '活動內容',
  `Disable` tinyint(4) NOT NULL COMMENT '停用',
  PRIMARY KEY (`Atv_ID`),
  KEY `Obj_ID` (`Obj_ID`),
  CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`Obj_ID`) REFERENCES `objective` (`Obj_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES ('34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^A0','34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','2018-01-03 16:07:51','您新增了「完成程式戰鬥營成果報告書」的目標。',0),('34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^A1','34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','2018-01-03 16:09:10','您新增關鍵成果「完成15位作業批改與成績登錄」。',0),('34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^A2','34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','2018-01-03 16:09:29','您新增關鍵成果「完成1份成績單」。',0),('34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^A3','34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','2018-01-03 16:09:44','您新增關鍵成果「完成1份報告」。',0),('34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^A0','34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','2018-01-03 16:31:10','您新增了「create sql database」的目標。',0),('34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^A1','34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','2018-01-03 16:31:43','您新增關鍵成果「test1」。',0),('34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^A2','34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','2018-01-03 16:31:48','您新增關鍵成果「test2」。',0),('34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^A3','34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','2018-01-03 16:31:53','您新增關鍵成果「test3」。',0),('34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^A4','34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','2018-01-03 16:32:57','您更新關鍵成果「test3」的完成度為100%。',0),('34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^A5','34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','2018-01-03 16:35:27','您修改目標為「create sql database」。',0),('54e72894-f04a-11e7-80e0-74d02b1dfe7c^p^C001^p^2018Q1O0^p^A0','54e72894-f04a-11e7-80e0-74d02b1dfe7c^p^C001^p^2018Q1O0','2018-01-03 14:51:17','您新增了「找到對的人、留住對的人」的目標。',0),('54e72894-f04a-11e7-80e0-74d02b1dfe7c^p^C001^p^2018Q1O0^p^A1','54e72894-f04a-11e7-80e0-74d02b1dfe7c^p^C001^p^2018Q1O0','2018-01-03 14:52:16','您新增關鍵成果「提高季度新人留任率至80％」。',0),('54e72894-f04a-11e7-80e0-74d02b1dfe7c^p^C001^p^2018Q1O0^p^A2','54e72894-f04a-11e7-80e0-74d02b1dfe7c^p^C001^p^2018Q1O0','2018-01-03 14:52:31','您新增關鍵成果「季度留任新人100％通過試用期」。',0),('54e72894-f04a-11e7-80e0-74d02b1dfe7c^p^C001^p^2018Q1O0^p^A3','54e72894-f04a-11e7-80e0-74d02b1dfe7c^p^C001^p^2018Q1O0','2018-01-03 14:52:43','您新增關鍵成果「增加招募曝光管道2個」。',0),('9451eb70-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^A0','9451eb70-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','2018-01-03 15:45:56','您新增了「增加理財寶使用人數」的目標。',0),('9451eb70-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^A1','9451eb70-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','2018-01-03 15:47:44','您新增關鍵成果「開發新理財寶3套」。',0),('9451eb70-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^A2','9451eb70-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','2018-01-03 15:48:32','您新增關鍵成果「規劃新理財寶3套」。',0),('abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^A0','abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','2018-01-03 14:54:30','您新增了「大大工程師招生」的目標。',0),('abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^A1','abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','2018-01-03 14:54:45','您新增關鍵成果「人數100位」。',0),('abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^A2','abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','2018-01-03 14:54:59','您新增關鍵成果「文章觸及總數100萬人」。',0),('abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^A3','abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','2018-01-03 14:55:56','您修改目標為「大大工程師招生」。',0),('abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^A4','abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','2018-01-03 14:56:34','您更新關鍵成果「人數100位」的完成度為15%。',0),('abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^A5','abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','2018-01-03 15:20:10','您更新關鍵成果「文章觸及總數100萬人」的完成度為12%。',0),('b64b7a6e-f058-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^A0','b64b7a6e-f058-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','2018-01-03 15:44:06','您新增了「讓籌碼K及基金APP擁有更多使用者」的目標。',0),('b64b7a6e-f058-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^A1','b64b7a6e-f058-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','2018-01-03 16:02:43','您新增關鍵成果「增加籌碼K線APP週不重複使用者至10萬」。',0),('b64b7a6e-f058-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^A2','b64b7a6e-f058-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','2018-01-03 16:03:01','您新增關鍵成果「增加基金APP週不重複使用者至8千」。',0),('b64b7a6e-f058-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^A3','b64b7a6e-f058-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','2018-01-03 16:05:07','您修改關鍵成果為「增加基金APP週不重複使用者至5千」。',0),('bf962f65-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^A0','bf962f65-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','2018-01-03 14:50:19','您新增了「創造一個爆紅產品」的目標。',0),('bf962f65-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^A1','bf962f65-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','2018-01-03 14:50:39','您新增關鍵成果「日活躍人數10W」。',0),('dd7b0669-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^A0','dd7b0669-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','2018-01-03 14:48:55','您新增了「完成P2P完整流程」的目標。',0),('dd7b0669-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^A1','dd7b0669-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','2018-01-03 14:51:44','您新增關鍵成果「完成3種使用情境下的完整流程」。',0),('efd026ce-f05a-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^A0','efd026ce-f05a-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','2018-01-04 09:13:23','您新增了「完成OKR系統」的目標。',0),('efd026ce-f05a-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^A1','efd026ce-f05a-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','2018-01-04 09:14:03','您新增關鍵成果「網站功能至少完成8成」。',0),('efd026ce-f05a-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^A2','efd026ce-f05a-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','2018-01-04 09:14:40','您修改關鍵成果為「網站功能至少完成80%」。',0),('efd026ce-f05a-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^A3','efd026ce-f05a-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','2018-01-04 09:14:40','您更新關鍵成果「網站功能至少完成80%」的完成度為80%。',0),('efd026ce-f05a-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^A4','efd026ce-f05a-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','2018-01-04 14:25:23','您更新關鍵成果「網站功能至少完成80%」的完成度為80%。',0),('efd026ce-f05a-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^A5','efd026ce-f05a-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','2018-01-04 15:58:13','您更新關鍵成果「網站功能至少完成80%」的完成度為36%。',0);
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backupmail`
--

DROP TABLE IF EXISTS `backupmail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `backupmail` (
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID',
  `BackUp_Mail` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '備用信箱',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用',
  PRIMARY KEY (`Emp_UUID`),
  KEY `Emp_UUID` (`Emp_UUID`),
  CONSTRAINT `backupmail_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backupmail`
--

LOCK TABLES `backupmail` WRITE;
/*!40000 ALTER TABLE `backupmail` DISABLE KEYS */;
/*!40000 ALTER TABLE `backupmail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company` (
  `Cmp_ID` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '公司ID',
  `Cmp_Name` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '公司名稱',
  `Emp_Count` int(10) NOT NULL COMMENT '公司人數',
  `Dpm_Count` int(10) NOT NULL COMMENT '部門數',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用',
  PRIMARY KEY (`Cmp_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES ('C001','CMoney',5,1,0);
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `department` (
  `Dpm_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '部門ID',
  `Cmp_ID` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '公司ID',
  `Dpm_Name` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '部門名稱',
  `Dmp_Count` int(10) NOT NULL COMMENT '部門人數',
  `Supervisor` varchar(36) COLLATE utf8_bin NOT NULL COMMENT '部門主管',
  `Description` text COLLATE utf8_bin NOT NULL COMMENT '部門內容',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用',
  PRIMARY KEY (`Dpm_ID`),
  KEY `Cmp_ID` (`Cmp_ID`),
  CONSTRAINT `department_ibfk_1` FOREIGN KEY (`Cmp_ID`) REFERENCES `company` (`Cmp_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'C001','理財寶企劃組',5,'','理財寶企劃組',0),(2,'C001','理財寶-金融科技部',1,'','理財寶-金融科技部',0),(3,'C001','人力資源部',2,'','',0),(4,'C001','大大工程師',4,'','大大工程師',0);
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID',
  `Company` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '隸屬公司(Cmp_ID)',
  `Department` int(11) NOT NULL COMMENT '隸屬部門(Dpm_id)',
  `Position` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '職位',
  `Emp_Account` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '員工帳號',
  `Password` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '密碼',
  `Emp_Name` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '員工名稱',
  `Img_URL` text COLLATE utf8_bin NOT NULL COMMENT '使用者_圖片URL',
  `Ses_ID` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '到職季度',
  `Act_Setting` text COLLATE utf8_bin NOT NULL COMMENT '帳號偏好設定',
  `Act_AnotherData` text COLLATE utf8_bin NOT NULL COMMENT '帳號雜項',
  `Act_Permission` int(5) NOT NULL COMMENT '帳號權限',
  `Avg_Progress` int(3) NOT NULL COMMENT '平均進度',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用',
  PRIMARY KEY (`Emp_UUID`),
  KEY `Company` (`Company`),
  KEY `Department` (`Department`),
  KEY `Ses_ID` (`Ses_ID`),
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`Department`) REFERENCES `department` (`Dpm_ID`),
  CONSTRAINT `employee_ibfk_3` FOREIGN KEY (`Company`) REFERENCES `company` (`Cmp_ID`),
  CONSTRAINT `employee_ibfk_4` FOREIGN KEY (`Ses_ID`) REFERENCES `season` (`Ses_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('169d1c97-efa2-11e7-9108-74d02b1dfe7c','C001',1,'理財寶企劃組/產品經理','terry_lai@cmoney.com.tw','123456','賴承佑','https://vignette.wikia.nocookie.net/peanuts/images/d/dc/Woodstock.gif/revision/latest?cb=20090301022138','C001^p^2018Q1','','',0,0,0),('1c285978-f059-11e7-8c66-42010a8c007d','C001',1,'理財寶企劃組/ UI設計師','jasmine@cmoney.com.tw','123456','黃庭英','https://vignette.wikia.nocookie.net/peanuts/images/d/dc/Woodstock.gif/revision/latest?cb=20090301022138','C001^p^2018Q1','','',0,0,0),('34d839bb-f05b-11e7-8c66-42010a8c007d','C001',4,'大大工程師/ 講師','spiculate@hotmail.com','0975732733','黃聖方','https://storage.googleapis.com/okrs-sys-emp-img/15149667012831430112.jpg','C001^p^2018Q1','','',0,0,0),('34f1dfd6-f060-11e7-8c66-42010a8c007d','C001',4,'大大工程師/ 學員','jeffthompkins83@gmail.com','123456','林品均','https://vignette.wikia.nocookie.net/peanuts/images/d/dc/Woodstock.gif/revision/latest?cb=20090301022138','C001^p^2018Q1','','',0,33,0),('54e72894-f04a-11e7-80e0-74d02b1dfe7c','C001',3,'人力資源部/人資副理','athena_tsai@cmoney.com.tw','123456','蔡毓蓉','https://vignette.wikia.nocookie.net/peanuts/images/d/dc/Woodstock.gif/revision/latest?cb=20090301022138','C001^p^2018Q1','','',0,0,0),('67d4df0e-f02f-11e7-80e0-74d02b1dfe7c','C001',2,'理財寶-金融科技部/產品經理','amy_chung@cmoney.com.tw','123456','叢日萱','https://storage.googleapis.com/okrs-sys-emp-img/1515044960765IMG-2135.JPG','C001^p^2018Q1','','',0,0,0),('7482549f-efa2-11e7-9108-74d02b1dfe7c','C001',1,'理財寶企劃組/產品經理','sean_lin@cmoney.com.tw','123456','林孟勳','https://vignette.wikia.nocookie.net/peanuts/images/d/dc/Woodstock.gif/revision/latest?cb=20090301022138','C001^p^2018Q1','','',0,0,0),('7504e020-f04a-11e7-80e0-74d02b1dfe7c','C001',3,'人力資源部/人資專員','grace_chian@cmoney.com.tw','123456','錢翊綺','https://vignette.wikia.nocookie.net/peanuts/images/d/dc/Woodstock.gif/revision/latest?cb=20090301022138','C001^p^2018Q1','','',0,0,0),('90145eb9-f05a-11e7-8c66-42010a8c007d','C001',4,'大大工程師/ 學員','wikeyno@gmail.com','kck122559887','陳維漢','https://storage.googleapis.com/okrs-sys-emp-img/1515057407657IMG_0551.JPG','C001^p^2018Q1','','',0,0,0),('922d7702-f057-11e7-8c66-42010a8c007d','C001',1,'理財寶企劃組/ UI設計師','sam_chang@cmoney.com.tw','123456','張伯宇','https://vignette.wikia.nocookie.net/peanuts/images/d/dc/Woodstock.gif/revision/latest?cb=20090301022138\n','C001^p^2018Q1','','',0,0,0),('9451eb70-efa2-11e7-9108-74d02b1dfe7c','C001',1,'理財寶企劃組/產品經理','bon_chen@cmoney.com.tw','123456','陳定邦','https://vignette.wikia.nocookie.net/peanuts/images/d/dc/Woodstock.gif/revision/latest?cb=20090301022138','C001^p^2018Q1','','',0,0,0),('abde7ab2-efa2-11e7-9108-74d02b1dfe7c','C001',1,'理財寶企劃組/產品經理','tim_wu@cmoney.com.tw','123456','吳侑庭','https://storage.googleapis.com/okrs-sys-emp-img/1514963613113tmp1.jpg','C001^p^2018Q1','','',0,14,0),('b64b7a6e-f058-11e7-8c66-42010a8c007d','C001',1,'理財寶企劃組/ 產品經理','kimber@cmoney.com.tw','123456','蔡瑋甄','https://storage.googleapis.com/okrs-sys-emp-img/1514965344551蛋黃哥.jpg','C001^p^2018Q1','','',0,0,0),('bf962f65-efa2-11e7-9108-74d02b1dfe7c','C001',1,'理財寶企劃組/產品經理','danny@cmoney.com.tw','948787','陳建銘','https://storage.googleapis.com/okrs-sys-emp-img/1514962449691S__4349969.gif','C001^p^2018Q1','','',0,0,0),('cb11bdce-f05a-11e7-8c66-42010a8c007d','C001',4,'大大工程師/ 學員','bggtank0102@gmail.com','qwerty0102','林庭緯','https://storage.googleapis.com/okrs-sys-emp-img/1514966146604帥庭緯.jpg','C001^p^2018Q1','','',0,0,0),('dd7b0669-efa2-11e7-9108-74d02b1dfe7c','C001',1,'理財寶企劃組/UI設計師','piper_chien@cmoney.com.tw','123456','簡潔安','https://vignette.wikia.nocookie.net/peanuts/images/d/dc/Woodstock.gif/revision/latest?cb=20090301022138','C001^p^2018Q1','','',0,0,0),('e503f4f3-f05a-11e7-8c66-42010a8c007d','C001',4,'大大工程師/ 學員','weichu0114@gmail.com','123456','廖韋筑','https://storage.googleapis.com/okrs-sys-emp-img/1515051340394201992.jpg','C001^p^2018Q1','','',0,0,0),('efd026ce-f05a-11e7-8c66-42010a8c007d','C001',4,'大大工程師/ 學員','daivdxxxcc@gmail.com','123456','張辰豪','https://storage.googleapis.com/okrs-sys-emp-img/1515046968105frank.png','C001^p^2018Q1','','',0,36,0);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `key_result`
--

DROP TABLE IF EXISTS `key_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `key_result` (
  `KR_ID` varchar(64) COLLATE utf8_bin NOT NULL COMMENT '關鍵成果ID',
  `Obj_ID` varchar(56) COLLATE utf8_bin NOT NULL COMMENT '隸屬目標ID',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID',
  `KR_Progress` int(3) NOT NULL COMMENT 'key result 達成率',
  `KR_Text` text COLLATE utf8_bin NOT NULL COMMENT '關鍵成果內容',
  `His_KR_Text` text COLLATE utf8_bin NOT NULL COMMENT '歷史修改關鍵成果內容',
  `CreatTime` datetime NOT NULL COMMENT '建立時間',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用',
  PRIMARY KEY (`KR_ID`),
  KEY `Obj_ID` (`Obj_ID`),
  KEY `Emp_UUID` (`Emp_UUID`),
  CONSTRAINT `key_result_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`),
  CONSTRAINT `key_result_ibfk_2` FOREIGN KEY (`Obj_ID`) REFERENCES `objective` (`Obj_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `key_result`
--

LOCK TABLES `key_result` WRITE;
/*!40000 ALTER TABLE `key_result` DISABLE KEYS */;
INSERT INTO `key_result` VALUES ('34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^KR0','34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','34d839bb-f05b-11e7-8c66-42010a8c007d',0,'完成15位作業批改與成績登錄','','2018-01-03 16:09:10',0),('34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^KR1','34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','34d839bb-f05b-11e7-8c66-42010a8c007d',0,'完成1份成績單','','2018-01-03 16:09:29',0),('34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^KR2','34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','34d839bb-f05b-11e7-8c66-42010a8c007d',0,'完成1份報告','','2018-01-03 16:09:44',0),('34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^KR0','34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','34f1dfd6-f060-11e7-8c66-42010a8c007d',0,'test1','','2018-01-03 16:31:43',0),('34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^KR1','34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','34f1dfd6-f060-11e7-8c66-42010a8c007d',0,'test2','','2018-01-03 16:31:48',0),('34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^KR2','34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','34f1dfd6-f060-11e7-8c66-42010a8c007d',100,'test3','','2018-01-03 16:31:53',0),('54e72894-f04a-11e7-80e0-74d02b1dfe7c^p^C001^p^2018Q1O0^p^KR0','54e72894-f04a-11e7-80e0-74d02b1dfe7c^p^C001^p^2018Q1O0','54e72894-f04a-11e7-80e0-74d02b1dfe7c',0,'提高季度新人留任率至80％','','2018-01-03 14:52:16',0),('54e72894-f04a-11e7-80e0-74d02b1dfe7c^p^C001^p^2018Q1O0^p^KR1','54e72894-f04a-11e7-80e0-74d02b1dfe7c^p^C001^p^2018Q1O0','54e72894-f04a-11e7-80e0-74d02b1dfe7c',0,'季度留任新人100％通過試用期','','2018-01-03 14:52:31',0),('54e72894-f04a-11e7-80e0-74d02b1dfe7c^p^C001^p^2018Q1O0^p^KR2','54e72894-f04a-11e7-80e0-74d02b1dfe7c^p^C001^p^2018Q1O0','54e72894-f04a-11e7-80e0-74d02b1dfe7c',0,'增加招募曝光管道2個','','2018-01-03 14:52:43',0),('9451eb70-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^KR0','9451eb70-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','9451eb70-efa2-11e7-9108-74d02b1dfe7c',0,'開發新理財寶3套','','2018-01-03 15:47:44',0),('9451eb70-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^KR1','9451eb70-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','9451eb70-efa2-11e7-9108-74d02b1dfe7c',0,'規劃新理財寶3套','','2018-01-03 15:48:32',0),('abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^KR0','abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','abde7ab2-efa2-11e7-9108-74d02b1dfe7c',15,'人數100位','','2018-01-03 14:54:45',0),('abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^KR1','abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','abde7ab2-efa2-11e7-9108-74d02b1dfe7c',12,'文章觸及總數100萬人','','2018-01-03 14:54:59',0),('b64b7a6e-f058-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^KR0','b64b7a6e-f058-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','b64b7a6e-f058-11e7-8c66-42010a8c007d',0,'增加籌碼K線APP週不重複使用者至10萬','','2018-01-03 16:02:43',0),('b64b7a6e-f058-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^KR1','b64b7a6e-f058-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','b64b7a6e-f058-11e7-8c66-42010a8c007d',0,'增加基金APP週不重複使用者至5千','增加基金APP週不重複使用者至8千','2018-01-03 16:03:01',0),('bf962f65-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^KR0','bf962f65-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','bf962f65-efa2-11e7-9108-74d02b1dfe7c',0,'日活躍人數10W','','2018-01-03 14:50:39',0),('dd7b0669-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^KR0','dd7b0669-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','dd7b0669-efa2-11e7-9108-74d02b1dfe7c',0,'完成3種使用情境下的完整流程','','2018-01-03 14:51:44',0),('efd026ce-f05a-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^KR0','efd026ce-f05a-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','efd026ce-f05a-11e7-8c66-42010a8c007d',36,'網站功能至少完成80%','網站功能至少完成8成','2018-01-04 09:14:03',0);
/*!40000 ALTER TABLE `key_result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kr_category`
--

DROP TABLE IF EXISTS `kr_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kr_category` (
  `kr_category_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '分類ID',
  `kr_category_text` text COLLATE utf8_bin NOT NULL COMMENT '分類名稱 ',
  `Disable` tinyint(4) NOT NULL COMMENT '停用',
  PRIMARY KEY (`kr_category_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kr_category`
--

LOCK TABLES `kr_category` WRITE;
/*!40000 ALTER TABLE `kr_category` DISABLE KEYS */;
INSERT INTO `kr_category` VALUES (1,'工程研發類',0),(2,'行銷企劃類',0),(3,'人力資源類',0);
/*!40000 ALTER TABLE `kr_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kr_comment`
--

DROP TABLE IF EXISTS `kr_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kr_comment` (
  `KR_Com_ID` varchar(72) COLLATE utf8_bin NOT NULL COMMENT '關鍵成果留言ID',
  `KR_ID` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '隸屬關鍵成果ID',
  `Obj_ID` varchar(56) COLLATE utf8_bin DEFAULT NULL COMMENT '隸屬目標ID',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT '留言者_UUID',
  `Emp_Name` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '留言者_姓名',
  `Img_URL` text COLLATE utf8_bin NOT NULL COMMENT '留言者_圖片',
  `Com_Text` text COLLATE utf8_bin COMMENT '留言內容',
  `His_Com_Text` text COLLATE utf8_bin COMMENT '歷史修改留言內容',
  `CreatTime` datetime DEFAULT NULL COMMENT '創立時間',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用',
  PRIMARY KEY (`KR_Com_ID`),
  KEY `KR_ID` (`KR_ID`),
  KEY `Obj_ID` (`Obj_ID`),
  KEY `Emp_UUID` (`Emp_UUID`),
  CONSTRAINT `kr_comment_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`),
  CONSTRAINT `kr_comment_ibfk_2` FOREIGN KEY (`KR_ID`) REFERENCES `key_result` (`KR_ID`),
  CONSTRAINT `kr_comment_ibfk_3` FOREIGN KEY (`Obj_ID`) REFERENCES `objective` (`Obj_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kr_comment`
--

LOCK TABLES `kr_comment` WRITE;
/*!40000 ALTER TABLE `kr_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `kr_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kr_suggestion`
--

DROP TABLE IF EXISTS `kr_suggestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kr_suggestion` (
  `kr_sug_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '建議kr ID',
  `kr_category_ID` int(11) NOT NULL COMMENT '建議kr 分類',
  `kr_sug_text` text COLLATE utf8_bin NOT NULL COMMENT '建議kr 內容',
  `Disable` tinyint(4) NOT NULL COMMENT '停用',
  PRIMARY KEY (`kr_sug_ID`),
  KEY `kr_category_ID` (`kr_category_ID`),
  CONSTRAINT `kr_suggestion_ibfk_1` FOREIGN KEY (`kr_category_ID`) REFERENCES `kr_category` (`kr_category_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kr_suggestion`
--

LOCK TABLES `kr_suggestion` WRITE;
/*!40000 ALTER TABLE `kr_suggestion` DISABLE KEYS */;
INSERT INTO `kr_suggestion` VALUES (11,1,'加快關鍵子系統效能達成率',0),(12,1,'提升伺服器可靠性',0),(13,1,'無效的研發成本與總研發成本發生率',0),(14,2,'廣告預算執行率達9成',0),(15,2,'客戶對廣告平均滿意度達80分以上',0),(16,2,'網路廣告點閱人次達50萬次',0),(17,3,'達成關鍵人才培育計畫90%執行率',0),(18,3,'建置完成儲備幹部計畫80%進度',0),(19,3,'平均職缺人員遞補天數45天',0);
/*!40000 ALTER TABLE `kr_suggestion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification` (
  `NF_ID` varchar(62) COLLATE utf8_bin NOT NULL COMMENT '通知ID(UUID+SesID)',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID',
  `Sourse_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT '留言者UUID',
  `Obj_ID` varchar(56) COLLATE utf8_bin DEFAULT NULL COMMENT '所屬目標ID',
  `Emp_Name` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '留言者_姓名',
  `Img_URL` text COLLATE utf8_bin NOT NULL COMMENT '留言者_圖片',
  `Is_Read` tinyint(1) NOT NULL COMMENT '已讀',
  `NF_Text` text COLLATE utf8_bin NOT NULL COMMENT '通知內容',
  `NF_Link` text COLLATE utf8_bin NOT NULL COMMENT '通知連結',
  `CreatTime` datetime NOT NULL COMMENT '創立時間',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用',
  PRIMARY KEY (`NF_ID`),
  KEY `Emp_UUID` (`Emp_UUID`),
  KEY `Obj_ID` (`Obj_ID`),
  KEY `sourse_UUID` (`Sourse_UUID`),
  CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`),
  CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`Obj_ID`) REFERENCES `objective` (`Obj_ID`),
  CONSTRAINT `notification_ibfk_3` FOREIGN KEY (`Sourse_UUID`) REFERENCES `employee` (`Emp_UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES ('34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^NF0','34d839bb-f05b-11e7-8c66-42010a8c007d','cb11bdce-f05a-11e7-8c66-42010a8c007d','34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','林庭緯','https://storage.googleapis.com/okrs-sys-emp-img/1514966146604帥庭緯.jpg',0,'對你的目標按讚','/profile/?season=201801','2018-01-03 16:12:00',0),('34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^NF1','34d839bb-f05b-11e7-8c66-42010a8c007d','efd026ce-f05a-11e7-8c66-42010a8c007d','34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','張辰豪','https://storage.googleapis.com/okrs-sys-emp-img/1515046968105frank.png',0,'對你的目標留言','/profile/?season=201801','2018-01-04 10:55:30',0),('34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^NF2','34d839bb-f05b-11e7-8c66-42010a8c007d','efd026ce-f05a-11e7-8c66-42010a8c007d','34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','張辰豪','https://storage.googleapis.com/okrs-sys-emp-img/1515046968105frank.png',0,'對你的目標按讚','/profile/?season=201801','2018-01-04 11:17:16',0),('34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^NF0','34f1dfd6-f060-11e7-8c66-42010a8c007d','efd026ce-f05a-11e7-8c66-42010a8c007d','34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','張辰豪','https://storage.googleapis.com/okrs-sys-emp-img/1515046968105frank.png',0,'對你的目標留言','/profile/?season=201801','2018-01-03 16:38:07',0),('54e72894-f04a-11e7-80e0-74d02b1dfe7c^p^C001^p^2018Q1O0^p^NF0','54e72894-f04a-11e7-80e0-74d02b1dfe7c','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','54e72894-f04a-11e7-80e0-74d02b1dfe7c^p^C001^p^2018Q1O0','吳侑庭','https://storage.googleapis.com/okrs-sys-emp-img/1514963613113tmp1.jpg',0,'對你的目標留言','/profile/?season=201801','2018-01-03 14:58:35',0),('54e72894-f04a-11e7-80e0-74d02b1dfe7c^p^C001^p^2018Q1O0^p^NF1','54e72894-f04a-11e7-80e0-74d02b1dfe7c','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','54e72894-f04a-11e7-80e0-74d02b1dfe7c^p^C001^p^2018Q1O0','吳侑庭','https://storage.googleapis.com/okrs-sys-emp-img/1514963613113tmp1.jpg',0,'對你的目標按讚','/profile/?season=201801','2018-01-03 14:58:40',0),('abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^NF0','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','cb11bdce-f05a-11e7-8c66-42010a8c007d','abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','林庭緯','https://storage.googleapis.com/okrs-sys-emp-img/1514966146604帥庭緯.jpg',0,'對你的目標按讚','/profile/?season=201801','2018-01-03 16:35:11',1),('abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^NF1','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','34d839bb-f05b-11e7-8c66-42010a8c007d','abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','黃聖方','https://storage.googleapis.com/okrs-sys-emp-img/15149667012831430112.jpg',0,'對你的目標按讚','/profile/?season=201801','2018-01-03 16:35:11',1),('abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^NF2','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','34f1dfd6-f060-11e7-8c66-42010a8c007d','abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','林品均','https://vignette.wikia.nocookie.net/peanuts/images/d/dc/Woodstock.gif/revision/latest?cb=20090301022138',0,'對你的目標按讚','/profile/?season=201801','2018-01-03 16:35:11',1),('abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^NF3','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','efd026ce-f05a-11e7-8c66-42010a8c007d','abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','張辰豪','https://storage.googleapis.com/okrs-sys-emp-img/1515046968105frank.png',0,'對你的目標留言','/profile/?season=201801','2018-01-03 17:42:40',0),('abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^NF4','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','efd026ce-f05a-11e7-8c66-42010a8c007d','abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','張辰豪','https://storage.googleapis.com/okrs-sys-emp-img/1515046968105frank.png',0,'對你的目標按讚','/profile/?season=201801','2018-01-04 11:16:55',0),('bf962f65-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^NF0','bf962f65-efa2-11e7-9108-74d02b1dfe7c','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','bf962f65-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','吳侑庭','https://storage.googleapis.com/okrs-sys-emp-img/1514963613113tmp1.jpg',0,'對你的目標留言','/profile/?season=201801','2018-01-03 14:57:19',0);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `obj_comment`
--

DROP TABLE IF EXISTS `obj_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `obj_comment` (
  `Obj_Com_ID` varchar(64) COLLATE utf8_bin NOT NULL COMMENT 'Obj留言ID',
  `Obj_ID` varchar(56) COLLATE utf8_bin NOT NULL COMMENT '隸屬目標ID',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT '留言者_UUID',
  `Emp_Name` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '留言者_姓名',
  `Img_URL` text COLLATE utf8_bin NOT NULL COMMENT '留言者_圖片',
  `Com_Text` text COLLATE utf8_bin NOT NULL COMMENT '留言內容',
  `His_Com_Text` text COLLATE utf8_bin NOT NULL COMMENT '歷史修改留言內容',
  `CreatTime` datetime NOT NULL COMMENT '創立時間',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用',
  PRIMARY KEY (`Obj_Com_ID`),
  KEY `Obj_ID` (`Obj_ID`),
  KEY `Emp_UUID` (`Emp_UUID`),
  CONSTRAINT `obj_comment_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`),
  CONSTRAINT `obj_comment_ibfk_2` FOREIGN KEY (`Obj_ID`) REFERENCES `objective` (`Obj_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obj_comment`
--

LOCK TABLES `obj_comment` WRITE;
/*!40000 ALTER TABLE `obj_comment` DISABLE KEYS */;
INSERT INTO `obj_comment` VALUES ('34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^OC0','34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','efd026ce-f05a-11e7-8c66-42010a8c007d','張辰豪','https://storage.googleapis.com/okrs-sys-emp-img/1515046968105frank.png','老師加油!','','2018-01-04 10:55:30',0),('34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^OC0','34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','34f1dfd6-f060-11e7-8c66-42010a8c007d','林品均','https://vignette.wikia.nocookie.net/peanuts/images/d/dc/Woodstock.gif/revision/latest?cb=20090301022138','test','','2018-01-03 16:33:59',0),('34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0^p^OC1','34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','efd026ce-f05a-11e7-8c66-42010a8c007d','張辰豪','https://storage.googleapis.com/okrs-sys-emp-img/1515046968105frank.png','品均猛','','2018-01-03 16:38:07',0),('54e72894-f04a-11e7-80e0-74d02b1dfe7c^p^C001^p^2018Q1O0^p^OC0','54e72894-f04a-11e7-80e0-74d02b1dfe7c^p^C001^p^2018Q1O0','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','吳侑庭','https://storage.googleapis.com/okrs-sys-emp-img/1514963613113tmp1.jpg','挖好棒','','2018-01-03 14:58:35',0),('abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^OC0','abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','efd026ce-f05a-11e7-8c66-42010a8c007d','張辰豪','https://storage.googleapis.com/okrs-sys-emp-img/1515046968105frank.png','文章寫得很讚喔','','2018-01-03 17:42:40',0),('bf962f65-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^OC0','bf962f65-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','bf962f65-efa2-11e7-9108-74d02b1dfe7c','陳建銘','https://storage.googleapis.com/okrs-sys-emp-img/1514962449691S__4349969.gif','這是什麼','','2018-01-03 14:51:16',0),('bf962f65-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^OC1','bf962f65-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','bf962f65-efa2-11e7-9108-74d02b1dfe7c','陳建銘','https://storage.googleapis.com/okrs-sys-emp-img/1514962449691S__4349969.gif','傻眼貓咪','','2018-01-03 14:51:22',0),('bf962f65-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0^p^OC2','bf962f65-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','吳侑庭','https://storage.googleapis.com/okrs-sys-emp-img/1514963613113tmp1.jpg','Hello World!','','2018-01-03 14:57:19',0);
/*!40000 ALTER TABLE `obj_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objective`
--

DROP TABLE IF EXISTS `objective`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `objective` (
  `Obj_ID` varchar(56) COLLATE utf8_bin NOT NULL COMMENT '目標ID',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID',
  `Ses_ID` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '季度ID',
  `Reaching_Rate` int(10) NOT NULL COMMENT '達成率',
  `Obj_Text` text COLLATE utf8_bin NOT NULL COMMENT '目標內容',
  `His_Obj_Text` text COLLATE utf8_bin NOT NULL COMMENT '歷史修改目標內容',
  `CreatTime` datetime NOT NULL COMMENT '創立時間',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用',
  PRIMARY KEY (`Obj_ID`),
  KEY `Emp_UUID` (`Emp_UUID`),
  KEY `Ses_ID` (`Ses_ID`),
  CONSTRAINT `objective_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`),
  CONSTRAINT `objective_ibfk_2` FOREIGN KEY (`Ses_ID`) REFERENCES `season` (`Ses_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objective`
--

LOCK TABLES `objective` WRITE;
/*!40000 ALTER TABLE `objective` DISABLE KEYS */;
INSERT INTO `objective` VALUES ('34d839bb-f05b-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','34d839bb-f05b-11e7-8c66-42010a8c007d','C001^p^2018Q1',0,'完成程式戰鬥營成果報告書','','2018-01-03 16:07:51',0),('34f1dfd6-f060-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','34f1dfd6-f060-11e7-8c66-42010a8c007d','C001^p^2018Q1',33,'create sql database','create sql database','2018-01-03 16:31:10',0),('54e72894-f04a-11e7-80e0-74d02b1dfe7c^p^C001^p^2018Q1O0','54e72894-f04a-11e7-80e0-74d02b1dfe7c','C001^p^2018Q1',0,'找到對的人、留住對的人','','2018-01-03 14:51:17',0),('9451eb70-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','9451eb70-efa2-11e7-9108-74d02b1dfe7c','C001^p^2018Q1',0,'增加理財寶使用人數','','2018-01-03 15:45:56',0),('abde7ab2-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','C001^p^2018Q1',14,'大大工程師招生','大大工程師招生','2018-01-03 14:54:30',0),('b64b7a6e-f058-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','b64b7a6e-f058-11e7-8c66-42010a8c007d','C001^p^2018Q1',0,'讓籌碼K及基金APP擁有更多使用者','','2018-01-03 15:44:06',0),('bf962f65-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','bf962f65-efa2-11e7-9108-74d02b1dfe7c','C001^p^2018Q1',0,'創造一個爆紅產品','','2018-01-03 14:50:19',0),('dd7b0669-efa2-11e7-9108-74d02b1dfe7c^p^C001^p^2018Q1O0','dd7b0669-efa2-11e7-9108-74d02b1dfe7c','C001^p^2018Q1',0,'完成P2P完整流程','','2018-01-03 14:48:55',0),('efd026ce-f05a-11e7-8c66-42010a8c007d^p^C001^p^2018Q1O0','efd026ce-f05a-11e7-8c66-42010a8c007d','C001^p^2018Q1',36,'完成OKR系統','','2018-01-04 09:13:23',0);
/*!40000 ALTER TABLE `objective` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recent`
--

DROP TABLE IF EXISTS `recent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recent` (
  `Rec_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '最近觀看ID',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'user_ID',
  `Rec_Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT '我看了誰的ID',
  `CreatTime` datetime NOT NULL COMMENT '最近觀看時間',
  `Disable` tinyint(4) NOT NULL COMMENT '停用',
  PRIMARY KEY (`Rec_ID`),
  KEY `Emp_UUID` (`Emp_UUID`),
  KEY `Rec_Emp_UUID` (`Rec_Emp_UUID`),
  CONSTRAINT `recent_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`),
  CONSTRAINT `recent_ibfk_2` FOREIGN KEY (`Rec_Emp_UUID`) REFERENCES `employee` (`Emp_UUID`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recent`
--

LOCK TABLES `recent` WRITE;
/*!40000 ALTER TABLE `recent` DISABLE KEYS */;
INSERT INTO `recent` VALUES (1,'abde7ab2-efa2-11e7-9108-74d02b1dfe7c','169d1c97-efa2-11e7-9108-74d02b1dfe7c','2018-01-03 14:48:54',0),(2,'bf962f65-efa2-11e7-9108-74d02b1dfe7c','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','2018-01-03 14:52:42',0),(3,'abde7ab2-efa2-11e7-9108-74d02b1dfe7c','bf962f65-efa2-11e7-9108-74d02b1dfe7c','2018-01-03 14:56:53',0),(4,'abde7ab2-efa2-11e7-9108-74d02b1dfe7c','9451eb70-efa2-11e7-9108-74d02b1dfe7c','2018-01-03 14:57:33',0),(5,'abde7ab2-efa2-11e7-9108-74d02b1dfe7c','54e72894-f04a-11e7-80e0-74d02b1dfe7c','2018-01-03 14:58:17',0),(6,'abde7ab2-efa2-11e7-9108-74d02b1dfe7c','bf962f65-efa2-11e7-9108-74d02b1dfe7c','2018-01-03 15:34:37',0),(7,'abde7ab2-efa2-11e7-9108-74d02b1dfe7c','54e72894-f04a-11e7-80e0-74d02b1dfe7c','2018-01-03 15:35:35',0),(8,'abde7ab2-efa2-11e7-9108-74d02b1dfe7c','9451eb70-efa2-11e7-9108-74d02b1dfe7c','2018-01-03 15:36:28',0),(9,'922d7702-f057-11e7-8c66-42010a8c007d','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','2018-01-03 15:42:26',0),(10,'e503f4f3-f05a-11e7-8c66-42010a8c007d','b64b7a6e-f058-11e7-8c66-42010a8c007d','2018-01-03 15:53:57',0),(11,'e503f4f3-f05a-11e7-8c66-42010a8c007d','cb11bdce-f05a-11e7-8c66-42010a8c007d','2018-01-03 15:54:46',0),(12,'90145eb9-f05a-11e7-8c66-42010a8c007d','bf962f65-efa2-11e7-9108-74d02b1dfe7c','2018-01-03 15:59:37',0),(13,'90145eb9-f05a-11e7-8c66-42010a8c007d','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','2018-01-03 16:00:13',0),(14,'cb11bdce-f05a-11e7-8c66-42010a8c007d','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','2018-01-03 16:03:50',0),(15,'b64b7a6e-f058-11e7-8c66-42010a8c007d','1c285978-f059-11e7-8c66-42010a8c007d','2018-01-03 16:04:06',0),(16,'cb11bdce-f05a-11e7-8c66-42010a8c007d','b64b7a6e-f058-11e7-8c66-42010a8c007d','2018-01-03 16:04:15',0),(17,'b64b7a6e-f058-11e7-8c66-42010a8c007d','bf962f65-efa2-11e7-9108-74d02b1dfe7c','2018-01-03 16:04:19',0),(18,'b64b7a6e-f058-11e7-8c66-42010a8c007d','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','2018-01-03 16:04:24',0),(19,'90145eb9-f05a-11e7-8c66-42010a8c007d','b64b7a6e-f058-11e7-8c66-42010a8c007d','2018-01-03 16:04:38',0),(20,'cb11bdce-f05a-11e7-8c66-42010a8c007d','54e72894-f04a-11e7-80e0-74d02b1dfe7c','2018-01-03 16:05:14',0),(21,'cb11bdce-f05a-11e7-8c66-42010a8c007d','34d839bb-f05b-11e7-8c66-42010a8c007d','2018-01-03 16:05:50',0),(22,'34d839bb-f05b-11e7-8c66-42010a8c007d','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','2018-01-03 16:06:30',0),(23,'34d839bb-f05b-11e7-8c66-42010a8c007d','b64b7a6e-f058-11e7-8c66-42010a8c007d','2018-01-03 16:07:03',0),(24,'cb11bdce-f05a-11e7-8c66-42010a8c007d','9451eb70-efa2-11e7-9108-74d02b1dfe7c','2018-01-03 16:07:30',0),(25,'e503f4f3-f05a-11e7-8c66-42010a8c007d','cb11bdce-f05a-11e7-8c66-42010a8c007d','2018-01-03 16:09:33',0),(26,'e503f4f3-f05a-11e7-8c66-42010a8c007d','34d839bb-f05b-11e7-8c66-42010a8c007d','2018-01-03 16:10:06',0),(27,'cb11bdce-f05a-11e7-8c66-42010a8c007d','34d839bb-f05b-11e7-8c66-42010a8c007d','2018-01-03 16:11:51',0),(28,'cb11bdce-f05a-11e7-8c66-42010a8c007d','34d839bb-f05b-11e7-8c66-42010a8c007d','2018-01-03 16:13:19',0),(29,'cb11bdce-f05a-11e7-8c66-42010a8c007d','67d4df0e-f02f-11e7-80e0-74d02b1dfe7c','2018-01-03 16:21:52',0),(30,'34f1dfd6-f060-11e7-8c66-42010a8c007d','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','2018-01-03 16:34:45',0),(31,'efd026ce-f05a-11e7-8c66-42010a8c007d','34f1dfd6-f060-11e7-8c66-42010a8c007d','2018-01-03 16:37:57',0),(32,'e503f4f3-f05a-11e7-8c66-42010a8c007d','efd026ce-f05a-11e7-8c66-42010a8c007d','2018-01-03 16:42:26',0),(33,'efd026ce-f05a-11e7-8c66-42010a8c007d','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','2018-01-03 17:42:03',0),(34,'cb11bdce-f05a-11e7-8c66-42010a8c007d','34d839bb-f05b-11e7-8c66-42010a8c007d','2018-01-03 17:51:50',0),(35,'cb11bdce-f05a-11e7-8c66-42010a8c007d','dd7b0669-efa2-11e7-9108-74d02b1dfe7c','2018-01-03 17:52:15',0),(36,'e503f4f3-f05a-11e7-8c66-42010a8c007d','9451eb70-efa2-11e7-9108-74d02b1dfe7c','2018-01-03 18:06:56',0),(37,'e503f4f3-f05a-11e7-8c66-42010a8c007d','34f1dfd6-f060-11e7-8c66-42010a8c007d','2018-01-03 18:08:19',0),(38,'efd026ce-f05a-11e7-8c66-42010a8c007d','cb11bdce-f05a-11e7-8c66-42010a8c007d','2018-01-04 10:54:58',0),(39,'efd026ce-f05a-11e7-8c66-42010a8c007d','34d839bb-f05b-11e7-8c66-42010a8c007d','2018-01-04 10:55:08',0),(40,'efd026ce-f05a-11e7-8c66-42010a8c007d','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','2018-01-04 11:16:46',0),(41,'efd026ce-f05a-11e7-8c66-42010a8c007d','34d839bb-f05b-11e7-8c66-42010a8c007d','2018-01-04 11:17:05',0),(42,'efd026ce-f05a-11e7-8c66-42010a8c007d','7482549f-efa2-11e7-9108-74d02b1dfe7c','2018-01-04 11:17:38',0),(43,'efd026ce-f05a-11e7-8c66-42010a8c007d','922d7702-f057-11e7-8c66-42010a8c007d','2018-01-04 11:17:57',0),(44,'efd026ce-f05a-11e7-8c66-42010a8c007d','b64b7a6e-f058-11e7-8c66-42010a8c007d','2018-01-04 11:18:29',0),(45,'90145eb9-f05a-11e7-8c66-42010a8c007d','67d4df0e-f02f-11e7-80e0-74d02b1dfe7c','2018-01-04 13:38:52',0),(46,'67d4df0e-f02f-11e7-80e0-74d02b1dfe7c','b64b7a6e-f058-11e7-8c66-42010a8c007d','2018-01-04 13:45:36',0),(47,'67d4df0e-f02f-11e7-80e0-74d02b1dfe7c','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','2018-01-04 13:45:52',0),(48,'90145eb9-f05a-11e7-8c66-42010a8c007d','67d4df0e-f02f-11e7-80e0-74d02b1dfe7c','2018-01-04 14:18:26',0),(49,'90145eb9-f05a-11e7-8c66-42010a8c007d','34d839bb-f05b-11e7-8c66-42010a8c007d','2018-01-04 14:19:04',0),(50,'efd026ce-f05a-11e7-8c66-42010a8c007d','67d4df0e-f02f-11e7-80e0-74d02b1dfe7c','2018-01-04 14:23:29',0),(51,'efd026ce-f05a-11e7-8c66-42010a8c007d','34d839bb-f05b-11e7-8c66-42010a8c007d','2018-01-04 14:24:00',0),(52,'e503f4f3-f05a-11e7-8c66-42010a8c007d','67d4df0e-f02f-11e7-80e0-74d02b1dfe7c','2018-01-04 15:34:32',0),(53,'e503f4f3-f05a-11e7-8c66-42010a8c007d','54e72894-f04a-11e7-80e0-74d02b1dfe7c','2018-01-04 16:27:52',0),(54,'e503f4f3-f05a-11e7-8c66-42010a8c007d','54e72894-f04a-11e7-80e0-74d02b1dfe7c','2018-01-04 16:27:52',0),(55,'e503f4f3-f05a-11e7-8c66-42010a8c007d','cb11bdce-f05a-11e7-8c66-42010a8c007d','2018-01-04 16:28:52',0),(56,'e503f4f3-f05a-11e7-8c66-42010a8c007d','67d4df0e-f02f-11e7-80e0-74d02b1dfe7c','2018-01-04 16:29:59',0),(57,'e503f4f3-f05a-11e7-8c66-42010a8c007d','bf962f65-efa2-11e7-9108-74d02b1dfe7c','2018-01-04 16:31:30',0),(58,'e503f4f3-f05a-11e7-8c66-42010a8c007d','abde7ab2-efa2-11e7-9108-74d02b1dfe7c','2018-01-04 16:31:43',0),(59,'e503f4f3-f05a-11e7-8c66-42010a8c007d','90145eb9-f05a-11e7-8c66-42010a8c007d','2018-01-04 17:09:12',0);
/*!40000 ALTER TABLE `recent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `season`
--

DROP TABLE IF EXISTS `season`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `season` (
  `Ses_ID` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Cmp_ID` varchar(15) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '公司ID',
  `Ses_Name` varchar(15) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '季度名稱',
  `Start_Day` date NOT NULL COMMENT '開始日期',
  `End_Day` date NOT NULL COMMENT '結束日期',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用',
  PRIMARY KEY (`Ses_ID`),
  KEY `Cmp_ID` (`Cmp_ID`),
  CONSTRAINT `season_ibfk_1` FOREIGN KEY (`Cmp_ID`) REFERENCES `company` (`Cmp_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `season`
--

LOCK TABLES `season` WRITE;
/*!40000 ALTER TABLE `season` DISABLE KEYS */;
INSERT INTO `season` VALUES ('C001^p^2018Q1','C001','201801','2018-01-01','2018-03-31',0),('C001^p^2018Q2','C001','201802','2018-04-01','2018-06-30',0);
/*!40000 ALTER TABLE `season` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-04  9:37:59
