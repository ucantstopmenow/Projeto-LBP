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
("lbp", "primeiro quiz");
INSERT INTO usuario (nome, email, senha) VALUES ('Usuário 1', 'usuario1@example.com', 'senha123');
INSERT INTO quiz_results (fkQuiz, fkUsuario, resposta_correta) VALUES (1, 1, 1), (1, 1, 0), (1, 1, 1);

SELECT
    ROUND((SUM(resposta_correta) / COUNT(*)) * 10) AS correctPercentage,
    (SELECT COUNT(DISTINCT idUsuario) FROM usuario) AS totalPlayers,
    (
        SELECT JSON_ARRAYAGG(count)
        FROM (
            SELECT COUNT(*) AS count
            FROM quiz_results
            GROUP BY DAYOFWEEK(data_registro)
        ) AS dailyAttempts
    ) AS attemptsData
FROM quiz_results;