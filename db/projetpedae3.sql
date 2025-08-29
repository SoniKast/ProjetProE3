-- MySQL Database Initialization Script
-- For Project PEDAE3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS `projetpedae3` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `projetpedae3`;

-- Disable foreign key checks temporarily to allow dropping tables in any order
SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------

-- Table structure for `administrateurs`
DROP TABLE IF EXISTS `administrateurs`;
CREATE TABLE `administrateurs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for `administrateurs`
INSERT INTO `administrateurs` (`id`, `nom`, `email`, `mot_de_passe`) VALUES
(1, 'admin', 'admin@event.com', '$2b$10$NdflP6Vl2NsFW2xFo1VEfeRyDDLBfKw/tUs1SV1IVsw6q84kac09S');

-- --------------------------------------------------------

-- Table structure for `evenements`
DROP TABLE IF EXISTS `evenements`;
CREATE TABLE `evenements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `description_detail` text NOT NULL,
  `emplacement` varchar(255) DEFAULT NULL,
  `date_debut` timestamp NOT NULL,
  `date_fin` timestamp NOT NULL,
  `categorie` varchar(100) DEFAULT NULL,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modification` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for `evenements`
INSERT INTO `evenements` (`id`, `titre`, `description`, `description_detail`, `emplacement`, `date_debut`, `date_fin`, `categorie`, `date_creation`, `date_modification`) VALUES
(1, 'Salon International 2025', 'Salon mondial', 'Encore plus d''exposants', 'Saint-Privat', '2025-09-11 00:00:00', '2025-09-13 00:00:00', 'International', '2025-05-15 11:30:50', '2025-07-03 11:12:55'),
(3, 'Nuit des Étoiles', 'Observation gratuite des étoiles avec des astronomes amateurs.', 'Participez à une soirée magique sous le ciel étoilé ! Guidés par des astronomes passionnés, vous aurez accès à des télescopes, des explications accessibles et des cartes célestes pour observer planètes, constellations, et peut-être une pluie de météores. Un événement gratuit et familial qui émerveille petits et grands, organisé dans plusieurs parcs de la ville.', NULL, '2025-05-23 19:26:32', '2025-05-23 19:26:32', 'Événement scientifique', '2025-05-23 10:00:00', '2025-05-23 16:59:47'),
(4, 'Salon du Livre Francophone', 'Rencontrez vos auteurs préférés et découvrez de nouvelles œuvres littéraires.', 'Un rendez-vous littéraire immanquable pour les amoureux des mots. Le Salon du Livre Francophone réunit éditeurs, libraires, auteurs francophones du monde entier et lecteurs passionnés. Dédicaces, tables rondes, lectures publiques et ateliers d''écriture ponctuent ces trois jours de découvertes littéraires et de rencontres uniques.', NULL, '2025-05-23 19:26:32', '2025-05-23 19:26:32', 'Salon', '2025-05-23 10:05:00', '2025-05-23 17:00:05'),
(5, 'Marché de Noël de Strasbourg', 'Le célèbre marché de Noël avec ses stands traditionnels et animations festives.', 'Vivez la féerie de Noël dans l''un des plus anciens et emblématiques marchés de Noël d''Europe. Entre chalets en bois, spécialités alsaciennes, artisanat local, vin chaud et animations musicales, le Marché de Noël de Strasbourg transforme la ville en un conte hivernal. Un moment chaleureux à partager en famille ou entre amis.', NULL, '2025-05-23 19:26:32', '2025-05-23 19:26:32', 'Marché', '2025-05-23 10:10:00', '2025-05-23 17:00:20'),
(6, 'Compétition de Breakdance Européenne', 'Les meilleurs crews européens s''affrontent dans une compétition spectaculaire.', 'Les meilleurs crews de breakdance d''Europe se donnent rendez-vous pour une journée spectaculaire de battle. Figures acrobatiques, style, musicalité et créativité seront jugés par un panel d''experts internationaux. Venez vibrer au rythme du hip-hop et encourager vos favoris dans une ambiance survoltée et festive !', NULL, '2025-05-23 19:26:32', '2025-05-23 19:26:32', 'Compétition', '2025-05-23 10:15:00', '2025-05-23 17:00:32'),
(7, 'Journée Internationale du Yoga', 'Séances de yoga gratuites dans les parcs de la ville.', 'Rejoignez des centaines de participants dans les parcs urbains pour une journée de sérénité, de respiration et de mouvement. Instructeurs qualifiés animeront des séances de yoga accessibles à tous les niveaux, dans un cadre verdoyant. Une belle occasion de se reconnecter à soi, gratuitement, et de célébrer l''harmonie du corps et de l''esprit.', NULL, '2025-05-23 19:26:32', '2025-05-23 19:26:32', 'Bien-être', '2025-05-23 10:20:00', '2025-05-23 17:00:37'),
(8, 'Evenement Test', 'un évènement test', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. ', NULL, '2025-06-15 00:00:00', '2025-06-22 00:00:00', 'Test', '2025-06-14 23:21:51', '2025-06-14 23:21:51'),
(23, 'Festival de la Patate', 'Un événement incontournable autour de la patate sous toutes ses formes.', 'Le Festival de la Patate revient cette année avec encore plus de stands, d''animations et de dégustations. Au programme : frites, aligot, patates farcies, concours du plus gros tubercule et concerts en soirée !', NULL, '2025-08-10 00:00:00', '2025-08-12 00:00:00', 'Festival', '2025-06-20 15:20:00', '2025-06-20 15:20:00');

-- --------------------------------------------------------

-- Table structure for `inscriptions`
DROP TABLE IF EXISTS `inscriptions`;
CREATE TABLE `inscriptions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_evenement` int NOT NULL,
  `nom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `date_inscription` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `token_inscription` varchar(255) NOT NULL,
  `confirmation` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_evenement` (`id_evenement`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for `inscriptions`
INSERT INTO `inscriptions` (`id`, `id_evenement`, `nom`, `email`, `date_inscription`, `token_inscription`, `confirmation`) VALUES
(1, 1, 'DIAKITE Balla', 'ballamoussa57@gmail.com', '2025-05-17 15:05:42', '', 0),
(3, 1, 'DAVID Jean', 'jeandavid@gmail.com', '2025-05-19 15:05:42', '', 0),
(4, 1, 'DIAKITE', 'ballamoussa57@gmail.com', '2025-05-29 23:21:51', '', 0),
(5, 4, 'DIAKITE Balla', 'ballamoussa57@gmail.com', '2025-05-29 23:43:44', '', 1),
(6, 3, 'MARTIN Lucas', 'balla.diakite57@outlook.fr', '2025-06-06 11:59:12', '', 1);

-- --------------------------------------------------------

-- Table structure for `news`
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data for `news`
INSERT INTO `news` (`id`, `titre`, `description`, `date_creation`) VALUES
(1, 'Date du prochain festival des Chips annoncée', ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque purus et tellus gravida, sed scelerisque diam rutrum. Vestibulum molestie ac tortor sit amet luctus. Nulla vel neque in massa viverra elementum. Ut dictum non dolor nec imp', '2025-05-16 15:31:08'),
(3, 'Ouverture de la billetterie pour l''Été Électro', 'Les billets pour l''Été Électro seront disponibles dès lundi. L''événement rassemble les plus grands DJ du moment et promet une ambiance inoubliable sur trois jours de fête.', '2025-05-20 10:12:00'),
(4, 'Un nouveau lieu culturel ouvre ses portes à Lyon', 'Le Quartier Créatif, nouvel espace dédié à l''art contemporain et à la musique expérimentale, ouvrira ses portes le 25 juin avec une exposition immersive.', '2025-06-01 09:45:00'),
(5, 'Retour du Marché des Créateurs au bord de la Garonne', 'Bijoux, illustrations, textile... plus de 80 exposants seront présents cette année pour faire découvrir leur savoir-faire local dans un cadre convivial et animé.', '2025-06-05 11:30:00'),
(6, 'Concert surprise de Zik''Air confirmé pour le 28 juin', 'Le groupe de pop-rock Zik''Air donnera un concert gratuit au parc des Sources. Aucun billet nécessaire, premiers arrivés, premiers servis !', '2025-06-08 14:20:00'),
(7, 'Appel à bénévoles pour le festival Lumières d''Été', 'Le comité organisateur recherche des bénévoles motivés pour encadrer les différentes activités et spectacles du festival du 10 au 12 juillet.', '2025-06-10 08:00:00'),
(8, 'Exposition photo « Regards Urbains » au centre ville', 'Des photographes locaux exposent leurs clichés dans la rue ! Une expo gratuite et accessible à tous dans le centre historique, à découvrir jusqu''à fin août.', '2025-06-12 17:45:00'),
(9, 'Lancement du concours de courts-métrages étudiants', 'Les candidatures sont ouvertes jusqu''au 1er août pour le concours national de courts-métrages réservé aux étudiants en audiovisuel. À vos caméras !', '2025-06-13 12:05:00'),
(10, 'Actualité Test', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Pro', '2025-06-14 23:32:33');

-- --------------------------------------------------------

-- Table structure for `sequelizemeta`
DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
