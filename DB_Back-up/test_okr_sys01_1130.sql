-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- 主機: localhost:3307
-- 產生時間： 2017 年 11 月 30 日 07:41
-- 伺服器版本: 5.6.35
-- PHP 版本： 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- 資料庫： `test_okr_sys01`
--

-- --------------------------------------------------------

--
-- 資料表結構 `act_like`
--

CREATE TABLE `act_like` (
  `Act_Like_ID` varchar(15) COLLATE utf8_bin NOT NULL,
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID',
  `Source` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '來源(Objective or KR or Objective_Comment or KR_Comment)',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 資料表結構 `backupmail`
--

CREATE TABLE `backupmail` (
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID',
  `BackUp_Mail` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '備用信箱',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 資料表結構 `company`
--

CREATE TABLE `company` (
  `Cmp_ID` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '公司ID',
  `Cmp_Name` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '公司名稱',
  `Emp_Count` int(10) NOT NULL COMMENT '公司人數',
  `Dpm_Count` int(10) NOT NULL COMMENT '部門數',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 資料表的匯出資料 `company`
--

INSERT INTO `company` (`Cmp_ID`, `Cmp_Name`, `Emp_Count`, `Dpm_Count`, `Disable`) VALUES
('A001', 'Amazon', 10, 4, 0),
('C001', 'CMoney', 4, 4, 0),
('G001', 'Google', 12, 4, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `department`
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
-- 資料表的匯出資料 `department`
--

INSERT INTO `department` (`Dpm_ID`, `Cmp_ID`, `Dpm_Name`, `Dmp_Count`, `Supervisor`, `Description`, `Disable`) VALUES
('D001', 'C001', 'Data_management', 0, 'wikeyno@gmail.com', 'Data management 資料管理部門', 0),
('E001', 'C001', ' Engineering', 0, 'bggtank0102@gmail.com', 'Engineering 工程部門', 0),
('M001', 'C001', 'Marketing', 0, 'weichu0114@gmail.com', 'Marketing 行銷部門', 0),
('P001', 'C001', 'Product', 0, 'daivdxxxcc@gmail.com', 'Product 產品企劃部門', 0);

-- --------------------------------------------------------

--
-- 資料表結構 `employee`
--

CREATE TABLE `employee` (
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID',
  `Company` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '隸屬公司(Cmp_ID)',
  `Department` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '隸屬部門(Dpm_id)',
  `Position` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '職位',
  `Emp_Account` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '員工帳號',
  `Password` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '密碼',
  `Emp_Name` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '員工名稱',
  `Act_Setting` text COLLATE utf8_bin NOT NULL COMMENT '帳號偏好設定',
  `Act_AnotherData` text COLLATE utf8_bin NOT NULL COMMENT '帳號雜項',
  `Act_Permission` int(5) NOT NULL COMMENT '帳號權限',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 資料表的匯出資料 `employee`
--

INSERT INTO `employee` (`Emp_UUID`, `Company`, `Department`, `Position`, `Emp_Account`, `Password`, `Emp_Name`, `Act_Setting`, `Act_AnotherData`, `Act_Permission`, `Disable`) VALUES
('5de4389a-d009-11e7-8c9e-a861ec7dace5', 'C001', 'E001', '工程部門 部長', 'bggtank0102@gmail.com', 'okrroot', '林庭緯', 'color: black', 'Engineering: supervisor', 0, 0),
('81c47702-d009-11e7-8c9e-a861ec7dace5', 'C001', 'P001', '產品部門 部長', 'daivdxxxcc@gmail.com', 'okrroot', '張辰豪', 'color: blue', 'Product: supervisor', 0, 0),
('81c47e46-d009-11e7-8c9e-a861ec7dace5', 'C001', 'M001', '行銷部門 部長', 'weichu0114@gmail.com', 'okrroot', '廖韋筑', 'color:purple', 'Marketing: supervisor', 0, 0),
('81c48152-d009-11e7-8c9e-a861ec7dace5', 'C001', 'D001', '資訊部門 部長', 'wikeyno@gmail.com', 'okrroot', '陳維漢', 'color: white', 'Data_management: supervisor', 0, 0);

--
-- 觸發器 `employee`
--
DELIMITER $$
CREATE TRIGGER `before_insert_tablename` BEFORE INSERT ON `employee` FOR EACH ROW BEGIN
    SET new.Emp_UUID = uuid();
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- 資料表結構 `key_result`
--

CREATE TABLE `key_result` (
  `KR_ID` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '關鍵成果ID',
  `Obj_ID` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '隸屬目標ID',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID',
  `Score_Max` int(10) NOT NULL,
  `Score_Now` int(10) NOT NULL COMMENT '分數',
  `KR_Text` text COLLATE utf8_bin NOT NULL COMMENT '關鍵成果內容',
  `His_KR_Text` text COLLATE utf8_bin NOT NULL COMMENT '歷史修改關鍵成果內容',
  `UpdateTime` datetime NOT NULL COMMENT '最近更新時間',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 資料表的匯出資料 `key_result`
--

INSERT INTO `key_result` (`KR_ID`, `Obj_ID`, `Emp_UUID`, `Score_Max`, `Score_Now`, `KR_Text`, `His_KR_Text`, `UpdateTime`, `Disable`) VALUES
('C001^p^2017Q1O000^p^KR000', 'C001^p^2017Q1O000', '81c48152-d009-11e7-8c9e-a861ec7dace5', 10, 2, '領完年終爽歪歪', '', '2017-02-12 09:11:37', 0),
('C001^p^2017Q2O000^p^KR000', 'C001^p^2017Q2O000', '81c48152-d009-11e7-8c9e-a861ec7dace5', 10, 6, '每天工作每天不想工作.', '', '2017-04-03 09:36:06', 0),
('C001^p^2017Q3O000^p^KR000', 'C001^p^2017Q3O000', '81c48152-d009-11e7-8c9e-a861ec7dace5', 10, 8, '找到好的學習管道', '', '2017-07-03 08:23:03', 0),
('C001^p^2017Q4O000^p^KR000', 'C001^p^2017Q4O000', '81c48152-d009-11e7-8c9e-a861ec7dace5', 10, 6, '努力寫作業', '', '2017-10-27 06:19:22', 0),
('C001^p^2017Q4O000^p^KR001', 'C001^p^2017Q4O000', '81c48152-d009-11e7-8c9e-a861ec7dace5', 5, 3, '如期交作業', '', '2017-10-27 06:19:22', 0),
('C001^p^2017Q4O000^p^KR002', 'C001^p^2017Q4O000', '81c48152-d009-11e7-8c9e-a861ec7dace5', 10, 6, '不要遲到', '', '2017-10-27 06:19:22', 0),
('C001^p^2017Q4O001^p^KR000', 'C001^p^2017Q4O001', '81c48152-d009-11e7-8c9e-a861ec7dace5', 10, 5, '完成後端工作', '', '2017-10-20 15:42:25', 0),
('C001^p^2017Q4O001^p^KR001', 'C001^p^2017Q4O001', '81c48152-d009-11e7-8c9e-a861ec7dace5', 6, 3, '完成前後端整合\r\n部署伺服器', '', '2017-12-13 11:24:15', 0),
('C001^p^2018Q1O000^p^KR000', 'C001^p^2018Q1O000', '81c48152-d009-11e7-8c9e-a861ec7dace5', 10, 0, '整理程式碼-演算法, 資料結構, 作品\r\n', '', '2018-01-02 08:35:02', 0),
('C001^p^2018Q1O000^p^KR001', 'C001^p^2018Q1O000', '81c48152-d009-11e7-8c9e-a861ec7dace5', 12, 0, '完成履歷, 作品集, 版本控制經歷\r\n', '^p^his02\r\n完成履歷, 作品集\r\n^p^his01\r\naxm3xu4uf,d\r\n^p^his00\r\nassdkj;z', '2018-01-02 09:30:04', 0);

-- --------------------------------------------------------

--
-- 資料表結構 `kr_comment`
--

CREATE TABLE `kr_comment` (
  `KR_Com_ID` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '關鍵成果留言ID',
  `KR_ID` varchar(30) COLLATE utf8_bin DEFAULT NULL COMMENT '隸屬關鍵成果ID',
  `Obj_ID` varchar(30) COLLATE utf8_bin DEFAULT NULL COMMENT '隸屬目標ID',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID',
  `Com_Text` text COLLATE utf8_bin COMMENT '留言內容',
  `His_Com_Text` text COLLATE utf8_bin COMMENT '歷史修改留言內容',
  `UpdateTime` datetime DEFAULT NULL COMMENT '最近更新時間',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 資料表結構 `notification`
--

CREATE TABLE `notification` (
  `NF_ID` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '通知ID',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID',
  `Is_Read` tinyint(1) NOT NULL COMMENT '已讀',
  `NF_Text` text COLLATE utf8_bin NOT NULL COMMENT '通知內容',
  `NF_Link` text COLLATE utf8_bin NOT NULL COMMENT '通知連結',
  `UpdateTome` datetime NOT NULL COMMENT '最近更新時間',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 資料表結構 `objective`
--

CREATE TABLE `objective` (
  `Obj_ID` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '目標ID',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID',
  `Ses_ID` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '季度ID',
  `Reaching_Rate` int(10) NOT NULL COMMENT '達成率',
  `Obj_Text` text COLLATE utf8_bin NOT NULL COMMENT '目標內容',
  `His_Obj_Text` text COLLATE utf8_bin NOT NULL COMMENT '歷史修改目標內容',
  `UpdateTime` datetime NOT NULL COMMENT '最近更新時間',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 資料表的匯出資料 `objective`
--

INSERT INTO `objective` (`Obj_ID`, `Emp_UUID`, `Ses_ID`, `Reaching_Rate`, `Obj_Text`, `His_Obj_Text`, `UpdateTime`, `Disable`) VALUES
('C001^p^2017Q1O000', '81c48152-d009-11e7-8c9e-a861ec7dace5', 'C001^p^2017Q1', 20, '跨完年過新年, 放假領年終囉！！', '^p^his02\r\n跨完年過新年, 放假xu/3su06j5/ jxi ~~\r\n^p^his01\r\n跨完年過新年, \r\n^p^his00\r\n跨完年', '2017-02-02 09:21:27', 0),
('C001^p^2017Q2O000', '81c48152-d009-11e7-8c9e-a861ec7dace5', 'C001^p^2017Q2', 60, '過完年, 掃完墓, 沒連假了... ', '^p^his01\r\n過完年, 掃完墓, 負能量爆棚\r\n^p^his00\r\n過完年, 掃完墓, 差點掃自己的墓', '2017-04-03 09:36:06', 0),
('C001^p^2017Q3O000', '81c48152-d009-11e7-8c9e-a861ec7dace5', 'C001^p^2017Q3', 70, '好像該學習程式了喔！', '', '2017-07-01 07:13:53', 0),
('C001^p^2017Q4O000', '81c48152-d009-11e7-8c9e-a861ec7dace5', 'C001^p^2017Q4', 60, '參加CMoney訓練營, 作業如期交, 上課不遲到.', '^p^his02\r\n 作業如期交, 上課不遲到.\r\n^p^his01\r\n參加CMoney訓練營,aadsfffasdfsdf\r\n^p^his00\r\n參加CMoney訓練營!', '2017-09-29 16:09:32', 0),
('C001^p^2017Q4O001', '81c48152-d009-11e7-8c9e-a861ec7dace5', 'C001^p^2017Q4', 50, '把專題做好！！', '^p^his03\r\nk;adfljsdkfjald;falfkdkjaflk;adjsfzzz\r\n^p^his02\r\n累死了好想睡覺\r\n^p^his01\r\n好難啊做都做不完～～～\r\n^p^his00\r\n怎麼可能啦～～～', '2017-10-18 13:52:06', 0),
('C001^p^2018Q1O000', '81c48152-d009-11e7-8c9e-a861ec7dace5', 'C001^p^2018Q1', 0, '完成專題了！\r\n接下來, 要找到好工作！', '', '2017-12-29 13:41:10', 0);

-- --------------------------------------------------------

--
-- 資料表結構 `obj_comment`
--

CREATE TABLE `obj_comment` (
  `Obj_Com_ID` varchar(30) COLLATE utf8_bin NOT NULL COMMENT 'Obj留言ID',
  `Obj_ID` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '隸屬目標ID',
  `Emp_UUID` varchar(36) COLLATE utf8_bin NOT NULL COMMENT 'UUID',
  `Com_Text` text COLLATE utf8_bin NOT NULL COMMENT '留言內容',
  `His_Com_Text` text COLLATE utf8_bin NOT NULL COMMENT '歷史修改留言內容',
  `UpdateTime` datetime NOT NULL COMMENT '最近更新時間',
  `Disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 資料表的匯出資料 `obj_comment`
--

INSERT INTO `obj_comment` (`Obj_Com_ID`, `Obj_ID`, `Emp_UUID`, `Com_Text`, `His_Com_Text`, `UpdateTime`, `Disable`) VALUES
('C001^p^2017Q4O001^p^OC000', 'C001^p^2017Q4O001', '81c47702-d009-11e7-8c9e-a861ec7dace5', '加油加油！！', '', '2017-10-18 16:12:46', 0),
('C001^p^2017Q4O001^p^OC001', 'C001^p^2017Q4O001', '5de4389a-d009-11e7-8c9e-a861ec7dace5', '啦啦啦～～', '', '2017-10-18 15:12:16', 0),
('C001^p^2017Q4O001^p^OC002', 'C001^p^2017Q4O001', '81c47e46-d009-11e7-8c9e-a861ec7dace5', '你可以的！！', '', '2017-10-18 17:42:46', 0);

-- --------------------------------------------------------

--
-- 資料表結構 `season`
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
-- 資料表的匯出資料 `season`
--

INSERT INTO `season` (`Ses_ID`, `Cmp_ID`, `Ses_Name`, `Strat_Day`, `End_Day`, `Disable`) VALUES
('C001^p^2017Q1', 'C001', '2017年Q1', '2017-01-01', '2017-03-31', 0),
('C001^p^2017Q2', 'C001', '2017年Q2', '2017-04-01', '2017-06-30', 0),
('C001^p^2017Q3', 'C001', '2017年Q3', '2017-07-01', '2017-09-30', 0),
('C001^p^2017Q4', 'C001', '2017年Q4', '2017-10-01', '2017-12-31', 0),
('C001^p^2018Q1', 'C001', '2018年Q1', '2018-01-01', '2018-03-31', 0);

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `act_like`
--
ALTER TABLE `act_like`
  ADD PRIMARY KEY (`Act_Like_ID`),
  ADD KEY `Emp_UUID` (`Emp_UUID`);

--
-- 資料表索引 `backupmail`
--
ALTER TABLE `backupmail`
  ADD PRIMARY KEY (`Emp_UUID`),
  ADD KEY `Emp_UUID` (`Emp_UUID`);

--
-- 資料表索引 `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`Cmp_ID`);

--
-- 資料表索引 `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`Dpm_ID`),
  ADD KEY `Cmp_ID` (`Cmp_ID`);

--
-- 資料表索引 `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`Emp_UUID`),
  ADD KEY `Company` (`Company`),
  ADD KEY `Department` (`Department`);

--
-- 資料表索引 `key_result`
--
ALTER TABLE `key_result`
  ADD PRIMARY KEY (`KR_ID`),
  ADD KEY `Obj_ID` (`Obj_ID`),
  ADD KEY `Emp_UUID` (`Emp_UUID`);

--
-- 資料表索引 `kr_comment`
--
ALTER TABLE `kr_comment`
  ADD PRIMARY KEY (`KR_Com_ID`),
  ADD KEY `KR_ID` (`KR_ID`),
  ADD KEY `Obj_ID` (`Obj_ID`),
  ADD KEY `Emp_UUID` (`Emp_UUID`);

--
-- 資料表索引 `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`NF_ID`),
  ADD KEY `Emp_UUID` (`Emp_UUID`);

--
-- 資料表索引 `objective`
--
ALTER TABLE `objective`
  ADD PRIMARY KEY (`Obj_ID`),
  ADD KEY `Emp_UUID` (`Emp_UUID`),
  ADD KEY `Ses_ID` (`Ses_ID`);

--
-- 資料表索引 `obj_comment`
--
ALTER TABLE `obj_comment`
  ADD PRIMARY KEY (`Obj_Com_ID`),
  ADD KEY `Obj_ID` (`Obj_ID`),
  ADD KEY `Emp_UUID` (`Emp_UUID`);

--
-- 資料表索引 `season`
--
ALTER TABLE `season`
  ADD PRIMARY KEY (`Ses_ID`),
  ADD KEY `Cmp_ID` (`Cmp_ID`);

--
-- 已匯出資料表的限制(Constraint)
--

--
-- 資料表的 Constraints `act_like`
--
ALTER TABLE `act_like`
  ADD CONSTRAINT `act_like_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`);

--
-- 資料表的 Constraints `backupmail`
--
ALTER TABLE `backupmail`
  ADD CONSTRAINT `backupmail_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`);

--
-- 資料表的 Constraints `department`
--
ALTER TABLE `department`
  ADD CONSTRAINT `department_ibfk_1` FOREIGN KEY (`Cmp_ID`) REFERENCES `company` (`Cmp_ID`);

--
-- 資料表的 Constraints `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`Company`) REFERENCES `company` (`Cmp_ID`),
  ADD CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`Department`) REFERENCES `department` (`Dpm_ID`);

--
-- 資料表的 Constraints `key_result`
--
ALTER TABLE `key_result`
  ADD CONSTRAINT `key_result_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`),
  ADD CONSTRAINT `key_result_ibfk_2` FOREIGN KEY (`Obj_ID`) REFERENCES `objective` (`Obj_ID`);

--
-- 資料表的 Constraints `kr_comment`
--
ALTER TABLE `kr_comment`
  ADD CONSTRAINT `kr_comment_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`),
  ADD CONSTRAINT `kr_comment_ibfk_2` FOREIGN KEY (`KR_ID`) REFERENCES `key_result` (`KR_ID`),
  ADD CONSTRAINT `kr_comment_ibfk_3` FOREIGN KEY (`Obj_ID`) REFERENCES `objective` (`Obj_ID`);

--
-- 資料表的 Constraints `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`);

--
-- 資料表的 Constraints `objective`
--
ALTER TABLE `objective`
  ADD CONSTRAINT `objective_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`),
  ADD CONSTRAINT `objective_ibfk_2` FOREIGN KEY (`Ses_ID`) REFERENCES `season` (`Ses_ID`);

--
-- 資料表的 Constraints `obj_comment`
--
ALTER TABLE `obj_comment`
  ADD CONSTRAINT `obj_comment_ibfk_1` FOREIGN KEY (`Emp_UUID`) REFERENCES `employee` (`Emp_UUID`),
  ADD CONSTRAINT `obj_comment_ibfk_2` FOREIGN KEY (`Obj_ID`) REFERENCES `objective` (`Obj_ID`);

--
-- 資料表的 Constraints `season`
--
ALTER TABLE `season`
  ADD CONSTRAINT `season_ibfk_1` FOREIGN KEY (`Cmp_ID`) REFERENCES `company` (`Cmp_ID`);
