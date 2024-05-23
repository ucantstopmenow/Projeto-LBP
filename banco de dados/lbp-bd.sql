create database lbp;
use lbp;

-- Tabela de usuários
CREATE TABLE Usuario (
    idUser INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) not null,
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(100) not null
);

-- Tabela de mensagens
CREATE TABLE Mensagem (
    idMensagem INT PRIMARY KEY AUTO_INCREMENT,
    fkUser INT,
    Mensagem VARCHAR(600),
    DataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fkUser) REFERENCES Usuarios(idUser)
);
