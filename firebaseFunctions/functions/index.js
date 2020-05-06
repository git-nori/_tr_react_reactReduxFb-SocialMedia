const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const firebaseConfig = {
  apiKey: "AIzaSyArE4qi35UcxOa45AMGcb7yLaGyxIF7XJA",
  authDomain: "socialapp-b408e.firebaseapp.com",
  databaseURL: "https://socialapp-b408e.firebaseio.com",
  projectId: "socialapp-b408e",
  storageBucket: "socialapp-b408e.appspot.com",
  messagingSenderId: "455358147512",
  appId: "1:455358147512:web:fb3a294119d52bd8f83d4d"
};

const firebase = require('firebase')
firebase.initializeApp(firebaseConfig)

const db = admin.firestore()
const express = require('express')
const app = express()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// firestoreからscreamsを全件取得しレスポンスを返す
app.get('/screams', (req, res) => {
  db.collection('screams')
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

  db.collection('screams').add(newScream)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successful` })
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong' })
      console.error(err)
    })
})

// validation method
const isEmpty = str => {
  return str.trim() === ''
}

const isEmail = email => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(regEx)
}

// Signup
let userId, userToken;
app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  }

  let errors = {}
  // validation email
  if (isEmpty(newUser.email)) {
    errors.email = 'Email must not be empty'
  } else if (!isEmail(newUser.email)) {
    errors.email = 'Must be a valid email address'
  }
  // validation password
  if (isEmpty(newUser.password)) errors.password = "Must not be empty"
  if (newUser.password !== newUser.confirmPassword) errors.password = "Passwords must match"
  // validation password
  if (isEmpty(newUser.handle)) errors.handle = "Must not be empty"

  if (Object.keys(errors).length > 0) return res.status(400).json(errors)

  db.doc(`/users/${newUser.handle}`).get()
    .then(doc => {
      if (doc.exists) {
        // validation
        return res.status(400).json({ handle: "this handle is already taken" })
      } else {
        // ユーザーの作成
        return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
      }
    })
    .then(data => {
      userId = data.user.uid
      return data.user.getIdToken()
    })
    .then((token) => {
      userToken = token
      const userCredentail = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId
      }

      // add db
      return db.doc(`/users/${newUser.handle}`).set(userCredentail)
    })
    .then(() => {
      return res.status(201).json({ userToken })
    })
    .catch(err => {
      console.error(err)
      if (err.code === 'auth/email-already-in-use') {
        return res.status(500).json({ email: "Email is already in use" })
      } else {
        return res.status(500).json({ message: err.code })
      }
    })
})

// APIを設定したexpressをセット
exports.api = functions.region("asia-northeast1").https.onRequest(app)