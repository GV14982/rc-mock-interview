import * as Types from "./types.js"

export class VendingMachine {
  /**
    * @type {string}
    * @private
    */
  _restockKey
  /**
    * @type {Types.Inventory}
    * @private
    */
  _inventory = {}
  /**
    * @type {Types.Bank}
    * @private
    */
  _bank = { pennies: 0, nickles: 0, dimes: 0, quarters: 0 }
  /**
   * Create an instance of a Vending Machine
   * @param {string} restockKey - Key to use for restocking items (Think of this like the physical key a maintenance worker would use to open a vending machine)
   * @param {Types.Inventory} [initialInventory] - Initial stock for the vending machine, defaults to nothing
   * @param {Types.Bank} [initialBank] - Initial bank used for making change
   */
  constructor(restockKey, initialInventory, initialBank) {
    throw new Error(`Unimplemented: ${getFunctionName()}`)
  }

  /**
   * Get the public facing inventory, which should not include quantities.
   * @returns {Types.PublicInventory} - Available items without quantities. Should not return items that have 0 quantity
   */
  get inventory() {
    throw new Error(`Unimplemented: ${getFunctionName()}`)
  }

  /**
   * Get the internal inventory including quantities. Requires the restock key.
   * @param {string} key - The key being used to check stock
   * @returns {Types.Inventory} - Basically the internal inventory state
   */
  getStock(key) {
    throw new Error(`Unimplemented: ${getFunctionName()}`)
  }

  /**
    * Purchase an item
    * @param {string} name - Name of the item to purchase
    * @param {number} payment - Amount of money given to the machine
    * @returns {Types.Bank} - The amount of change to be given based on the cost of the item and the amount given
    */
  purchase(name, payment) {
    throw new Error(`Unimplemented: ${getFunctionName()}`)
  }

  /**
    * Add stock of an item. Requires use of a `restockKey`
    * @param {string} key - The key being used to restock
    * @param {string} name - Name of the item to restock
    * @param {number} amount - Number of items to restock
    * @return {void}
    */
  restock(key, name, amount) {
    throw new Error(`Unimplemented: ${getFunctionName()}`)
  }
}

function getFunctionName() {
  const stack = new Error().stack;
  const caller = stack?.split('\n')[2];
  return caller?.trim().split(' ').at(-2) || 'anonymous';
}
