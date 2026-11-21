import React from "react";

const Filter = (props) => {
  let filterData = props.filterData;
  let category = props.category;
  let setCategory = props.setCategory;

  function filterHandler(title) {
    setCategory(title);
  }
  console.log("Filter data:", filterData);
  return (
    <div className="filters">
      {filterData.map((data) => (
        <button
          className={`filters__button ${
            category === data.title ? "filters__button--active" : ""
          }`}
          key={data.id}
          onClick={() => filterHandler(data.title)}
        >
          {data.title}
        </button>
      ))}
    </div>
  );
};

export default Filter;
