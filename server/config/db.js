import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    const res = await mongoose.connect(
      "mongodb://localhost:27017/mernfileupload"
    );
    if (res) {
      console.log("connected succesfuly");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectToDb;
