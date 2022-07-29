import React from 'react';

export default function DisplayCountryDetails(prop) {
  let continentsTemp = prop.continents.map(continent=><li key={continent}>{continent}</li>);
  let currencyTemp = prop.currencies.map(currency=>{
      return <li key={currency.name}>{currency.name}({currency.symbol})</li>
    });

  if(prop.officialName !== '') {
    return (
      <div className="display-country-details">
        <h2>Country Details</h2>
        <div className="display-country-details__inner">
          <img src={prop.coatOfArms} width={80} alt="CoatOfArms"/>
          <div className="display-country-details__section">   
            <ul className="display-details-list">        
            <li key={prop.officialName}><p>Official Name</p><p>{prop.officialName}</p></li>
            <li key={prop.population.toLocaleString("en-US")}><p>Population</p><p>{prop.population.toLocaleString("en-US")}</p></li>
            <li>
              <p>Continents</p>
              <ul>
                {continentsTemp}
              </ul>
            </li>
            <li>
              <p>Currency</p>
              <ul>
                {currencyTemp}
              </ul>
            </li>
            <li key={prop.capital}><p>Capital</p><p>{prop.capital}</p></li>
            </ul>
          </div>
        </div>
      </div>
    )
  } else {
    return '';
  }

  
  } 