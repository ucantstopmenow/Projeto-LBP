create database lbp;
-- drop database lbp;
use lbp;

CREATE TABLE usuario (
    idUsuario int PRIMARY KEY auto_increment,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post (
    idPost int PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE comentario (
    idComentario SERIAL PRIMARY KEY,
    conteudo TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fkUsuario INT,
    fkPost INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (fkPost) REFERENCES post(idPost)
);

select * from usuario;