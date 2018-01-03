-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Nov 23, 2017 at 08:15 AM
-- Server version: 5.6.35
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `test_okr_sys01`
--

-- --------------------------------------------------------

--
-- Table structure for table `act_like`
--

CREATE TABLE `act_like` (
  `Act_Like_ID` varchar(15) COLLATE utf8_bin NOT NULL,
  `Source` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '來源(Objective or KR or Objective_Comment or KR_Comment)',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `backupmail`
--

CREATE TABLE `backupmail` (
  `BackUp_Mail` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '備用信箱',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID'
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
  `Cmp_ID` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '公司ID',
  `Dpm_ID` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '部門ID',
  `Description` text COLLATE utf8_bin NOT NULL COMMENT '部門內容',
  `Dpm_Name` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '部門名稱',
  `Dmp_Count` int(10) NOT NULL COMMENT '部門人數',
  `Supervisor` varchar(36) COLLATE utf8_bin NOT NULL COMMENT '部門主管',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`Cmp_ID`, `Dpm_ID`, `Description`, `Dpm_Name`, `Dmp_Count`, `Supervisor`, `Disable`) VALUES
('C001', 'D001', 'Data management 資料管理部門', 'Data_management', 0, 'wikeyno@gmail.com', 0),
('C001', 'E001', 'Engineering 工程部門', ' Engineering', 0, 'bggtank0102@gmail.com', 0),
('C001', 'M001', 'Marketing 行銷部門', 'Marketing', 0, 'weichu0114@gmail.com', 0),
('C001', 'P001', 'Product 產品企劃部門', 'Product', 0, 'daivdxxxcc@gmail.com', 0);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID',
  `Emp_Account` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '員工帳號',
  `Password` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '密碼',
  `Act_Permission` int(5) NOT NULL COMMENT '帳號權限',
  `Emp_Name` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '員工名稱',
  `Act_Setting` text COLLATE utf8_bin NOT NULL COMMENT '帳號偏好設定',
  `Act_AnotherData` text COLLATE utf8_bin NOT NULL COMMENT '帳號雜項',
  `Company` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '隸屬公司(Cmp_ID)',
  `Department` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '隸屬部門(Dpm_id)',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`Emp_UUID`, `Emp_Account`, `Password`, `Act_Permission`, `Emp_Name`, `Act_Setting`, `Act_AnotherData`, `Company`, `Department`, `Disable`) VALUES
