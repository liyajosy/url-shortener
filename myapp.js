
require('dotenv').config();
let mongoose = require('mongoose');
const dns = require('node:dns');

let ShortUrl;

const password = encodeURIComponent(process.env.PASSWORD);

let uri= `mongodb+srv://liyajosy:${password}@cluster0.tqxxhi5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(uri);

const urlSchema = new mongoose.Schema({
    original_url:{
      type: String,
      required:true
    },
    short_url: String
  })
  
  ShortUrl = mongoose.model("ShortUrl", urlSchema);
   
  
  const createShortUrl = async (originalUrl,  done) => {
   
     const count = await ShortUrl.countDocuments()
     console.log("---"+count);
    
     let url_created = new ShortUrl({
        original_url: originalUrl,
        short_url: count +1 
      })
   
      url_created.save()
      .then((data)=>{
        console.log(data)
        done(null,data);
      })
      .catch((err)=>{
        console.log(err)
        done(err, null)
      })
  };
  
  const findFullUrl = async (sh, done)=>{
   
    const fullUrl =  await  ShortUrl.findOne({short_url:sh});
      if(fullUrl){
      return done(null, fullUrl)
     
    }
   else{
      return  done({err:"error"}, null);
   }    

  }
  exports.findFullUrl = findFullUrl;
  exports.createShortUrl = createShortUrl;
  
  
