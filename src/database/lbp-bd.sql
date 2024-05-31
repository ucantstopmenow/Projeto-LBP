CREATE DATABASE lbp;
-- drop database lbp;
USE lbp;

-- drop table if exists usuario;
-- drop table if exists post;
-- drop table if exists interacao;

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post (
    idPost INT PRIMARY KEY AUTO_INCREMENT,
    conteudo TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE interacao (
    idInteracao INT PRIMARY KEY AUTO_INCREMENT,
    conteudo TEXT NOT NULL,
    curtida INT DEFAULT 0,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fkUsuario INT,
    fkPost INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (fkPost) REFERENCES post(idPost)
);

-- Inserção de teste na tabela usuario
INSERT INTO usuario (nome, email, senha)
VALUES ('João Silva', 'joao@example.com', 'senha123');

-- Inserção de teste na tabela post
INSERT INTO post (conteudo, fkUsuario)
VALUES ('Este é o conteúdo do primeiro post', 1);

-- Inserção de teste na tabela interacao
INSERT INTO interacao (conteudo, curtida, fkUsuario, fkPost)
VALUES ('Comentário no primeiro post', 1, 1, 1);

-- Selecionar dados para verificação
SELECT * FROM usuario;
SELECT * FROM post;
SELECT * FROM interacao;
