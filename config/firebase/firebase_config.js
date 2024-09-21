import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to service account JSON
const serviceAccountPath = join(__dirname, 'service_account.json');

// Read and parse the service account JSON
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Firestore
export const db = admin.firestore();

// Export admin and db
export default admin;
