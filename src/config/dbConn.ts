import mongoose from "mongoose";

const connectDB = async () => {
    const dbUri = process.env.DB_URI;
    if (!dbUri) {
        throw new Error("DB_URI environment variable is not defined.");
    }

    try {
        await mongoose.connect(dbUri)
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;
