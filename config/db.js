import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:sam0604@cluster0.jh6p9wa.mongodb.net/contactform?retryWrites=true&w=majority');
        console.log('✅ MongoDB Connected Successfully');
    } catch (err) {
        console.error('❌ MongoDB Connection Failed:', err.message);
        process.exit(1);
    }
};

export default connectDB;