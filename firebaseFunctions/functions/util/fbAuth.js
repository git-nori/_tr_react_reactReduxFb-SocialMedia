const { admin, db } = require('../util/admin')

// token認証を行い認証したユーザーのuserHandleをリクエストに追加する
module.exports = (req, res, next) => {
  let idToken
  // validation exist token in header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    idToken = req.headers.authorization.split('Bearer ')[1]
  } else {
    console.error('No token found')
    return res.status(403).json({ error: 'Unauthorized' })
  }

  // verify token
  admin.auth().verifyIdToken(idToken)
    .then(decodedToken => {
      req.user = decodedToken
      console.log(decodedToken)
      return db.collection('users')
        .where('userId', '==', req.user.uid)
        .limit(1)
        .get()
    })
    .then(data => {
      // set userHandle in body
      req.user.handle = data.docs[0].data().handle

      return next()
    })
    .catch(err => {
      console.error(err)
      return res.status(403).json(err)
    })
}