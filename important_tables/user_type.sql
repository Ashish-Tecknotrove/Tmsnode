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

/*Table structure for table `user_types` */

DROP TABLE IF EXISTS `user_types`;

CREATE TABLE `user_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `user_types` */

insert  into `user_types`(`id`,`name`,`description`,`active`,`createdAt`,`updatedAt`) values 
(1,'Super Admin',NULL,1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),
(2,'Company Login ',NULL,1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),
(3,'Trainer',NULL,1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),
(4,'Trainee',NULL,1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),
(5,'SubCompany',NULL,1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),
(6,'Department',NULL,1,'0000-00-00 00:00:00','0000-00-00 00:00:00');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
