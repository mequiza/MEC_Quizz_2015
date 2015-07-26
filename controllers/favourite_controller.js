var models=require("../models/models.js");

// PUT /user/:userId/favourites/:quizId
exports.update=function(req, res){
	models.Quiz.find({
		where: {id: Number(req.params.quizId)}
	}).then(function(quiz){
		req.user.addQuiz(quiz);
		res.redirect("/quizes");
	});
};

// DELETE /user/:userId/favourites/:quizId
exports.destroy=function(req, res){
	models.Quiz.find({
		where: {id: Number(req.params.quizId)}
	}).then(function(quiz){
		req.user.removeQuiz(quiz);
		res.redirect("/quizes");
	});
};

// GET /user/:userId/favourites
exports.index=function(req, res){
	var quizIds=[];
	models.Favourites.findAll({ where: { UserId: Number(req.user.id)}}).then(function(favourites){
		for (i in favourites) {
				quizIds.push(favourites[i].QuizId);
		};
		models.Quiz.findAll( {where:{ id: quizIds} }).then(function(quizes){
			res.render('quizes/index.ejs',{quizes: quizes , search:false, quizIds: quizIds , errors: []});
		});
	});
};
