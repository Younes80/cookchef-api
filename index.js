import express, { json } from 'express';
// import bodyParser from 'body-parser';
import RecipeRoutes from './src/routes/recipes.routes';
import UserRoutes from './src/routes/users.routes';
import FavorisRoutes from './src/routes/favoris.routes';
import cors from 'cors';
import connectDB from './src/models/dbconnect';
import dotenv from 'dotenv';
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(json());

app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));

app.use(express.json({ limit: '100mb', extended: true }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use('/api/recipes', RecipeRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/favoris', FavorisRoutes);

const PORT = 3333;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
