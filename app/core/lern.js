// удаление дублей в массиве
let values = [1, 2, 3, 4, 5, 2, 4, 4, 5, 2, 5]
let uniqueValue = [...new Set(values)]


// Поиск  чувствительный к регистру
let users = [
  {id: 11, name: 'Adam', age: 23, group: 'editor'},
  {id: 47, name: 'John', age: 28, group: 'admin'},
  {id: 85, name: 'William', age: 34, group: 'editor'},
  {id: 97, name: 'Oliver', age: 28, group: 'admin'},
  {id: 97, name: 'Adam', age: 27, group: 'admin'}
];
let resSearch = users.filter(el => el.name.includes('da'))

// Поиск не чувствительный к регистру
let resSearchNoRegister = users.filter(el => new RegExp('oli', 'i').test(el.name))


// Проверка есть ли у пользователей права администратора
// Метод some() проверяет, соответствует ли хотя бы один элемент в массиве условию, реализованному в предоставленной функцией.
let hasAdmin = users.some(el => el.group === 'admin')


// Сглаживание массива массивов
// Код решает задачу преобразования массива массивов в один плоский массив.
// Результат первой итерации будет равен: […[], …[1, 2, 3]] что означает,
// что он преобразуется в [1, 2, 3] — это значение мы предоставляем как ‘acc’ на второй итерации и так далее.
// todo       reduce((acc, it) => [...acc, ...it], [])
let nested = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
let flat = nested.reduce((acc, it) => [...acc, ...it], [])


// Создание объекта, который содержит частоту использования ключей
// Давайте сгруппируем и посчитаем свойство ‘age’ для каждого элемента в массиве
// todo        reduce((acc, it) => ({...acc, [it.age]: (acc[it.age] || 0) + 1}), {})
let groupByAge = users.reduce((acc, it) => ({...acc, [it.age]: (acc[it.age] || 0) + 1}), {})
let groupByGroup = users.reduce((acc, it) => ({...acc, [it.group]: (acc[it.group] || 0) + 1}), {})
let groupByName = users.reduce((acc, it) => ({...acc, [it.name]: (acc[it.name] || 0) + 1}), {})
let groupId = users.reduce((acc, it) => (({...acc, [it.id]: (acc[it.id] || 0) + 1})), {})


// Индексирование массива объектов (таблица соответствий)
// Вместо того, чтобы проходить через весь массив во время поиска пользователя по идентификатору,
// мы можем создать объект, в котором идентификатор пользователя представляет ключ (с постоянным временем поиска).
// todo      reduce((acc, it) => ({...acc, [it.id]: it}), {})
let uTable = users.reduce((acc, it) => ({...acc, [it.id]: it}), {})
let uTableAge = users.reduce((acc, it) => (({...acc, [it.age]: it}), {}))
let uTableName = users.reduce((acc, it) => (({...acc, [it.name]: it}), {}))


// Извлечение уникальных значений для определенного ключа для каждого элемента в массиве
let uniqueGroup = [...new Set(users.map(it => it.group))]
let uniqueName = [...new Set(users.map(it => it.name))]


// Обратное мапирование объекта типа ключ/значение
// todo        Object.keys(obj).reduce((acc, k) => (acc[obj[k]] = [...(acc[abj[k]] || []), k], acc), {})
let cities = {
  Lyon: 'France',
  Berlin: 'Germany',
  Paris: 'France'
};
let countries = Object.keys(cities).reduce((acc, k) => (acc[cities[k]] = [...(acc[cities[k]] || []), k], acc), {});

// Отфильтровать все записи, где есть props со значением > 10
const list = [
  {
    name: 'ivar1',
    props: [
      {id: 1, value: 2},
      {id: 2, value: 5},
      {id: 3, value: 7},
    ]
  },
  {
    name: 'ivar2',
    props: [
      {id: 1, value: 2},
      {id: 2, value: 15},
      {id: 3, value: 7},
    ]
  }]
let list1 = list.filter(n => n.props.some(m => m.value > 10))


// Поиск и замена пары ключ-значение в массиве объектов
users.map(p => p.id !== 94 ? p : {...p, age: p.age = 31})

// Объединение (A ∪ B) массивов
let arrA = [1, 4, 3, 2];
let arrB = [5, 2, 6, 7, 1];

// Поиск пересечений в массивах (A ∩ B)
arrA.filter(it => arrB.includes(it))

// Сложение чисел
const euros = [29.76, 41.85, 46.5];
const sum = euros.reduce((total, amount) => total + amount);

// Найти среднее число с JavaScript методом reduce
const averge = euros.reduce((total, amount, index, array) => {
  total += amount
  if (index === array.length - 1) {
    return total / array.length
  } else {
    return total
  }
})

// Для каждого элемента массива ids вызвать функцию fakeApiRequest и вывести в браузер те id, для которых функция вернула success: true, при этом необходимо сохранить последовательность цифр как в массиве ids.

const ids = [5, 6, 3, 7, 10, 6];
const fakeApiRequest = (id) => {
  const timeout = Math.floor(Math.random() * (3000 - 1000)) + 1000;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = id % 2;
      success ? resolve({success: true}) : reject({success: false});
    }, timeout);
  });
};

///
const testPromices = () => {
  const ids = [5, 6, 3, 7, 10, 6];
  const fakeApiRequest = (id) => {
    const timeout = Math.floor(Math.random() * (3000 - 1000)) + 1000;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = id % 2;
        success ? resolve({ success: true }) : reject({ success: false });
      }, timeout);
    });
  };

//
  Promise.allSettled(ids.map(id => fakeApiRequest(id)))
     .then((results) => {
       let arr = [] // наш массив
       results.forEach((result, index) => {
         if (result.status === "fulfilled") { // промис упешно выполнен
           if(result.value.success === true){ // сравниваем success
             arr.push(ids[index]) // пушим в массив arr
           }
         }
         if (result.status === "rejected") { // обработка ошибки
           console.log(new Error('Ошибка в выполнении промиса'), ids[index])
         }
       });
       // выводим результат на экран
       document.getElementById("app").innerHTML = outputOnDisplay(arr)
     })

// вывод массива на экран
  const outputOnDisplay = (arr) => '<ul>' + arr.reduce(function (html, item) {
    html += '<li>' + item + '</li>';
    return html;
  }, '') + '</ul>';
}
