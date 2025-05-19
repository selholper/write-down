import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import sequelize from 'db/dbSetup';
import router from 'routers/indexRouter';

const app = express();
app.use(express.json());
app.use(cors({
  origin: `http://localhost:3000`,
  credentials: true
}));
app.use(cookieParser());

app.use('/', router);

const staticDir = path.resolve(__dirname, '..', '..', 'public');
app.use(express.static(staticDir));
app.use('*', (req, res) => res.sendFile(path.resolve(staticDir, 'index.html')));

const launchServer = async(): Promise<void> => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Started listening on ${port}.`));
    }
    catch (err) {
        console.log(err);
    }
};

void launchServer();