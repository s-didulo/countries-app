import React from 'react';

export default function DisplayCountryDetails(prop) {
  let continentsTemp = prop.continents.map(continent=><li>{continent}</li>);
  let currencyTemp = prop.currencies.map(currency=>{
      return <li>{currency.name}({currency.symbol})</li>
    });

  if(prop.officialName !== '') {
    return (
      <div className="display-country-details">
        <h2>Country Details</h2>
        <div className="display-country-details__inner">
          <img src={prop.coatOfArms} width={80} alt="CoatOfArms"/>
          <div class="display-country-details__section">   
            <ul className="display-details-list">        
            <li><p>Official Name</p><p>{prop.officialName}</p></li>
            <li><p>Population</p><p>{prop.population.toLocaleString("en-US")}</p></li>
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
            <li><p>Capital</p><p>{prop.capital}</p></li>
            </ul>
          </div>
        </div>
      </div>
    )
  } else {
    return '';
  }

  
  } 