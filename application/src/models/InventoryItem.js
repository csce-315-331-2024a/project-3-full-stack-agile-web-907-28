/**
 * Model for inventory items.
 * @class InventoryItem
 * @property {number} inventoryItemId The ID of the inventory item.
 * @property {string} name The name of the inventory item.
 * @property {number} quantity The current stock of the inventory item.
 * @property {Date} purchaseDate The date the inventory item was purchased.
 * @property {Date} expiryDate The date the inventory item expires.
 * @property {number} quantityLimit The minimum inventory quantity that needs to be in stock between refills
 */
export default class InventoryItem {
  /**
   * This function handles the creation of an inventory item.
   * @param {number} inventoryItemId - The ID of the inventory item.
   * @param {string} name - The name of the inventory item.
   * @param {number} quantity - The current stock of the inventory item.
   * @param {Date} purchaseDate - The date the inventory item was purchased.
   * @param {Date} expiryDate - The date the inventory item expires.
   * @param {number} quantityLimit - The minimum inventory quantity that needs to be in stock between refills
   */
  constructor(
    inventoryItemId,
    name,
    quantity,
    purchaseDate,
    expiryDate,
    quantityLimit = 0
  ) {
    this.inventoryItemId = inventoryItemId;
    this.name = name;
    this.quantity = quantity;
    this.purchaseDate = purchaseDate;
    this.expiryDate = expiryDate;
    this.quantityLimit = quantityLimit;
  }

  /**
   * This function handles the parsing of a JSON object into an inventory item.
   * @param {Object} json - The JSON object to be parsed.
   * @returns {InventoryItem} - The inventory item parsed from the JSON object.
   */
  static parseJson(json) {
    return new InventoryItem(
      parseInt(json.inventoryItemId),
      json.name,
      parseFloat(json.quantity),
      new Date(json.purchaseDate),
      new Date(json.expiryDate),
      parseInt(json.quantityLimit)
    );
  }

  /**
   * This function handles the parsing of a database entry into an inventory item.
   * @param {Object} row - The database entry to be parsed.
   * @returns {InventoryItem} - The inventory item parsed from the database entry.
   */
  static parseDatabaseEntry(row) {
    return InventoryItem.parseJson({
      inventoryItemId: row.inventoryitem_id,
      name: row.name,
      quantity: row.quantity,
      purchaseDate: row.purchase_date,
      expiryDate: row.expiry_date,
      quantityLimit: row.quantity_limit
    });
  }
}
