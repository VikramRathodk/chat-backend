import admin from "firebase-admin";
import { readFileSync } from "fs";
import { join } from "path";

const serviceAccountPath = join(__dirname, "service_account.json");
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf-8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
export default admin;
