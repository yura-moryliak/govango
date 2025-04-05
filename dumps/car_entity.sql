-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Apr 01, 2025 at 03:27 PM
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
-- Table structure for table `car_entity`
--

CREATE TABLE `car_entity` (
  `id` bigint NOT NULL,
  `registrationPlate` varchar(255) NOT NULL DEFAULT '',
  `make` varchar(255) NOT NULL DEFAULT '',
  `model` varchar(255) NOT NULL DEFAULT '',
  `length` decimal(10,1) NOT NULL DEFAULT '0.0',
  `width` decimal(10,1) NOT NULL DEFAULT '0.0',
  `height` decimal(10,1) NOT NULL DEFAULT '0.0',
  `carryCapacity` decimal(10,1) NOT NULL DEFAULT '0.0',
  `userId` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `car_entity`
--

INSERT INTO `car_entity` (`id`, `registrationPlate`, `make`, `model`, `length`, `width`, `height`, `carryCapacity`, `userId`) VALUES
(1, 'AA1111AA', 'Citroen', 'Berlingo', 3.0, 3.0, 3.0, 3.0, 6),
(2, 'AA2222AA', 'Citroen', 'Jumper груз.', 4.0, 4.0, 3.0, 3.0, 7),
(3, 'AA3333AA', 'Chevrolet', 'Astro', 4.0, 4.0, 4.0, 3.0, 8),
(4, 'AA4444AA', 'Daewoo', 'Lanos Cargo', 4.0, 4.0, 4.0, 3.5, 9),
(5, 'AA5555AA', 'Ford', 'Transit', 4.0, 4.0, 4.0, 4.0, 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `car_entity`
--
ALTER TABLE `car_entity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_70835da6c9b408b10ab4f2ec06a` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `car_entity`
--
ALTER TABLE `car_entity`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `car_entity`
--
ALTER TABLE `car_entity`
  ADD CONSTRAINT `FK_70835da6c9b408b10ab4f2ec06a` FOREIGN KEY (`userId`) REFERENCES `user_entity` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
