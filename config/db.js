import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000, // 10s timeout
        });
        console.log('✅ MongoDB Connected Successfully');
    } catch (err) {
        console.error('❌ MongoDB Connection Failed:', err.message);
        console.log('⚠️  Server will keep running. Retrying MongoDB in 10s...');
        setTimeout(connectDB, 10000); // retry after 10 seconds
    }
};

export default connectDB;