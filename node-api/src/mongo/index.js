import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnect = () => {
  mongoose.connection.once("open", () => console.log("DB connection"));
  return mongoose.connect(
    //`mongodb+srv://${process.env.DB_LINK}?retryWrites=true&w=majority`,
    //`mongodb+srv://barry1:barry1@cluster0.e6fmqv6.mongodb.net/?retryWrites=true&w=majority`,
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { keepAlive: true }
  );
};
