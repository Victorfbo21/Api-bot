import mongoose from "mongoose";

const dbConnect = () => {
    let MONGO_URL = `mongodb://${process.env.DATABASE_URL}:`;
    MONGO_URL += `${process.env.DATABASE_PORT}`;
    MONGO_URL += `/${process.env.DATABASE_DB}`;
    mongoose.set('strictQuery', false);
    return mongoose.connect(MONGO_URL,
        {
            "authSource": "admin",
            "user": process.env.DATABASE_USER,
            "pass": process.env.DATABASE_PASSWORD
        }
    ).then(
        () => {
            console.log('Connected to', process.env.DATABASE_DB)
            return true;
        }
    ).catch(
        (e) => {
            console.log('DB connection error:', e)
            throw e;
        }
    );
}

export default dbConnect;