-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: bisne_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias_productos`
--
CREATE TABLE bisne_db;
USE bisne_db;

DROP TABLE IF EXISTS `categorias_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias_productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoria` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categoria` (`categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias_productos`
--

LOCK TABLES `categorias_productos` WRITE;
/*!40000 ALTER TABLE `categorias_productos` DISABLE KEYS */;
INSERT INTO `categorias_productos` VALUES (3,'cuelga macetas'),(2,'espejos'),(4,'sujeta cortinas'),(1,'tapices'),(5,'varios');
/*!40000 ALTER TABLE `categorias_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compras`
--

DROP TABLE IF EXISTS `compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_compra` datetime NOT NULL DEFAULT current_timestamp(),
  `precio_total` float(11,3) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras`
--

LOCK TABLES `compras` WRITE;
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
INSERT INTO `compras` VALUES (1,'2023-11-03 21:39:16',23400.000,29),(20,'2023-11-04 19:16:38',3000.000,41),(21,'2023-11-04 19:44:39',3000.000,29);
/*!40000 ALTER TABLE `compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_compra`
--

DROP TABLE IF EXISTS `detalle_compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_compra` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `producto_id` int(11) NOT NULL,
  `compra_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `producto_id` (`producto_id`),
  KEY `compra_id` (`compra_id`),
  CONSTRAINT `detalle_compra_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`),
  CONSTRAINT `detalle_compra_ibfk_2` FOREIGN KEY (`compra_id`) REFERENCES `compras` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_compra`
--

LOCK TABLES `detalle_compra` WRITE;
/*!40000 ALTER TABLE `detalle_compra` DISABLE KEYS */;
INSERT INTO `detalle_compra` VALUES (1,11,1,1),(2,8,1,2),(3,9,1,1),(30,12,20,1),(31,11,21,1);
/*!40000 ALTER TABLE `detalle_compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventario`
--

DROP TABLE IF EXISTS `inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventario`
--

LOCK TABLES `inventario` WRITE;
/*!40000 ALTER TABLE `inventario` DISABLE KEYS */;
INSERT INTO `inventario` VALUES (1,1),(2,2),(3,3),(4,4),(5,5),(6,10);
/*!40000 ALTER TABLE `inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `precio` int(11) DEFAULT NULL,
  `imagen` varchar(300) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `categoria_id` int(11) NOT NULL,
  `descuento` int(11) DEFAULT NULL,
  `tamanio_id` int(11) DEFAULT NULL,
  `inventario_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `categoria_id` (`categoria_id`),
  KEY `tamanio_id` (`tamanio_id`),
  KEY `inventario_id` (`inventario_id`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias_productos` (`id`),
  CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`tamanio_id`) REFERENCES `tamanios` (`id`),
  CONSTRAINT `productos_ibfk_3` FOREIGN KEY (`inventario_id`) REFERENCES `inventario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (3,'Tapiz Candela',9000,'candela.jpeg','Ancho: 55 cm / Alto: 40 cm. El estante tiene 55x20',1,NULL,NULL,6,'2023-10-29 18:16:07','2023-09-07 15:48:14','2023-09-07 15:48:14'),(4,'Tapiz Amalia',24000,'amalia.jpg','Ancho: 1,30 metro / Alto: 70 cm',1,NULL,NULL,6,'2023-10-29 18:16:07','2023-09-07 15:48:14','2023-09-07 15:48:14'),(6,'Tapiz Gal',20000,'gal.jpeg','',1,NULL,NULL,6,'2023-10-29 18:16:07','2023-09-21 19:52:50','2023-09-07 15:48:14'),(7,'Tapiz Ariel',5500,'ariel.jpeg','Ancho: 40 cm / Alto: 45 cm',1,NULL,NULL,6,'2023-10-29 18:16:07','2023-09-07 15:48:14','2023-09-07 15:48:14'),(8,'Espejo Goldina',6800,'goldina.jpg','Lo elegis del tamaño que quieras',2,NULL,1,6,'2023-10-29 18:16:08','2023-09-07 15:48:14','2023-09-07 15:48:14'),(9,'Espejo Fidela',6800,'fidela.jpeg','Lo elegis del tamaño que quieras',2,NULL,1,6,'2023-10-29 18:16:08','2023-09-07 15:48:14','2023-09-07 15:48:14'),(10,'Espejo Silvia',6800,'silvia.jpeg','Lo elegis del tamaño que quieras',2,NULL,1,6,'2023-10-29 18:16:08','2023-09-07 15:48:14','2023-09-07 15:48:14'),(11,'Cuelga maceta Clásico',3000,'clasico.jpeg','60 cm de alto. Se adaptan al tamaño de tu maceta',3,NULL,NULL,6,'2023-10-29 18:16:08','2023-09-07 15:48:14','2023-09-07 15:48:14'),(12,'Cuelga maceta Flecos',3000,'flecos.jpeg','60 cm de alto. Se adaptan al tamaño de tu maceta',3,NULL,NULL,6,'2023-10-29 18:16:08','2023-09-07 15:48:14','2023-09-07 15:48:14'),(13,'Cuelga maceta Nido',3000,'nido.jpeg','60 cm de alto. Se adaptan al tamaño de tu maceta',3,NULL,NULL,6,'2023-10-29 18:16:08','2023-09-07 15:48:14','2023-09-07 15:48:14'),(14,'Sujeta cortina Doble hoja',2000,'doble-hoja.jpeg','',4,NULL,NULL,6,'2023-11-06 18:59:04','2023-11-06 18:59:04','2023-09-07 15:48:14'),(15,'Sujeta cortina Hoja',2700,'hoja.jpeg','',4,NULL,NULL,6,'2023-11-06 18:59:17','2023-11-06 18:59:17','2023-09-07 15:48:14'),(16,'Sujeta cortina Borla',1700,'borla.jpeg','',4,NULL,NULL,6,'2023-11-06 18:58:45','2023-11-06 18:58:45','2023-09-07 15:48:14'),(17,'Posavaso',700,'posavaso.jpeg','Tienen 16 cm de diámetro total',5,NULL,NULL,6,'2023-09-07 15:48:14','2023-09-07 15:48:14','2023-09-07 15:48:14'),(18,'Individual',4000,'individual.jpeg','Tienen 35 cm de diámetro total',5,NULL,NULL,6,'2023-09-07 15:48:14','2023-09-07 15:48:14','2023-09-07 15:48:14'),(19,'Llavero',700,'llavero.jpg','Tienen 16 cm de diámetro total',5,NULL,NULL,6,'2023-09-07 15:48:14','2023-09-07 15:48:14','2023-09-07 15:48:14'),(46,'Espejo Esther',7000,'espejo-esther-1698774091884.jpeg','',2,NULL,NULL,NULL,'2023-10-31 17:41:31','2023-10-31 17:41:31','2023-10-31 17:41:31'),(47,'Medio espejo',7000,'medio-espejo-1698774305897.jpeg','',2,NULL,NULL,NULL,'2023-10-31 17:45:05','2023-10-31 17:45:05','2023-10-31 17:42:33'),(48,'Tapiz Eloisa',17000,'tapiz-eloisa-1698774379498.jpeg','Ancho: 55cm - Alto: 80cm',1,NULL,NULL,NULL,'2023-10-31 17:46:19','2023-10-31 17:46:19','2023-10-31 17:46:19'),(49,'Tapiz Maribel',23000,'tapiz-maribel-1698774471259.jpeg','Ancho: 1 metro - Alto: 70 cm',1,NULL,NULL,NULL,'2023-10-31 17:47:51','2023-10-31 17:47:51','2023-10-31 17:47:51'),(51,'Cuelga maceta Pared',1800,'cuelga-maceta pared-1699295991137.jpeg','Para macetas chicas',3,NULL,NULL,NULL,'2023-11-06 18:40:39','2023-11-06 18:39:51','2023-11-06 18:39:51'),(52,'Cuelga maceta Arcoiris',3500,'cuelga-maceta-arcoiris-1699296335225.jpeg','',3,NULL,NULL,NULL,'2023-11-06 18:45:35','2023-11-06 18:45:35','2023-11-06 18:45:35'),(53,'Cuelga maceta Rombos',3500,'cuelga-maceta-rombos-1699296459195.jpeg','',3,NULL,NULL,NULL,'2023-11-06 18:47:39','2023-11-06 18:47:39','2023-11-06 18:47:39'),(54,'Cuelga maceta Trenza',3500,'cuelga-maceta-trenza-1699296512101.jpeg','',3,NULL,NULL,NULL,'2023-11-06 18:48:32','2023-11-06 18:48:32','2023-11-06 18:48:32'),(55,'Cuelga maceta Doble',4500,'cuelga-maceta-doble-1699296560759.jpeg','',3,NULL,NULL,NULL,'2023-11-06 18:49:20','2023-11-06 18:49:20','2023-11-06 18:49:20'),(56,'Cuelga maceta Triple',9500,'cuelga-maceta-triple-1699296619336.jpeg','',3,NULL,NULL,NULL,'2023-11-06 18:50:19','2023-11-06 18:50:19','2023-11-06 18:50:19'),(57,'Espejo XL',40000,'espejo-xl-1699297078997.jpeg','Diámetro total: 85 cm',2,NULL,NULL,NULL,'2023-11-06 18:57:59','2023-11-06 18:57:59','2023-11-06 18:57:59'),(58,'Sujeta cortina Hoja simple',1800,'sujeta-cortina-hoja-simple-1699297190599.jpeg','',4,NULL,NULL,NULL,'2023-11-06 18:59:50','2023-11-06 18:59:50','2023-11-06 18:59:50'),(59,'Sujeta cortina Flecos',1400,'sujeta-cortina-flecos-1699297734539.jpeg','Se abrocha con un gancho por detrás',4,NULL,NULL,NULL,'2023-11-06 19:09:23','2023-11-06 19:09:23','2023-11-06 19:08:54'),(60,'Cartel nombre',6500,'cartel-nombre-1699297925853.jpeg','Ancho: 20 cm - Alto: 60 cm - Nombre/frase a elección.',5,NULL,NULL,NULL,'2023-11-06 19:12:05','2023-11-06 19:12:05','2023-11-06 19:12:05'),(61,'Llavero corazon',750,'llavero-corazon-1699298105506.jpeg','Color a elección',5,NULL,NULL,NULL,'2023-11-06 19:15:05','2023-11-06 19:15:05','2023-11-06 19:15:05'),(62,'Cuelga ukelele',2500,'cuelga-ukelele-1699298145274.jpeg','',5,NULL,NULL,NULL,'2023-11-06 19:15:45','2023-11-06 19:15:45','2023-11-06 19:15:45'),(63,'Cuelga guitarra',3500,'cuelga-guitarra-1699298179202.jpeg','',5,NULL,NULL,NULL,'2023-11-06 19:16:19','2023-11-06 19:16:19','2023-11-06 19:16:19'),(64,'Tapiz Cristina',26500,'tapiz-cristina-1699298450671.jpeg','Ancho: 85cm - Alto: 1.15m',1,NULL,NULL,NULL,'2023-11-06 19:20:50','2023-11-06 19:20:50','2023-11-06 19:20:50'),(65,'Tapiz Orly',23500,'tapiz-orly-1699298538603.jpeg','Ancho: 1 metro - Alto: 75 cm',1,NULL,NULL,NULL,'2023-11-06 19:22:18','2023-11-06 19:22:18','2023-11-06 19:22:18'),(66,'Tapiz Noa',19500,'tapiz-noa-1699298613515.jpeg','Ancho: 70 cm - Alto: 75 cm',1,NULL,NULL,NULL,'2023-11-06 19:23:33','2023-11-06 19:23:33','2023-11-06 19:23:33'),(67,'Tapiz Yalin',21000,'tapiz-yalin-1699298671997.jpeg','Ancho: 90cm - Alto: 85 cm',1,NULL,NULL,NULL,'2023-11-06 19:24:32','2023-11-06 19:24:32','2023-11-06 19:24:32'),(68,'Tapiz Juliana',15000,'tapiz-juliana-1699298751556.jpeg','Ancho: 65 cm - Alto: 70 cm',1,NULL,NULL,NULL,'2023-11-06 19:25:51','2023-11-06 19:25:51','2023-11-06 19:25:51'),(69,'Tapiz Sandra',21000,'tapiz-sandra-1699298851399.jpeg','Ancho: 80 cm - Alto: 90 cm',1,NULL,NULL,NULL,'2023-11-06 19:27:31','2023-11-06 19:27:31','2023-11-06 19:27:31'),(70,'Tapiz Cintia',6000,'tapiz-cintia-1699298905432.jpeg','Ancho: 30 cm - Alto: 40 cm',1,NULL,NULL,NULL,'2023-11-06 19:28:25','2023-11-06 19:28:25','2023-11-06 19:28:25'),(71,'Tapiz Ofri',9500,'tapiz-ofri-1699299047404.jpeg','Ancho: 50 cm - Alto: 70 cm',1,NULL,NULL,NULL,'2023-11-06 19:30:47','2023-11-06 19:30:47','2023-11-06 19:30:47'),(72,'Tapiz Paz',11800,'tapiz-paz-1699299115685.jpeg','Ancho: 65 cm - Alto: 70 cm',1,NULL,NULL,NULL,'2023-11-06 19:31:55','2023-11-06 19:31:55','2023-11-06 19:31:55'),(73,'Tapiz Virginia',7800,'tapiz-virginia-1699299163547.jpeg','Ancho: 40 cm - Alto: 60 cm',1,NULL,NULL,NULL,'2023-11-06 19:32:43','2023-11-06 19:32:43','2023-11-06 19:32:43'),(74,'Tapiz Camila',7800,'tapiz-camila-1699299197725.jpeg','Ancho: 40 cm - Alto: 60 cm',1,NULL,NULL,NULL,'2023-11-06 19:33:17','2023-11-06 19:33:17','2023-11-06 19:33:17'),(75,'Tapiz Gertrudis',28000,'tapiz-gertrudis-1699299281856.jpeg','Ancho: 1,30 metro - Alto: 65 cm',1,NULL,NULL,NULL,'2023-11-06 19:34:41','2023-11-06 19:34:41','2023-11-06 19:34:41'),(76,'Medio espejo largo',9000,'medio-espejo-largo-1699299850309.jpeg','Ancho: 40 cm - Alto: 60 cm',2,NULL,NULL,NULL,'2023-11-06 19:44:10','2023-11-06 19:44:10','2023-11-06 19:44:10'),(77,'Tapiz Lorna',7500,'tapiz-lorna-1699299902098.jpg','Ancho: 45 cm - Alto: 60 cm',1,NULL,NULL,NULL,'2023-11-06 19:45:02','2023-11-06 19:45:02','2023-11-06 19:45:02'),(78,'Tapiz Ella',12500,'tapiz-ella-1699299941655.jpg','Ancho: 65 cm - Alto: 70 cm',1,NULL,NULL,NULL,'2023-11-06 19:45:41','2023-11-06 19:45:41','2023-11-06 19:45:41'),(79,'Tapiz Julia',13000,'tapiz-julia-1699299993593.jpeg','Ancho: 55 cm - Alto: 75 cm',1,NULL,NULL,NULL,'2023-11-06 19:46:33','2023-11-06 19:46:33','2023-11-06 19:46:33'),(80,'Tapiz Cuadrado',6500,'tapiz-cuadrado-1699300126863.jpg','Ancho: 34 cm - Alto: 60 cm',1,NULL,NULL,NULL,'2023-11-06 19:48:46','2023-11-06 19:48:46','2023-11-06 19:48:46'),(81,'Tapiz Kaia',5000,'tapiz-kaia-1699300164780.jpeg','Ancho: 30 cm - Alto: 45 cm',1,NULL,NULL,NULL,'2023-11-06 19:49:24','2023-11-06 19:49:24','2023-11-06 19:49:24'),(82,'Tapiz Ariel con estante',8500,'tapiz-ariel-con-estante-1699300253408.jpeg','Ancho: 40 cm - Alto: 50 cm. Estante de 40x15cm.',1,NULL,NULL,NULL,'2023-11-06 19:50:53','2023-11-06 19:50:53','2023-11-06 19:50:53');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tamanios`
--

DROP TABLE IF EXISTS `tamanios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tamanios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ancho` int(11) DEFAULT NULL,
  `alto` int(11) DEFAULT NULL,
  `diametro` int(11) DEFAULT NULL,
  `precio_extra` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tamanios`
--

LOCK TABLES `tamanios` WRITE;
/*!40000 ALTER TABLE `tamanios` DISABLE KEYS */;
INSERT INTO `tamanios` VALUES (1,NULL,NULL,17,0),(2,NULL,NULL,20,800),(3,NULL,NULL,25,1800);
/*!40000 ALTER TABLE `tamanios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_usuario`
--

DROP TABLE IF EXISTS `tipo_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_usuario`
--

LOCK TABLES `tipo_usuario` WRITE;
/*!40000 ALTER TABLE `tipo_usuario` DISABLE KEYS */;
INSERT INTO `tipo_usuario` VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `tipo_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `contraseña` varchar(100) NOT NULL,
  `telefono` int(11) DEFAULT NULL,
  `direccion` varchar(200) NOT NULL,
  `ciudad` varchar(100) NOT NULL,
  `tipo_usuario_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_email` (`email`),
  KEY `tipo_usuario_id` (`tipo_usuario_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`tipo_usuario_id`) REFERENCES `tipo_usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Admin','Bisne','admin@bisne.com','$2a$10$6kYNP5XY2NlXwASlBiao2uhENsHVulwdVL9H.eVIGBzZA0wgFYkS.',111111111,'Cochabamba 1050','Rosario',1,'2023-10-27 22:28:41','2023-10-27 22:27:44','2023-10-27 22:27:44'),(29,'User','Test','test@test.com','$2a$10$6n189rmt0WhqiSKc1i0/T.VZnndwolh13T..BO4lnCq.o4fjwtMja',111111111,'Cochabamba 1050','Rosario',2,'2023-10-28 01:03:09','2023-10-28 01:03:09','2023-10-28 01:03:09'),(41,'Sofia','Hojberg','sofiahojberg@hotmail.com','$2a$10$lifaDsDP6b9TtLhNYZJ.SuIr9VMc72UViw3sbI04HFh2/cgRg7iaW',2147483647,'Cochabamba 1050','Rosario',2,'2023-11-04 19:16:21','2023-11-04 19:16:21','2023-11-04 19:16:21');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'bisne_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-06 16:56:35
