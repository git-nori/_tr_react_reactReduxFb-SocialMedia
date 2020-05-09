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
          createdAt: data.createdAt,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
          userImage: doc.data().userImage
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
    userImage: req.user.imageUrl,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0
  }

  db.collection('screams').add(newScream)
    .then(doc => {
      const resScream = newScream
      resScream.screamId = doc.id
      res.json(resScream)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: 'something went wrong' })
    })
}

// screamを1件削除する
exports.deleteScream = (req, res) => {
  const document = db.doc(`/screams/${req.params.screamId}`)

  document.get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Scream not found' })
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: 'Unauthorized' })
      } else {
        return document.delete()
      }
    })
    .then(() => {
      res.json({ message: 'Scream deleted successfully' })
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}

// screamを1件取得する
exports.getScream = (req, res) => {
  let screamData = {}
  db.doc(`/screams/${req.params.screamId}`).get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Scream not found' })
      }
      screamData = doc.data()
      screamData.screamId = doc.id
      return db.collection('comments').where('screamId', '==', req.params.screamId).get()
    })
    .then(data => {
      screamData.comments = []
      data.forEach(doc => {
        screamData.comments.push(doc.data())
      })
      return res.json(screamData)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}

// Comments on comment
exports.commentOnScream = (req, res) => {
  if (req.body.body.trim() === '') return res.status(400).json({ comment: 'Must not be empty' })

  const newComment = {
    body: req.body.body,
    screamId: req.params.screamId,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl,
    createdAt: new Date().toISOString()
  }

  db.doc(`/screams/${req.params.screamId}`).get()
    .then(doc => {
      // Screamの存在チェック
      if (!doc.exists) {
        return res.status(400).json({ error: 'Scream not found' })
      }
      // ScreamのcommentCountをインクリメント
      return doc.ref.update({ commentCount: doc.data().commentCount + 1 })
    })
    .then(() => {
      return db.collection('comments').add(newComment)
    })
    .then(() => {
      return res.json(newComment)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: 'Something went wrong' })
    })
}

exports.likeScream = (req, res) => {
  const likeDoc = db.collection('likes')
    .where('userHandle', '==', req.user.handle)
    .where('screamId', '==', req.params.screamId).limit(1)

  const screamDoc = db.doc(`/screams/${req.params.screamId}`)

  let screamData

  screamDoc.get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Scream not found' })
      }
      screamData = doc.data()
      screamData.screamId = doc.id
      return likeDoc.get()
    })
    .then(data => {
      // すでにLikeをしていないかチェック
      if (data.empty) {
        return db.collection('likes').add({
          userHandle: req.user.handle,
          screamId: req.params.screamId
        })
          .then(() => {
            // screamのlikeCountをインクリメント
            screamData.likeCount++
            return screamDoc.update({ likeCount: screamData.likeCount })
          })
          .then(() => {
            return res.json(screamData)
          })
      } else {
        return res.status(400).json({ error: 'Scream already liked' })
      }
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}

exports.unlikeScream = (req, res) => {
  const likeDoc = db.collection('likes')
    .where('userHandle', '==', req.user.handle)
    .where('screamId', '==', req.params.screamId).limit(1)

  const screamDoc = db.doc(`/screams/${req.params.screamId}`)

  let screamData

  screamDoc.get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Scream not found' })
      }
      screamData = doc.data()
      screamData.screamId = doc.id
      return likeDoc.get()
    })
    .then(data => {
      // Likeの存在チェック
      if (data.empty) {
        return res.status(404).json({ error: 'Scream no liked' })
      } else {
        return db.doc(`/likes/${data.docs[0].id}`).delete()
          .then(() => {
            screamData.likeCount--
            screamDoc.update({ likeCount: screamData.likeCount })
          })
          .then(() => {
            return res.json(screamData)
          })
      }
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}