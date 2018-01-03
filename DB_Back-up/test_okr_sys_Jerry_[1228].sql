-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 28, 2017 at 08:15 AM
-- Server version: 5.6.34-log
-- PHP Version: 7.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `okr_system_02`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `Atv_ID` varchar(64) COLLATE utf8_bin NOT NULL COMMENT '歷史ID(Obj_ID+^p^A0000)',
  `Obj_ID` varchar(56) COLLATE utf8_bin NOT NULL COMMENT '所屬目標id',
  `Atv_Time` datetime NOT NULL COMMENT '活動新增時間',
  `Atv_Text` text COLLATE utf8_bin NOT NULL COMMENT '活動內容',
  `Disable` tinyint(4) NOT NULL COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`Atv_ID`, `Obj_ID`, `Atv_Time`, `Atv_Text`, `Disable`) VALUES
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A0', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 15:16:23', '您新增了「庭緯的新目標」的目標。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A1', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 15:16:44', '您新增關鍵成果「庭緯的新成果1」。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A2', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 15:17:04', '您更新關鍵成果「庭緯的新成果1」的完成度為45%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A3', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 15:17:24', '您新增了關鍵成果「庭緯新關鍵成果2」。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A4', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 15:17:32', '您更新關鍵成果「庭緯新關鍵成果2」的完成度為70%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A5', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 16:09:53', '您更新關鍵成果「庭緯的新成果1」的完成度為0%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^A0', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '2017-12-28 15:23:31', '您新增了「test」的目標。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^A1', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '2017-12-28 15:23:35', '您新增關鍵成果「123」。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^A10', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '2017-12-28 15:23:54', '您更新關鍵成果「123」的完成度為28%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^A11', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '2017-12-28 15:23:54', '您更新關鍵成果「123」的完成度為28%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^A12', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '2017-12-28 15:23:54', '您更新關鍵成果「123」的完成度為28%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^A13', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '2017-12-28 15:23:54', '您更新關鍵成果「123」的完成度為28%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^A14', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '2017-12-28 15:23:55', '您更新關鍵成果「123」的完成度為28%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^A15', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '2017-12-28 15:23:55', '您更新關鍵成果「123」的完成度為28%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^A16', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '2017-12-28 15:23:55', '您更新關鍵成果「123」的完成度為28%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^A17', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '2017-12-28 15:23:55', '您更新關鍵成果「123」的完成度為28%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^A18', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '2017-12-28 15:23:56', '您更新關鍵成果「123」的完成度為28%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^A19', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '2017-12-28 16:09:41', '您更新關鍵成果「123」的完成度為60%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^A2', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '2017-12-28 15:23:39', '您新增關鍵成果「321」。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^A3', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '2017-12-28 15:23:48', '您更新關鍵成果「123」的完成度為28%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^A4', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '2017-12-28 15:23:51', '您更新關鍵成果「123」的完成度為28%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^A5', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '2017-12-28 15:23:52', '您更新關鍵成果「123」的完成度為28%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^A6', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '2017-12-28 15:23:52', '您更新關鍵成果「123」的完成度為28%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^A7', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '2017-12-28 15:23:53', '您更新關鍵成果「123」的完成度為28%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^A8', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '2017-12-28 15:23:53', '您更新關鍵成果「123」的完成度為28%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^A9', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '2017-12-28 15:23:53', '您更新關鍵成果「123」的完成度為28%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^A0', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '2017-12-28 15:20:48', '您新增了「我們的網站好猛喔」的目標。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^A1', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '2017-12-28 15:21:00', '您新增關鍵成果「要變更猛喔1」。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^A10', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '2017-12-28 15:21:58', '您更新關鍵成果「要變更猛喔1」的完成度為47%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^A11', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '2017-12-28 15:22:00', '您更新關鍵成果「要變更猛喔1」的完成度為47%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^A12', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '2017-12-28 16:08:51', '您更新關鍵成果「要變更猛喔1」的完成度為84%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^A2', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '2017-12-28 15:21:11', '您新增關鍵成果「超級猛好了2」。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^A3', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '2017-12-28 15:21:26', '您更新關鍵成果「超級猛好了2」的完成度為35%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^A4', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '2017-12-28 15:21:27', '您更新關鍵成果「超級猛好了2」的完成度為35%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^A5', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '2017-12-28 15:21:29', '您更新關鍵成果「超級猛好了2」的完成度為35%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^A6', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '2017-12-28 15:21:31', '您更新關鍵成果「超級猛好了2」的完成度為35%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^A7', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '2017-12-28 15:21:33', '您更新關鍵成果「超級猛好了2」的完成度為35%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^A8', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '2017-12-28 15:21:34', '您更新關鍵成果「超級猛好了2」的完成度為35%。', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^A9', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '2017-12-28 15:21:43', '您更新關鍵成果「超級猛好了2」的完成度為35%。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q3O0^p^A0', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q3O0', '2017-12-28 10:02:36', '您新增了「testQ3」的目標。', 1),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q3O0^p^A1', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q3O0', '2017-12-28 10:02:43', '您新增關鍵成果「krQ3」。', 1),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q3O0^p^A2', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q3O0', '2017-12-28 10:03:19', '您更新關鍵成果「krQ3」的完成度為100%。', 1),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A0', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 09:51:31', '您新增了「測試一」的目標。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A1', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 09:51:49', '您新增關鍵成果「測試一kr00」。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A10', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 14:36:13', '您更新關鍵成果「測試一kr00」的完成度為70%。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A11', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 14:40:34', '您更新關鍵成果「測試一kr00」的完成度為100%。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A12', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 14:41:50', '您更新關鍵成果「測試一kr00」的完成度為65%。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A13', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 14:42:11', '您更新關鍵成果「測試一kr00」的完成度為28%。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A14', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 14:43:32', '您更新關鍵成果「測試一kr00」的完成度為37%。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A15', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 14:45:47', '您更新關鍵成果「測試一kr00」的完成度為67%。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A16', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 14:52:37', '您更新關鍵成果「測試一kr00」的完成度為42%。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A17', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 14:53:29', '您更新關鍵成果「測試一kr00」的完成度為31%。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A18', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 14:54:30', '您更新關鍵成果「測試一kr00」的完成度為56%。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A19', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 14:55:28', '您更新關鍵成果「測試一kr00」的完成度為86%。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A2', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 09:52:19', '您新增關鍵成果「測試一kr01」。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A20', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 14:56:09', '您更新關鍵成果「測試一kr01」的完成度為32%。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A21', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 14:56:31', '您更新關鍵成果「測試一kr01」的完成度為100%。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A22', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 15:04:01', '您更新關鍵成果「測試一kr00」的完成度為57%。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A23', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 15:15:13', '您更新關鍵成果「測試一kr01」的完成度為27%。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A24', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 15:15:28', '您更新關鍵成果「測試一kr01」的完成度為52%。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A3', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 09:52:46', '您更新關鍵成果「測試一kr01」的完成度為50%。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A4', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 09:56:52', '您更新關鍵成果「測試一kr00」的完成度為50%。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A5', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 09:57:47', '您更新關鍵成果「測試一kr01」的完成度為0%。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A6', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 09:58:29', '您新增了關鍵成果「123123」。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A7', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 09:59:45', '您刪除了關鍵成果「123123」。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A8', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 14:30:48', '您更新關鍵成果「測試一kr00」的完成度為100%。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^A9', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '2017-12-28 14:33:03', '您更新關鍵成果「測試一kr00」的完成度為10%。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^A0', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '2017-12-28 09:58:52', '您新增了「test2」的目標。', 1),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^A1', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '2017-12-28 09:58:57', '您新增關鍵成果「001kr」。', 1),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^A0', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '2017-12-28 14:19:56', '您新增了「2018新目標」的目標。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^A1', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '2017-12-28 14:20:22', '您新增關鍵成果「客戶對廣告平均滿意度達80分以上」。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^A2', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '2017-12-28 14:20:41', '您新增關鍵成果「關鍵人才培育計畫的執行率增加5%」。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^A3', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '2017-12-28 14:21:28', '您更新關鍵成果「關鍵人才培育計畫的執行率增加5%」的完成度為100%。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^A4', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '2017-12-28 14:32:04', '您更新關鍵成果「關鍵人才培育計畫的執行率增加5%」的完成度為50%。', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^A5', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '2017-12-28 14:37:58', '您更新關鍵成果「關鍵人才培育計畫的執行率增加5%」的完成度為100%。', 0);

