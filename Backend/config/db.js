import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://gaurangkhandhala:GAURANG2706@cluster0.cctub.mongodb.net/food-delivery').then(() => console.log("DB connected"));
}

