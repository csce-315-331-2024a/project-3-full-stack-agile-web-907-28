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
  }
  
  export default MenuItem;