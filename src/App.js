import React, { useState, useEffect } from 'react';

import { MenuItem, FormControl, Select, Card, CardContent} from "@material-ui/core";
import './App.css';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import LineGraph from './components/LineGraph';
import { sortData, prettyPrint } from './util.js';
import "leaflet/dist/leaflet.css";

function App() {

  const [countries,setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  //const [mapCenter,setMapCenter] = useState({lat:54.5260, lng:15.2551})
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);;
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  //STATE in short is way to write a variable in REACT
  // USEEFFECT = runs a piece of code based on a given condition - a powerful hook in react

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });
  }, []);

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
          const sortedData = sortData(data); 
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries); 
            });
          };
          getCountriesData();
        }, []);
   
  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    console.log(countryCode);
    setCountry(countryCode);
    
    const url = countryCode === 'worldwide'  
    ?'https://disease.sh/v3/covid-19/countries' 
    :`https://disease.sh/v3/covid-19/countries/${countryCode}`

    fetch(url)
    .then(response => response.json())
    .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat,data.countryInfo.long])
    })
    // for worldwide data
    //  https://disease.sh/v3/covid-19/countries
    // for country specific data
    //  https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE] 

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
                <InfoBox onClick={(e) => setCasesType("cases")} title = "New Cases Today" cases = {prettyPrint(countryInfo.todayCases)} total = {prettyPrint(countryInfo.cases)}/>
                {/* InfoBoxs title = "coronavirus recoveries*/}
                <InfoBox onClick={(e) => setCasesType("recovered")} title = "New Recovered Today" cases = {prettyPrint(countryInfo.todayRecovered)} total = {prettyPrint(countryInfo.recovered)}/>
                {/* InfoBoxs title*/}
                <InfoBox onClick={(e) => setCasesType("deaths")} title = "New Deaths Today" cases = {prettyPrint(countryInfo.todayDeaths)} total = {prettyPrint(countryInfo.deaths)}/>

            </div>
        
            {/* Map */}
            <Map
            casesType = {casesType}
            countries = {mapCountries}
            center = {mapCenter}
            zoom = {mapZoom}
            />    
        </div>

        <Card className = "app__right">
            {/* Table */}
            <CardContent>
              <h3>Live Cases by Country</h3>
              <Table countries= {tableData} />
            </CardContent>
            {/* Graph */}
            <CardContent>
              <h3>Worldwide new Cases</h3>
              <LineGraph />
            </CardContent>
        </Card>

    </div>
  );
}

export default App;
