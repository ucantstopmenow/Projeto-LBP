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

CREATE TABLE quiz (
    idQuiz INT AUTO_INCREMENT PRIMARY KEY,
    nome_quiz VARCHAR(255) NOT NULL,
    descricao varchar(200)
);

CREATE TABLE quiz_results (
    idQuizResult INT AUTO_INCREMENT PRIMARY KEY,
    fkQuiz INT,
    fkUsuario INT,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resposta_correta INT NOT NULL,
    FOREIGN KEY (fkQuiz) REFERENCES quiz(idQuiz),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

select * from quiz_results;
select * from usuario;
select * from quiz;
-- truncate table quiz_results;

insert into quiz (nome_quiz, descricao) values
("lbp", "primeiro quiz")
