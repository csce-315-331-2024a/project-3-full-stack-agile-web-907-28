import MenuItem from './MenuItem';

/**
 * This component is a menu section that displays the category name and menu items.
 * @param {Object} menuItems - The menu items.
 * @param {Object} category - The category of the menu items.
 * @param {Object} categoryName - The name of the category.
 * @returns {JSX.Element} - The menu section component.
 */
export default function MenuSection({ menuItems, category, categoryName }) {
  // Use categoryName for display if passed, else fallback to category
  const displayCategory = categoryName || category;

  return (
    <div id={categoryName || category.toString()} className="px-9">
      <h1 className="gap-2 text-xl font-semibold">{displayCategory}</h1>
      <div className="gap-2 grid grid-cols-3 sm:grid-cols-6">
        {menuItems.filter(item => item.categoryId == category).map(item => (
          <MenuItem key={item.menuItemId} id={item.menuItemId} name={item.name} price={item.price} category={item.categoryId}/>
        ))}
      </div>
    </div>
  )
}
