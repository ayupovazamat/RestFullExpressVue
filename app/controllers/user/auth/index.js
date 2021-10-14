// импортируем /services/user/index.js

const {userAuthService} = require('../../../services/user')

const {authUser, registerUser} = userAuthService

/*
 * вызовите другие импортированные службы или ту же службу, но с другими функциями, если вам нужно
*/
const postUserAuth = async (req, res, next) => {

  const {email, password} = req.body
  try {
    await authUser(email, password).then(e => {
      //console.log(e)
      res.send(e)
    })
    // вызов другой службы (или та же служба, сюда может идти другая функция)
    // то есть - await generateBlogpostPreview ()

    next()
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}
const postUserRegister = async (req, res, next) => {
  const {email, password} = req.body
  try {
    await registerUser(email, password)

    //res.sendStatus(200)
    next()
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}
module.exports = {
  postUserAuth,
  postUserRegister
}