-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Apr 01, 2025 at 03:25 PM
-- Server version: 8.0.41
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `govango_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_entity`
--

CREATE TABLE `user_entity` (
  `id` bigint NOT NULL,
  `isCarOwner` tinyint NOT NULL DEFAULT '0',
  `firstName` varchar(255) NOT NULL DEFAULT '',
  `lastName` varchar(255) NOT NULL DEFAULT '',
  `city` varchar(255) NOT NULL DEFAULT '',
  `phoneNumber` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `likes` int NOT NULL DEFAULT '0',
  `googleId` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) NOT NULL DEFAULT '',
  `lang` varchar(255) NOT NULL DEFAULT '',
  `avatarSource` varchar(255) NOT NULL DEFAULT '',
  `passwordResetToken` varchar(255) DEFAULT '',
  `passwordResetExpires` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_entity`
--

INSERT INTO `user_entity` (`id`, `isCarOwner`, `firstName`, `lastName`, `city`, `phoneNumber`, `email`, `password`, `likes`, `googleId`, `avatar`, `lang`, `avatarSource`, `passwordResetToken`, `passwordResetExpires`) VALUES
(1, 0, 'Юзер', '1', 'Drohobych', '+380 98 1111111', 'u1@test.com', '$2b$10$dR.vMZbO2g2AAq1lzzzUmedgcd32AsYJQ7UnHUQtQhhBC.U5CVRwy', 0, NULL, '', 'ua', '', '', NULL),
(2, 0, 'Юзер', '2', 'Drohobych', '+380 98 2222222', 'u2@test.com', '$2b$10$YRmyVHF9VTVc5zWwuDjCX.PpFre6Ylw8tnyw/PWKrSak.XdYD9dPi', 0, NULL, '', 'ua', '', '', NULL),
(3, 0, 'Юзер', '3', 'Drohobych', '+380 98 3333333', 'u3@test.com', '$2b$10$4QDIB.s8RPsDOn8BkaHmLO/LfwAlY0GWqm5kUnvbflEAwqUqOGhAq', 0, NULL, '', 'ua', '', '', NULL),
(4, 0, 'Юзер', '4', 'Drohobych', '+380 98 4444444', 'u4@test.com', '$2b$10$mzmxm9TV8d8PULoA2fVIueLNgqAyFjp.0qb28TFIsgdm7gpJ9FLyu', 0, NULL, '', 'ua', '', '', NULL),
(5, 0, 'Юзер', '5', 'Drohobych', '+380 98 5555555', 'u5@test.com', '$2b$10$dfoe.n.TIHnn/6z90YfDGeDMPUokPRHOakJGUeoWOz/Gv7iu4xwJ.', 0, NULL, '', 'ua', '', '', NULL),
(6, 1, 'Водій', '1', 'Drohobych', '+380 67 1111111', 'c1@test.com', '$2b$10$HlRCyAnTMaG9f7cSsJIn6uZusRvUYJEdYtgTWBLqVIqFJ2iDVmouO', 0, NULL, '', 'ua', '', '', NULL),
(7, 1, 'Водій', '2', 'Drohobych', '+380 67 2222222', 'c2@test.com', '$2b$10$byC9D1RR6Jtg8zjBcdWR1evlev/6iK4H79uhp1df8KC0dl.rYbldS', 0, NULL, '', 'ua', '', '', NULL),
(8, 1, 'Водій', '3', 'Drohobych', '+380 67 3333333', 'c3@test.com', '$2b$10$wKIcBWd1hvYlP.G98eZZXeONbse49R06gP7njH38N0z9WxPuNJCni', 0, NULL, '', 'ua', '', '', NULL),
(9, 1, 'Водій', '4', 'Drohobych', '+380 67 4444444', 'c4@test.com', '$2b$10$iu2tPD2/aayr/8kxhBceMujeAdlEusrZMV3nU0WN.nzSdMSBgNXrS', 0, NULL, '', 'ua', '', '', NULL),
(10, 1, 'Водій', '5', 'Drohobych', '+380 67 5555555', 'c5@test.com', '$2b$10$T2RPrSieUPKEsk5ep2FBfOZCEeC.bClNyJdcYhY7bZC.1rS8Od/2.', 0, NULL, '', 'ua', '', '', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user_entity`
--
ALTER TABLE `user_entity`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_45c19f7b63cce4d0651736c2c7` (`googleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_entity`
--
ALTER TABLE `user_entity`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
