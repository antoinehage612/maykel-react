import React, { useState, useEffect } from "react";
import "./Menu.css";
import { getMenuItems } from "../Admin/menuSevice";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [clickedButton, setClickedButton] = useState("All");
  const [showFoodDropdown, setShowFoodDropdown] = useState(false);
  const [showDrinksDropdown, setShowDrinksDropdown] = useState(false);

  const filterMenuItems = (category) => {
    setSelectedCategory(category);
    setClickedButton(category);
  };

  useEffect(() => {
    getMenuItems()
      .then((data) => setMenuItems(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const toggleFoodDropdown = () => {
    setShowFoodDropdown(!showFoodDropdown);
    setShowDrinksDropdown(false); // Close drinks dropdown
    setClickedButton(clickedButton === "Food" ? "All" : "Food");
  };

  const toggleDrinksDropdown = () => {
    setShowDrinksDropdown(!showDrinksDropdown);
    setShowFoodDropdown(false); // Close food dropdown
    setClickedButton(clickedButton === "Drinks" ? "All" : "Drinks");
  };

  const filterShishaItems = () => {
    filterMenuItems("arguileh");
    setShowFoodDropdown(false); // Close food dropdown
    setShowDrinksDropdown(false); // Close drinks dropdown
    setClickedButton("Shisha");
  };

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
      <div className="main-buttons">
        <button
          onClick={() => {
            filterMenuItems("All");
            setShowFoodDropdown(false);
            setShowDrinksDropdown(false);
          }}
          className={
            clickedButton === "All" ? "clicked main-button" : "main-button"
          }
        >
          All
        </button>
        <button
          onClick={toggleFoodDropdown}
          className={showFoodDropdown ? "clicked main-button" : "main-button"}
        >
          Food
        </button>
        <button
          onClick={toggleDrinksDropdown}
          className={showDrinksDropdown ? "clicked main-button" : "main-button"}
        >
          Drinks
        </button>
        <button
          onClick={() => {
            filterShishaItems();
            setShowFoodDropdown(false);
            setShowDrinksDropdown(false);
          }}
          className={
            clickedButton === "Shisha" ? "clicked main-button" : "main-button"
          }
        >
          Shisha
        </button>
      </div>
      {showFoodDropdown && (
        <div className="sub-buttons food-dropdown-content">
          <button
            onClick={() => {
              filterMenuItems("sandwiches");
              setClickedButton("sandwiches");
            }}
            className={
              clickedButton === "sandwiches"
                ? "clicked sub-button"
                : "sub-button"
            }
          >
            Sandwiches
          </button>
          <button
            onClick={() => {
              filterMenuItems("burgers");
              setClickedButton("burgers");
            }}
            className={
              clickedButton === "burgers" ? "clicked sub-button" : "sub-button"
            }
          >
            Burgers
          </button>
          <button
            onClick={() => {
              filterMenuItems("mashawi");
              setClickedButton("mashawi");
            }}
            className={
              clickedButton === "mashawi" ? "clicked sub-button" : "sub-button"
            }
          >
            Mashawi
          </button>
        </div>
      )}
      {showDrinksDropdown && (
        <div className="sub-buttons drinks-dropdown-content">
          <button
            onClick={() => {
              filterMenuItems("drinks");
              setClickedButton("drinks");
            }}
            className={
              clickedButton === "drinks" ? "clicked sub-button" : "sub-button"
            }
          >
            Drinks
          </button>
          <button
            onClick={() => {
              filterMenuItems("hot-drinks");
              setClickedButton("hot-drinks");
            }}
            className={
              clickedButton === "hot-drinks"
                ? "clicked sub-button"
                : "sub-button"
            }
          >
            Hot Drinks
          </button>
        </div>
      )}
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
