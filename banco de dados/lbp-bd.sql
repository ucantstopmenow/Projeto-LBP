create database lbp;
use lbp;

-- Tabela de usuários
CREATE TABLE Usuario (
    idUser INT PRIMARY KEY AUTO_INCREMENT,
    nickname VARCHAR(100) UNIQUE not null,
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(100) not null
);

-- Tabela de mensagens
CREATE TABLE Mensagem (
    idMensagem INT PRIMARY KEY AUTO_INCREMENT,
    fkUser INT,
    Mensagem VARCHAR(600),
    DataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fkUser) REFERENCES Usuario(idUser)
);
