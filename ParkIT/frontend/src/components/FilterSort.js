import React from 'react';

const FilterSort = ({ onOptionChange }) => {
  return (
    <select
      onChange={(e) => onOptionChange(e.target.value)}
      className="px-3 py-2 border rounded"
    >
      <option value="">Filter & Sort</option>
      <option value="nearest">Nearest Carpark</option>
      <option value="mostAvailable">Most Available Slots</option>
      <option value="cheapest">Cheapest Parking Rate</option>
    </select>
  );
};

export default FilterSort;
