const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const app = express();  
app.set("view engine","ejs")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

//model of items at homepage
const ItemCol = mongoose.model('ItemCol', { 
    name: String 
});

//model for new list title and items
const OtherItemCol =mongoose.model('OtherItemCol',{
    name: String
})

var itemsArr = [];
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ToDoDB');

 
const testAr= await ItemCol.find({})

if(testAr.length == 0){
    const item1 = new ItemCol(
        {
            name: "Buy Food"
        }
        )
    const item2 = new ItemCol({name: "Cook Food"})
    const item3 = new ItemCol({name: "Eat Food"})
    
    ItemCol.insertMany([item1, item2, item3])

}
  
}

app.post("/", async function (req,res) {
     var item= req.body.newItem;
    // creating document of user item
     const userItem = new ItemCol({
        name: item
     })
     await userItem.save()

     res.redirect("/")
})

app.get('/:newlist', async function(req,res) {
    const newlist= req.params.newlist;
    const itemsArr= await ItemCol.find({})
    res.render("app", {listTitle: newlist, newListItem: itemsArr})
})



app.post("/delete", async function (req, res) {
    const id = req.body.cb;
    await Item.deleteOne({_id: id})
    res.redirect("/")

})







app.listen("3000",function () 
{
console.log('server is listening') ;   
})