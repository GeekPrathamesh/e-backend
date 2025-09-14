import mongoose from "mongoose";
const mongouri =
  "mongodb+srv://prathameshteli727_db_user:Prathamesh737@prathamesh.fbmxavq.mongodb.net/food-del";
export const connectDB = async () => {
  await mongoose
    .connect(mongouri)
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      console.log("error in connecting to DB", err);
    });
};
