-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 02, 2018 at 09:58 AM
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
-- Database: `test_okr`
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
('C001', 'CMoney', 5, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `Dpm_ID` int(11) NOT NULL COMMENT '部門ID',
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
(1, 'C001', '理財寶企劃組', 5, '', '理財寶企劃組', 0);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

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
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`Emp_UUID`, `Company`, `Department`, `Position`, `Emp_Account`, `Password`, `Emp_Name`, `Img_URL`, `Ses_ID`, `Act_Setting`, `Act_AnotherData`, `Act_Permission`, `Avg_Progress`, `Disable`) VALUES
('169d1c97-efa2-11e7-9108-74d02b1dfe7c', 'C001', 1, '理財寶企劃組/產品經理', 'terry_lai@cmoney.com.tw', '123456', '賴承佑', '', 'C001^p^2018Q1', '', '', 0, 0, 0),
('7482549f-efa2-11e7-9108-74d02b1dfe7c', 'C001', 1, '理財寶企劃組/產品經理', 'sean_lin@cmoney.com.tw', '123456', '林孟勳', '', 'C001^p^2018Q1', '', '', 0, 0, 0),
('9451eb70-efa2-11e7-9108-74d02b1dfe7c', 'C001', 1, '理財寶企劃組/產品經理', 'bon_chen@cmoney.com.tw', '123456', '陳定邦', '', 'C001^p^2018Q1', '', '', 0, 0, 0),
('abde7ab2-efa2-11e7-9108-74d02b1dfe7c', 'C001', 1, '理財寶企劃組/產品經理', 'tim_wu@cmoney.com.tw', '123456', '吳侑庭', '', 'C001^p^2018Q1', '', '', 0, 0, 0),
('bf962f65-efa2-11e7-9108-74d02b1dfe7c', 'C001', 1, '理財寶企劃組/產品經理', 'danny@cmoney.com.tw', '123456', '陳建銘', '', 'C001^p^2018Q1', '', '', 0, 0, 0),
('dd7b0669-efa2-11e7-9108-74d02b1dfe7c', 'C001', 1, '理財寶企劃組/UI設計師', 'piper_chien@cmoney.com.tw', '123456', '簡潔安', '', 'C001^p^2018Q1', '', '', 0, 0, 0);

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
('C001^p^2018Q1', 'C001', '201801', '2018-01-01', '2018-03-31', 0),
('C001^p^2018Q2', 'C001', '201802', '2018-04-01', '2018-06-30', 0);

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
  ADD KEY `Department` (`Department`),
  ADD KEY `Ses_ID` (`Ses_ID`);

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
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `Dpm_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '部門ID', AUTO_INCREMENT=2;
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
  MODIFY `Rec_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '最近觀看ID';
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
  ADD CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`Department`) REFERENCES `department` (`Dpm_ID`),
  ADD CONSTRAINT `employee_ibfk_3` FOREIGN KEY (`Company`) REFERENCES `company` (`Cmp_ID`),
  ADD CONSTRAINT `employee_ibfk_4` FOREIGN KEY (`Ses_ID`) REFERENCES `season` (`Ses_ID`);

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
