import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Example function using Firebase Admin SDK
export const exampleAdminFunction = functions.https.onRequest(
  async (req, res) => {
    try {
      // Example: Read from Realtime Database
      const dbRef = admin.database();
      const snapshot = await dbRef.ref('/').once('value');
      const data = snapshot.val();

      res.status(200).send({
        message: 'Successfully fetched data from RTDB',
        data: data,
      });
    } catch (error) {
      console.error('Error in exampleAdminFunction:', error);
      res.status(500).send({
        error: 'Failed to fetch data from RTDB',
      });
    }
  }
);

// Example: Access Firestore
export const exampleFirestoreFunction = functions.https.onRequest(
  async (req, res) => {
    try {
      const db = admin.firestore();
      const collectionSnapshot = await db.collection('examples').get();

      const documents = collectionSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).send({
        message: 'Successfully fetched documents from Firestore',
        documents: documents,
      });
    } catch (error) {
      console.error('Error in exampleFirestoreFunction:', error);
      res.status(500).send({
        error: 'Failed to fetch documents from Firestore',
      });
    }
  }
);

// Example: Authenticate a user token
export const exampleAuthFunction = functions.https.onRequest(
  async (req, res) => {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      res.status(401).send('Unauthorized: Missing token');
      return;
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      const uid = decodedToken.uid;

      res.status(200).send({
        message: 'Successfully authenticated user',
        uid: uid,
      });
    } catch (error) {
      console.error('Error in exampleAuthFunction:', error);
      res.status(401).send({
        error: 'Unauthorized: Invalid token',
      });
    }
  }
);
