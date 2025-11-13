import assert from "node:assert";
import { beforeEach, describe, it } from "node:test";
import { VendingMachine } from "./vending-machine.js";
import {
  InsufficientChangeError,
  InsufficientFundsError,
  InsufficientStockError,
  InvalidItemError,
  InvalidCostError,
  InvalidRestockKeyError,
} from "./errors.js";
import * as Types from "./types.js";

const restockKey = "secretKey";

/**
 * @type {Types.Inventory}
 */
const initialInventory = {
  chips: {
    name: "chips",
    cost: 0.5,
    stock: 10,
  },
  candy: {
    name: "candy",
    cost: 0.65,
    stock: 15,
  },
  soda: {
    name: "soda",
    cost: 0.75,
    stock: 12,
  },
  "trail mix": {
    name: "trail mix",
    cost: 0.3,
    stock: 6,
  },
};

/**
 * @type {Types.Bank}
 */
const initialBank = {
  pennies: 500,
  nickles: 300,
  dimes: 200,
  quarters: 100,
};

describe("VendingMachine", () => {
  describe("Instantiation", () => {
    it("Should not instantiate without restock key", () => {
      assert.throws(() => new VendingMachine(), new InvalidRestockKeyError());
    });
    it("Should not instantiate with empty restock key", () => {
      assert.throws(
        () => new VendingMachine(""),
        new InvalidRestockKeyError("")
      );
    });
    it("Should instantiate with at least one restock key", () => {
      const vm = new VendingMachine(restockKey);
      assert(vm);
    });
    it("Should instantiate optional inventory", () => {
      const vm = new VendingMachine(restockKey, initialInventory);
      assert(vm);
    });
    it("Should instantiate optional inventory and bank", () => {
      const vm = new VendingMachine(restockKey, initialInventory, initialBank);
      assert(vm);
    });
  });
  describe("Inventory", () => {
    /**
     * @type {VendingMachine}
     */
    let vm;
    beforeEach(() => {
      vm = new VendingMachine(restockKey, initialInventory, initialBank);
    });

    it("Should accept an initial inventory", () => {
      assert.deepEqual(
        vm.inventory,
        Object.values(initialInventory).reduce(
          (acc, { name, cost }) => ({ ...acc, [name]: { name, cost } }),
          {}
        )
      );
    });
    it("Should get current stock with valid key", () => {
      assert.deepEqual(vm.getStock(restockKey), initialInventory);
    });
    it("Should restock with valid key", () => {
      assert.doesNotThrow(() => {
        vm.restock(restockKey, "chips", 5);
      });
      assert.equal(vm.getStock(restockKey)["chips"].stock, 15);
    });
    it("Should add new item with valid key", () => {
      assert.doesNotThrow(() => {
        vm.restock(restockKey, "milk", 5, 0.35);
        assert.equal(vm.getStock(restockKey)["milk"].stock, 5);
      });
    });

    describe("Errors", () => {
      it("it should throw when restocking without a key", () => {
        assert.throws(() => {
          vm.restock(undefined, "chips", 5);
        }, new InvalidRestockKeyError());
      });
      it("it should throw when restocking with invalid key", () => {
        assert.throws(() => {
          vm.restock("invalid", "chips", 5);
        }, new InvalidRestockKeyError("invalid"));
      });
      it("it should throw when getting stock without key", () => {
        assert.throws(() => {
          vm.getStock();
        }, new InvalidRestockKeyError());
      });
      it("it should throw when getting stock with invalid key", () => {
        assert.throws(() => {
          vm.getStock("invalid");
        }, new InvalidRestockKeyError("invalid"));
      });
      it("it should throw when adding new stock without a cost", () => {
        assert.throws(() => {
          vm.restock(restockKey, "eggs", 5);
        }, new InvalidCostError("eggs", undefined));
      });
      it("it should throw when adding new stock with an invalid cost", () => {
        assert.throws(() => {
          vm.restock(restockKey, "eggs", 5, -1);
        }, new InvalidCostError("eggs", -1));
      });
    });
  });
  describe("Purchase", () => {
    /**
     * @type {VendingMachine}
     */
    let vm;
    beforeEach(() => {
      vm = new VendingMachine(restockKey, initialInventory, initialBank);
    });
    it("Should purchase valid item with exact change", () => {
      const change = vm.purchase("chips", 0.5);
      assert.deepEqual(change, {
        quarters: 0,
        dimes: 0,
        nickles: 0,
        pennies: 0,
      });
      assert.equal(vm.getStock(restockKey)["chips"].stock, 14);
    });
    it("Should purchase valid item requiring change", () => {
      let change = vm.purchase("chips", 1);
      assert.deepEqual(change, {
        quarters: 2,
        dimes: 0,
        nickles: 0,
        pennies: 0,
      });
      assert.equal(vm.getStock(restockKey)["chips"].stock, 13);
      change = vm.purchase("trail mix", 0.75);
      assert.deepEqual(change, {
        quarters: 1,
        dimes: 2,
        nickles: 0,
        pennies: 0,
      });
      assert.equal(vm.getStock(restockKey)["trail mix"].stock, 5);
      change = vm.purchase("candy", 1);
      assert.deepEqual(change, {
        quarters: 1,
        dimes: 1,
        nickles: 0,
        pennies: 0,
      });
      assert.equal(vm.getStock(restockKey)["candy"].stock, 14);
      change = vm.purchase("soda", 0.8);
      assert.deepEqual(change, {
        quarters: 0,
        dimes: 0,
        nickles: 1,
        pennies: 0,
      });
      assert.equal(vm.getStock(restockKey)["soda"].stock, 11);
      change = vm.purchase("candy", 0.69);
      assert.deepEqual(change, {
        quarters: 0,
        dimes: 0,
        nickles: 0,
        pennies: 4,
      });
      assert.equal(vm.getStock(restockKey)["candy"].stock, 13);
    });
    describe("Errors", () => {
      /**
       * @type {VendingMachine}
       */
      let vm;
      beforeEach(() => {
        vm = new VendingMachine(
          restockKey,
          {
            ...initialInventory,
            "protein bar": {
              name: "protein bar",
              cost: 1,
              stock: 1,
            },
          },
          {
            quarters: 1,
            dimes: 0,
            nickles: 0,
            pennies: 0,
          }
        );
      });
      it("Should throw if invalid item name", () => {
        assert.throws(
          () => vm.purchase("invalid", 1),
          new InvalidItemError("invalid")
        );
      });
      it("Should throw if not enough payment", () => {
        assert.throws(
          () => vm.purchase("protein bar", 0.99),
          new InsufficientFundsError(0.99, 1)
        );
      });
      it("Should throw if not enough stock", () => {
        assert.doesNotThrow(() => vm.purchase("protein bar", 1));
        assert.throws(
          () => vm.purchase("protein bar", 1),
          new InsufficientStockError("protein bar")
        );
      });
      it("Should throw if not enough change", () => {
        assert.throws(
          () => vm.purchase("chips", 1),
          new InsufficientChangeError(0.5, 0.25)
        );
      });
    });
  });
});
