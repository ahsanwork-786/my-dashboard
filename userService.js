// src/services/userService.js
import { databases, storage, DATABASE_ID, USERS_COLLECTION_ID, AVATAR_BUCKET_ID, ID } from "./appwrite";

/**
 * Upload avatar file to Appwrite Storage.
 * Returns the fileId if uploaded successfully, else null.
 */
export async function uploadAvatar(file) {
  if (!file) return null;
  try {
    const result = await storage.createFile(AVATAR_BUCKET_ID, ID.unique(), file);
    return result.$id;
  } catch (err) {
    console.error("uploadAvatar error:", err);
    return null;
  }
}

/**
 * Create a new user document.
 * avatarFile is optional; if provided, it's uploaded first.
 */
export async function createUserService({ name, email, avatarFile }) {
  try {
    const avatarId = avatarFile ? await uploadAvatar(avatarFile) : null;

    const doc = await databases.createDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      ID.unique(),
      {
        name,
        email,
        avatar: avatarId, // only saves the fileId in the document
      }
      // No permissions param needed if default collection permissions are used
    );

    return doc;
  } catch (err) {
    console.error("createUserService error:", err);
    throw err;
  }
}

/**
 * List all user documents
 */
export async function listUsersService() {
  try {
    const res = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID);
    return res.documents || [];
  } catch (err) {
    console.error("listUsersService error:", err);
    throw err;
  }
}

/**
 * Update an existing user document.
 * If avatarFile is provided, it replaces the previous avatar.
 */
export async function updateUserService(userId, { name, email, avatarFile }) {
  try {
    let avatarId;

    if (avatarFile) {
      // Upload new avatar
      avatarId = await uploadAvatar(avatarFile);
    }

    const updatedData = {
      name,
      email,
      ...(avatarId ? { avatar: avatarId } : {}), // only update avatar if new file uploaded
    };

    const doc = await databases.updateDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      userId,
      updatedData
      // No permissions param needed
    );

    return doc;
  } catch (err) {
    console.error("updateUserService error:", err);
    throw err;
  }
}

/**
 * Delete a user document.
 * Also deletes the avatar file from storage if it exists.
 */
export async function deleteUserService(userId) {
  try {
    const user = await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, userId);

    if (user.avatar) {
      try {
        await storage.deleteFile(AVATAR_BUCKET_ID, user.avatar);
      } catch (e) {
        console.warn("Avatar delete failed:", e);
      }
    }

    await databases.deleteDocument(DATABASE_ID, USERS_COLLECTION_ID, userId);
    return true;
  } catch (err) {
    console.error("deleteUserService error:", err);
    throw err;
  }
}

/**
 * Build Appwrite storage file view URL
 */
export function avatarUrl(fileId) {
  if (!fileId) return null;
  return `https://fra.cloud.appwrite.io/v1/storage/buckets/${AVATAR_BUCKET_ID}/files/${fileId}/view`;
}
