import mongoose from "mongoose";

// Get the MongoDB URI from environment variables
const DATABASE_URL = process.env.DATABASE_URL;

// Throw an error if DATABASE_URL is not defined
if (!DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

// Cache the MongoDB connection and promise
let cachedConnection = global.mongooseConnection;

// If there's no cached connection, initialize it
if (!cachedConnection) {
  // Initialize the cached connection object
  cachedConnection = global.mongooseConnection = { conn: null, promise: null };
}

// Function to connect to the MongoDB database
async function connectDB() {
  // If a connection already exists, return it
  if (cachedConnection.conn) {
    return cachedConnection.conn;
  }

  // If there's no promise to connect, create one
  if (!cachedConnection.promise) {
    // Define connection options
    const connectionOptions = {
      bufferCommands: false, // Don't buffer commands
    };

    // Establish a connection to MongoDB
    cachedConnection.promise = mongoose.connect(DATABASE_URL, connectionOptions)
      .then((connection) => {
        // Log success message when connected
        console.log(`Connected to MongoDB`);
        return connection;
      })
      .catch((error) => {
        // Log error and exit process if connection fails
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with status code 1
      });
  }

  // Wait for the connection to be established and return it
  cachedConnection.conn = await cachedConnection.promise;
  return cachedConnection.conn;
}

// Export the connectDB function as the default export
export default connectDB;
