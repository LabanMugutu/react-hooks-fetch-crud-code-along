// src/components/Filter.js
import React from "react";

function Filter({ onCategoryChange }) {
  return (
    <div className="Filter">
      <select
        name="filter"
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Produce">Produce</option>
        <option value="Dairy">Dairy</option>
        <option value="Dessert">Dessert</option>
        <option value="Meat">Meat</option>
        <option value="Grains">Grains</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
}

export default Filter;
