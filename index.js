require("dotenv").config();
const path=require('path')
const express = require("express");
const mongoose = require("mongoose");
const { Note, Count } = require("./models/Note");

const app = express();
app.use(express.json());




app.use(express.urlencoded({ extended: false }));
const idcount = "61ec1712fa1880b716226ea9";
app.post("/add", (req, res) => {
  Count.findByIdAndUpdate(idcount, { $inc: { add: 1 } }, () => {});
  const note = new Note({ title: req.body.title, desc: req.body.desc });
  note.save().then(() => {
    console.log("saved");

    res.json({ msg: "saved" });
  });
});
app.put("/update", (req, res) => {
  Count.findByIdAndUpdate(idcount, { $inc: { update: 1 } }, () => {});
  Note.findByIdAndUpdate(
    { _id:req.body.id },
    { title: req.body.title, desc:req.body.desc },
    () => {
      console.log(req.body);
      res.json("updated");
    }
  );
});

app.get('/getall',async(req,res)=>{
  const notes=await Note.find({}).exec()
  res.json(notes)
})
app.get("/count", (req, res) => {
  Count.findById(idcount, (err, count) => {
    res.json(count);
  });
});


app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
  
  res.sendFile(
    path.join(__dirname, "/client/build", "index.html")
  );
});

mongoose.connect(process.env.MONGO_URL, () => {
  app.listen(process.env.PORT || 5000);
});
