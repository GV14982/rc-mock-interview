/**
  * @typedef {Object} Bank
  * @property {number} pennies - The number of pennies in the bank
  * @property {number} nickles - The number of nickles in the bank
  * @property {number} dimes - The number of dimes in the bank
  * @property {number} quarters - The number of quarters in the bank
  */

/**
  * @typedef {Object} InventoryItem
  * @property {string} name - Name of the item
  * @property {number} stock - The number of items available
  * @property {number} cost - The cost in dollars to purchase this item
  */

/**
  * @typedef {Object} PublicInventoryItem
  * @property {string} name - Name of the item
  * @property {number} cost - The cost in dollars to purchase this item
  */

/**
 * @typedef {Record<string, InventoryItem>} Inventory
 */

/**
 * @typedef {Record<string, PublicInventoryItem>} PublicInventory
 */

export default {}
