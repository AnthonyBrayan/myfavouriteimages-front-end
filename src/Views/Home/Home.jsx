import React, { useEffect, useState } from "react";
import '../Home/Home.css'

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("../../CardImage.json")
      .then((response) => response.json())
      .then((data) => setData(data.image)); 
  }, []);

  return (
    <div className="card-container">
      {data && data.map((item, index) => (
        <div key={index} className="card">
          <h1 className="card-title">{item.titulo}</h1>
          <img className="card-image" src={item.Image} alt={item.titulo} />
        </div>
      ))}
    </div>
  );
}

export default Home;