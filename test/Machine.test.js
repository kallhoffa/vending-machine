const Machine = require('../src/Machine')

describe('The vending machine', () => {
  it('is initialized with no items', () => {
    // SEAT
    // setup
    const vendingMachine = new Machine();

    // exercise & assert
    expect(vendingMachine.seeSelections()).toEqual([])

    // teardown, not needed
  })

  it('can stock one snack', () => {
    // setup
    const vendingMachine = new Machine();
    const snack = {
      name: 'macadamia nuts',
      price: 250
    }

    // exercise
    vendingMachine.stock([snack])

    // assert
    expect(vendingMachine.seeSelections()).toEqual([snack])
  })

  // someone attempts to stock without inventory
  // it('stocks nothing if there is no inventory passed', () => {
  //   // setup
  //   const vendingMachine = new Machine()

  //   // exercise
  //   vendingMachine.stock()

  //   // assertion
  //   expect(vendingMachine.seeSelections()).toEqual([])
  // })

  it('displays an error if no inventory comes with stocking', () => {
    // setup
    const vendingMachine = new Machine()
    const displayMessage = "please do not troll. you cannot stock nothing."

    // exercise & assert
    expect(() => vendingMachine.stock()).toThrow(displayMessage)
  })
//   As a customer, I want to know how much money I have deposited, so that I know what I can purchase.
// - Given I am using the vending machine, 
// - when I insert money, 
// - then I see the total I have deposited on a screen. 
// - `deposit(100)` returns `'You have deposited Rs 100'`
// - The machine should accept bills in these amounts: `10, 20, 50, 100, 500`

  it('deposit is a function', () => {
    //setup
    const vendingMachine = new Machine()

    //exercise & assert
    expect(typeof vendingMachine.deposit).toEqual('function')
  })

  it('accepts an amount of money', () => {
    const vendingMachine = new Machine();
    const depositAmount = 10;
    const feedback = 'You have deposited 10';

    expect(vendingMachine.deposit(depositAmount)).toEqual(feedback);
  });

  it('throws an error if depositing an amount other than 10, 20, 50, 100, 500', () => {
    const vendingMachine = new Machine()
    const displayMessage = 'Amount not supported, please use 10, 20, 50, 100, or 500'

    expect(() => vendingMachine.deposit(0)).toThrow(displayMessage)
    expect(() => vendingMachine.deposit(-1)).toThrow(displayMessage)
    expect(() => vendingMachine.deposit()).toThrow(displayMessage)
    expect(() => vendingMachine.deposit('test')).toThrow(displayMessage)
    expect(() => vendingMachine.deposit([10,20])).toThrow(displayMessage)

  })


// As a customer, I want to add additional money, so that I can use the denominations I have to purchase an item.
// - Given I have deposited money in the vending machine,
// - when I deposit additional money,
// - then I see the new total on a screen. 
// - After depositing Rs 100, `deposit(50)` returns `'You have deposited Rs 150'`

  it('keeps track of total amount deposited', () => {
    const vendingMachine = new Machine();
    const depositAmount = 50;

    expect(vendingMachine.deposit(depositAmount)).toEqual('You have deposited 50');
    expect(vendingMachine.deposit(depositAmount)).toEqual('You have deposited 100');
  })

// As a customer, I want to see a message if my item is unavailable, so that I can make another choice.
// - Given I am using the vending machine, 
// - when I enter a code for an item that is unavailable, 
// - then I see a message that the item is unavailable.
// - `selectItem(code)` returns `'The item you selected is unavailable'`

  it('has a function selectItem', () => {
    const vendingMachine = new Machine()
    expect(typeof vendingMachine.selectItem).toEqual('function')
  })

  it('says selection is unavailable if item is out of stock', () => {
    const vendingMachine = new Machine();
    const displayMessage = 'The item you selected is unavailable';
    const item = 'Chips';

    expect(vendingMachine.selectItem(item)).toEqual(displayMessage);
    expect(vendingMachine.selectItem()).toEqual(displayMessage);
    expect(vendingMachine.selectItem(1)).toEqual(displayMessage);
  });

// As a customer, I want to see a message if my deposit is insufficient, so that I know to add more money.
// - Given I have made a choice, 
// - when I have not deposited enough money for that item, 
// - then I see a message telling me how much more to deposit.
// - `selectItem(code)` returns `'Your deposit is insufficient.  Please add Rs 20 for this item'`

  it('returns an error "Your deposit is insufficient.  Please add X for this item" when funds are inssufecient', () => {
    const vendingMachine = new Machine()

    const snack = {
      name: 'macadamia nuts',
      price: 250
    }

    // exercise
    vendingMachine.stock([snack])

    vendingMachine.deposit(100)

    expect(() => vendingMachine.selectItem('macadamia nuts')).toThrow(`Your deposit is insufficient.  Please add 150 for this item`)

  });

// As a customer, I want to receive change, so that I don’t pay more than the item costs.
// - Given I have made a selection, 
// - when the item is delivered, 
// - then I receive correct change (in correct monetary units)
// - `selectItem(code)` returns an object with the item and an array of bills `{item: 'mints', change: [20, 10]}`

  it('returns correct change alongside a purchased item', () => {
    const vendingMachine = new Machine();
    const snack = {
      name: 'macadamia nuts',
      price: 310
    };
    vendingMachine.stock([snack]);
    vendingMachine.deposit(250);

    expect(vendingMachine.selectItem('macadamia nuts')).toEqual({item: 'macadamia nuts', change: [50, 10]});
  });

// As a customer, I want to receive my money back when I push the cancel button, so that I can change my mind.
// - Given that I have deposited money,
// - When I push the cancel button,
// - Then I receive my money back
// - `cancel()` returns `{change: [100]}`

// As a customer, I want to know if the vending machine can make change, so that I can cancel my choice if it can't make change.
// - Given I have deposited money and selected a choice, 
// - when the machine does not have correct change, 
// - then I see a message
// - `selectItem(code)` returns `'Cannot return proper change.  Please choose another item or cancel the transaction'`
})