create database lbp;
-- drop database lbp;
use lbp;

-- drop table usuario;

-- 29 de Maio

CREATE TABLE usuario (
    idUsuario int PRIMARY KEY auto_increment,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post (
    idPost int PRIMARY KEY,
    conteudo TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE interacao (
    idInteracao SERIAL PRIMARY KEY,
    conteudo TEXT NOT NULL,
    curtida int,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fkUsuario INT,
    fkPost INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (fkPost) REFERENCES post(idPost)
);

select * from usuario;
select * from interacao;
select * from post;

SELECT idUsuario, nome, email FROM usuario