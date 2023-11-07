import React, { useEffect, useState } from "react";
import '../Home/Home.css'

function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/image")
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no tuvo éxito");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar datos:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
