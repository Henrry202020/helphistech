// Express
import express from 'express';
// Dotenv
import dotenv from 'dotenv';
// CORS
import cors from 'cors';
// DB Connection
import connectDB from './config/db.js';
// Routes DE
import userRoutesDE from './routes/de/userRoutes.js';
// Routes EN
import userRoutesEN from './routes/en/userRoutes.js';
// Routes ES
import userRoutesES from './routes/es/userRoutes.js';
// Admin routes
import projectRoutes from './routes/projectRoutes.js'
import accountsRoutes from './routes/accountsRoutes.js'

const app = express();
app.use(express.json());

// Dotenv
dotenv.config();

// Make the connection to MongoDB
connectDB();

// CORS
/* const whitelist = [process.env.CLIENT_URL];

const corsOptions = {
    origin: function(origin, callback) {
        if(whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('CORS Error'))
        }
    }
}

app.use(cors(corsOptions)) */

// Routing DE
app.use('/v1/de/users', userRoutesDE);
// Routing EN
app.use('/v1/en/users', userRoutesEN);
// Routing ES
app.use('/v1/es/users', userRoutesES);
// Admin routes
app.use('/v1/projects', projectRoutes);
app.use('/v1/accounts', accountsRoutes);

// Server
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log(`Server running in port: ${PORT}`)
})