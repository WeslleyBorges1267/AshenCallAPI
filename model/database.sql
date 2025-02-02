-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 172.17.0.2
-- Tempo de geração: 02/02/2025 às 18:51
-- Versão do servidor: 9.1.0
-- Versão do PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `ashencall`
--
CREATE DATABASE IF NOT EXISTS `ashencall` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `ashencall`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `cargos`
--

CREATE TABLE `cargos` (
  `idCargo` int NOT NULL,
  `nomeCargo` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `cargos`
--

INSERT INTO `cargos` (`idCargo`, `nomeCargo`) VALUES
(2, 'Serviços gerais');

-- --------------------------------------------------------

--
-- Estrutura para tabela `chamados`
--

CREATE TABLE `chamados` (
  `idChamado` int NOT NULL,
  `tituloChamado` varchar(60) NOT NULL,
  `descricaoChamado` text,
  `tipoChamado` int NOT NULL,
  `statusChamado` int NOT NULL,
  `grupoResponsavel` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `chamados`
--

INSERT INTO `chamados` (`idChamado`, `tituloChamado`, `descricaoChamado`, `tipoChamado`, `statusChamado`, `grupoResponsavel`) VALUES
(1, 'Computador não liga', 'aaa', 3, 4, 1),
(2, 'Computador não liga', 'aaa', 3, 1, 1),
(3, 'Computador não liga', 'aaa', 3, 1, 1),
(4, 'Financeiro teste', 'aaa', 3, 1, 2),
(5, 'RH teste', 'aaa', 3, 1, 3),
(6, 'RH teste', 'aaa', 3, 1, 3),
(7, 'Recepção teste', 'aaa', 3, 1, 4),
(8, 'Recepção teste', 'aaa', 3, 1, 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `grupos`
--

CREATE TABLE `grupos` (
  `idGrupo` int NOT NULL,
  `nomeGrupo` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `grupos`
--

INSERT INTO `grupos` (`idGrupo`, `nomeGrupo`) VALUES
(1, 'Suporte de TI'),
(2, 'Financeiro'),
(3, 'RH'),
(4, 'Recepção');

-- --------------------------------------------------------

--
-- Estrutura para tabela `grupoUsuarios`
--

CREATE TABLE `grupoUsuarios` (
  `idGrupoUsuario` int NOT NULL,
  `idUsuario` int NOT NULL,
  `idGrupo` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `grupoUsuarios`
--

INSERT INTO `grupoUsuarios` (`idGrupoUsuario`, `idUsuario`, `idGrupo`) VALUES
(1, 50, 1),
(2, 50, 1),
(3, 50, 2),
(4, 50, 3);

-- --------------------------------------------------------

--
-- Estrutura para tabela `statusChamado`
--

CREATE TABLE `statusChamado` (
  `idStatus` int NOT NULL,
  `nomeStatus` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `statusChamado`
--

INSERT INTO `statusChamado` (`idStatus`, `nomeStatus`) VALUES
(1, 'Aberto'),
(2, 'Em atendimento'),
(3, 'Solucionado'),
(4, 'Fechado');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tipoChamado`
--

CREATE TABLE `tipoChamado` (
  `idTipoChamado` int NOT NULL,
  `nomeTipoChamado` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `tipoChamado`
--

INSERT INTO `tipoChamado` (`idTipoChamado`, `nomeTipoChamado`) VALUES
(1, 'Suporte'),
(2, 'Edital'),
(3, 'Viagem');

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `idUser` int NOT NULL,
  `nomeUser` varchar(60) NOT NULL,
  `emailUser` varchar(255) NOT NULL,
  `passwordUser` char(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cargo` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`idUser`, `nomeUser`, `emailUser`, `passwordUser`, `cargo`) VALUES
(50, 'teste', 'teste.email@gmail.com', '$2b$12$KmHGqPTyWsXxQFpHyDsiE.93ftM6bRbNBbM7bJyb9sLtyA.YWOHFC', 2),
(51, 'teste', 'teste2.email@gmail.com', '$2b$12$a7ixulaRomrLVTAMsP2Scug.ny.M5aGo9fuZUQ1ZWKO9b.pfR4V/C', 2);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`idCargo`);

--
-- Índices de tabela `chamados`
--
ALTER TABLE `chamados`
  ADD PRIMARY KEY (`idChamado`),
  ADD KEY `fk_statusChamado` (`statusChamado`),
  ADD KEY `fk_tipoChamado` (`tipoChamado`),
  ADD KEY `fk_grupoResponsavel` (`grupoResponsavel`);

--
-- Índices de tabela `grupos`
--
ALTER TABLE `grupos`
  ADD PRIMARY KEY (`idGrupo`);

--
-- Índices de tabela `grupoUsuarios`
--
ALTER TABLE `grupoUsuarios`
  ADD PRIMARY KEY (`idGrupoUsuario`),
  ADD KEY `fk_idUsuario` (`idUsuario`),
  ADD KEY `fk_idGrupo` (`idGrupo`);

--
-- Índices de tabela `statusChamado`
--
ALTER TABLE `statusChamado`
  ADD PRIMARY KEY (`idStatus`);

--
-- Índices de tabela `tipoChamado`
--
ALTER TABLE `tipoChamado`
  ADD PRIMARY KEY (`idTipoChamado`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`),
  ADD KEY `fk_cargo` (`cargo`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cargos`
--
ALTER TABLE `cargos`
  MODIFY `idCargo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `chamados`
--
ALTER TABLE `chamados`
  MODIFY `idChamado` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `grupos`
--
ALTER TABLE `grupos`
  MODIFY `idGrupo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `grupoUsuarios`
--
ALTER TABLE `grupoUsuarios`
  MODIFY `idGrupoUsuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `statusChamado`
--
ALTER TABLE `statusChamado`
  MODIFY `idStatus` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `tipoChamado`
--
ALTER TABLE `tipoChamado`
  MODIFY `idTipoChamado` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `chamados`
--
ALTER TABLE `chamados`
  ADD CONSTRAINT `fk_grupoResponsavel` FOREIGN KEY (`grupoResponsavel`) REFERENCES `grupos` (`idGrupo`),
  ADD CONSTRAINT `fk_statusChamado` FOREIGN KEY (`statusChamado`) REFERENCES `statusChamado` (`idStatus`),
  ADD CONSTRAINT `fk_tipoChamado` FOREIGN KEY (`tipoChamado`) REFERENCES `tipoChamado` (`idTipoChamado`);

--
-- Restrições para tabelas `grupoUsuarios`
--
ALTER TABLE `grupoUsuarios`
  ADD CONSTRAINT `fk_idGrupo` FOREIGN KEY (`idGrupo`) REFERENCES `grupos` (`idGrupo`),
  ADD CONSTRAINT `fk_idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `users` (`idUser`);

--
-- Restrições para tabelas `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_cargo` FOREIGN KEY (`cargo`) REFERENCES `cargos` (`idCargo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
