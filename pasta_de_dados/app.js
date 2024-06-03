// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
const bodyParser = require('body-parser');
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;
const mysql = require('mysql2');

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '20358637hp',
    database: 'lbp'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados.');
});

app.post('/saveQuizResults', (req, res) => {
    const {quizId, userId, correctAnswers } = req.body;
    const sql = 'INSERT INTO quiz_results (fkQuiz, fkUsuario, resposta_correta) VALUES (?, ?, ?)';
    db.query(sql, [quizId, userId, correctAnswers], (err, result) => {
        if (err) {
            console.error('Erro ao salvar resultados no banco de dados:', err);
            res.status(500).send('Erro ao salvar resultados');
            return;
        }
        console.log('Resultados salvos no banco de dados:', result);
        res.json({ message: 'Resultados salvos com sucesso!' });
    });
});

app.get('/quizData', (req, res) => {
    const sql = `
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
    `;
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Erro ao buscar dados do quiz:', err);
            res.status(500).send('Erro ao buscar dados');
            return;
        }
        console.log('Dados do quiz:', result);
        res.json(result[0]);
    });
});

app.listen(PORTA_APP, function () {
    console.log(`
    ──────▄▀▄─────▄▀▄
    ─────▄█░░▀▀▀▀▀░░█▄
    ─▄▄──█░░░░░░░░░░░█──▄▄
    █▄▄█─█░░▀░░┬░░▀░░█─█▄▄█
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
