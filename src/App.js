import "./App.css";
import { useState, useEffect } from "react";

// const CountryCard = ({ name, flagImg, flagAltText }) => {
//   return (
//     <div className="box">
//       <img
//         src={flagImg}
//         alt={"flag of " + flagAltText}
//         style={{ width: "100px", height: "100px" }}
//       />
//       <h2>{name}</h2>
//     </div>
//   );
// };

function App() {
  // const APIurl = " https://restcountries.com/v3.1/all";
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data); // Initial display of all countries
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
    // fetch(APIurl)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setCountries(data);
    //   })
    //   .catch((error) => console.error("Error fetching data: ", error.message));
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if(term===""){
      setFilteredCountries(countries)
    }else{
      const filtered = countries.filter((country)=>(
        country.name.common.toLowerCase().includes(term)
      ))
      setFilteredCountries(filtered)
    }
  };

  return (
    <div className="App">
      <div className="navbar">
        <input
          className="search"
          type="text"
          placeholder="Search for countries"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="countries-container">
        {/* {countries.map((country) => (
          <CountryCard
            key={country.tld}
            name={country.name.common}
            flagImg={country.flags.png}
          />
        ))} */}

        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div className="countryCard" key={country.cca3}>
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                className="country-flag"
              />
              <p className="country-name">{country.name.common}</p>
            </div>
          ))
        ) : (
          <p>No countries found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
