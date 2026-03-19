'use client';
import { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import "./styles/_globals.scss";
import SearchButton from "./components/SearchButton";
import FilterButton from "./components/FilterButton";
import CountryCard from "./components/CountryCard";
import data from './data.json'; // Import your data

export default function Home() {
  const [countries, setCountries] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  // Filter countries based on search and region
  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion ? country.region === selectedRegion : true;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="container">
      <Navbar />
      <div className="controls">
        <SearchButton onSearch={setSearchQuery} />
        <FilterButton onFilterChange={setSelectedRegion} />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {filteredCountries.map((country) => (
          <CountryCard key={country.name} country={country} />
        ))}
      </div>
    </div>
  );
}