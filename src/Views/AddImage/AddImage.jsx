import React, { useState } from "react";
import "../AddImage/AddImage.css";

function AddImage() {
  const [imageFavourite, setImage] = useState(null);
  const [title, setTitulo] = useState("");
  const [images, setImages] = useState([]);
  // const inputFileRef = React.useRef();
  const [editingItem, setEditingItem] = useState(null);

  loadData();

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
    if (!title || !imageFavourite) {
      
      alert("Please, Enter the title and image.");
      return;
    }
     
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, imageFavourite: imageFavourite }),
    };
  
    try {
      const response = await fetch(
        "https://localhost:7093/Image/Post",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Error al agregar la imagen.");
      }
      const data = await response.json();
   
      setImages((prevImages) => {
        return [...prevImages, { id: data.id, title: title, imageFavourite: imageFavourite }];
      });
  
      alert("Image added successfully.");
      
      setImage(null);
      setTitulo("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function loadData() {
    try {
      const response = await fetch("https://localhost:7093/Image/Get");
      if (!response.ok) {
        throw new Error("Error al obtener los datos de las imágenes.");
      }
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error(error);
    }
  }
  

  const handleEdit = (item) => {
    setEditingItem(item);
    setTitulo(item.title);
    setImage(item.imageFavourite);
  };

  const handleEditImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditingItem({ ...editingItem, imageFavourite: reader.result });
    };

    reader.readAsDataURL(file);
  };

  const handleEditTitleChange = (event) => {
    setEditingItem({ ...editingItem, title: event.target.value });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    
    if (!editingItem.title.trim()) {
      alert("Please, Enter the title.");
      return;
    }
    if (editingItem) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      };

      try {
        const response = await fetch(
          `https://localhost:7093/Image/Put/${editingItem.id}`,
          requestOptions
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setImages(images.map((item) => (item.id === data.id ? data : item)));
        alert("Image edited successfully.");
        setTitulo("");
        setEditingItem(null);
        setImage("");

        loadData();
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // Aquí va tu código para agregar un nuevo elemento...
      setTitulo("");
      setImage("");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      try {
        const response = await fetch(`https://localhost:7093/Image/Delete/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Error al eliminar el elemento");
        }
        setImages(images.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      <div className="new-form-container">
        <form
          className="new-form flex-container"
          onSubmit={editingItem ? handleEditSubmit : handleSubmit}
        >
          <input
            type="text"
            value={editingItem ? editingItem.title : title}
            onChange={editingItem ? handleEditTitleChange : handleTitleChange}
            placeholder="Enter the title."
            className="new-form-control"
          />
          <input
            type="file"
            data-testid="file-upload"
            onChange={editingItem ? handleEditImageUpload : handleImageUpload}
            className="new-form-control"
          />

          <button type="submit" className="add">
            <img
              src="https://res.cloudinary.com/dipahj9kx/image/upload/v1699270532/Images/Icon/bqnumllslwvfhatihdxc.png"
              alt="Icon Add image"
            />
            <span>{editingItem ? "Edit Image" : "Add Image"}</span>
          </button>
        </form>

        {editingItem ? <img src={editingItem.imageFavourite} alt="" className="new-image" /> : <img src={imageFavourite} alt="" className="new-image" style={{ display: imageFavourite ? 'block' : 'none' }} />}


      </div>

      <div className="card-container">
        {images && images.map((item) => (
          <div key={item.id} className="card">
            <h1 className="card-title">{item.title}</h1>
            <img className="card-image" src={item.imageFavourite} alt={item.title} />
            <div className="buttonEditDelete">
              <button className="edit-btn" onClick={() => handleEdit(item)}>
                <img
                  src="https://res.cloudinary.com/dipahj9kx/image/upload/v1699270532/Images/Icon/pfzo4kvd53g3iigmzeqi.png"
                  alt="Icon Edit image"
                />
                <span>Edit</span>
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(item.id)}
              >
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
