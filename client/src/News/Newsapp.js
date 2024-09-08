import React, { useEffect, useState } from 'react';
import Card from './Card';
import './style.css';

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState(null);

  const getData = async () => {
    const response = await fetch(`http://localhost:5000/api/news?q=${search}`);
    const jsonData = await response.json();
    setNewsData(jsonData);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const userInput = (event) => {
    setSearch(event.target.value);
    getData(); // Fetch data after setting the input
  };

  return (
    <div>
      <nav>
        <div>
          <h1>Be Safe</h1>
        </div>
        <ul style={{ display: "flex", gap: "11px" }}>
          <a style={{ fontWeight: 600, fontSize: "17px" }}>All News</a>
          <a style={{ fontWeight: 600, fontSize: "17px" }}>Trending</a>
        </ul>
        <div className="searchBar">
          <input type="text" placeholder="Search News" value={search} onChange={handleInput} />
          <button onClick={getData}>Search</button>
        </div>
      </nav>
      <div>
        <p className="head">Stay Updated with TrendyNews</p>
      </div>
      <div className="categoryBtn">
        <button onClick={userInput} value="Crime">Crime</button>
        <button onClick={userInput} value="Girls">Girls</button>
        <button onClick={userInput} value="Awareness">Awareness</button>
        <button onClick={userInput} value="Health">Health</button>
        <button onClick={userInput} value="Fitness">Fitness</button>
      </div>

      <div>
        {newsData ? <Card data={newsData} /> : null}
      </div>
    </div>
  );
};

export default Newsapp;
