var blogModel = require("../models/blogModel");

// Controlador para obter todas as postagens
function getPost(req, res) {
    blogModel.getPosts()
        .then(posts => res.json(post))
        .catch(err => res.status(500).json({ error: err.message }));
}

// Controlador para criar uma nova postagem
function createPost(req, res) {
    var { conteudo } = req.body;
    var nomeUsuario = req.session.usuario.nome; // Supondo que o nome do usuário está na sessão

    blogModel.createPost(conteudo, nomeUsuario)
        .then(post => res.json(post))
        .catch(err => res.status(500).json({ error: err.message }));
}

// Controlador para curtir uma postagem
function likePost(req, res) {
    var idPost = req.params.id;

    blogModel.likePost(idPost)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).json({ error: err.message }));
}

// Controlador para obter comentários de uma postagem
function getComments(req, res) {
    var idPost = req.params.id;

    blogModel.getComments(idPost)
        .then(comments => res.json(comments))
        .catch(err => res.status(500).json({ error: err.message }));
}

// Controlador para adicionar um comentário a uma postagem
function addComment(req, res) {
    var idPost = req.params.id;
    var { conteudo } = req.body;
    var nomeUsuario = req.session.usuario.nome; // Supondo que o nome do usuário está na sessão

    blogModel.addComment(idPost, conteudo, nomeUsuario)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).json({ error: err.message }));
}

module.exports = {
    getPost,
    createPost,
    likePost,
    getComments,
    addComment
};
