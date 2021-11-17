var express = require('express');
var router = express.Router();
var mongojs = require('mongojs')
var db =mongojs('mongodb+srv://adham:adham12345@cluster1.e8igs.mongodb.net/meanTodos?retryWrites=true&w=majority',['todos'])
//get todos
router.get('/todos',function(req,res,next)
{
 db.todos.find(function(err,todos)
 {
     if(err)
     {
        res.send(err);                                                    
     }
     else {
         res.json(todos);
     }
 });

});



router.get('/todos/:id',function(req,res,next)
{
 db.todos.findOne(  {  _id : mongojs.ObjectId(req.params.id) }, function(err,todo)
 {
 
     if(err)
     {
        res.send(err);
     }
     else {
         res.json(todo);
     }
 });

});


//save todo
router.post('/todos',function(req,res,next)
{
  var todo = req.body;
  if(!todo.text || !(todo.isDone + '')){
  res.status(400);
  res.json({
      "error" : "invalid Data"
  });
} else {
    db.save(todo, function(err, result)
    {
        if(err)
        {
           res.send(err);
        }
        else {
            res.json(todo);
        }

    });
}
});

//update
router.put('/todos:id',function(req,res,next)
{
  var todo = req.body;
  var updObj = {};

  if(todo.isDone)
  {
     updObj.isDone = todo.isDone;
  }
  if(todo.text)
  {
     updObj.isDone = todo.isDone;
  }
  if(!updObj)
  {
    res.status(400);
    res.json({
        "error" : "invalid Data"
    });
  } else {
    db.todos.update({
        _id: mongojs.ObjectId(req.params.id)
    },updObj, {}, function(err,result){
        if(err){
            res.send(err);
        } else 
        {
            res.json(result);
        }

    });

  }

 
});

//delete
router.delete('/todos:id',function(req,res,next)
{
  
    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    },'', function(err,result){
        if(err){
            res.send(err);
        } else 
        {
            res.json(result);
        }

    });


});


module.exports = router;