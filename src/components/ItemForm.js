import React, { useState } from "react";

function ItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      name,
      category,
      isInCart: false,
    };

    fetch("/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((r) => r.json())
      .then((item) => {
        onAddItem(item);
        setName("");
        setCategory("Produce");
      });
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Category
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
          <option value="Meat">Meat</option>
          <option value="Grains">Grains</option>
          <option value="Other">Other</option>
        </select>
      </label>
      {/* ✅ Button text must match test expectations */}
      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
