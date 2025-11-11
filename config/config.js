import dotenv from 'dotenv';
dotenv.config();

console.log("Mongo URI loaded", process.env.MONGO_URI);


const config = {
 env: process.env.NODE_ENV || 'development', 
 port: process.env.PORT || 5000,
 jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
 mongoUri: process.env.MONGO_URI ||"mongodb://127.0.0.1:27017/portfolio",
};

 export default config;