('5de4389a-d009-11e7-8c9e-a861ec7dace5', 'bggtank0102@gmail.com', 'okrroot', 0, '林庭緯', 'color: black', 'Engineering: supervisor', 'C001', 'E001', 0),
('81c47702-d009-11e7-8c9e-a861ec7dace5', 'daivdxxxcc@gmail.com', 'okrroot', 0, '張辰豪', 'color: blue', 'Product: supervisor', 'C001', 'P001', 0),
('81c47e46-d009-11e7-8c9e-a861ec7dace5', 'weichu0114@gmail.com', 'okrroot', 0, '廖韋筑', 'color:purple', 'Marketing: supervisor', 'C001', 'M001', 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5', 'wikeyno@gmail.com', 'okrroot', 0, '陳維漢', 'color: white', 'Data_management: supervisor', 'C001', 'D001', 0);

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
  `Obj_ID` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '隸屬目標ID',
  `KR_ID` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '關鍵成果ID',
  `Score` int(10) NOT NULL COMMENT '分數',
  `KR_Text` text COLLATE utf8_bin NOT NULL COMMENT '關鍵成果內容',
  `His_KR_Text` text COLLATE utf8_bin NOT NULL COMMENT '歷史修改關鍵成果內容',
  `UpdateTime` datetime NOT NULL COMMENT '最近更新時間',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `kr_comment`
--

CREATE TABLE `kr_comment` (
  `Obj_ID` varchar(15) COLLATE utf8_bin DEFAULT NULL COMMENT '隸屬目標ID',
  `KR_ID` varchar(15) COLLATE utf8_bin DEFAULT NULL COMMENT '隸屬關鍵成果ID',
  `KR_Com_ID` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '關鍵成果留言ID',
  `UpdateTime` datetime DEFAULT NULL COMMENT '最近更新時間',
  `Com_Text` text COLLATE utf8_bin COMMENT '留言內容',
  `His_Com_Text` text COLLATE utf8_bin COMMENT '歷史修改留言內容',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `NF_ID` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '通知ID',
  `UpdateTome` datetime NOT NULL COMMENT '最近更新時間',
  `Is_Read` tinyint(1) NOT NULL COMMENT '已讀',
  `NF_Text` text COLLATE utf8_bin NOT NULL COMMENT '通知內容',
  `NF_Link` text COLLATE utf8_bin NOT NULL COMMENT '通知連結',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `objective`
--

CREATE TABLE `objective` (
  `Obj_ID` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '目標ID',
  `Reaching_Rate` int(10) NOT NULL COMMENT '達成率',
  `Obj_Text` text COLLATE utf8_bin NOT NULL COMMENT '目標內容',
  `His_Obj_Text` text COLLATE utf8_bin NOT NULL COMMENT '歷史修改目標內容',
  `UpdateTime` datetime NOT NULL COMMENT '最近更新時間',
  `Season` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '季度名稱',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `obj_comment`
--

CREATE TABLE `obj_comment` (
  `Obj_ID` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '隸屬目標ID',
  `Obj_Com_ID` varchar(15) COLLATE utf8_bin NOT NULL COMMENT 'Obj留言ID',
  `UpdateTime` datetime NOT NULL COMMENT '最近更新時間',
  `Com_Text` text COLLATE utf8_bin NOT NULL COMMENT '留言內容',
  `His_Com_Text` text COLLATE utf8_bin NOT NULL COMMENT '歷史修改留言內容',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `season`
--

CREATE TABLE `season` (
  `Cmp_ID` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '公司ID',
  `Ses_Name` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '季度名稱',
  `Strat_Day` date NOT NULL COMMENT '開始日期',
  `End_Day` date NOT NULL COMMENT '結束日期',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `act_like`
--
ALTER TABLE `act_like`
  ADD PRIMARY KEY (`Act_Like_ID`),
  ADD KEY `Emp_UUID` (`Emp_UUID`);

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
-- Indexes for table `kr_comment`
--
ALTER TABLE `kr_comment`
  ADD PRIMARY KEY (`KR_Com_ID`),
  ADD KEY `KR_ID` (`KR_ID`),
  ADD KEY `Obj_ID` (`Obj_ID`),
  ADD KEY `Emp_UUID` (`Emp_UUID`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`NF_ID`),
  ADD KEY `Emp_UUID` (`Emp_UUID`);

--
-- Indexes for table `objective`
--
ALTER TABLE `objective`
  ADD PRIMARY KEY (`Obj_ID`),
  ADD KEY `Season` (`Season`),
  ADD KEY `Emp_UUID` (`Emp_UUID`);

--
-- Indexes for table `obj_comment`
--
ALTER TABLE `obj_comment`
  ADD PRIMARY KEY (`Obj_Com_ID`),
  ADD KEY `Obj_ID` (`Obj_ID`),
  ADD KEY `Emp_UUID` (`Emp_UUID`);

--
-- Indexes for table `season`
--
ALTER TABLE `season`
  ADD PRIMARY KEY (`Ses_Name`),
  ADD KEY `Cmp_ID` (`Cmp_ID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `act_like`
--
ALTER TABLE `act_like`
  ADD CONSTRAINT `act_like_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`);

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
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`);

--
-- Constraints for table `objective`
--
ALTER TABLE `objective`
  ADD CONSTRAINT `objective_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`),
  ADD CONSTRAINT `objective_ibfk_2` FOREIGN KEY (`Season`) REFERENCES `season` (`Ses_Name`);

--
-- Constraints for table `obj_comment`
--
ALTER TABLE `obj_comment`
  ADD CONSTRAINT `obj_comment_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`),
  ADD CONSTRAINT `obj_comment_ibfk_2` FOREIGN KEY (`Obj_ID`) REFERENCES `objective` (`Obj_ID`);

--
-- Constraints for table `season`
--
ALTER TABLE `season`
  ADD CONSTRAINT `season_ibfk_1` FOREIGN KEY (`Cmp_ID`) REFERENCES `company` (`Cmp_ID`);
