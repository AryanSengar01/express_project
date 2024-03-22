import mongoose from "mongoose";

var url = "mongodb+srv://aryansengar873:root@cluster0.7ctx14s.mongodb.net/expressproject?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(url);

export default mongoose;