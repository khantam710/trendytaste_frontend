import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPizza } from "../redux/reducers/PizzaReducer";

const SearchComponent = () => {
  const [searchData, setSearchData] = useState("");
  const dispatch = useDispatch();

  const pizzas = useSelector((state) => state.pizzas.pizzas);
  console.log(pizzas)

  const [radioData, setRadioData] = useState("");

  useEffect(() => {
    dispatch(searchPizza(searchData));
    // console.log(searchData);
  }, [searchData, dispatch]);
  return (
    <div className="container">
      <div className="row shadow p-md-2 p-sm-2 mb-4 bg-body rounded ms-2 me-2">
        <div className="col-lg-8">
          <form className="d-flex w-50" role="search">
            <input
              type="search"
              className="form-control me-2"
              placeholder="Search Delicious Pizzas"
              aria-label="Search"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
          </form>
        </div>

        <div className="col-lg-4 d-flex">
            <span className="me-3">Category :</span>
            <div className="form-check">
              <input
                checked={radioData === ""}
                value=""
                className="form-check-input"
                required
                type="radio"
                name="category"
                onChange={(e) => setRadioData(e.target.value)}
              />
              <label className="form-check-label">All</label>
            </div>

            <div className="form-check">
              <input
                checked={radioData === "VEG"}
                value="VEG"
                className="form-check-input"
                required
                type="radio"
                name="category"
                onChange={(e) => setRadioData(e.target.value)}
              />
              <label className="form-check-label">VEG</label>
            </div>

            <div className="form-check">
              <input
                checked={radioData === "NON-VEG"}
                value="NON-VEG"
                className="form-check-input"
                required
                type="radio"
                name="category"
                onChange={(e) => setRadioData(e.target.value)}
              />
              <label className="form-check-label">NON-VEG</label>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
