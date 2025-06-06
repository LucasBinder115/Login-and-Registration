import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

dotenv.config({ path: '.env.test' });
mongoose.set('strictQuery', true);

let mongoServer;

// Ensure Mongoose connects to the in-memory MongoDB before tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  global.__MONGO_URI__ = mongoServer.getUri();
  console.log('Mongo URI:', global.__MONGO_URI__);
  await mongoose.connect(global.__MONGO_URI__, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('MongoDB connected successfully');
});

// Close Mongoose connection and stop MongoDB server after tests
afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});