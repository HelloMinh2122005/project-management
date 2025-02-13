import app from './src/app.js';
import dotenv from 'dotenv';
dotenv.config();

// Start the server
app.listen(process.env.PORT, () => {
    console.log('Server listening on port', process.env.PORT)
})