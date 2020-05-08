const { db, admin } = require('../util/admin')

const firebaseConfig = require('../util/config')
const firebase = require('firebase')
firebase.initializeApp(firebaseConfig)

const { validateSignupData, validateLoginData, reduceUserDetails } = require('../util/validators')

exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  }

  const { valid, errors } = validateSignupData(newUser)

  if (!valid) return res.status(400).json(errors)

  // signup時のデフォルト画像のファイル名
  const noImg = 'no-img.png'

  let userId, userToken;
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
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${noImg}?alt=media`,
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
}

exports.login = (req, res) => {
  const user = {
    emial: req.body.email,
    password: req.body.password
  }

  const { valid, errors } = validateLoginData(user)

  if (!valid) return res.status(400).json(errors)

  firebase.auth().signInWithEmailAndPassword(user.emial, user.password)
    .then(data => {
      return data.user.getIdToken()
    })
    .then(token => {
      return res.json({ token })
    })
    .catch(err => {
      console.error(err)
      if (err.code === "auth/wrong-password") {
        return res.status(403).json({ general: "Wrong credential, try again" })
      }
      return res.status(500).json({ error: err.code })
    })
}

// Get own user details
exports.getAuthenticatedUser = (req, res) => {
  let userData = {}
  db.doc(`/users/${req.user.handle}`).get()
    .then(doc => {
      if (doc.exists) {
        userData.credentails = doc.data()
        return db.collection('likes').where('userHandle', '==', req.user.handle).get()
      }
    })
    .then(data => {
      userData.likes = []
      data.forEach(doc => {
        userData.likes.push(doc.data())
      })
      return res.json(userData)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}

exports.uploadImage = (req, res) => {
  const Busboy = require('busboy')
  const path = require('path')
  const os = require('os')
  const fs = require('fs')

  // create Busboy Object by request contains file data
  const busboy = new Busboy({ headers: req.headers });

  let iamgeFileName
  let imageToBeUploaded = {}

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      return res.status(400).json({ error: 'Wrong file type submitted' })
    }

    // my image extention
    // splitした要素数 - 1番目の要素を格納
    const imageExtention = filename.split('.')[filename.split('.').length - 1]
    iamgeFileName = `${Math.round(Math.random() * 10000000000)}.${imageExtention}`
    const filePath = path.join(os.tmpdir(), iamgeFileName)
    imageToBeUploaded = { filePath, mimetype }
    // 一時ファイルの生成
    file.pipe(fs.createWriteStream(filePath))
  })
  busboy.on('finish', () => {
    // fileupload
    admin.storage().bucket().upload(imageToBeUploaded.filePath, {
      resumable: false,
      metadata: {
        metadata: {
          contentType: imageToBeUploaded.mimetype
        }
      }
    })
      .then(() => {
        // update users imageUrl
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${iamgeFileName}?alt=media`
        return db.doc(`/users/${req.user.handle}`).update({ imageUrl })
      })
      .then(() => {
        return res.json({ message: "Image uploaded successfully" })
      })
      .catch(err => {
        console.error(err)
        return res.status(500).json({ error: err.code })
      })
  })
  busboy.end(req.rawBody)
}

// Add User Details
exports.addUserDetails = (req, res) => {
  let userDetails = reduceUserDetails(req.body)

  db.doc(`/users/${req.user.handle}`).update(userDetails)
    .then(() => {
      return res.json({ message: "Details added successfully" })
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}