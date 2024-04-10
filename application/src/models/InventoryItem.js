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
