const router = require('express').Router();
const tasks = require('../modal/taskModal');

router.get('/all', (req, res) => {
  var mytask;
  tasks.find({}, (err, data) => {
    if (err) {
      res.status(500).json(err);
    }
    if (data) {
      mytask = data;
    }
    res.status(200).json({ data: mytask });

  })
});

router.post('/add/:work', async (req, res) => {
  const work = req.params.work;
  const tasksnew = new tasks({
    work,
  });
  console.log(work);
  try {
    const newSave = await tasksnew.save();
    res.status(200).json(newSave);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/delete/:id', function (req, res, next) {
  tasks.findByIdAndRemove({ _id: req.params.id }).then((tasks) => {

    res.send(tasks);


  });

});

// router.put('/update/:id' ,function(req,res,next){
//     // here we r taking id from db and update it through body name(front)
//     tasks.findByIdAndUpdate({ _id: req.params.id}, req.body).then((tasks) => {   

//             res.send(tasks);

//     });

// });

// router.put('/update/:id/:sk', (req, res, next) => {
//     tasks.findByIdAndUpdate({_id: req.params.id}, req.params.sk).then((tasks) => {         
//             res.send(tasks);      
//             console.log(tasks)   
//     });
// });

// router.put('/update/:id',update.tasks)

// function update(req,res,next){
//     tasks.findByIdAndUpdate(req.params.id,req.body, (err,tasks)=>{
//       if (err) {
//         return res.status(500).send({error: "Problem with Updating the   Employee recored "})
//       };
//       res.send({success: "Updation successfull"});
//     })
//   }

// router.put('/update/:id/:work', async(req, res, next) => {
//     await tasks.findById({_id: req.params.id}).then(() => {
//         console.log(req.query);
//         tasks.findOne({_id: req.params.id}).then((tasks) => {
//             console.log(req.query);
//             console.log(tasks);
//             res.send(tasks);
//         });
//     });
// });

router.put("/update/:id/:work", async (req, res) => {
  try {
    console.log(req.params.id);
    const post = await tasks.findById(req.params.id);
    console.log(post);
    if (post.id === req.params.id) {
      await post.updateOne({
        $set: {
          work: req.params.work
        }
      });
      res.send(post);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;