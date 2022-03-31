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

/*Table structure for table `elearning_status` */

DROP TABLE IF EXISTS `elearning_status`;

CREATE TABLE `elearning_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_by` int(20) DEFAULT NULL,
  `updated_by` int(20) DEFAULT NULL,
  `deleted_by` int(2) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `active` tinyint(10) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `elearning_status` */

insert  into `elearning_status`(`id`,`status`,`created_by`,`updated_by`,`deleted_by`,`createdAt`,`updatedAt`,`deletedAt`,`active`) values 
(1,'inprogress',NULL,NULL,NULL,NULL,NULL,NULL,1),
(2,'failed ',NULL,NULL,NULL,NULL,NULL,NULL,1),
(3,'passed',NULL,NULL,NULL,NULL,NULL,NULL,1),
(4,'incomplete',NULL,NULL,NULL,NULL,NULL,NULL,1),
(5,'notattempt',NULL,NULL,NULL,NULL,NULL,NULL,1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
