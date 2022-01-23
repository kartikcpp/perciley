const mongoose=require('mongoose')

const Note = mongoose.model("Note", { title: String,desc:String });

const Count=mongoose.model("Count",{add:Number,update:Number})
module.exports={Note,Count}

