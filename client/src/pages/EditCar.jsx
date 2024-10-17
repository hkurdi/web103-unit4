import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({
    id: 0,
    name: "",
    color: "",
    engine: "",
    package_type: "",
    wheels: "",
    interior: "",
  });

  useEffect(() => {
    const fetchItemById = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_API_URL}/api/v1/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching the item:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was a problem fetching the car details.",
        });
      }
    };

    fetchItemById();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateItem = async (event) => {
    event.preventDefault();

    if (item.engine === "inline 4" && item.package_type === "Track package") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "You cannot select track package with inline 4 engine!",
      });
      return;
    } else {
      try {
        await axios.patch(`${import.meta.env.VITE_MAIN_API_URL}/api/v1/items/${id}`, item);
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Car details have been successfully updated.",
        });
        navigate("/");
      } catch (error) {
        console.error("Error updating the item:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was a problem updating the car details.",
        });
      }
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${import.meta.env.VITE_MAIN_API_URL}/api/v1/items/${id}`);
          Swal.fire("Deleted!", "The car has been deleted.", "success");
          navigate("/");
        } catch (error) {
          console.error("Error deleting the item:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "There was a problem deleting the car.",
          });
        }
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col pb-7">
        <h2 className="text-4xl font-bold text-center text-white drop-shadow-md">
          Edit Your Car
        </h2>
      </div>
      <div className="w-full lg:w-1/2 mx-auto bg-white p-6 rounded-lg shadow-lg mb-8">
        <form onSubmit={updateItem}>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="name"
            >
              Car Name
            </label>
            <input
              className="w-full border border-gray-300 p-3 rounded focus:ring focus:ring-blue-200 focus:outline-none"
              required
              type="text"
              id="name"
              name="name"
              value={item.name}
              onChange={handleChange}
              placeholder="Enter car name"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="color"
            >
              Color
            </label>
            <select
              className="w-full border border-gray-300 p-3 rounded focus:ring focus:ring-blue-200 focus:outline-none"
              required
              id="color"
              name="color"
              value={item.color}
              onChange={handleChange}
            >
              <option value="">Select color</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="black">Black</option>
              <option value="white">White</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="engine"
            >
              Engine
            </label>
            <select
              className="w-full border border-gray-300 p-3 rounded focus:ring focus:ring-blue-200 focus:outline-none"
              required
              id="engine"
              name="engine"
              value={item.engine}
              onChange={handleChange}
            >
              <option value="">Select engine</option>
              <option value="inline 4">Inline 4</option>
              <option value="V6 turbo">V6 Turbo</option>
              <option value="V8 supercharger">V8 Supercharger</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="package_type"
            >
              Package Type
            </label>
            <select
              className="w-full border border-gray-300 p-3 rounded focus:ring focus:ring-blue-200 focus:outline-none"
              required
              id="package_type"
              name="package_type"
              value={item.package_type}
              onChange={handleChange}
            >
              <option value="">Select package</option>
              <option value="base model">Base Model</option>
              <option value="Sport package">Sport Package</option>
              <option value="Track package">Track Package</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="wheels"
            >
              Wheels
            </label>
            <select
              className="w-full border border-gray-300 p-3 rounded focus:ring focus:ring-blue-200 focus:outline-none"
              required
              id="wheels"
              name="wheels"
              value={item.wheels}
              onChange={handleChange}
            >
              <option value="">Select wheels</option>
              <option value="base wheels">Base Wheels</option>
              <option value="aluminum">Aluminum</option>
              <option value="carbon fiber">Carbon Fiber</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="interior"
            >
              Interior
            </label>
            <select
              className="w-full border border-gray-300 p-3 rounded focus:ring focus:ring-blue-200 focus:outline-none"
              required
              id="interior"
              name="interior"
              value={item.interior}
              onChange={handleChange}
            >
              <option value="">Select interior</option>
              <option value="base interior">Base Interior</option>
              <option value="leather">Leather</option>
              <option value="sport">Sport</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 text-white font-semibold py-3 px-6 rounded hover:bg-blue-700 transition duration-300"
              type="submit"
            >
              Update
            </button>
            <button
              className="bg-red-600 text-white font-semibold py-3 px-6 rounded hover:bg-red-700 transition duration-300"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCar;
