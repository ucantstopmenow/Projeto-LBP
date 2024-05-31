const blogModel = require("../models/blogModel");

function getPosts(req, res) {
    blogModel.getPosts()
        .then(posts => res.json(posts))
        .catch(err => res.status(500).json({ error: err.message }));
}

function createPost(req, res) {
    const { conteudo } = req.body;
    blogModel.createPost(conteudo)
        .then(post => res.json(post))
        .catch(err => res.status(500).json({ error: err.message }));
}

function likePost(req, res) {
    const { id } = req.params;
    blogModel.likePost(id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).json({ error: err.message }));
}

function getComments(req, res) {
    const { id } = req.params;
    blogModel.getComments(id)
        .then(comments => res.json(comments))
        .catch(err => res.status(500).json({ error: err.message }));
}

function addComment(req, res) {
    const { id } = req.params;
    const { conteudo } = req.body;
    blogModel.addComment(id, conteudo)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).json({ error: err.message }));
}

module.exports = {
    getPosts,
    createPost,
    likePost,
    getComments,
    addComment
};
