import React from 'react';

export default function DisplayCountry(prop) {
  if(prop.name !== ''){
    return (
      <div className="display-country">
        <div className="country-name-flag">
          <h2>Country</h2>
          <img className="flag" src={prop.flag} alt="flag" width={320}/>
          <h3>{prop.name}</h3>
        </div>
        <div className="country-description">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu</p>
        </div>
        
      </div>
    )
  } else {
    return '';
  }
  
  
  } 