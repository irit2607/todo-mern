const router = require('express').Router();
const tasks = require('../modal/taskModal');

router.get('/', (req, res) => {
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
    const Todonew = new tasks({
        work,
    });
    console.log(work);
    try {
      const newSave = await Todonew.save();
      res.status(200).json(newSave);
    } catch (err) {
        res.status(500).json(err);
    }
});


// router.post('/add', (req,res) => {
//     const job = req.body.job;   
//     console.log(job);
//     tasks({ work : job }).save(function(err,doc){
//         if(err)
//         {
//             res.status(500).json(err);
//         }
//         res.status(200).json("added");
//     })
// })


// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const todoz = await tasks.findById(req.params.id);
       
//         if (todoz._id === req.body.id) {
//             console.log(todoz);
//           await todoz.deleteOne();
//           res.status(200).json("deleted");
//         } 
//       } catch (err) {
//         res.status(500).json(err);
//       }
// })

router.delete('/delete/:id' ,function(req,res,next){
    tasks.findByIdAndRemove({ _id: req.params.id}).then((tasks) => {
  
            res.send(tasks);
   
        
    });
   
});

router.put('/update/:id' ,function(req,res,next){
    // here we r taking id from db and update it through body name(front)
    tasks.findByIdAndUpdate({ _id: req.params.id}, req.body).then((tasks) => {   
       
            res.send(tasks);
       
    });
  
});

// router.put("/update/:id", async (req, res) => {
//     try {
//       const post = await tasks.findById(req.params.id);
//       console.log(post);
//       if (post._id === req.body.id) {
//         await post.updateOne({ $set: req.body });
//         res.status(200).json("the post has been updated");
//       } 
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
module.exports = router;