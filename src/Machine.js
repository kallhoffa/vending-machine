class Machine {
  constructor() {
    this.snacks = []
    this.deposited = 0
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
      this.deposited += amount
      return `You have deposited ${this.deposited}`;
    } else {
      throw Error('Amount not supported, please use 10, 20, 50, 100, or 500');
    }

  }

  selectItem(item) {

    if (this.snacks.filter((snack) => snack.name === item).length === 0) {
      return 'The item you selected is unavailable'
    } else {
      if (this.deposited > item.price) {
        return "Here's your item.";
      } else {
        throw Error(`Your deposit is insufficient.  Please add ${(item.price - this.deposited)} for this item`);
      }
    }  
  }
}

module.exports = Machine