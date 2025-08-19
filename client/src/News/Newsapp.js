import React, { useEffect, useState } from 'react';
import Card from './Card';
import './style.css';

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/news?q=${search}`);
      const jsonData = await response.json();
      setNewsData(jsonData);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    getData(); // Fetch news data on component mount
  }, []);

  const handleInput = (e) => {
    setSearch(e.target.value); // Update search term based on input
  };

  const handleSearch = () => {
    getData(); // Fetch news data based on search term
  };

  const handleCategoryClick = (event) => {
    setSearch(event.target.value); // Update search term based on category click
    getData(); // Fetch news data based on category
  };

  return (
    <div className="container">
      <nav>
        <div className="logo">
          <h1>Be Safe</h1>
        </div>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search News"
            value={search}
            onChange={handleInput} // Update search term on input change
          />
          <button onClick={handleSearch}>Search</button> {/* Trigger search on button click */}
        </div>
      </nav>
      <div>
        <p className="head">Stay Updated with TrendyNews</p>
      </div>
      <div className="categoryBtn">
        <button onClick={handleCategoryClick} value="Crime">Crime</button>
        <button onClick={handleCategoryClick} value="Girls">Girls</button>
        <button onClick={handleCategoryClick} value="Awareness">Awareness</button>
        <button onClick={handleCategoryClick} value="Health">Health</button>
        <button onClick={handleCategoryClick} value="Fitness">Fitness</button>
      </div>
      <div>
        {newsData ? <Card data={newsData} /> : <p>No news data available</p>}
      </div>
    </div>
  );
};

export default Newsapp;
