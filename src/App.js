import React, {useState, useEffect} from 'react';
import DisplayCountry from './DisplayCountry';
import DisplayCountryDetails from './DisplayCountryDetails';

export default function App() {

  let [countries, setCountries] = useState([]);
  let [countryName, setCountryName] = useState('');
  let [officialName, setOfficialName] = useState('');
  let [population, setPopulation] = useState('');
  let [continents, setContinents] = useState([]);
  let [currencies, setCurrencies] = useState([]);
  let [capital, setCapital] = useState('');
  let [flag, setFlag] = useState('');
  let [coatOfArms, setCoatOfArms] = useState('');
  let [pageNum, setPageNum] = useState(1);
  let allCountries;
  let countryCurrency;
  let pageNumberCount;

  let currentPageNumber;
  let pageNumbers = [];
  let allPageNumbers = [];

  let [displayedCountriesInPageNumber,setDisplayedCountriesInPageNumber] = useState([]);
  let displayedCountries;
  let displayedCountriesTemp;
  let currentCountry;
  let currentPage;

  const getAllCountries = () => {
    fetch("https://restcountries.com/v3.1/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(result=>result.json())
    .then(result=>{
      allCountries = result.map((item)=>{
        return item.name.common;
      });
      allCountries.sort();
      setCountries(allCountries);
      console.log('finished fetching countries');
      console.log('after fetching - countries val', countries); 
    })
  }
  const displayPagedCountries = () => {
    console.log(countries);
     console.log('countries', countries);
     console.log('pageNum', pageNum);
     displayedCountries = [];
      for(let i = (pageNum - 1) * 20; i < ((pageNum - 1)* 20) + 20; i++){
        displayedCountries.push(countries[i]);
      }
      displayedCountriesTemp = displayedCountries.map((country)=>{
        if(country == countryName){
          currentCountry = 'selection currentCountry'
        } else {
          currentCountry = '';
        }
        return (
          <li><a className = {currentCountry} href="" onClick={(e)=>{getCountryDetails(e,country)}}>{country}</a></li>
        )
      })
      setDisplayedCountriesInPageNumber(displayedCountriesTemp);
      // console.log('displayPagedCountries', displayedCountriesInPageNumber);
      return displayedCountriesInPageNumber;
    } 

  const getCountryDetails = (e,country) => {
    e.preventDefault();
    fetch(`https://restcountries.com/v3.1/name/${country}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(result=>result.json())
    .then(result=>{
      setCountryName(result[0].name.common);
      setOfficialName(result[0].name.official);
      setCapital(result[0].capital);
      setFlag(result[0].flags.png);
      setPopulation(result[0].population);
      setContinents(result[0].continents.map((elem)=>{
        return elem;
      }));
      if(result[0].coatOfArms.png != undefined){
        setCoatOfArms(result[0].coatOfArms.png);
      } else {
        setCoatOfArms('https://dummyimage.com/80x74/f759d5/26535e.png&text=Coat+Of+Arms');
      }
      setCurrencies(Object.values(result[0].currencies));
    })
  }
  
  const displayPageNumbers = () => {
    pageNumberCount = Math.ceil(countries.length) / 20;
    for(let i = 0; i < pageNumberCount; i++){
      pageNumbers.push(i+1);
    }
    
    allPageNumbers = pageNumbers.map((number)=> {
      if(number == pageNum) {
        currentPage = 'selection';
      } else {
        currentPage = '';
      }
      return (
        <a className = {currentPage} href="#" onClick={(e)=>{changePageNum(e,number)}}>{number}</a>
      );
    })
    return allPageNumbers;
  }

  const changePageNum = (e, number) => {
    e.preventDefault();
    setPageNum(number);
  }
  
  useEffect(()=>{
      getAllCountries();
      displayPagedCountries();
  }, [pageNum, countries]);

  return (
    <div className="App">
      <div className="countryList"> 
        <div className="countryList-inner">
          <h2>Countries List</h2> 
          <ul>
            {displayedCountriesInPageNumber}
          </ul>
        </div> 
        <div className="pageNumbers">{displayPageNumbers()}</div>      
      </div>
      <div className="countryDetails">
        <DisplayCountry name={countryName}  flag={flag}/>
        <DisplayCountryDetails officialName={officialName} population={population} continents={continents} capital={capital} currencies={currencies} coatOfArms={coatOfArms}/>
      </div> 
    </div>
  );
}
