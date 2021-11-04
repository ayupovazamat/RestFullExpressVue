const {userInfoService} = require('../../../services/user')

const {userInfo} = userInfoService

const postUserInfo = async (req, res, next) =>{
  const {id} = req.body
  try {
    await userInfo(id).then(e => {
      res.send(e)
    })
    // вызов другой службы (или та же служба, сюда может идти другая функция)
    // то есть - await generateBlogpostPreview ()
res.send('info');
    next()
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}

module.exports = {
  postUserInfo
}