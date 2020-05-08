const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.

const express = require('express')
const app = express()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const FBAuth = require('./util/fbAuth')

const { getAllScreams, postOneScream } = require('./handlers/screams')
const { signup, login, uploadImage, addUserDetails } = require('./handlers/users')

app.get('/screams', getAllScreams)
app.post('/scream', FBAuth, postOneScream)
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)

app.post('/signup', signup)
app.post('/login', login)

// APIを設定したexpressをセット
exports.api = functions.region("asia-northeast1").https.onRequest(app)