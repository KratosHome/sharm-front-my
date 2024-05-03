import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;

export const connectToDb = async () => {
    try {
        if (cachedConnection && cachedConnection.readyState === 1) {
            console.log("Using existing connection");
            return cachedConnection;
        }

        const db = await mongoose.connect(`${process.env.NEXT_MONGO_DB}`);
        cachedConnection = db.connections[0];
        return cachedConnection;
    } catch (error) {
        console.log('error connectToDb', error);
        throw error; // re-throw the error to propagate it
    }
};
