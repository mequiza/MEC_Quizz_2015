var express = require('express');
var multer = require("multer");
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require("../controllers/session_controller");
var userController = require("../controllers/user_controller");
var statisticController = require("../controllers/statistic_controller");
var favouriteController = require("../controllers/favourite_controller");
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});
// Autoload de comandos con Ids
router.param('quizId', quizController.load);// Autoload de comandos con :quizId
router.param("commentId", commentController.load);// Autoload de comandos con :commentId
router.param("userId", userController.load);// Autoload de comandos con :userId

// Definición de rutas de sesión
router.get("/login", sessionController.new); // form login
router.post("/login", sessionController.create); // crear sessión
router.get("/logout", sessionController.destroy); // destruye sessión

// Definición de rutas de usuarios
router.get("/users", userController.new); // form sign up
router.post("/users", userController.create); // crear user
router.get("/users/:userId(\\d+)/edit", sessionController.loginRequired, userController.ownershipRequired, userController.edit);
router.put("/users/:userId(\\d+)",      sessionController.loginRequired, userController.ownershipRequired, userController.update);
router.delete("/users/:userId(\\d+)",   sessionController.loginRequired, userController.ownershipRequired, userController.destroy);
router.get("/users/:userId(\\d+)/quizes", quizController.index);

// Definición de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get("/quizes/new",                  sessionController.loginRequired, quizController.new);
router.post("/quizes/create",              sessionController.loginRequired,
	multer({dest:"./public/media/"}),
   quizController.create);
router.get("/quizes/:quizId(\\d+)/edit",   sessionController.loginRequired, quizController.ownershipRequired, quizController.edit);
router.put("/quizes/:quizId(\\d+)",        sessionController.loginRequired, quizController.ownershipRequired,
	multer({dest:"./public/media/"}),
  quizController.update);
router.delete("/quizes/:quizId(\\d+)",     sessionController.loginRequired, quizController.ownershipRequired, quizController.destroy);

// Definición de rutas de comentarios
router.get("/quizes/:quizId(\\d+)/comments/new", commentController.new);
router.post("/quizes/:quizId(\\d+)/comments",    commentController.create);
router.get("/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish",
	sessionController.loginRequired, commentController.ownershipRequired, commentController.publish);

// Definición de ruta de estadísticas
router.get('/quizes/statistics', statisticController.index);

// Definición de ruta de autor
router.get("/author", function(req, res) {
	res.render("author", {errors: []});
});

// Definición de rutas de favoritos
router.put("/users/:userId(\\d+)/favourites/:quizId(\\d+)", sessionController.loginRequired, favouriteController.update);
router.delete("/users/:userId(\\d+)/favourites/:quizId(\\d+)", sessionController.loginRequired, favouriteController.destroy);
router.get("/users/:userId(\\d+)/favourites", sessionController.loginRequired, favouriteController.index);

module.exports = router;
