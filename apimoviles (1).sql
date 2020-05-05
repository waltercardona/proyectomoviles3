-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-05-2020 a las 20:28:59
-- Versión del servidor: 10.4.6-MariaDB
-- Versión de PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `apimoviles`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `id_number` varchar(255) NOT NULL,
  `birth` date NOT NULL,
  `city` varchar(255) NOT NULL,
  `neighborhood` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `citas`
--

INSERT INTO `citas` (`name`, `lastname`, `id_number`, `birth`, `city`, `neighborhood`, `phone`, `user`, `_id`) VALUES
('walter', 'cardona', '1020401358', '1986-10-10', 'medellin', 'calazans', '4513460', '', 1),
('samuel', 'piedrahita', '1021934670', '2014-02-14', 'medellin', 'calazans', '4513460', '', 2),
('jeferson', ' restrepo', '111111', '2001-02-14', 'medellin', 'bello', '2147483647', '', 3),
('stefany', ' piedrahita', '11245784', '1992-02-14', 'medellin', 'calazans', '4513460', '', 4),
('mao', ' alvarez', '1245678', '1900-02-14', 'medellin', 'bello', '2147483647', '', 5),
('car', 'car', '123456', '1986-10-10', 'me', 'me', '2147483647', '8', 6),
('a', 'a', '12345', '1986-10-10', 'me', 'calaz', '2147483647', '8', 7),
('walter arles ', 'cardona cardona', '1234567', '1986-10-10', 'medellin', 'calazans', '3103884559', '8', 8),
('samuel', 'cardona cardona', '12345678', '2014-02-14', 'medellin', 'calasanz', '3103884559', '8', 9),
('sa', 'sa', '12', '2014-02-14', 'medellin', 'calasanz', '3103884559', '8', 10),
('samuel', 'cardona', '11111111111', '2014-10-10', 'medelli', 'calasanz', '3103884559', '8', 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logins`
--

CREATE TABLE `logins` (
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `logins`
--

INSERT INTO `logins` (`name`, `email`, `password`, `_id`) VALUES
('daniel', 'daniel@daniel.com', '1234', 1),
('samuel cardona', 'samucar@samucar.com', '0214', 2),
('alejo', 'alejo@alejo.com', '1234', 3),
('alejandra', 'alejandra@aleja.com', '1234', 4),
('familia', 'familia@fa.com', '1234', 5),
('wac', 'wac@wac.com', '1234', 6),
('walter', 'acc@acc.com', '1234', 7),
('walter cardona', 'car@car.com', '1234', 8);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`_id`),
  ADD UNIQUE KEY `identificacion` (`id_number`);

--
-- Indices de la tabla `logins`
--
ALTER TABLE `logins`
  ADD PRIMARY KEY (`_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `logins`
--
ALTER TABLE `logins`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
