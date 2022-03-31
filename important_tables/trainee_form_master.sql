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

/*Table structure for table `trainee_form_master` */

DROP TABLE IF EXISTS `trainee_form_master`;

CREATE TABLE `trainee_form_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `form_field` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `form_label` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `custom` tinyint(10) DEFAULT '0',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `IsDeleted` tinyint(10) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `trainee_form_master` */

insert  into `trainee_form_master`(`id`,`form_field`,`form_label`,`custom`,`created_by`,`updated_by`,`createdAt`,`updatedAt`,`IsDeleted`) values 
(1,'contact','MobileNumber',0,NULL,NULL,'2022-02-23 10:19:43','0000-00-00 00:00:00',0),
(2,'first_name','FirstName',0,NULL,NULL,'2022-02-18 06:18:17','0000-00-00 00:00:00',0),
(3,'last_name','LastName',0,NULL,NULL,'2022-02-18 06:18:21','0000-00-00 00:00:00',0),
(4,'email','Email',0,NULL,NULL,'2022-02-18 06:18:23','0000-00-00 00:00:00',0),
(5,'gender','Gender',0,NULL,NULL,'2022-02-18 06:18:28','0000-00-00 00:00:00',0),
(6,'date_of_birth','DateofBirth',0,NULL,NULL,'2022-02-18 06:18:39','0000-00-00 00:00:00',0),
(7,'service_type','ServiceType',0,NULL,NULL,'2022-02-18 06:18:45','0000-00-00 00:00:00',0),
(8,'designation','Designation',0,NULL,NULL,'2022-02-22 10:55:51','0000-00-00 00:00:00',0),
(9,'department','Department',0,NULL,NULL,'2022-02-22 10:55:57','0000-00-00 00:00:00',0),
(10,'language','Language',0,NULL,NULL,'2022-02-22 10:56:00','0000-00-00 00:00:00',0),
(11,'password','Password',0,NULL,NULL,'2022-02-22 10:56:04','0000-00-00 00:00:00',0),
(12,'driver_photo','DriverPhoto',0,NULL,NULL,'2022-02-22 10:56:09','0000-00-00 00:00:00',0),
(13,'license_issue_date','LicenseIssueDate',0,NULL,NULL,'2022-02-22 10:56:20','0000-00-00 00:00:00',0),
(14,'license_validity','LicenseValidity',0,NULL,NULL,'2022-02-22 10:56:31','0000-00-00 00:00:00',0),
(15,'license_image','LicenseImage',0,NULL,NULL,'2022-02-22 10:56:37','0000-00-00 00:00:00',0),
(16,'experience_in_years','ExperienceInYear',0,NULL,NULL,'2022-02-22 10:56:47','0000-00-00 00:00:00',0),
(17,'certificate_images','CertificateImages',0,NULL,NULL,'2022-02-22 10:56:53','0000-00-00 00:00:00',0),
(18,'validity_of_certificate','ValidityOfCertificate',0,NULL,NULL,'2022-02-22 10:57:04','0000-00-00 00:00:00',0),
(19,'certificate_number','CertificateNumber',0,NULL,NULL,'2022-02-22 10:57:11','0000-00-00 00:00:00',0),
(20,'dg_trainer','DGTrainer',0,NULL,NULL,'2022-02-22 10:57:16','0000-00-00 00:00:00',0),
(21,'transporter_name','TransporterName',0,NULL,NULL,'2022-02-22 10:57:22','0000-00-00 00:00:00',0),
(22,'company_name','CompanyName',0,NULL,NULL,'2022-02-22 10:57:27','0000-00-00 00:00:00',0),
(23,'date','Date',0,NULL,NULL,'2022-02-22 10:57:29','0000-00-00 00:00:00',0),
(24,'fees','Fees',0,NULL,NULL,'2022-02-22 10:57:33','0000-00-00 00:00:00',0),
(25,'receipt_number','ReceiptNumber',0,NULL,NULL,'2022-02-22 10:57:40','0000-00-00 00:00:00',0),
(26,'mode_of_payment','ModeOfPayment',0,NULL,NULL,'2022-02-22 10:57:53','0000-00-00 00:00:00',0),
(27,'cheque_dd_number','ChequeNumber',0,NULL,NULL,'2022-02-22 10:58:05','0000-00-00 00:00:00',0),
(28,'bank_name','BankName',0,NULL,NULL,'2022-02-22 10:58:12','0000-00-00 00:00:00',0),
(29,'middle_name','MiddleName',0,NULL,NULL,'2022-02-23 10:21:48','0000-00-00 00:00:00',0),
(30,'aadhar_no','AadharNumber',0,NULL,NULL,'2022-02-23 10:24:50','0000-00-00 00:00:00',0),
(31,'education','Education',0,NULL,NULL,'2022-02-23 10:25:20','0000-00-00 00:00:00',0),
(32,'address','Address',0,NULL,NULL,'2022-02-23 10:25:41','0000-00-00 00:00:00',0),
(33,'city','City',0,NULL,NULL,'2022-02-23 10:25:56','0000-00-00 00:00:00',0),
(34,'marrital_status','MaritalStatus',0,0,NULL,'2022-02-23 10:26:22','0000-00-00 00:00:00',0),
(35,'age','Age',0,NULL,NULL,'2022-02-23 10:26:41','0000-00-00 00:00:00',0),
(36,'company_unique_id','Company Unique Id',0,NULL,NULL,'2022-03-02 09:51:11','0000-00-00 00:00:00',0),
(37,'vehicle_type','VehicleType',0,NULL,NULL,'2022-02-23 10:28:10','0000-00-00 00:00:00',0),
(38,'license_no','LicenseNUmber',0,NULL,NULL,'2022-02-23 10:29:04','0000-00-00 00:00:00',0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
