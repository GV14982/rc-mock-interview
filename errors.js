export class InvalidRestockKeyError extends Error {
  /**
   * @param {string} key - The key that was used
   * @param {unknown} [cause] - Error cause
   */
  constructor(key, cause) {
    super(`Invalid restock key: ${key}`, {
      cause,
    });
  }
}

export class InvalidItemError extends Error {
  /**
   * @param {string} name - The item name provided
   * @param {unknown} [cause] - Error cause
   */
  constructor(name, cause) {
    super(`Invalid item: ${name}`, {
      cause,
    });
  }
}

export class InvalidCostError extends Error {
  /**
   * @param {string} name - The item name provided
   * @param {number} [cost] - The item name provided
   * @param {unknown} [cause] - Error cause
   */
  constructor(name, cost, cause) {
    super(`Restock invalid cost: ${name}: ${cost}`, {
      cause,
    });
  }
}

export class InsufficientStockError extends Error {
  /**
   * @param {string} name - The item name provided
   * @param {unknown} [cause] - Error cause
   */
  constructor(name, cause) {
    super(`Insufficient stock for item: ${name}`, {
      cause,
    });
  }
}

export class InsufficientFundsError extends Error {
  /**
   * @param {number} payment - The payment provided
   * @param {number} cost - The cost required
   * @param {unknown} [cause] - Error cause
   */
  constructor(payment, cost, cause) {
    super(`Insufficient funds. Needed: ${cost}, recieved: ${payment}`, {
      cause,
    });
  }
}

export class InsufficientChangeError extends Error {
  /**
   * @param {number} change - The change required
   * @param {number} missing - The missing change
   * @param {unknown} [cause] - Error cause
   */
  constructor(change, missing, cause) {
    super(
      `Insufficient change in bank. Needed: ${change}, missing: ${missing}`,
      {
        cause,
      }
    );
  }
}
