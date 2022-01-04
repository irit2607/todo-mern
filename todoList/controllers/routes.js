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

router.put("/update/:id/:work", async (req, res) => {
  try {
    console.log(req.params.id);
    const post = await tasks.findById(req.params.id);
        if (post.id === req.params.id) {
      await post.updateOne({
        $set: {
          work: req.params.work
        }
      });
      const post1 = await tasks.findById(req.params.id);
      res.send(post1);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

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


module.exports = router;