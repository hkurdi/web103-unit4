import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CreateCar = () => {
  const [item, setItem] = useState({
    id: 0,
    name: "",
    color: "",
    engine: "",
    package_type: "",
    wheels: "",
    interior: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createItem = async (event) => {
    event.preventDefault();

    if (
      item.color.length == 0 ||
      item.engine.length == 0 ||
      item.wheels.length == 0 ||
      item.interior.length == 0 ||
      item.name.length == 0 ||
      item.package_type.length == 0
    ) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Please complete the form fully prior to submitting!"
        })
    } else {
      if (item.engine === "inline 4" && item.package_type === "Track package") {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "You cannot select track package with inline 4 engine!"
        })
        return;
      } else {
        try {
          await axios.post(`${import.meta.env.VITE_MAIN_API_URL}/api/v1/items`, item);
          window.location = "/";
        } catch (error) {
          console.error("Error creating the item:", error);
        }
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Create a Car</h2>
      <form className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            type="text"
            id="name"
            name="name"
            value={item.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
            Color
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            id="color"
            name="color"
            value={item.color}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="black">Black</option>
            <option value="white">White</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="engine">
            Engine
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            id="engine"
            name="engine"
            value={item.engine}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="inline 4">Inline 4</option>
            <option value="V6 turbo">V6 Turbo</option>
            <option value="V8 supercharger">V8 Supercharger</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="package_type">
            Package
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            id="package_type"
            name="package_type"
            value={item.package_type}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="base model">Base Model</option>
            <option value="Sport package">Sport Package</option>
            <option value="Track package">Track Package</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="wheels">
            Wheels
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            id="wheels"
            name="wheels"
            value={item.wheels}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="base wheels">Base Wheels</option>
            <option value="aluminum">Aluminum</option>
            <option value="carbon fiber">Carbon Fiber</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="interior">
            Interior
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            id="interior"
            name="interior"
            value={item.interior}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="base interior">Base Interior</option>
            <option value="leather">Leather</option>
            <option value="sport">Sport</option>
          </select>
        </div>
        <div className="flex items-center justify-center">
          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            value="Submit"
            onClick={createItem}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCar;