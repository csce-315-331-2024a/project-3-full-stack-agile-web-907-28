
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
  /**
   * This function handles the creation of a menu item.
   * @param {number} menuItemId - The ID of the menu item.
   * @param {string} name - The name of the menu item.
   * @param {number} price - The price of the menu item.
   * @param {number[]} inventoryItemIds - The IDs of the inventory items.
   * @param {number[]} inventoryItemAmounts - The amounts of the inventory items.
   * @param {number} categoryId - The ID of the category.
   * @param {boolean} seasonal - The seasonal status of the menu item.
   * @param {Date} startDate - The start date of the menu item.
   * @param {Date} endDate - The end date of the menu item.
   * @param {string} imageSrc - The name of the image file used as the item's thumbnail.
   */
    constructor(menuItemId, name, price, inventoryItemIds, inventoryItemAmounts, categoryId, seasonal, startDate, endDate, imageSrc) {
      this.menuItemId = menuItemId;
      this.name = name;
      this.price = price;
      this.inventoryItemIds = inventoryItemIds;
      this.inventoryItemAmounts = inventoryItemAmounts;
      this.categoryId = categoryId;
      this.seasonal = seasonal;
      this.startDate = startDate;
      this.endDate = endDate;
      this.imageSrc = imageSrc;
    }

  /**
   * This function handles the parsing of a JSON object into a menu item.
   * @param {Object} json - The JSON object to be parsed.
   * @returns {MenuItem} - The menu item parsed from the JSON object.
   */
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
      json.seasonal ? new Date(json.endDate) : new Date(),
      json.imageSrc
    );
  }

  /**
   * This function handles the parsing of a database entry into a menu item.
   * @param {Object} row - The database entry to be parsed.
   * @returns {MenuItem} - The menu item parsed from the database entry.
   */
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
      imageSrc: row.image_source
    });
  }
  }
  
  export default MenuItem;