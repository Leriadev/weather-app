import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../api";

function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null);

  const onHandleChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?sort=population&minPopulation=100000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
            options: response.data.map((city) => {
                return {
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
                }
            })
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <AsyncPaginate
        value={search}
        placeholder="City search.."
        debounceTimeout={1000}
        onChange={onHandleChange}
        loadOptions={loadOptions}
      />
    </div>
  );
}

export default Search;
