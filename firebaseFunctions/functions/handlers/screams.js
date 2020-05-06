const { db } = require('../util/admin')

// firestoreからscreamsを全件取得しレスポンスを返す
exports.getAllScreams = (req, res) => {
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
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}

// firestoreにscreamsを1件登録する
exports.postOneScream = (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.user.handle,
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
}