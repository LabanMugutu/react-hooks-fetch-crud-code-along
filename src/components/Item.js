// src/components/Item.js
import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  const { id, name, category, isInCart } = item;

  // ✅ Toggle isInCart (PATCH)
  function handleToggleCart() {
    fetch(`/items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isInCart: !isInCart }),
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to update item");
        }
        return r.json();
      })
      .then(onUpdateItem)
      .catch((err) => {
        console.error("Error updating item:", err);
      });
  }

  // ✅ Delete item
  function handleDelete() {
    fetch(`/items/${id}`, {
      method: "DELETE",
    })
      .then((r) => {
        if (!r.ok && r.status !== 204) {
          throw new Error("Failed to delete item");
        }
        onDeleteItem(id);
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
      });
  }

  return (
    <li className={isInCart ? "in-cart" : ""}>
      <span>{name}</span>
      <span className="category">{category}</span>
      <button className="add" onClick={handleToggleCart}>
        {isInCart ? "Remove From Cart" : "Add to Cart"}
      </button>
      <button className="delete" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}

export default Item;


