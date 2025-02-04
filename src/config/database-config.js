const mongoose=require("mongoose");

const connection=async ()=>{
    try{
        const conn=await mongoose.connect(process.env.DATABASE_URL);
        console.log(`${process.env.APP_NAME}`.green + ` is connected to Database: `.yellow + `${conn.connection.host}`.cyan)
    } catch(error){
        console.log(`Error connecting to Database: `.red + `${error}`.red)
    }
}

module.exports=connection;