import React, { useEffect, useState } from "react";
import "../AddImage/AddImage.css";

function AddImage() {
  const [Image, setImage] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("../../CardImage.json")
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
      alert("Please, Enter the title and image.");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo: titulo, Image: Image }),
    };

    try {
      const response = await fetch(
        "http://localhost:3000/image",
        requestOptions
      );
      const data = await response.json();
      setImages((prevImages) => [
        ...prevImages,
        { id: data.id, titulo: titulo, Image: Image },
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="new-form-container">
        <form className="new-form flex-container" onSubmit={handleSubmit}>
          <input
            type="text"
            value={titulo}
            onChange={handleTitleChange}
            placeholder="Enter the title."
            className="new-form-control"
          />
          <input
            type="file"
            onChange={handleImageUpload}
            className="new-form-control"
          />
          <button type="submit" className="add">
            <img
              src="https://res.cloudinary.com/dipahj9kx/image/upload/v1699270532/Images/Icon/bqnumllslwvfhatihdxc.png"
              alt="Icon Add image"
            />
            <span>Add Image</span>
          </button>
        </form>
        {Image && <img src={Image} alt="Imagen subida" className="new-image" />}
      </div>

      <div className="card-container">
        {images.map((item) => (
          <div key={item.id} className="card">
            <h1 className="card-title">{item.titulo}</h1>
            <img className="card-image" src={item.Image} alt={item.titulo} />
            <div className="buttonEditDelete">
              <button className="edit-btn">
                <img
                  src="https://res.cloudinary.com/dipahj9kx/image/upload/v1699270532/Images/Icon/pfzo4kvd53g3iigmzeqi.png"
                  alt="Icon Edit image"
                />
                <span>Edit</span>
              </button>
              <button className="delete-btn">
                <img
                  src="https://res.cloudinary.com/dipahj9kx/image/upload/v1699270532/Images/Icon/pvwelwgkwofcons9epfw.png"
                  alt="Icon delete image"
                />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddImage;
