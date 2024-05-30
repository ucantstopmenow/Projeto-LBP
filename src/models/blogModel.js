var database = require("../database/config");

// Modelo para obter todas as postagens
function getPosts() {
    var query = "SELECT * FROM post";
    return database.executar(query);
}

// Modelo para criar uma nova postagem
function createPost(conteudo, fkUsuario) {
    var query = `INSERT INTO post (conteudo, fkUsuario) VALUES ('${conteudo}', '${fkUsuario}')`;
    return database.executar(query);
}

// Modelo para curtir uma postagem
function likePost(idPost) {
    var query = `UPDATE posts SET curtida = curtida + 1 WHERE idPost = ${idPost}`;
    return database.executar(query);
}

// Modelo para obter comentários de uma postagem
function getComments(idPost) {
    var query = `SELECT * FROM interacao WHERE fkPost = ${idPost}`;
    return database.executar(query);
}

// Modelo para adicionar um comentário a uma postagem
function addComment(postId, conteudo, nomeUsuario) {
    var query = `INSERT INTO comments (postId, conteudo, nomeUsuario) VALUES (${postId}, '${conteudo}', '${nomeUsuario}')`;
    return database.executar(query);
}

module.exports = {
    getPosts,
    createPost,
    likePost,
    getComments,
    addComment
};
