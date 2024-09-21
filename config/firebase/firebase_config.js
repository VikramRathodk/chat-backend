import admin from "firebase-admin";
import serviceAccount from "../firebase/service_account.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

export { db };
export default admin;
