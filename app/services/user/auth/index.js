const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../../config');
const userModel = require('../../../models/user')

const hashing = (str) => {
  try {
    return bcrypt.hash(str, 8).then(function (hash) {
      return hash
    });
  } catch (e) {
    console.log(e)
  }
  //return false;
}

const comparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.log(error);
  }
  return false;
};

async function getUserByEmail(email) {
  await userModel.selectByEmail(email, (err, user) => {
    if (err) return 'Error on the server. Ошибка при проверке email.';
    if (!user) return 'Пользователь не найден';
    return user
  })
}


/*
* 1. Проверяем email на уникальность
* 2. Создаем нового пользователя
* 3. Авторизуем сразу
*/

const registerUser = async (email, password) => {
  // создаем юзера в бд
  try {
    await userModel.selectByEmail(email, async (err, user) => {
      if (user === undefined) { // 'пользователя не существует, все ок, можно создавать'
        // создаем хеш пароля
        const hash = await hashing(password)
        // создаем юзера в бд
        await createUser(email, hash)
        console.log('Пользователь создан')
      } else {
        return 'Пользователь с таким email уже существует'
      }
    })

  } catch (e) {
    throw new Error(e.message)
  }
}

const createUser = async (email, hash) => {
  await userModel.createUser([
      email,
      hash
    ],
    async (err) => { // обрабатываем ошибку
      if (err) return 'При регистрации пользователя возникла ошибка';
      await userModel.selectByEmail(email, (err, user) => {
        if (err) return 'Возникла проблема с получением пользователя';
        let token = jwt.sign({id: user.id}, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        return {auth: true, token: token, user: user}
      });
    });
}

/*
* 1. Проверяем существование пользователя (email)
* 2. Если существует, то проверяем пароль
* 3. Если совпадает отправляем ТОКЕН, если нет выдаем ошибку
* */
/*const res = {
  error: { // или false
    message: ""
  },
  data: {
    auth: true,
    token: token,
    user: user
  }
}*/

/*
*/
const authUser = async (email, password) => {
  try {
    const checkUser = new Promise((resolve, reject) => {
      userModel.selectByEmail(email, async (err, user) => {
        if (err) {
          resolve(new Error('Error on the server. Ошибка при проверке email.'));
        }
        if (!user) {
          resolve(new Error('Пользователь не найден'));
        } else resolve(user);
      })
    });
    const user = await checkUser;

    // Сверяем хеш с паролем
    const isValidPass = !('password' in user) ? false : await comparePassword(password, user.password);

    if (!isValidPass) return {auth: false, token: null};

    // если все успешно, то отправляем токен
    let token = jwt.sign(
      {id: user.id, email: user.email},
      config.secret,
      {
        expiresIn: 86400 // expires in 24 hours
      });
    return {
      auth: true,
      token: token,
      user: user
    };
  } catch (e) {
    console.log(e)
    //throw new Error(e)
  }
}

const login = async (user, content) => {
  try {
    return await userModel(user, content)
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  authUser, registerUser, login
}