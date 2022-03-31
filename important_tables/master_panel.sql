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

/*Table structure for table `master_panel` */

DROP TABLE IF EXISTS `master_panel`;

CREATE TABLE `master_panel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `panel` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_by` datetime DEFAULT NULL,
  `updated_by` datetime DEFAULT NULL,
  `createdAt` time DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `IsDeleted` tinyint(10) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `master_panel` */

insert  into `master_panel`(`id`,`panel`,`created_by`,`updated_by`,`createdAt`,`updatedAt`,`IsDeleted`) values 
(1,'Sliver Panel',NULL,NULL,NULL,NULL,0),
(2,'Gold Panel',NULL,NULL,NULL,NULL,0),
(3,'Platinum Panel',NULL,NULL,NULL,NULL,0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
