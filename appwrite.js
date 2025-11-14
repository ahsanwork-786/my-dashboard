import { Client, Account, Databases, Storage, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1") 
  .setProject("6915e9fd0006437f5ddc");

// Services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Your IDs
export const DATABASE_ID = "691718df002a77561c5c";

// Correct export name (your service expects this)
export const USERS_COLLECTION_ID = "69171900000dcd32f0f9";

// Avatar bucket (create one in Appwrite and paste ID here)
export const AVATAR_BUCKET_ID = "69171aa50009e938404e";

// Re-export ID helper
export { ID };
