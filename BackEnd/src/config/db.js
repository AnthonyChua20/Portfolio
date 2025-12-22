import mongoose from "mongoose";

const connectDB = async () => {
    // 1. Guard clause: check if the URL exists before trying to connect
    if (!process.env.MONGO_URI) {
        console.error("Error: MongoDB_URL is not defined in .env file");
        process.exit(1); 
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        // Bonus: logging the host makes debugging easier!
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error connecting to DB:", error.message);
        // 2. Exit with failure code (1) if connection fails
        process.exit(1);
    }
};

export default connectDB;