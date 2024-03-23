import React from 'react';
import MenuItem from './MenuItem';
import Styles from '../../styles/menu/MenuSection.module.css';

export default function MenuSection({ menuItems, category, categoryName }) {
    // Use categoryName for display if passed, else fallback to category
    const displayCategory = categoryName || category;

    return (
        <div id={categoryName || category.toString()}>
            <h1 className={Styles.title} >{displayCategory}</h1>
            <div className={Styles.menuSection}>
                {menuItems.filter(item => item.categoryId == category).map(item => (
                    <MenuItem key={item.menuItemId} id={item.menuItemId} name={item.name} price={item.price} category={item.categoryId} />
                ))}
            </div>
        </div>
    );
}
