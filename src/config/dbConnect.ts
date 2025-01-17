import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connected: connectionObject = {};

export async function connect(): Promise<void> {
  if (connected.isConnected) {
    console.log("Database is connected");
    return;
  }
  try {
    const db = await mongoose.connect('mongodb+srv://theabhik2020:P5PjHicCw1T0XSsA@cluster0.27axl.mongodb.net/kprep');
    const connection = mongoose.connection;

    connection.on("connection", () => {
      console.log("database connection successful");
      connected.isConnected = db.connections[0].readyState;
    });

    connection.on("error", (err) => {
      console.log("connection error: " + err);
    process.exit(1);

    });
  } catch (error: any) {
    console.log("Something went wrong in your connection: " + error);
    process.exit(1);
  }
}
