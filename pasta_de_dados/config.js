var mysql = require("mysql2");

// Configuração do banco de dados MySQL Server
var mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

// Função para executar consultas SQL
function executar(instrucao) {
    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
    }

    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(mySqlConfig);
        conexao.connect(function (err) {
            if (err) {
                console.error("Erro ao conectar ao MySQL:", err);
                return reject(err);
            }

            conexao.query(instrucao, function (erro, resultados) {
                conexao.end();
                if (erro) {
                    console.error("Erro ao executar a query:", erro);
                    return reject(erro);
                }
                console.log(resultados);
                resolve(resultados);
            });
        });

        conexao.on('error', function (erro) {
            console.error("ERRO NO MySQL SERVER:", erro.sqlMessage);
            return reject(erro);
        });
    });
}

module.exports = {
    executar
};
