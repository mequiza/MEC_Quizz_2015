var models = require('../models/models.js');

// GET /quizes/statistic
exports.show = function(req, res) {
  var estadistica = {
    quizzesTot       : [],
    quizzesComment   : [],
    quizzesNoComment : [],
    commentsTot      : [],
    commentsPub      : [],
    commentsNoPub    : [],
    commentsAverage1 : [],
    commentsAverage2 : []
  }

  // Chequea en cada pregunta todos los comentarios, publicados ó no publicados
  models.Quiz.count()
  .on ('success', function(quizzesCount){  // Total de preguntas
    estadistica.quizzesTot[1] = quizzesCount;})
    .then( function(){
      models.Comment.count()
      .on('success',function(commentsCount){  // Total de comentarios
        estadistica.commentsTot[1] = commentsCount;})
        .then(function() {
          models.Comment.count({where: 'publicado'})
          .on('success', function(Publihs){  // Comentarios publicados
            estadistica.commentsPub[1] = Publihs;})
            .then (function() {
              models.Quiz.count({where: '"Comments"."QuizId" IS NULL', include: [{ model: models.Comment}]})
              .on ('success', function(noComment){  // devuelve el número de PREGUNTAS CON COMENTARIO
                estadistica.quizzesNoComment[1] = noComment;
                estadistica.quizzesComment[1] = (estadistica.quizzesTot[1] - estadistica.quizzesNoComment[1]);
                if ( (estadistica.quizzesTot[1] > 0)  && (estadistica.commentsTot[1] > 0) ) {
                  estadistica.commentsAverage1[1] = (estadistica.commentsTot[1] / estadistica.quizzesTot[1]).toFixed(3);
                  estadistica.commentsNoPub[1] = estadistica.commentsTot[1] - estadistica.commentsPub[1];
                  if (estadistica.commentsPub[1] > 0){
                  estadistica.commentsAverage2[1] = (estadistica.commentsPub[1] / estadistica.quizzesTot[1]).toFixed(3);
                  }
                }
             })
           .then( function() {
             res.render('statistic/show', { estadistica: estadistica, errors: []})
           })
         })
      })
   })
   .catch(function (err) { errors.push(err); })
};


/*.then (function(c) {
  models.Quiz.count({where: '"Comments"."QuizId" IS NULL', include: [{ model: models.Comment}]})
  .on ('success', function(cuenta){  // devuelve el número de PREGUNTAS CON COMENTARIO
    estadistica.quizzesNoComment[1] = cuenta;
    estadistica.quizzesComment[1] = (estadistica.quizzesTot[1] - estadistica.quizzesNoComment[1]);
    if ( (estadistica.quizzesTot[1] > 0)  && (estadistica.commentsTot[1] > 0) ) {
      estadistica.commentsAverage[1] = (estadistica.commentsTot[1] / estadistica.quizzesTot[1]).toFixed(3);
    }
    estadistica.commentsNoPub[1] = estadistica.commentsTot[1] - estadistica.commentsPub[1];
 })
.then( function(c) {
 res.render('statistic/show', { estadistica: estadistica, errors: []})
})
})
*/
