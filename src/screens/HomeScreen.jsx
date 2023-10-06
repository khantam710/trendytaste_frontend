import React, { useState, useEffect } from "react";
import Pizza from "../components/Pizza";
import { getPizzas } from "../redux/actions/PizzaAction";
import { useDispatch, useSelector } from "react-redux";
import ErrorComponent from "../components/ErrorComponent";
import Loader from "../components/LoaderComponent";
import { searchPizza } from "../redux/reducers/PizzaReducer";

const HomeScreen = () => {
  const { pizzas, loading, error, searchDataState } = useSelector(
    (state) => state.pizzas
  );
  const dispatch = useDispatch();
  const [radioData, setRadioData] = useState("");
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    dispatch(getPizzas());
  }, []);

  useEffect(() => {
    dispatch(searchPizza(searchData));
  }, [searchData, dispatch]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mb-4">
            <form className="d-flex">
              <input
                type="search"
                className="form-control"
                placeholder="Search Delicious Pizzas and Burgers"
                aria-label="Search"
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
              />
            </form>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="d-flex align-items-center justify-content-between">
              <span className="me-3">Category :</span>
              <div className="form-check form-check-inline">
                <input
                  checked={radioData === ""}
                  value=""
                  className="form-check-input"
                  type="radio"
                  name="category"
                  onChange={(e) => setRadioData(e.target.value)}
                />
                <label className="form-check-label">All</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  checked={radioData === "VEG"}
                  value="VEG"
                  className="form-check-input"
                  type="radio"
                  name="category"
                  onChange={(e) => setRadioData(e.target.value)}
                />
                <label className="form-check-label">VEG</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  checked={radioData === "NON-VEG"}
                  value="NON-VEG"
                  className="form-check-input"
                  type="radio"
                  name="category"
                  onChange={(e) => setRadioData(e.target.value)}
                />
                <label className="form-check-label">NON-VEG</label>
              </div>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorComponent error="Something went wrong" />
          ) : (
            pizzas.data &&
            pizzas.data
              .filter((e) => {
                if (searchDataState === 0) {
                  return e;
                } else {
                  return e.name
                    .toLowerCase()
                    .includes(searchDataState.toLowerCase());
                }
              })
              .filter((e) => {
                if (radioData === "") {
                  return true;
                } else if (radioData === "VEG") {
                  return e.category.toLowerCase() === "veg";
                } else if (radioData === "NON-VEG") {
                  return e.category.toLowerCase() === "non-veg";
                }
                return false;
              })
              .map((val, index) => (
                <div
                  className="col-md-6 col-sm-6 col-lg-4 mb-4 animate__animated animate__zoomIn"
                  key={index}
                >
                  <div>
                    <Pizza val={val} />
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
