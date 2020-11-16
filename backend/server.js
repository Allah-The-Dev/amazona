import express from 'express';
import data from './data.js';
import userRouter from './router/user.js';
import mongoose from 'mongoose';
import productRouter from './router/product.js';

const app = express();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//users api
app.use('/api/users', userRouter);


//products api
app.use('/api/products', productRouter);

app.get('/', (req, res) => {
    res.send('server is ready');
});

//error handler middleware
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || '5000';
app.listen(5000, () => {
    console.log(`Serve at http://localhost:${port}`);
});