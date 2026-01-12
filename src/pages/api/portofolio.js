// pages/api/portfolio.js
import admin from 'firebase-admin';

// Inisialisasi Firebase Admin (untuk server side)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  try {
    // Ambil semua dokumen di collection 'portfolio'
    const snapshot = await db.collection('portfolio').orderBy('order', 'asc').get();

    const portfolios = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    res.status(200).json(portfolios);
  } catch (error) {
    console.error('Failed to fetch portfolios:', error);
    res.status(500).json({ error: 'Failed to fetch portfolios' });
  }
}