-- --------------------------------------------------------

--
-- Table structure for table `act_like`
--

CREATE TABLE `act_like` (
  `Act_Like_ID` varchar(65) COLLATE utf8_bin NOT NULL COMMENT '讚ＩＤ(Obj_ID+^p^L00000)',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT '按讚者_UUID',
  `Obj_ID` varchar(56) COLLATE utf8_bin NOT NULL COMMENT '所屬目標ID',
  `Emp_Name` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '按讚者_姓名',
  `Img_URL` text COLLATE utf8_bin NOT NULL COMMENT '按讚者_圖片URL',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `act_like`
--

INSERT INTO `act_like` (`Act_Like_ID`, `Emp_UUID`, `Obj_ID`, `Emp_Name`, `Img_URL`, `Disable`) VALUES
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^L0', '81c48152-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '陳維漢', '/images/kong.png', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^L0', '81c48152-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '陳維漢', '/images/kong.png', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^L0', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '林庭緯', '/images/jerry.png', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^L1', '81c48152-d009-11e7-8c9e-a861ec7dace5', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '陳維漢', '/images/kong.png', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^L0', '81c48152-d009-11e7-8c9e-a861ec7dace5', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '陳維漢', '/images/kong.png', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^L1', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '林庭緯', '/images/jerry.png', 0);

