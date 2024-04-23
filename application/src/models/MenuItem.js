
/**
 * MenuItem model
 * @class MenuItem
 * @property {number} menuItemId - The id of the menu item.
 * @property {string} name - The name of the menu item.
 * @property {number} price - The price of the menu item.
 * @property {number[]} inventoryItemIds - The ids of the inventory items.
 * @property {number[]} inventoryItemAmounts - The amounts of the inventory items.
 * @property {number} categoryId - The id of the category.
 * @property {boolean} seasonal - The seasonal status of the menu item.
 * @property {Date} startDate - The start date of the menu item.
 * @property {Date} endDate - The end date of the menu item.
 * @constructor MenuItem
 */
class MenuItem {
    constructor(menuItemId, name, price, inventoryItemIds, inventoryItemAmounts, categoryId, seasonal, startDate, endDate) {
      this.menuItemId = menuItemId;
      this.name = name;
      this.price = price;
      this.inventoryItemIds = inventoryItemIds;
      this.inventoryItemAmounts = inventoryItemAmounts;
      this.categoryId = categoryId;
      this.seasonal = seasonal;
      this.startDate = startDate;
      this.endDate = endDate;
    }
  static parseJson(json) {
    return new MenuItem(
      parseInt(json.menuItemId),
      json.name,
      parseFloat(json.price),
      json.inventoryItemIds.map(parseFloat),
      json.inventoryItemAmounts.map(parseFloat),
      parseInt(json.categoryId),
      json.seasonal,
      json.seasonal ? new Date(json.startDate) : new Date(),
      json.seasonal ? new Date(json.endDate) : new Date()
    );
  }
  static parseDatabaseEntry(row) {
    return MenuItem.parseJson({
      menuItemId: row.menuitem_id,
      name: row.name,
      price: row.price,
      inventoryItemIds: row.inventoryitem_ids,
      inventoryItemAmounts: row.inventoryitem_amounts,
      categoryId: row.category_id,
      seasonal: row.seasonal,
      startDate: row.seasonal_start,
      endDate: row.seasonal_end,
    });
  }
  }
  
  export default MenuItem;