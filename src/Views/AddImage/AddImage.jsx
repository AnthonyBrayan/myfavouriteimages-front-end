import React, { useEffect, useState } from "react";
import '../AddImage/AddImage.css'

function AddImage() {
 const [Image, setImage] = useState(null);
 const [titulo, setTitulo] = useState('');
 const [images, setImages] = useState([]);

 useEffect(() => {
   fetch('../../CardImage.json')
     .then((response) => response.json())
     .then((data) => setImages(data.image));
 }, []);
 

 const handleImageUpload = (event) => {
   const file = event.target.files[0];
   const reader = new FileReader();

   reader.onloadend = () => {
     setImage(reader.result);
   };

   reader.readAsDataURL(file);
 };

 const handleTitleChange = (event) => {
   setTitulo(event.target.value);
 };

 const handleSubmit = async (event) => {
  event.preventDefault();
  if (!titulo || !Image) {
    alert('Please, Enter the title and image.');
    return;
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo: titulo, Image: Image })
  };
 
  try {
    const response = await fetch('http://localhost:3000/image', requestOptions);
    const data = await response.json();
    setImages(prevImages => [...prevImages, { id: data.id, titulo: titulo, Image: Image }]);
  } catch (error) {
    console.error('Error:', error);
  }
  
};

return (
  <div>
    <div className="new-form-container">
      <form className="new-form flex-container" onSubmit={handleSubmit}>
        <input type="text" value={titulo} onChange={handleTitleChange} placeholder="Enter the title." className="new-form-control" />
        <input type="file" onChange={handleImageUpload} className="new-form-control" />
        <button type="submit" className="new-btn-dark">Add Image</button>
      </form>
      {Image && <img src={Image} alt="Imagen subida" className="new-image" />}
    </div>

    <div className="card-container">
      {images.map((item) => (
        <div key={item.id} className="card">
          <h1 className="card-title">{item.titulo}</h1>
          <img className="card-image" src={item.Image} alt={item.titulo} />
          <button className="edit-btn">Edit</button>
          <button className="delete-btn">Delete</button>
        </div>
      ))}
    </div>
  </div>
);



  
}

export default AddImage;

