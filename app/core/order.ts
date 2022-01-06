const User = require('./user')

abstract class Order {

  validate()

  process()

  cancel()
}

class OnlineOrder extends Order {

}