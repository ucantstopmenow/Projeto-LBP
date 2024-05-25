create database lbp;
use lbp;

CREATE TABLE usuario (
    id int PRIMARY KEY auto_increment,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post (
    id int PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE comentario (
    id SERIAL PRIMARY KEY,
    conteudo TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fkUsuario INT,
    fkPost INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (fkPost) REFERENCES posts(id) ON DELETE CASCADE
);
