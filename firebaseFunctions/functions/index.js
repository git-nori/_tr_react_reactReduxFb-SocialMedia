const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express')
const app = express()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// firestoreからscreamsを全件取得しレスポンスを返す
app.get('/screams', (req, res) => {
  admin.firestore().collection('screams')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      let screams = []
      data.forEach(doc => {
        const data = doc.data()
        screams.push({
          screamId: doc.id,
          body: data.body,
          userHandle: data.userHandle,
          createdAt: data.createdAt
        })
      })
      return res.json(screams)
    })
    .catch(err => console.error(err))
})

// firestoreにscreamsを1件登録する
app.post('/scream', (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString()
  }

  admin.firestore().collection('screams').add(newScream)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successful` })
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong' })
      console.error(err)
    })
})

// APIを設定したexpressをセット
exports.api = functions.region("asia-northeast1").https.onRequest(app)