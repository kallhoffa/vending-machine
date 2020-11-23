class Machine {
  constructor() {
    this.snacks = []
  }

  seeSelections() {
    return this.snacks
  }

  stock(inventory) {
    if(inventory == undefined) {
      throw Error("please do not troll. you cannot stock nothing.")
    }
    this.snacks = inventory
  }

  deposit(amount) {
    let validDeposits = [10, 20, 50, 100, 500];

    if(validDeposits.includes(amount)) {
      return `You have deposited ${amount}`;
    } else {
      throw Error('Amount not supported, please use 10, 20, 50, 100, or 500');
    }

  }
}

module.exports = Machine