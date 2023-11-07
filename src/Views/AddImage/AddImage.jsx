import React, { useEffect, useState } from "react";
import "../AddImage/AddImage.css";

function AddImage() {
  const [Image, setImage] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [images, setImages] = useState([]);
  // const inputFileRef = React.useRef();
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {

    fetch("http://localhost:3000/image")
      .then((response) => response.json())
      .then((data) => {

        setImages(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos de las imágenes:", error);
      });
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
      setImages((prevImages) => {
        if (Array.isArray(prevImages)) {
          return [...prevImages, { id: data.id, titulo: titulo, Image: Image }];
        } else {
          // Si prevImages no es una matriz, inicializa una nueva matriz con el nuevo elemento.
          return [{ id: data.id, titulo: titulo, Image: Image }];
        }
      });

      alert("Image added successfully.");
      
      setImage(null);
      setTitulo("");
      // inputFileRef.current.value = null;
  
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setTitulo(item.titulo);
    setImage(item.Image);
  };

  const handleEditImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditingItem({ ...editingItem, Image: reader.result });
    };

    reader.readAsDataURL(file);
  };

  const handleEditTitleChange = (event) => {
    setEditingItem({ ...editingItem, titulo: event.target.value });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    
    if (!editingItem.titulo.trim()) {
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
          `http://localhost:3000/image/${editingItem.id}`,
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
        const response = await fetch(`http://localhost:3000/image/${id}`, {
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
            value={editingItem ? editingItem.titulo : titulo}
            onChange={editingItem ? handleEditTitleChange : handleTitleChange}
            placeholder="Enter the title."
            className="new-form-control"
          />
          <input
            type="file"
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

        {editingItem ? <img src={editingItem.Image} alt="" className="new-image" /> : <img src={Image} alt="" className="new-image" style={{ display: Image ? 'block' : 'none' }} />}


      </div>

      <div className="card-container">
        {images && images.map((item) => (
          <div key={item.id} className="card">
            <h1 className="card-title">{item.titulo}</h1>
            <img className="card-image" src={item.Image} alt={item.titulo} />
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
