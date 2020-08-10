import React, { useState, useEffect } from 'react';

import { MenuItem, FormControl, Select, Card, CardContent} from "@material-ui/core";
import './App.css';
import InfoBox from './components/InfoBox';
import Map from './components/Map';

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
    
        <div className = "app__left">
        {/* {HEADER} */}
        {/* {Title + Select input dropdown field} */}
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
          
            <div className = "app__stats">
                {/* InfoBoxs title = "coronavirus cases*/}
                <InfoBox title = "Coronavirus Cases" cases = {2000} total = {2000}/>
                {/* InfoBoxs title = "coronavirus recoveries*/}
                <InfoBox title = "Recovered" cases = {2000} total = {12000}/>
                {/* InfoBoxs title*/}
                <InfoBox title = "Deaths" cases = {2000} total = {232}/>

            </div>
          
          
            {/* Map */}
            <Map></Map>
        </div>
        <Card className = "app__right">
            {/* Table */}
            <CardContent>
              <h3>Live Cases by Country</h3>
            </CardContent>
            {/* Graph */}
            <CardContent>
              <h3>Worldwide new Cases</h3>
            </CardContent>
        </Card>

    </div>
  );
}

export default App;
