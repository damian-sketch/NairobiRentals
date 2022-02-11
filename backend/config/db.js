import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const connectDB = async () => {
    
try{

    const con = await mongoose.connect(process.env.CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            console.log(`Database connected  : ${con.connection.host}`)
    }catch(e){
        console.log(`pff + ${e}`)
        process.exit(1)
    }

}
     
export default connectDB