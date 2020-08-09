import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import './App.css';

function App() {

  const [countries,setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  
  //STATE in short is way to write a variable in REACT
  // USEEFFECT = runs a piece of code based on a given condition - a powerful hook in react

  useEffect(() => {
    // the code inside here will run once when comonent loads and not again
    // async -> send a req, wait for it, do something with response

    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2 
          }));
          setCountries(countries); 
            });
          };
          getCountriesData();
        }, []);
   
  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    console.log(countryCode);
    setCountry(countryCode);
  }

  return (
    <div className="app">

    {/* {HEADER} */}
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        {/* BEM naming convention: app__element */}
        <FormControl className="app__dropdown">
          <Select variant = "outlined" value = {country} onChange ={onCountryChange}>
            <MenuItem value = "worldwide">Worldwide</MenuItem>
            {/* Loop through all the countries and show a drop down list of the options */}
            {
              countries.map((country) =>(
                <MenuItem value = {country.value}> {country.name} </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
      
      {/* {Title + Select input dropdown field} */}

      {/* InfoBoxs */}
      {/* InfoBoxs */}
      {/* InfoBoxs */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}

    </div>
  );
}

export default App;
