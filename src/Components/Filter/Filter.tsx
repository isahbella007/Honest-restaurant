import "./Filter.css";
const Filter = (props: FilterOptionProps) => {

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onSortChange(e.target.value);
  };

  const handleDietChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onDietChange(e.target.value);
  };

  const hideBudgetRange = () => {
    const minBudgetInput = document.getElementById(
      "min-budget"
    ) as HTMLInputElement;
    const maxBudgetInput = document.getElementById(
      "max-budget"
    ) as HTMLInputElement;

    if (minBudgetInput && maxBudgetInput) {
      minBudgetInput.disabled = true;
      maxBudgetInput.disabled = true;
    }
  };

  const showBudgetRange = () => {
    const minBudgetInput = document.getElementById(
      "min-budget"
    ) as HTMLInputElement;
    const maxBudgetInput = document.getElementById(
      "max-budget"
    ) as HTMLInputElement;

    if (minBudgetInput && maxBudgetInput) {
      minBudgetInput.disabled = false;
      maxBudgetInput.disabled = false;
    }
  };

  return (
    <>
      <div className="main-filter-container">
        <div className="filter-container">
          <div className="sort-by">
            <select onChange={handleSortChange}>
              <option value="">Sort by</option>
              <option value="name">Name</option>
              <option value="price-dec">Price(Low to High)</option>
              <option value="price-asc">Price(High to Low)</option>
            </select>
          </div>

          <div className="sort-diet">
            <select onChange={handleDietChange}>
              <option value="">Diet Preference</option>
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
            </select>
          </div>

          <div className="budget">
            <h3>Budget Range:</h3>
            <input
              id="min-budget"
              onChange={(e) => {
                props.onMinBudgetChange(e.target.value);
              }}
              placeholder="minimum budget"
              type="number"
            ></input>
            <p>to</p>
            <input
              id="max-budget"
              onChange={(e) => {
                props.onMaxBudgetChange(e.target.value);
              }}
              placeholder="maximum budget"
              type="number"
            ></input>
          </div>

          <div
            className="feeling-lucky"
            onMouseEnter={hideBudgetRange}
            onMouseLeave={showBudgetRange}
          >
            <h3>Get a random meal:</h3>
            <input
              onChange={props.onInputChange}
              placeholder="Enter a price"
            ></input>
          </div>
        </div>
      </div>
    </>
  );
};
export default Filter;
