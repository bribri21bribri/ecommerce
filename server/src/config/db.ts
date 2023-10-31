import mongoose from 'mongoose';

const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_LOCAL_URI!)
        .then((conn) => {
            console.log(`MongoDB Connected: ${conn.connection.host}`);
        })
        .catch((error) => {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        });
};

export default connectDB;
