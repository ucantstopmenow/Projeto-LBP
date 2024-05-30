var database = require("../database/config");

// Modelo para obter todas as postagens
function getPosts() {
    var query = "SELECT * FROM post";
    return database.executar(query);
}

// Modelo para criar uma nova postagem
function createPost(conteudo, fkUsuario) {
    var query = `INSERT INTO post (conteudo, fkUsuario) VALUES (?, ?)`;
    var values = [conteudo, fkUsuario];
    return database.executar(query, values);
}

// Modelo para curtir uma postagem
function likePost(postId) {
    var query = `UPDATE post SET curtidas = curtidas + 1 WHERE idPost = ?`;
    var values = [postId];
    return database.executar(query, values);
}

// Modelo para obter comentários de uma postagem
function getComments(postId) {
    var query = `SELECT * FROM interacao WHERE fkPost = ?`;
    var values = [postId];
    return database.executar(query, values);
}

// Modelo para adicionar um comentário a uma postagem
function addComment(postId, conteudo, fkUsuario) {
    var query = `INSERT INTO interacao (conteudo, fkUsuario, fkPost) VALUES (?, ?, ?)`;
    var values = [conteudo, fkUsuario, postId];
    return database.executar(query, values);
}

module.exports = {
    getPosts,
    createPost,
    likePost,
    getComments,
    addComment
};