-- --------------------------------------------------------

--
-- Table structure for table `backupmail`
--

CREATE TABLE `backupmail` (
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID',
  `BackUp_Mail` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '備用信箱',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `Cmp_ID` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '公司ID',
  `Cmp_Name` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '公司名稱',
  `Emp_Count` int(10) NOT NULL COMMENT '公司人數',
  `Dpm_Count` int(10) NOT NULL COMMENT '部門數',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`Cmp_ID`, `Cmp_Name`, `Emp_Count`, `Dpm_Count`, `Disable`) VALUES
('A001', 'Amazon', 10, 4, 0),
('C001', 'CMoney', 4, 4, 0),
('G001', 'Google', 12, 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `Dpm_ID` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '部門ID',
  `Cmp_ID` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '公司ID',
  `Dpm_Name` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '部門名稱',
  `Dmp_Count` int(10) NOT NULL COMMENT '部門人數',
  `Supervisor` varchar(36) COLLATE utf8_bin NOT NULL COMMENT '部門主管',
  `Description` text COLLATE utf8_bin NOT NULL COMMENT '部門內容',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`Dpm_ID`, `Cmp_ID`, `Dpm_Name`, `Dmp_Count`, `Supervisor`, `Description`, `Disable`) VALUES
('D001', 'C001', '資料管理部門', 0, 'wikeyno@gmail.com', 'Data management 資料管理部門', 0),
('E001', 'C001', '工程部門', 0, 'bggtank0102@gmail.com', 'Engineering 工程部門', 0),
('M001', 'C001', '行銷部門', 0, 'weichu0114@gmail.com', 'Marketing 行銷部門', 0),
('P001', 'C001', '產品企劃部門', 0, 'daivdxxxcc@gmail.com', 'Product 產品企劃部門', 0);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID',
  `Company` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '隸屬公司(Cmp_ID)',
  `Department` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '隸屬部門(Dpm_id)',
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
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`Emp_UUID`, `Company`, `Department`, `Position`, `Emp_Account`, `Password`, `Emp_Name`, `Img_URL`, `Ses_ID`, `Act_Setting`, `Act_AnotherData`, `Act_Permission`, `Avg_Progress`, `Disable`) VALUES
('5de4389a-d009-11e7-8c9e-a861ec7dace5', 'C001', 'E001', '工程部 / 部長', 'bggtank0102@gmail.com', 'okrroot', '林庭緯', '/images/jerry.png', 'C001^p^2017Q4', 'color: black', 'Engineering: supervisor', 0, 33, 0),
('81c47702-d009-11e7-8c9e-a861ec7dace5', 'C001', 'P001', '產品部 / 部長', 'daivdxxxcc@gmail.com', 'okrroot', '張辰豪', '/images/frank.png', 'C001^p^2017Q3', 'color: blue', 'Product: supervisor', 0, 0, 0),
('81c47e46-d009-11e7-8c9e-a861ec7dace5', 'C001', 'M001', '行銷部 / 部長', 'weichu0114@gmail.com', 'okrroot', '廖韋筑', '/images/anvis.png', 'C001^p^2017Q2', 'color:purple', 'Marketing: supervisor', 0, 0, 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5', 'C001', 'D001', '資訊部 / 部長', 'wikeyno@gmail.com', 'okrroot', '陳維漢', '/images/kong.png', 'C001^p^2017Q1', 'color: white', 'Data_management: supervisor', 0, 55, 0);

--
-- Triggers `employee`
--
DELIMITER $$
CREATE TRIGGER `before_insert_tablename` BEFORE INSERT ON `employee` FOR EACH ROW BEGIN
    SET new.Emp_UUID = uuid();
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `key_result`
--

CREATE TABLE `key_result` (
  `KR_ID` varchar(64) COLLATE utf8_bin NOT NULL COMMENT '關鍵成果ID',
  `Obj_ID` varchar(56) COLLATE utf8_bin NOT NULL COMMENT '隸屬目標ID',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID',
  `KR_Progress` int(3) NOT NULL COMMENT 'key result 達成率',
  `KR_Text` text COLLATE utf8_bin NOT NULL COMMENT '關鍵成果內容',
  `His_KR_Text` text COLLATE utf8_bin NOT NULL COMMENT '歷史修改關鍵成果內容',
  `CreatTime` datetime NOT NULL COMMENT '建立時間',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `key_result`
--

INSERT INTO `key_result` (`KR_ID`, `Obj_ID`, `Emp_UUID`, `KR_Progress`, `KR_Text`, `His_KR_Text`, `CreatTime`, `Disable`) VALUES
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^KR0', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '5de4389a-d009-11e7-8c9e-a861ec7dace5', 0, '庭緯的新成果1', '', '2017-12-28 15:16:44', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^KR1', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '5de4389a-d009-11e7-8c9e-a861ec7dace5', 70, '庭緯新關鍵成果2', '', '2017-12-28 15:17:24', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^KR0', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '5de4389a-d009-11e7-8c9e-a861ec7dace5', 60, '123', '', '2017-12-28 15:23:35', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^KR1', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '5de4389a-d009-11e7-8c9e-a861ec7dace5', 0, '321', '', '2017-12-28 15:23:39', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^KR0', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '5de4389a-d009-11e7-8c9e-a861ec7dace5', 84, '要變更猛喔1', '', '2017-12-28 15:21:00', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^KR1', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '5de4389a-d009-11e7-8c9e-a861ec7dace5', 35, '超級猛好了2', '', '2017-12-28 15:21:11', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q3O0^p^KR0', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q3O0', '81c48152-d009-11e7-8c9e-a861ec7dace5', 100, 'krQ3', '', '2017-12-28 10:02:43', 1),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^KR0', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '81c48152-d009-11e7-8c9e-a861ec7dace5', 57, '測試一kr00', '', '2017-12-28 09:51:49', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^KR1', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '81c48152-d009-11e7-8c9e-a861ec7dace5', 52, '測試一kr01', '', '2017-12-28 09:52:19', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^KR2', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '81c48152-d009-11e7-8c9e-a861ec7dace5', 0, '123123', '', '2017-12-28 09:58:29', 1),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^KR0', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '81c48152-d009-11e7-8c9e-a861ec7dace5', 0, '001kr', '', '2017-12-28 09:58:57', 1),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^KR0', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '81c48152-d009-11e7-8c9e-a861ec7dace5', 0, '客戶對廣告平均滿意度達80分以上', '', '2017-12-28 14:20:22', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^KR1', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '81c48152-d009-11e7-8c9e-a861ec7dace5', 100, '關鍵人才培育計畫的執行率增加5%', '', '2017-12-28 14:20:41', 0);

