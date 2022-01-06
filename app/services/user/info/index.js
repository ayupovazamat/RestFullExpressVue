const infoUser = () => {
  try {
    return 'userInfo'
  } catch (e) {
    console.log(e)
    //throw new Error(e.message)
  }
}

module.exports = {
  infoUser,
}