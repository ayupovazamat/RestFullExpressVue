const infoUser = () => {
  try {
    return 'userInfo'
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  infoUser,
}