-- --------------------------------------------------------

--
-- Table structure for table `kr_category`
--

CREATE TABLE `kr_category` (
  `kr_category_ID` int(11) NOT NULL COMMENT '分類ID',
  `kr_category_text` text COLLATE utf8_bin NOT NULL COMMENT '分類名稱 ',
  `Disable` tinyint(4) NOT NULL COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `kr_category`
--

INSERT INTO `kr_category` (`kr_category_ID`, `kr_category_text`, `Disable`) VALUES
(1, '工程研發類', 0),
(2, '行銷企劃類', 0),
(3, '人力資源類', 0);

-- --------------------------------------------------------

--
-- Table structure for table `kr_comment`
--

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
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `kr_suggestion`
--

CREATE TABLE `kr_suggestion` (
  `kr_sug_ID` int(11) NOT NULL COMMENT '建議kr ID',
  `kr_category_ID` int(11) NOT NULL COMMENT '建議kr 分類',
  `kr_sug_text` text COLLATE utf8_bin NOT NULL COMMENT '建議kr 內容',
  `Disable` tinyint(4) NOT NULL COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `kr_suggestion`
--

INSERT INTO `kr_suggestion` (`kr_sug_ID`, `kr_category_ID`, `kr_sug_text`, `Disable`) VALUES
(11, 1, '加快關鍵子系統效能達成率', 0),
(12, 1, '提升伺服器可靠性', 0),
(13, 1, '無效的研發成本與總研發成本發生率', 0),
(14, 2, '廣告預算執行率達9成', 0),
(15, 2, '客戶對廣告平均滿意度達80分以上', 0),
(16, 2, '網路廣告點閱人次達50萬次', 0),
(17, 3, '達成關鍵人才培育計畫90%執行率', 0),
(18, 3, '建置完成儲備幹部計畫80%進度', 0),
(19, 3, '平均職缺人員遞補天數45天', 0);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `NF_ID` varchar(62) COLLATE utf8_bin NOT NULL COMMENT '通知ID(UUID+SesID)',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID',
  `Obj_ID` varchar(56) COLLATE utf8_bin DEFAULT NULL COMMENT '所屬目標ID',
  `Emp_Name` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '留言者_姓名',
  `Img_URL` text COLLATE utf8_bin NOT NULL COMMENT '留言者_圖片',
  `Is_Read` tinyint(1) NOT NULL COMMENT '已讀',
  `NF_Text` text COLLATE utf8_bin NOT NULL COMMENT '通知內容',
  `NF_Link` text COLLATE utf8_bin NOT NULL COMMENT '通知連結',
  `CreatTime` datetime NOT NULL COMMENT '創立時間',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`NF_ID`, `Emp_UUID`, `Obj_ID`, `Emp_Name`, `Img_URL`, `Is_Read`, `NF_Text`, `NF_Link`, `CreatTime`, `Disable`) VALUES
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^NF0', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '陳維漢', '/images/kong.png', 0, '對你的目標按讚', '/profile/?season=201704', '2017-12-28 15:58:58', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^NF1', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '陳維漢', '/images/kong.png', 1, '對你的目標留言', '/profile/?season=201704', '2017-12-28 15:19:17', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^NF2', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '陳維漢', '/images/kong.png', 0, '對你的目標留言', '/profile/?season=201704', '2017-12-28 15:19:25', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^NF0', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '陳維漢', '/images/kong.png', 0, '對你的目標留言', '/profile/?season=201704', '2017-12-28 15:37:32', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^NF1', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '陳維漢', '/images/kong.png', 0, '對你的目標按讚', '/profile/?season=201704', '2017-12-28 15:37:40', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^NF2', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '陳維漢', '/images/kong.png', 0, '對你的目標留言', '/profile/?season=201704', '2017-12-28 15:37:47', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^NF3', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '陳維漢', '/images/kong.png', 1, '對你的目標留言', '/profile/?season=201704', '2017-12-28 16:00:22', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^NF0', '81c48152-d009-11e7-8c9e-a861ec7dace5', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '林庭緯', '/images/jerry.png', 1, '對你的目標按讚', '/profile/?season=201704', '2017-12-28 15:17:58', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^NF1', '81c48152-d009-11e7-8c9e-a861ec7dace5', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '林庭緯', '/images/jerry.png', 1, '對你的目標留言', '/profile/?season=201704', '2017-12-28 15:36:34', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^NF0', '81c48152-d009-11e7-8c9e-a861ec7dace5', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '林庭緯', '/images/jerry.png', 1, '對你的目標按讚', '/profile/?season=201801', '2017-12-28 15:18:01', 0);

