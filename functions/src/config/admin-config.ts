import * as admin from 'firebase-admin';

// Check if the app is already initialized
if (admin.apps.length === 0) {
  var serviceAccount = require('/Users/danilonovais/.ssh/portfolio-danilo-novais-firebase-adminsdk-fbsvc-2bc940e508.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://portfolio-danilo-novais-default-rtdb.firebaseio.com"
  });
}

export { admin };