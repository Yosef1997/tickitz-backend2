-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 13 Apr 2021 pada 06.10
-- Versi server: 10.4.17-MariaDB
-- Versi PHP: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tickitz`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `cinema`
--

CREATE TABLE `cinema` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `picture` varchar(200) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `createdBy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Struktur dari tabel `date`
--

CREATE TABLE `date` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT current_timestamp(),
  `createdBy` int(11) DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `genre`
--

CREATE TABLE `genre` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdBy` int(11) DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `location`
--

CREATE TABLE `location` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdBy` int(11) DEFAULT NULL,
  `uploadAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `movie`
--

CREATE TABLE `movie` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `releaseDate` date DEFAULT NULL,
  `duration` varchar(100) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `director` varchar(200) DEFAULT NULL,
  `star` varchar(200) DEFAULT NULL,
  `picture` varchar(200) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdBy` int(11) DEFAULT NULL,
  `UpdatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `time`
--

CREATE TABLE `time` (
  `id` int(11) NOT NULL,
  `time` varchar(20) DEFAULT NULL,
  `createAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdBy` int(11) DEFAULT NULL,
  `updateAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL,
  `password` varchar(500) DEFAULT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL,
  `role` int(11) NOT NULL,
  `picture` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `purchase`
--

CREATE TABLE `purchase` (
  `id` int(11) DEFAULT NULL,
  `movie` varchar(100) DEFAULT NULL,
  `date` timestamp NULL DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `cinema` varchar(100) DEFAULT NULL,
  `time` varchar(100) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `seat` varchar(100) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `seat`
--

CREATE TABLE `seat` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdBy` int(11) DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `purchaseseat`
--

CREATE TABLE `purchaseseat` (
  `id` int(11) NOT NULL,
  `idPurchase` int(11) DEFAULT NULL,
  `idSeat` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdBy` int(11) DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `moviegenre`
--

CREATE TABLE `moviegenre` (
  `id` int(11) NOT NULL,
  `idMovie` int(11) DEFAULT NULL,
  `idGenre` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdBy` int(11) DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `cinema`
--
ALTER TABLE `cinema`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `date`
--
ALTER TABLE `date`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `time`
--
ALTER TABLE `time`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `purchase`
--
ALTER TABLE `purchase`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `seat`
--
ALTER TABLE `seat`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `purchaseseat`
--
ALTER TABLE `purchaseseat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPurchase` (`idPurchase`),
  ADD KEY `idSeat` (`idSeat`);

--
-- Indeks untuk tabel `moviegenre`
--
ALTER TABLE `moviegenre`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idMovie` (`idMovie`),
  ADD KEY `idGenre` (`idGenre`);


--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `cinema`
--
ALTER TABLE `cinema`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `date`
--
ALTER TABLE `date`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT untuk tabel `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `location`
--
ALTER TABLE `location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT untuk tabel `time`
--
ALTER TABLE `time`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `purchase`
--
ALTER TABLE `purchase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `seat`
--
ALTER TABLE `seat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT untuk tabel `purchaseseat`
--
ALTER TABLE `purchaseseat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT untuk tabel `moviegenre`
--
ALTER TABLE `moviegenre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `purchaseseat`
--
ALTER TABLE `purchaseseat`
  ADD CONSTRAINT `purchaseseat_ibfk_1` FOREIGN KEY (`idPurchase`) REFERENCES `purchase` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `purchaseseat_ibfk_2` FOREIGN KEY (`idSeat`) REFERENCES `seat` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `moviegenre`
--
ALTER TABLE `moviegenre`
  ADD CONSTRAINT `moviegenre_ibfk_1` FOREIGN KEY (`idMovie`) REFERENCES `movie` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `moviegenre_ibfk_2` FOREIGN KEY (`idGenre`) REFERENCES `genre` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT;

--
-- Dumping data untuk tabel `cinema`
--

INSERT INTO `cinema` (`id`, `name`, `address`, `price`, `picture`, `createdAt`, `updatedAt`, `createdBy`) VALUES
(7, 'ebv.id', 'Whatever street No.12, South Purwokerto', 10, 'cinema-picture-1617208938200.png', '2021-03-31 16:42:18', '2021-04-08 08:53:51', 4),
(8, 'CineOne21', 'Downcare street No. 21, East Purwokerto', 10, 'cinema-picture-1617210452815.png', '2021-03-31 17:07:32', '2021-04-08 08:53:57', 4),
(9, 'hiflix', 'Colonel street No. 2, East Purwokerto', 10, 'cinema-picture-1617210501170.png', '2021-03-31 17:08:21', '2021-04-08 08:54:03', 4);

--
-- Dumping data untuk tabel `date`
--

INSERT INTO `date` (`id`, `date`, `createAt`, `createdBy`, `updatedAt`) VALUES
(1, '2021-04-01', '2021-03-31 18:17:54', 4, NULL),
(2, '2021-04-02', '2021-03-31 18:18:16', 4, NULL),
(3, '2021-04-03', '2021-03-31 18:18:21', 4, NULL),
(4, '2021-04-04', '2021-03-31 18:18:26', 4, NULL),
(5, '2021-04-05', '2021-03-31 18:18:29', 4, NULL),
(6, '2021-04-06', '2021-03-31 18:18:32', 4, NULL),
(7, '2021-04-07', '2021-03-31 18:18:35', 4, NULL),
(8, '2021-04-08', '2021-03-31 18:18:39', 4, NULL),
(9, '2021-04-09', '2021-03-31 18:18:42', 4, NULL),
(10, '2021-04-10', '2021-03-31 18:18:47', 4, NULL),
(11, '2021-04-11', '2021-03-31 18:18:51', 4, NULL),
(12, '2021-04-12', '2021-03-31 18:18:54', 4, NULL),
(13, '2021-04-13', '2021-03-31 18:18:57', 4, NULL),
(14, '2021-04-14', '2021-03-31 18:19:00', 4, NULL),
(15, '2021-04-15', '2021-03-31 18:19:03', 4, NULL),
(16, '2021-04-16', '2021-03-31 18:19:06', 4, NULL),
(17, '2021-04-17', '2021-03-31 18:19:09', 4, NULL),
(18, '2021-04-18', '2021-03-31 18:19:12', 4, NULL),
(19, '2021-04-19', '2021-03-31 18:19:16', 4, NULL),
(20, '2021-04-20', '2021-03-31 18:19:20', 4, NULL),
(21, '2021-04-21', '2021-03-31 18:19:23', 4, NULL),
(22, '2021-04-22', '2021-03-31 18:19:26', 4, NULL),
(23, '2021-04-23', '2021-03-31 18:19:29', 4, NULL),
(24, '2021-04-24', '2021-03-31 18:19:32', 4, NULL),
(25, '2021-04-25', '2021-03-31 18:19:38', 4, NULL),
(26, '2021-04-26', '2021-03-31 18:19:41', 4, NULL),
(27, '2021-04-27', '2021-03-31 18:19:45', 4, NULL),
(28, '2021-04-28', '2021-03-31 18:19:48', 4, NULL),
(29, '2021-04-29', '2021-03-31 18:19:54', 4, NULL),
(30, '2021-04-30', '2021-03-31 18:20:01', 4, NULL),
(31, '2021-05-01', '2021-03-31 18:20:11', 4, NULL),
(32, '2021-05-02', '2021-03-31 18:20:18', 4, NULL);

--
-- Dumping data untuk tabel `genre`
--

INSERT INTO `genre` (`id`, `name`, `createdAt`, `createdBy`, `updatedAt`) VALUES
(1, 'Action', '2021-04-01 14:29:13', 4, NULL),
(2, 'Adventure', '2021-04-01 14:30:53', 4, NULL),
(3, 'Animation', '2021-04-01 14:31:04', 4, NULL),
(4, 'Biography', '2021-04-01 14:31:15', 4, NULL),
(5, 'Comedy', '2021-04-01 14:31:24', 4, NULL),
(6, 'Crime', '2021-04-01 14:31:31', 4, NULL),
(7, 'Documentary', '2021-04-01 14:31:45', 4, NULL),
(8, 'Drama', '2021-04-01 14:31:52', 4, NULL),
(9, 'Family', '2021-04-01 14:32:01', 4, NULL),
(10, 'History', '2021-04-01 14:32:10', 4, NULL),
(11, 'Horor', '2021-04-01 14:33:20', 4, NULL),
(12, 'Sci-Fi', '2021-04-01 14:33:33', 4, NULL),
(13, 'Thriller', '2021-04-01 14:33:43', 4, NULL),
(14, 'Mystery', '2021-04-03 03:50:20', 4, NULL);

--
-- Dumping data untuk tabel `location`
--

INSERT INTO `location` (`id`, `name`, `createdAt`, `createdBy`, `uploadAt`) VALUES
(1, 'Jakarta utara', '2021-03-31 17:39:25', 4, '2021-03-31 17:40:30'),
(2, 'Jakarta barat', '2021-03-31 17:40:41', 4, NULL),
(3, 'Jakarta timur', '2021-03-31 17:40:51', 4, NULL),
(4, 'Jakarta selatan', '2021-03-31 17:40:57', 4, NULL),
(5, 'Jakarta pusat', '2021-03-31 17:41:05', 4, NULL),
(6, 'Bekasi', '2021-03-31 17:41:13', 4, NULL),
(7, 'Depok', '2021-03-31 17:41:18', 4, NULL),
(8, 'Tangerang', '2021-03-31 17:41:24', 4, NULL),
(9, 'Bandung', '2021-03-31 17:41:36', 4, NULL),
(10, 'Karawang', '2021-03-31 17:41:48', 4, NULL);

--
-- Dumping data untuk tabel `movie`
--

INSERT INTO `movie` (`id`, `name`, `releaseDate`, `duration`, `description`, `director`, `star`, `picture`, `createdAt`, `createdBy`, `UpdatedAt`) VALUES
(1, 'Minions: The Rise of Gru', '2021-06-30', '1h 30m', 'The untold story of one twelve-year-old\'s dream to become the world\'s greatest supervillain. ', 'Kyle Balda, Brad Ableson', 'Steve Carell, Julie Andrews, Michelle Yeoh', 'movie-picture-1617296487453.jpg', '2021-04-01 17:01:27', 4, '2021-04-07 17:03:18'),
(2, 'The Marksman', '2021-01-21', '1h 48min', 'A rancher on the Arizona border becomes the unlikely defender of a young Mexican boy desperately fleeing the cartel assassins who\'ve pursued him into the U.S.', 'Robert Lorenz', 'Katheryn Winnick, Liam Neeson, Teresa Ruiz, Juan Pablo Raba', 'movie-picture-1617298337856.jpg', '2021-04-01 17:32:17', 4, '2021-04-07 17:04:01'),
(3, 'Don\'t Tell a Soul', '2021-01-15', '1h 23min', 'Two thieving teenage brothers, stealing money to help their sick mom, match wits with a troubled security guard stuck at the bottom of a forgotten well.', 'Alex McAulay', 'Fionn Whitehead, Jack Dylan Grazer, Mena Suvari, Rainn Wilson', 'movie-picture-1617421163036.jpg', '2021-04-03 03:39:23', 4, '2021-04-07 17:04:06'),
(4, 'Run Hide Fight', '2021-01-14', '1h 49min', '17-year-old Zoe Hull uses her wits, survival skills, and compassion to fight for her life, and those of her fellow classmates, against a group of live-streaming school shooters.', 'Kyle Rankin', 'Thomas Jane, Radha Mitchell, Isabel May, Eli Brown', 'movie-picture-1617421307096.jpg', '2021-04-03 03:41:47', 4, '2021-04-07 17:04:12'),
(5, 'The Friend', '2021-01-22', '2h 4min', 'After receiving life-altering news, a couple finds unexpected support from their best friend, who puts his own life on hold and moves into their family home, bringing an impact much greater and more profound than anyone could have imagined', 'Gabriela Cowperthwaite', 'Dakota Johnson, Gwendoline Christie, Casey Affleck', 'movie-picture-1617421477263.jpg', '2021-04-03 03:44:37', 4, '2021-04-07 17:04:18'),
(6, 'The Little Things', '2021-01-29', '2h 8min', 'Two cops track down a serial killer.', 'John Lee Hancock', 'Denzel Washington, Rami Malek, Jared Leto', 'movie-picture-1617421626824.jpg', '2021-04-03 03:47:06', 4, '2021-04-07 17:04:25'),
(7, 'The Night', '2021-01-29', '1h 45min', 'An Iranian couple living in the US become trapped inside a hotel when insidious events force them to face the secrets that have come between them, in a night that never ends.', 'Kourosh Ahari', 'Shahab Hosseini, Niousha Noor, George Maguire', 'movie-picture-1617421853512.jpg', '2021-04-03 03:50:53', 4, '2021-04-07 17:04:30'),
(8, 'Minamata', '2021-03-13', '1h 55min', 'War photographer W. Eugene Smith travels back to Japan where he documents the devastating effect of mercury poisoning in coastal communities.', 'Andrew Levitas', 'Johnny Depp, Bill Nighy, Hiroyuki Sanada', 'movie-picture-1617422059762.jpg', '2021-04-03 03:54:19', 4, '2021-04-07 17:04:35'),
(9, 'Judas and the Black Messiah', '2021-02-12', '2h 6m', 'The story of Fred Hampton, Chairman of the Illinois Black Panther Party, and his fateful betrayal by FBI informant William O\'Neal.', 'Shaka King', 'Daniel Kaluuya, LaKeith Stanfield, Jesse Plemons', 'movie-picture-1617422227639.jpg', '2021-04-03 03:57:07', 4, '2021-04-07 17:04:39'),
(10, 'French Exit', '2021-02-26', '1h 50min', 'An aging Manhattan socialite living on what\'s barely left of her inheritance moves to a small apartment in Paris with her son and cat.', 'Azazel Jacobs', 'Michelle Pfeiffer, Lucas Hedges, Tracy Letts', 'movie-picture-1617422387859.jpg', '2021-04-03 03:59:47', 4, '2021-04-07 17:04:44'),
(11, 'Tom and Jerry', '2021-02-11', '1h 41min', 'Adaption of the classic Hanna-Barbera property, which reveals how Tom and Jerry first meet and form their rivalry.', 'Tim Story', 'Chloë Grace Moretz, Michael Peña, Rob Delaney', 'movie-picture-1617422494942.jpg', '2021-04-03 04:01:34', 4, '2021-04-07 17:04:48'),
(12, 'Nobody', '2021-02-26', '1h 32min', 'A bystander who intervenes to help a woman being harassed by a group of men becomes the target of a vengeful drug lord.', 'Ilya Naishuller', 'Bob Odenkirk, Connie Nielsen, Christopher Lloyd', 'movie-picture-1617422659178.jpg', '2021-04-03 04:04:19', 4, '2021-04-07 17:04:52'),
(13, 'Chaos Walking', '2021-03-05', '1h 48min', 'A dystopian world where there are no women and all living creatures can hear each other\'s thoughts in a stream of images, words, and sounds called Noise.', 'Doug Liman', 'Tom Holland, Mads Mikkelsen, Daisy Ridley', 'movie-picture-1617422743438.jpg', '2021-04-03 04:05:43', 4, '2021-04-07 17:04:57'),
(14, 'Raya and the Last Dragon', '2021-03-10', '1h 57min', 'In a realm known as Kumandra, a re-imagined Earth inhabited by an ancient civilization, a warrior named Raya is determined to find the last dragon.', 'Don Hall, Carlos López Estrada', 'Kelly Marie Tran, Awkwafina', 'movie-picture-1617422939947.jpg', '2021-04-03 04:08:59', 4, '2021-04-07 17:05:02'),
(15, 'The King\'s Man', '2021-03-12', '2h 11min', 'In the early years of the 20th century, the Kingsman agency is formed to stand against a cabal plotting a war to wipe out millions.', 'Matthew Vaughn', 'Matthew Goode, Gemma Arterton, Aaron Taylor-Johnson', 'movie-picture-1617423019981.jpg', '2021-04-03 04:10:20', 4, '2021-04-07 17:05:07'),
(16, 'Godzilla vs. Kong', '2021-03-26', '1h 53min', 'The epic next chapter in the cinematic Monsterverse pits two of the greatest icons in motion picture history against one another - the fearsome Godzilla and the mighty Kong - with humanity caught in the balance.', 'Adam Wingard', 'Alexander Skarsgård, Millie Bobby Brown, Rebecca Hall', 'movie-picture-1617423427892.jpg', '2021-04-03 04:17:07', 4, '2021-04-07 17:05:11'),
(17, 'No Time to Die', '2021-03-31', '2h 43min', 'James Bond has left active service. His peace is short-lived when Felix Leiter, an old friend from the CIA, turns up asking for help, leading Bond onto the trail of a mysterious villain armed with dangerous new technology.', 'Cary Joji Fukunaga', 'Daniel Craig, Ana de Armas, Rami Malek', 'movie-picture-1617423506288.jpg', '2021-04-03 04:18:26', 4, '2021-04-07 17:05:21'),
(18, 'A Quiet Place Part II', '2021-04-21', '1h 37min', 'Following the events at home, the Abbott family now face the terrors of the outside world. Forced to venture into the unknown, they realize the creatures that hunt by sound are not the only threats lurking beyond the sand path.', 'John Krasinski', 'Emily Blunt, Millicent Simmonds, Cillian Murphy', 'movie-picture-1617423606863.jpg', '2021-04-03 04:20:06', 4, '2021-04-07 17:05:31'),
(19, 'Black Widow', '2021-05-05', '1h 37min', 'A film about Natasha Romanoff in her quests between the films Civil War and Infinity War.', 'Cate Shortland', 'Scarlett Johansson, Florence Pugh, David Harbour', 'movie-picture-1617423674180.jpg', '2021-04-03 04:21:14', 4, '2021-04-07 17:05:37'),
(20, 'Rumble', '2021-05-14', '', 'In a world where monster wrestling is a global sport and monsters are superstar athletes, teenage Winnie seeks to follow in her father\'s footsteps by coaching a loveable underdog monster into a champion.', 'Hamish Grieve', 'Ben Schwartz, Terry Crews, Will Arnett', 'movie-picture-1617423872770.jpg', '2021-04-03 04:24:32', 4, '2021-04-07 17:05:41'),
(21, 'Free Guy', '2021-05-21', '', 'A bank teller discovers that he\'s actually an NPC inside a brutal, open world video game.', 'Shawn Levy', 'Ryan Reynolds, Jodie Comer, Taika Waititi', 'movie-picture-1617423976337.jpg', '2021-04-03 04:26:16', 4, '2021-04-07 17:05:45'),
(22, 'F9', '2021-05-28', '3h 8min', 'Cypher enlists the help of Jakob, Dom\'s younger brother to take revenge on Dom and his team.', 'Justin Lin', 'Vin Diesel, Michelle Rodriguez, Charlize Theron', 'movie-picture-1617424083497.jpg', '2021-04-03 04:28:03', 4, '2021-04-07 17:05:50'),
(23, 'Top Gun: Maverick', '2021-06-02', '', 'After more than thirty years of service as one of the Navy\'s top aviators, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him. ', 'Joseph Kosinski', 'Tom Cruise, Jennifer Connelly, Miles Teller', 'movie-picture-1617424158678.jpg', '2021-04-03 04:29:18', 4, '2021-04-07 17:05:54'),
(24, 'The Boss Baby: Family Business', '2021-09-17', '', 'The Templeton brothers have become adults and drifted away from each other, but a new boss baby with a cutting-edge approach is about to bring them together again - and inspire a new family business. ', 'Tom McGrath', 'James Marsden, Amy Sedaris, Jeff Goldblum', 'movie-picture-1617424227476.jpg', '2021-04-03 04:30:27', 4, '2021-04-07 17:05:58');

--
-- Dumping data untuk tabel `time`
--

INSERT INTO `time` (`id`, `time`, `createAt`, `createdBy`, `updateAt`) VALUES
(1, '09.00 AM', '2021-03-31 18:00:31', 4, NULL),
(2, '09.30 AM', '2021-03-31 18:00:42', 4, NULL),
(3, '10.30 AM', '2021-03-31 18:00:52', 4, NULL),
(4, '11.30 AM', '2021-03-31 18:01:02', 4, NULL),
(5, '13.00 PM', '2021-03-31 18:01:28', 4, NULL),
(6, '13.30 PM', '2021-03-31 18:01:33', 4, NULL),
(7, '14.00 PM', '2021-03-31 18:01:46', 4, NULL),
(8, '14.30 PM', '2021-03-31 18:01:54', 4, NULL),
(9, '15.00 PM', '2021-03-31 18:02:03', 4, NULL),
(10, '15.30 PM', '2021-03-31 18:02:15', 4, NULL),
(11, '16.00 PM', '2021-03-31 18:02:24', 4, NULL),
(12, '17.00 PM', '2021-03-31 18:02:31', 4, NULL),
(13, '18.30 PM', '2021-03-31 18:02:42', 4, NULL),
(14, '19.00 PM', '2021-03-31 18:02:52', 4, NULL),
(15, '20.00 PM', '2021-03-31 18:03:02', 4, NULL),
(16, '21.00 PM', '2021-03-31 18:03:08', 4, NULL),
(17, '22.00 PM', '2021-03-31 18:03:15', 4, NULL);

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `email`, `password`, `phoneNumber`, `role`, `picture`, `createdAt`, `updatedAt`) VALUES
(3, 'undefined', 'lumping', 'yosefsitumorang97@gmail.com', '$2b$10$0VUTK8xVQSks5', '8899002211', 2, 'profile-picture-1617637036537.jpg', '2021-03-31 08:42:38', '2021-04-05 15:38:13'),
(4, 'undefined', 'undefined', 'undefined', '$2b$10$NjnF7Pef8.Z6KsBJ7ZO2UuaOKzeAWk57BljQJGZFUSGcGF8mj585O', '08888888888', 2, NULL, '2021-03-31 09:59:24', '2021-04-05 14:57:55'),
(5, 'null', 'null', 'dyno@gmail.com', '$2b$10$2miZSja99a.7B3xstNst2.C5149QJZs.KHE1t4NRVo3CK0BViPNye', 'null', 2, NULL, '2021-04-06 14:56:54', NULL),
(6, 'Yosef', '', 'ayam@gmail.com', '$2b$10$xHf2xw5BQIiMNpVGL7eiuOmSEj2I66kr.L2Nhkj1o.L/hh.7xo.kG', '89943311', 2, NULL, '2021-04-06 17:18:55', '2021-04-09 17:00:43');

--
-- Dumping data untuk tabel `purchase`
--

INSERT INTO `purchase` (`id`, `movie`, `date`, `location`, `cinema`, `time`, `price`, `seat`, `createdBy`, `createdAt`, `updatedAt`) VALUES
(2, 'Minions: The Rise of Gru', '2021-04-24 17:00:00', 'Depok', 'hiflix', '13.00pm', 40, '1,70,80', 4, '2021-04-04 10:17:39', NULL),
(3, 'Minions: The Rise of Gru', '2021-04-24 17:00:00', 'Depok', 'hiflix', '13.00pm', 20, '2,81', 4, '2021-04-04 11:11:15', '2021-04-04 14:17:10'),
(4, 'Minions: The Rise of Gru', '2021-04-24 17:00:00', 'Depok', 'hiflix', '13.00pm', 10, '5', 4, '2021-04-04 15:12:26', NULL),
(5, 'Minions: The Rise of Gru', '2021-04-24 17:00:00', 'Depok', 'hiflix', '13.00pm', 30, '20,76,97', 4, '2021-04-05 03:17:59', NULL),
(6, 'Minions: The Rise of Gru', '2021-04-24 17:00:00', 'Depok', 'hiflix', '13.00pm', 30, '55,66,88', 4, '2021-04-05 03:20:58', NULL);

--
-- Dumping data untuk tabel `seat`
--

INSERT INTO `seat` (`id`, `name`, `createdAt`, `createdBy`, `updatedAt`) VALUES
(1, 'A1', '2021-04-01 15:23:09', 4, NULL),
(2, 'A2', '2021-04-01 15:23:17', 4, NULL),
(3, 'A3', '2021-04-01 15:23:20', 4, NULL),
(4, 'A4', '2021-04-01 15:23:29', 4, NULL),
(5, 'A5', '2021-04-01 15:23:42', 4, NULL),
(6, 'A6', '2021-04-01 15:23:47', 4, NULL),
(7, 'A7', '2021-04-01 15:23:50', 4, NULL),
(8, 'A8', '2021-04-01 15:23:53', 4, NULL),
(9, 'A9', '2021-04-01 15:23:58', 4, NULL),
(10, 'A10', '2021-04-01 15:24:03', 4, NULL),
(11, 'A11', '2021-04-01 15:24:09', 4, NULL),
(12, 'A12', '2021-04-01 15:24:12', 4, NULL),
(13, 'A13', '2021-04-01 15:24:16', 4, NULL),
(14, 'A14', '2021-04-01 15:24:19', 4, NULL),
(15, 'B1', '2021-04-01 15:25:03', 4, NULL),
(16, 'B2', '2021-04-01 15:25:08', 4, NULL),
(17, 'B3', '2021-04-01 15:25:12', 4, NULL),
(18, 'B4', '2021-04-01 15:25:23', 4, NULL),
(19, 'B5', '2021-04-01 15:25:31', 4, NULL),
(20, 'B6', '2021-04-01 15:25:35', 4, NULL),
(21, 'B7', '2021-04-01 15:25:39', 4, NULL),
(22, 'B8', '2021-04-01 15:25:44', 4, NULL),
(23, 'B9', '2021-04-01 15:25:49', 4, NULL),
(24, 'B10', '2021-04-01 15:25:55', 4, NULL),
(25, 'B11', '2021-04-01 15:25:59', 4, NULL),
(26, 'B12', '2021-04-01 15:26:03', 4, NULL),
(27, 'B13', '2021-04-01 15:26:07', 4, NULL),
(28, 'B14', '2021-04-01 15:26:11', 4, NULL),
(29, 'C1', '2021-04-01 15:26:20', 4, NULL),
(30, 'C2', '2021-04-01 15:26:25', 4, NULL),
(31, 'C3', '2021-04-01 15:26:28', 4, NULL),
(32, 'C4', '2021-04-01 15:26:31', 4, NULL),
(33, 'C5', '2021-04-01 15:26:36', 4, NULL),
(34, 'C6', '2021-04-01 15:26:40', 4, NULL),
(35, 'C7', '2021-04-01 15:26:43', 4, NULL),
(36, 'C8', '2021-04-01 15:26:47', 4, NULL),
(37, 'C9', '2021-04-01 15:26:50', 4, NULL),
(38, 'C10', '2021-04-01 15:26:55', 4, NULL),
(39, 'C11', '2021-04-01 15:27:03', 4, NULL),
(40, 'C12', '2021-04-01 15:27:07', 4, NULL),
(41, 'C13', '2021-04-01 15:27:10', 4, NULL),
(42, 'C14', '2021-04-01 15:27:14', 4, NULL),
(43, 'D1', '2021-04-01 15:27:26', 4, NULL),
(44, 'D2', '2021-04-01 15:27:30', 4, NULL),
(45, 'D3', '2021-04-01 15:27:33', 4, NULL),
(46, 'D4', '2021-04-01 15:27:37', 4, NULL),
(47, 'D5', '2021-04-01 15:27:41', 4, NULL),
(48, 'D6', '2021-04-01 15:27:45', 4, NULL),
(49, 'D7', '2021-04-01 15:27:49', 4, '2021-04-01 15:28:14'),
(50, 'D8', '2021-04-01 15:28:22', 4, NULL),
(51, 'D9', '2021-04-01 15:28:26', 4, NULL),
(52, 'D10', '2021-04-01 15:28:31', 4, NULL),
(53, 'D11', '2021-04-01 15:28:35', 4, NULL),
(54, 'D12', '2021-04-01 15:28:38', 4, NULL),
(55, 'D13', '2021-04-01 15:28:41', 4, NULL),
(56, 'D14', '2021-04-01 15:28:44', 4, NULL),
(57, 'E1', '2021-04-01 15:28:59', 4, NULL),
(58, 'E2', '2021-04-01 15:29:04', 4, NULL),
(59, 'E3', '2021-04-01 15:29:07', 4, NULL),
(60, 'E4', '2021-04-01 15:29:11', 4, NULL),
(61, 'E5', '2021-04-01 15:30:43', 4, NULL),
(62, 'E6', '2021-04-01 15:30:46', 4, NULL),
(63, 'E7', '2021-04-01 15:30:49', 4, NULL),
(64, 'E8', '2021-04-01 15:30:53', 4, NULL),
(65, 'E9', '2021-04-01 15:30:58', 4, NULL),
(66, 'E10', '2021-04-01 15:31:03', 4, NULL),
(67, 'E11', '2021-04-01 15:31:07', 4, NULL),
(68, 'E12', '2021-04-01 15:31:12', 4, NULL),
(69, 'E13', '2021-04-01 15:31:17', 4, NULL),
(70, 'E14', '2021-04-01 15:31:22', 4, NULL),
(71, 'F1', '2021-04-01 15:31:39', 4, NULL),
(72, 'F2', '2021-04-01 15:31:43', 4, NULL),
(73, 'F3', '2021-04-01 15:31:47', 4, NULL),
(74, 'F4', '2021-04-01 15:33:21', 4, NULL),
(75, 'F5', '2021-04-01 15:33:25', 4, NULL),
(76, 'F6', '2021-04-01 15:33:28', 4, NULL),
(77, 'F7', '2021-04-01 15:33:32', 4, NULL),
(78, 'F8', '2021-04-01 15:33:35', 4, NULL),
(79, 'F9', '2021-04-01 15:33:39', 4, NULL),
(80, 'F10', '2021-04-01 15:33:43', 4, NULL),
(81, 'F12', '2021-04-01 15:33:46', 4, NULL),
(82, 'F13', '2021-04-01 15:34:16', 4, NULL),
(83, 'F14', '2021-04-01 15:34:31', 4, NULL),
(84, 'G1', '2021-04-01 15:34:59', 4, NULL),
(85, 'G2', '2021-04-01 15:35:03', 4, NULL),
(86, 'G3', '2021-04-01 15:35:07', 4, NULL),
(87, 'G4', '2021-04-01 15:35:11', 4, NULL),
(88, 'G5', '2021-04-01 15:35:17', 4, NULL),
(89, 'G6', '2021-04-01 15:35:22', 4, NULL),
(90, 'G7', '2021-04-01 15:35:25', 4, NULL),
(91, 'G8', '2021-04-01 15:35:29', 4, NULL),
(92, 'G9', '2021-04-01 15:35:33', 4, NULL),
(93, 'G10', '2021-04-01 15:35:37', 4, NULL),
(94, 'G11', '2021-04-01 15:35:42', 4, NULL),
(95, 'G12', '2021-04-01 15:35:45', 4, NULL),
(96, 'G13', '2021-04-01 15:35:48', 4, NULL),
(97, 'G14', '2021-04-01 15:35:52', 4, NULL);

--
-- Dumping data untuk tabel `purchaseseat`
--

INSERT INTO `purchaseseat` (`id`, `idPurchase`, `idSeat`, `createdAt`, `createdBy`, `updatedAt`) VALUES
(1, 17, 5, '2021-04-03 16:00:56', NULL, NULL),
(2, 17, 10, '2021-04-03 16:00:56', NULL, NULL),
(3, 18, 11, '2021-04-03 16:06:02', NULL, NULL),
(4, 18, 12, '2021-04-03 16:06:02', NULL, NULL),
(5, 19, 1, '2021-04-03 16:06:31', NULL, NULL),
(6, 19, 15, '2021-04-03 16:06:31', NULL, NULL),
(7, 20, 1, '2021-04-03 16:22:52', NULL, NULL),
(8, 20, 15, '2021-04-03 16:22:52', NULL, NULL),
(9, 21, 15, '2021-04-03 16:23:14', NULL, NULL),
(10, 21, 80, '2021-04-03 16:23:14', NULL, NULL),
(11, 22, 15, '2021-04-03 16:26:15', NULL, NULL),
(12, 22, 80, '2021-04-03 16:26:15', NULL, NULL),
(13, 23, 15, '2021-04-03 16:26:29', NULL, NULL),
(14, 23, 80, '2021-04-03 16:26:29', NULL, NULL),
(15, 24, 15, '2021-04-03 16:27:29', NULL, NULL),
(16, 24, 80, '2021-04-03 16:27:29', NULL, NULL),
(17, 25, 15, '2021-04-03 16:37:14', NULL, NULL),
(18, 25, 80, '2021-04-03 16:37:14', NULL, NULL),
(19, 26, 15, '2021-04-03 16:37:32', NULL, NULL),
(20, 26, 30, '2021-04-03 16:37:32', NULL, NULL),
(21, 26, 80, '2021-04-03 16:37:32', NULL, NULL),
(22, 27, 15, '2021-04-03 16:37:40', NULL, NULL),
(23, 27, 30, '2021-04-03 16:37:40', NULL, NULL),
(24, 28, 15, '2021-04-03 16:38:26', NULL, NULL),
(25, 28, 30, '2021-04-03 16:38:26', NULL, NULL),
(26, 29, 1, '2021-04-03 16:38:40', NULL, NULL),
(27, 29, 70, '2021-04-03 16:38:40', NULL, NULL),
(28, 29, 80, '2021-04-03 16:38:40', NULL, NULL),
(29, NULL, 1, '2021-04-03 16:58:13', NULL, NULL),
(30, NULL, 70, '2021-04-03 16:58:13', NULL, NULL),
(31, NULL, 80, '2021-04-03 16:58:13', NULL, NULL),
(32, 2, 1, '2021-04-04 10:17:39', NULL, NULL),
(33, 2, 70, '2021-04-04 10:17:39', NULL, NULL),
(34, 2, 80, '2021-04-04 10:17:39', NULL, NULL),
(35, 3, 1, '2021-04-04 11:11:15', NULL, NULL),
(36, 3, 81, '2021-04-04 11:11:15', NULL, NULL),
(37, 4, 5, '2021-04-04 15:12:26', NULL, NULL),
(38, 5, 20, '2021-04-05 03:17:59', NULL, NULL),
(39, 5, 76, '2021-04-05 03:17:59', NULL, NULL),
(40, 5, 97, '2021-04-05 03:17:59', NULL, NULL),
(41, 6, 55, '2021-04-05 03:20:58', NULL, NULL),
(42, 6, 66, '2021-04-05 03:20:58', NULL, NULL),
(43, 6, 88, '2021-04-05 03:20:58', NULL, NULL);

--
-- Dumping data untuk tabel `moviegenre`
--

INSERT INTO `moviegenre` (`id`, `idMovie`, `idGenre`, `createdAt`, `createdBy`, `updatedAt`) VALUES
(1, 1, 2, '2021-04-01 17:01:27', NULL, NULL),
(2, 1, 3, '2021-04-01 17:01:27', NULL, NULL),
(3, 1, 5, '2021-04-01 17:01:27', NULL, NULL),
(4, 2, 1, '2021-04-01 17:32:17', NULL, NULL),
(5, 2, 13, '2021-04-01 17:32:17', NULL, NULL),
(6, 3, 8, '2021-04-03 03:39:23', NULL, NULL),
(7, 3, 13, '2021-04-03 03:39:23', NULL, NULL),
(8, 4, 1, '2021-04-03 03:41:47', NULL, NULL),
(9, 5, 8, '2021-04-03 03:44:37', NULL, NULL),
(10, 6, 6, '2021-04-03 03:47:06', NULL, NULL),
(11, 6, 8, '2021-04-03 03:47:06', NULL, NULL),
(12, 6, 13, '2021-04-03 03:47:06', NULL, NULL),
(13, 7, 11, '2021-04-03 03:50:53', NULL, NULL),
(14, 7, 13, '2021-04-03 03:50:53', NULL, NULL),
(15, 7, 14, '2021-04-03 03:50:53', NULL, NULL),
(16, 8, 8, '2021-04-03 03:54:19', NULL, '2021-04-03 03:55:16'),
(17, 9, 4, '2021-04-03 03:57:07', NULL, NULL),
(18, 9, 8, '2021-04-03 03:57:07', NULL, NULL),
(19, 9, 10, '2021-04-03 03:57:07', NULL, NULL),
(20, 10, 5, '2021-04-03 03:59:47', NULL, NULL),
(21, 10, 8, '2021-04-03 03:59:47', NULL, NULL),
(22, 11, 2, '2021-04-03 04:01:35', NULL, NULL),
(23, 11, 1, '2021-04-03 04:01:35', NULL, '2021-04-03 04:11:00'),
(24, 11, 5, '2021-04-03 04:01:35', NULL, '2021-04-03 04:14:00'),
(25, 12, 1, '2021-04-03 04:04:19', NULL, '2021-04-03 04:14:45'),
(26, 12, 6, '2021-04-03 04:04:19', NULL, NULL),
(27, 12, 8, '2021-04-03 04:04:19', NULL, NULL),
(28, 13, 2, '2021-04-03 04:05:43', NULL, NULL),
(29, 13, 12, '2021-04-03 04:05:43', NULL, NULL),
(30, 14, 1, '2021-04-03 04:09:00', NULL, NULL),
(31, 14, 2, '2021-04-03 04:09:00', NULL, NULL),
(32, 14, 3, '2021-04-03 04:09:00', NULL, NULL),
(33, 15, 1, '2021-04-03 04:10:20', NULL, NULL),
(34, 15, 2, '2021-04-03 04:10:20', NULL, '2021-04-03 04:15:22'),
(35, 15, 5, '2021-04-03 04:10:20', NULL, '2021-04-03 04:15:29'),
(36, 16, 1, '2021-04-03 04:17:07', NULL, NULL),
(37, 16, 12, '2021-04-03 04:17:07', NULL, NULL),
(38, 16, 13, '2021-04-03 04:17:07', NULL, NULL),
(39, 17, 1, '2021-04-03 04:18:26', NULL, NULL),
(40, 17, 2, '2021-04-03 04:18:26', NULL, NULL),
(41, 17, 13, '2021-04-03 04:18:26', NULL, NULL),
(42, 18, 8, '2021-04-03 04:20:06', NULL, NULL),
(43, 18, 11, '2021-04-03 04:20:06', NULL, NULL),
(44, 18, 12, '2021-04-03 04:20:06', NULL, NULL),
(45, 19, 1, '2021-04-03 04:21:14', NULL, NULL),
(46, 19, 2, '2021-04-03 04:21:14', NULL, NULL),
(47, 19, 12, '2021-04-03 04:21:14', NULL, NULL),
(48, 20, 3, '2021-04-03 04:24:32', NULL, NULL),
(49, 20, 4, '2021-04-03 04:24:32', NULL, NULL),
(50, 20, 9, '2021-04-03 04:24:32', NULL, NULL),
(51, 21, 1, '2021-04-03 04:26:16', NULL, NULL),
(52, 21, 2, '2021-04-03 04:26:16', NULL, NULL),
(53, 21, 5, '2021-04-03 04:26:16', NULL, NULL),
(54, 22, 1, '2021-04-03 04:28:03', NULL, NULL),
(55, 22, 2, '2021-04-03 04:28:03', NULL, NULL),
(56, 22, 6, '2021-04-03 04:28:03', NULL, NULL),
(57, 23, 1, '2021-04-03 04:29:18', NULL, NULL),
(58, 23, 8, '2021-04-03 04:29:18', NULL, NULL),
(59, 24, 2, '2021-04-03 04:30:27', NULL, NULL),
(60, 24, 3, '2021-04-03 04:30:27', NULL, NULL),
(61, 24, 5, '2021-04-03 04:30:27', NULL, NULL);


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