-- --------------------------------------------------------

--
-- Table structure for table `objective`
--

CREATE TABLE `objective` (
  `Obj_ID` varchar(56) COLLATE utf8_bin NOT NULL COMMENT '目標ID',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID',
  `Ses_ID` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '季度ID',
  `Reaching_Rate` int(10) NOT NULL COMMENT '達成率',
  `Obj_Text` text COLLATE utf8_bin NOT NULL COMMENT '目標內容',
  `His_Obj_Text` text COLLATE utf8_bin NOT NULL COMMENT '歷史修改目標內容',
  `CreatTime` datetime NOT NULL COMMENT '創立時間',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `objective`
--

INSERT INTO `objective` (`Obj_ID`, `Emp_UUID`, `Ses_ID`, `Reaching_Rate`, `Obj_Text`, `His_Obj_Text`, `CreatTime`, `Disable`) VALUES
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '5de4389a-d009-11e7-8c9e-a861ec7dace5', 'C001^p^2017Q4', 35, '庭緯的新目標', '', '2017-12-28 15:16:23', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '5de4389a-d009-11e7-8c9e-a861ec7dace5', 'C001^p^2017Q4', 30, 'test', '', '2017-12-28 15:23:31', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '5de4389a-d009-11e7-8c9e-a861ec7dace5', 'C001^p^2018Q1', 60, '我們的網站好猛喔', '', '2017-12-28 15:20:48', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q3O0', '81c48152-d009-11e7-8c9e-a861ec7dace5', 'C001^p^2017Q3', 100, 'testQ3', '', '2017-12-28 10:02:36', 1),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '81c48152-d009-11e7-8c9e-a861ec7dace5', 'C001^p^2017Q4', 55, '測試一', '', '2017-12-28 09:51:31', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '81c48152-d009-11e7-8c9e-a861ec7dace5', 'C001^p^2017Q4', 0, 'test2', '', '2017-12-28 09:58:52', 1),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '81c48152-d009-11e7-8c9e-a861ec7dace5', 'C001^p^2018Q1', 50, '2018新目標', '', '2017-12-28 14:19:56', 0);

-- --------------------------------------------------------

--
-- Table structure for table `obj_comment`
--

CREATE TABLE `obj_comment` (
  `Obj_Com_ID` varchar(64) COLLATE utf8_bin NOT NULL COMMENT 'Obj留言ID',
  `Obj_ID` varchar(56) COLLATE utf8_bin NOT NULL COMMENT '隸屬目標ID',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT '留言者_UUID',
  `Emp_Name` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '留言者_姓名',
  `Img_URL` text COLLATE utf8_bin NOT NULL COMMENT '留言者_圖片',
  `Com_Text` text COLLATE utf8_bin NOT NULL COMMENT '留言內容',
  `His_Com_Text` text COLLATE utf8_bin NOT NULL COMMENT '歷史修改留言內容',
  `CreatTime` datetime NOT NULL COMMENT '創立時間',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `obj_comment`
--

INSERT INTO `obj_comment` (`Obj_Com_ID`, `Obj_ID`, `Emp_UUID`, `Emp_Name`, `Img_URL`, `Com_Text`, `His_Com_Text`, `CreatTime`, `Disable`) VALUES
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^OC0', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '81c48152-d009-11e7-8c9e-a861ec7dace5', '陳維漢', '/images/kong.png', '挖~ 好酷的目標', '', '2017-12-28 15:19:17', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^OC1', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '81c48152-d009-11e7-8c9e-a861ec7dace5', '陳維漢', '/images/kong.png', '這樣', '', '2017-12-28 15:19:25', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^OC2', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '林庭緯', '/images/jerry.png', 'ㄏㄏ', '', '2017-12-28 15:20:30', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^OC0', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '林庭緯', '/images/jerry.png', '我說阿', '', '2017-12-28 15:36:58', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^OC1', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '81c48152-d009-11e7-8c9e-a861ec7dace5', '陳維漢', '/images/kong.png', '說甚麼?', '', '2017-12-28 15:37:32', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^OC2', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '81c48152-d009-11e7-8c9e-a861ec7dace5', '陳維漢', '/images/kong.png', '給你一個讚', '', '2017-12-28 15:37:47', 0),
('5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1^p^OC3', '5de4389a-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O1', '81c48152-d009-11e7-8c9e-a861ec7dace5', '陳維漢', '/images/kong.png', 'cc', '', '2017-12-28 16:00:22', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0^p^OC0', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O0', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '林庭緯', '/images/jerry.png', 'yo', '', '2017-12-28 15:36:34', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0^p^OC0', '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2018Q1O0', '81c48152-d009-11e7-8c9e-a861ec7dace5', '陳維漢', '/images/kong.png', '我喔', '', '2017-12-28 16:05:37', 0);

-- --------------------------------------------------------

--
-- Table structure for table `recent`
--

CREATE TABLE `recent` (
  `Rec_ID` int(11) NOT NULL COMMENT '最近觀看ID',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'user_ID',
  `Rec_Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT '我看了誰的ID',
  `CreatTime` datetime NOT NULL COMMENT '最近觀看時間',
  `Disable` tinyint(4) NOT NULL COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `recent`
--

INSERT INTO `recent` (`Rec_ID`, `Emp_UUID`, `Rec_Emp_UUID`, `CreatTime`, `Disable`) VALUES
(142, '81c48152-d009-11e7-8c9e-a861ec7dace5', '81c47702-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 14:17:03', 0),
(143, '81c48152-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 14:26:06', 0),
(144, '81c48152-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 14:26:06', 0),
(145, '81c48152-d009-11e7-8c9e-a861ec7dace5', '81c47702-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 14:26:25', 0),
(146, '81c48152-d009-11e7-8c9e-a861ec7dace5', '81c47e46-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 14:26:34', 0),
(147, '5de4389a-d009-11e7-8c9e-a861ec7dace5', '81c48152-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 15:17:56', 0),
(148, '81c48152-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 15:18:34', 0),
(149, '81c48152-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 15:19:52', 0),
(150, '5de4389a-d009-11e7-8c9e-a861ec7dace5', '81c48152-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 15:28:29', 0),
(151, '5de4389a-d009-11e7-8c9e-a861ec7dace5', '81c48152-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 15:36:25', 0),
(152, '81c48152-d009-11e7-8c9e-a861ec7dace5', '81c47702-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 15:37:22', 0),
(153, '81c48152-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 15:37:25', 0),
(154, '81c48152-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 15:37:25', 0),
(155, '81c48152-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 15:37:25', 0),
(156, '81c48152-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 15:37:54', 0),
(157, '81c48152-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 15:49:01', 0),
(158, '81c48152-d009-11e7-8c9e-a861ec7dace5', '81c47702-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 15:49:14', 0),
(159, '81c48152-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 15:49:17', 0),
(160, '81c48152-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 15:51:28', 0),
(161, '81c48152-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 15:54:40', 0),
(162, '81c48152-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 15:54:40', 0),
(163, '81c48152-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 15:55:49', 0),
(164, '81c48152-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 15:56:07', 0),
(165, '81c48152-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 15:58:54', 0),
(166, '81c48152-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 16:00:17', 0),
(167, '81c48152-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 16:05:45', 0),
(168, '81c48152-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 16:06:36', 0),
(169, '81c48152-d009-11e7-8c9e-a861ec7dace5', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '2017-12-28 16:06:41', 0);

-- --------------------------------------------------------

--
-- Table structure for table `season`
--

CREATE TABLE `season` (
  `Ses_ID` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Cmp_ID` varchar(15) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '公司ID',
  `Ses_Name` varchar(15) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '季度名稱',
  `Strat_Day` date NOT NULL COMMENT '開始日期',
  `End_Day` date NOT NULL COMMENT '結束日期',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `season`
--

INSERT INTO `season` (`Ses_ID`, `Cmp_ID`, `Ses_Name`, `Strat_Day`, `End_Day`, `Disable`) VALUES
('C001^p^2017Q1', 'C001', '201701', '2017-01-01', '2017-03-31', 0),
('C001^p^2017Q2', 'C001', '201702', '2017-04-01', '2017-06-30', 0),
('C001^p^2017Q3', 'C001', '201703', '2017-07-01', '2017-09-30', 0),
('C001^p^2017Q4', 'C001', '201704', '2017-10-01', '2017-12-31', 0),
('C001^p^2018Q1', 'C001', '201801', '2018-01-01', '2018-03-31', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`Atv_ID`),
  ADD KEY `Obj_ID` (`Obj_ID`);

--
-- Indexes for table `act_like`
--
ALTER TABLE `act_like`
  ADD PRIMARY KEY (`Act_Like_ID`),
  ADD KEY `Emp_UUID` (`Emp_UUID`),
  ADD KEY `Obj_ID` (`Obj_ID`);

--
-- Indexes for table `backupmail`
--
ALTER TABLE `backupmail`
  ADD PRIMARY KEY (`Emp_UUID`),
  ADD KEY `Emp_UUID` (`Emp_UUID`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`Cmp_ID`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`Dpm_ID`),
  ADD KEY `Cmp_ID` (`Cmp_ID`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`Emp_UUID`),
  ADD KEY `Company` (`Company`),
  ADD KEY `Department` (`Department`);

--
-- Indexes for table `key_result`
--
ALTER TABLE `key_result`
  ADD PRIMARY KEY (`KR_ID`),
  ADD KEY `Obj_ID` (`Obj_ID`),
  ADD KEY `Emp_UUID` (`Emp_UUID`);

--
-- Indexes for table `kr_category`
--
ALTER TABLE `kr_category`
  ADD PRIMARY KEY (`kr_category_ID`);

--
-- Indexes for table `kr_comment`
--
ALTER TABLE `kr_comment`
  ADD PRIMARY KEY (`KR_Com_ID`),
  ADD KEY `KR_ID` (`KR_ID`),
  ADD KEY `Obj_ID` (`Obj_ID`),
  ADD KEY `Emp_UUID` (`Emp_UUID`);

--
-- Indexes for table `kr_suggestion`
--
ALTER TABLE `kr_suggestion`
  ADD PRIMARY KEY (`kr_sug_ID`),
  ADD KEY `kr_category_ID` (`kr_category_ID`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`NF_ID`),
  ADD KEY `Emp_UUID` (`Emp_UUID`),
  ADD KEY `Obj_ID` (`Obj_ID`);

--
-- Indexes for table `objective`
--
ALTER TABLE `objective`
  ADD PRIMARY KEY (`Obj_ID`),
  ADD KEY `Emp_UUID` (`Emp_UUID`),
  ADD KEY `Ses_ID` (`Ses_ID`);

--
-- Indexes for table `obj_comment`
--
ALTER TABLE `obj_comment`
  ADD PRIMARY KEY (`Obj_Com_ID`),
  ADD KEY `Obj_ID` (`Obj_ID`),
  ADD KEY `Emp_UUID` (`Emp_UUID`);

--
-- Indexes for table `recent`
--
ALTER TABLE `recent`
  ADD PRIMARY KEY (`Rec_ID`),
  ADD KEY `Emp_UUID` (`Emp_UUID`),
  ADD KEY `Rec_Emp_UUID` (`Rec_Emp_UUID`);

--
-- Indexes for table `season`
--
ALTER TABLE `season`
  ADD PRIMARY KEY (`Ses_ID`),
  ADD KEY `Cmp_ID` (`Cmp_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kr_category`
--
ALTER TABLE `kr_category`
  MODIFY `kr_category_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '分類ID', AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `kr_suggestion`
--
ALTER TABLE `kr_suggestion`
  MODIFY `kr_sug_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '建議kr ID', AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `recent`
--
ALTER TABLE `recent`
  MODIFY `Rec_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '最近觀看ID', AUTO_INCREMENT=170;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`Obj_ID`) REFERENCES `objective` (`Obj_ID`);

--
-- Constraints for table `act_like`
--
ALTER TABLE `act_like`
  ADD CONSTRAINT `act_like_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`),
  ADD CONSTRAINT `act_like_ibfk_2` FOREIGN KEY (`Obj_ID`) REFERENCES `objective` (`Obj_ID`);

--
-- Constraints for table `backupmail`
--
ALTER TABLE `backupmail`
  ADD CONSTRAINT `backupmail_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`);

--
-- Constraints for table `department`
--
ALTER TABLE `department`
  ADD CONSTRAINT `department_ibfk_1` FOREIGN KEY (`Cmp_ID`) REFERENCES `company` (`Cmp_ID`);

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`Company`) REFERENCES `company` (`Cmp_ID`),
  ADD CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`Department`) REFERENCES `department` (`Dpm_ID`);

--
-- Constraints for table `key_result`
--
ALTER TABLE `key_result`
  ADD CONSTRAINT `key_result_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`),
  ADD CONSTRAINT `key_result_ibfk_2` FOREIGN KEY (`Obj_ID`) REFERENCES `objective` (`Obj_ID`);

--
-- Constraints for table `kr_comment`
--
ALTER TABLE `kr_comment`
  ADD CONSTRAINT `kr_comment_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`),
  ADD CONSTRAINT `kr_comment_ibfk_2` FOREIGN KEY (`KR_ID`) REFERENCES `key_result` (`KR_ID`),
  ADD CONSTRAINT `kr_comment_ibfk_3` FOREIGN KEY (`Obj_ID`) REFERENCES `objective` (`Obj_ID`);

--
-- Constraints for table `kr_suggestion`
--
ALTER TABLE `kr_suggestion`
  ADD CONSTRAINT `kr_suggestion_ibfk_1` FOREIGN KEY (`kr_category_ID`) REFERENCES `kr_category` (`kr_category_ID`);

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`),
  ADD CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`Obj_ID`) REFERENCES `objective` (`Obj_ID`);

--
-- Constraints for table `objective`
--
ALTER TABLE `objective`
  ADD CONSTRAINT `objective_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`),
  ADD CONSTRAINT `objective_ibfk_2` FOREIGN KEY (`Ses_ID`) REFERENCES `season` (`Ses_ID`);

--
-- Constraints for table `obj_comment`
--
ALTER TABLE `obj_comment`
  ADD CONSTRAINT `obj_comment_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`),
  ADD CONSTRAINT `obj_comment_ibfk_2` FOREIGN KEY (`Obj_ID`) REFERENCES `objective` (`Obj_ID`);

--
-- Constraints for table `recent`
--
ALTER TABLE `recent`
  ADD CONSTRAINT `recent_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`),
  ADD CONSTRAINT `recent_ibfk_2` FOREIGN KEY (`Rec_Emp_UUID`) REFERENCES `employee` (`Emp_UUID`);

--
-- Constraints for table `season`
--
ALTER TABLE `season`
  ADD CONSTRAINT `season_ibfk_1` FOREIGN KEY (`Cmp_ID`) REFERENCES `company` (`Cmp_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
