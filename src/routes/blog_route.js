var express = require("express");
var router = express.Router();

var blogController = require("../controllers/blogController");

// Rota para obter todas as postagens
router.get("/getPost", function (req, res) {
    blogController.getPosts(req, res);
});

// Rota para criar uma nova postagem
router.post("/createPost", function (req, res) {
    blogController.createPost(req, res);
});

// Rota para curtir uma postagem
router.post("/likePost/:id", function (req, res) {
    blogController.likePost(req, res);
});

// Rota para obter comentários de uma postagem
router.get("/getComments/:id", function (req, res) {
    blogController.getComments(req, res);
});

// Rota para adicionar um comentário a uma postagem
router.post("/addComment/:id", function (req, res) {
    blogController.addComment(req, res);
});

module.exports = router;