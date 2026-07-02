import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb://Prithvi:Prithvi0607@ac-yx9ljf3-shard-00-00.olgpt0o.mongodb.net:27017,ac-yx9ljf3-shard-00-01.olgpt0o.mongodb.net:27017,ac-yx9ljf3-shard-00-02.olgpt0o.mongodb.net:27017/?ssl=true&replicaSet=atlas-yhu4q2-shard-0&authSource=admin&appName=foodapp').then(() => { console.log('DB connected') })
}