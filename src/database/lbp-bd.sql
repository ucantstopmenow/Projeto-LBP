CREATE DATABASE lbp;
-- drop database lbp;
USE lbp;

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quiz_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    resposta_correta INT NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from quiz_results;
-- truncate table quiz_results;

