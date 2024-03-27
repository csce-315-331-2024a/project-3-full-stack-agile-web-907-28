import MenuItem from './MenuItem';

export default function MenuSection({menuItems, category, categoryName}) {
  // Use categoryName for display if passed, else fallback to category
  const displayCategory = categoryName || category;

  return (
    <div id={categoryName || category.toString()}>
      <h1 className="gap-2 text-xl font-semibold">{displayCategory}</h1>
      <div className="gap-2 grid grid-cols-3 sm:grid-cols-6">
        {menuItems.filter(item => item.categoryId == category).map(item => (
          <MenuItem key={item.menuItemId} id={item.menuItemId} name={item.name} price={item.price}
                    category={item.categoryId}/>
        ))}
      </div>
    </div>
  )
}
