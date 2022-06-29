import dotenv from "dotenv";
dotenv.config(); 

import express, { Application} from 'express';
import cors from 'cors';
import database from './src/config/database';
import addUser from './src/middleware/addUser';
import authRouter from "./src/routes/authRouter";
import uploadRouter from "./src/routes/uploads";
import diaryRouter from "./src/routes/diaryRouter";

import privateEndpoint from './src/middleware/privateEndpoint';
const app:Application = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cors());
checkEnvConfigAvailable(); // trebuie sa creezi tu fisierul

database.authenticate()
  .then(() => console.log("connected to postgres"))
  .catch((err) => console.log(err));

app.use('/api/static', express.static(__dirname +'/static'));
app.use(addUser);

app.use("/api/auth", authRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/diary", diaryRouter);
app.post("/api/test", privateEndpoint, (req, res) => {
  res.send({message: "esti logat inca"});
});

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
