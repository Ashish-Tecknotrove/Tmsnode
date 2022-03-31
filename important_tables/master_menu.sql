/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 5.7.23-23 : Database - momsi4dx_tmsnode
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
-- CREATE DATABASE /*!32312 IF NOT EXISTS*/`momsi4dx_tmsnode` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;

-- USE `momsi4dx_tmsnode`;

/*Table structure for table `master_menu` */

DROP TABLE IF EXISTS `master_menu`;

CREATE TABLE `master_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `panel_id` int(11) DEFAULT NULL,
  `menu_id` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `menu_label` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `router_link` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `icon` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` enum('category','subcategory') COLLATE utf8_unicode_ci DEFAULT NULL,
  `sequence` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `IsDeleted` tinyint(10) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `master_menu` */

insert  into `master_menu`(`id`,`parent_id`,`panel_id`,`menu_id`,`menu_label`,`router_link`,`icon`,`type`,`sequence`,`created_by`,`createdAt`,`updatedAt`,`IsDeleted`) values 
(1,NULL,1,'trainee_management','Trainee Management','/company/traineemanagement','bi bi-person','category',NULL,NULL,'2022-02-21 12:02:24',NULL,0),
(2,NULL,1,'trainer_management','Trainer Management','/company/trainermanagement','bi bi-people','category',NULL,NULL,'2022-02-21 12:02:36',NULL,0),
(3,NULL,1,'sub_management','Score/Attempt Master','/company/scoreattempt','bi bi-clipboard-data','category',NULL,NULL,'2022-02-21 11:53:50',NULL,0),
(4,NULL,1,'result','Trainee Result','/company/traineeresult','bi bi-trophy','category',NULL,NULL,'2022-02-21 11:54:24',NULL,0),
(6,NULL,3,'trainee_management','Trainee Management','/company/traineemanagement','bi bi-person',NULL,2,NULL,'2022-02-21 12:02:45',NULL,0),
(7,NULL,3,'trainer_management','Trainer Management','/company/trainermanagement','bi bi-people',NULL,3,NULL,'2022-02-21 12:02:56',NULL,0),
(8,NULL,3,'sub_management','Score/Attempt Master','/company/scoreattempt','bi bi-clipboard-data',NULL,4,NULL,'2022-02-21 11:51:25',NULL,0),
(9,NULL,3,'result','Trainee Result','/company/traineeresult','bi bi-trophy',NULL,5,NULL,'2022-02-21 11:54:22',NULL,0),
(10,NULL,3,'subcompany','Branch Management','/company/branchmanagement','bi bi-building',NULL,1,NULL,'2022-02-21 11:49:01',NULL,0),
(12,NULL,2,'department','Departments','/company/companydepartmentmanagement','bi bi-building',NULL,NULL,NULL,'2022-02-21 12:00:17',NULL,0),
(13,NULL,2,'trainee_management','Trainee Management','/company/traineemanagement','bi bi-person',NULL,NULL,NULL,'2022-02-21 12:03:07',NULL,0),
(14,NULL,2,'trainer_management','Trainer Management','/company/trainermanagement','bi bi-people',NULL,NULL,NULL,'2022-02-21 12:03:14',NULL,0),
(15,NULL,2,'sub_management','Score/Attempt Master','/company/scoreattempt','bi bi-clipboard-data',NULL,NULL,NULL,'2022-02-21 11:57:59',NULL,0),
(16,NULL,2,'result','Trainee Result','/company/traineeresult','bi bi-trophy',NULL,NULL,NULL,'2022-02-21 11:58:02',NULL,0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
