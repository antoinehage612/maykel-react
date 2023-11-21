import React, { useState, useEffect } from "react";
import "./Menu.css";
import { getMenuItems } from "../Admin/menuSevice";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [clickedButton, setClickedButton] = useState("All");

  const filterMenuItems = (category) => {
    setSelectedCategory(category);
    setClickedButton(category);
  };

  useEffect(() => {
    getMenuItems()
      .then((data) => setMenuItems(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const getFilteredMenuItems = () => {
    const filteredItems =
      selectedCategory === "All"
        ? menuItems
        : menuItems.filter((item) => item.category === selectedCategory);

    const orderedCategories = [
      "sandwiches",
      "burgers",
      "mashawi",
      "drinks",
      "hot-drinks",
      "arguileh",
    ];

    return orderedCategories.reduce((acc, category) => {
      const categoryItems = filteredItems.filter(
        (item) => item.category === category
      );
      return acc.concat(categoryItems);
    }, []);
  };

  return (
    <div className="restaurant-menu">
      <h2>Menu</h2>
      <div className="category-buttons">
        <button
          onClick={() => filterMenuItems("All")}
          className={clickedButton === "All" ? "clicked" : ""}
        >
          All
        </button>
        <button
          onClick={() => filterMenuItems("sandwiches")}
          className={clickedButton === "sandwiches" ? "clicked" : ""}
        >
          Sandwiches
        </button>
        <button
          onClick={() => filterMenuItems("burgers")}
          className={clickedButton === "burgers" ? "clicked" : ""}
        >
          Burgers
        </button>
        <button
          onClick={() => filterMenuItems("mashawi")}
          className={clickedButton === "mashawi" ? "clicked" : ""}
        >
          Mashawi
        </button>
        <button
          onClick={() => filterMenuItems("drinks")}
          className={clickedButton === "drinks" ? "clicked" : ""}
        >
          Drinks
        </button>
        <button
          onClick={() => filterMenuItems("hot-drinks")}
          className={clickedButton === "hot-drinks" ? "clicked" : ""}
        >
          Hot Drinks
        </button>
        <button
          onClick={() => filterMenuItems("arguileh")}
          className={clickedButton === "arguileh" ? "clicked" : ""}
        >
          Arguileh
        </button>
      </div>
      <div className="items">
        <ul>
          {getFilteredMenuItems().map((item) => (
            <li key={item.id}>
              <span className="item-name">{item.name}</span>
              <div className="ingredients">
                {item.ingredients && item.ingredients.length > 0 && (
                  <ul>
                    {item.ingredients.map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                  </ul>
                )}
              </div>
              <span className="item-price">{item.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
