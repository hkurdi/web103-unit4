import React, { useState, useEffect } from "react";
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

  const [totalPrice, setTotalPrice] = useState(20000); // Set the base price as initial state

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [item]);

  const calculateTotalPrice = () => {
    let price = 20000;

    if (item.color === "red") price += 500;
    else if (item.color === "blue") price += 300;
    else if (item.color === "black") price += 200;

    if (item.engine === "V6 turbo") price += 3000;
    else if (item.engine === "V8 supercharger") price += 5000;

    if (item.package_type === "Sport package") price += 2000;
    else if (item.package_type === "Track package") price += 4000;

    if (item.wheels === "aluminum") price += 1000;
    else if (item.wheels === "carbon fiber") price += 2000;

    if (item.interior === "leather") price += 1500;
    else if (item.interior === "sport") price += 2000;

    setTotalPrice(price);
  };

  const createItem = async (event) => {
    event.preventDefault();

    if (
      !item.color ||
      !item.engine ||
      !item.wheels ||
      !item.interior ||
      !item.name ||
      !item.package_type
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please complete the form fully prior to submitting!",
      });
    } else {
      if (item.engine === "inline 4" && item.package_type === "Track package") {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "You cannot select track package with inline 4 engine!",
        });
        return;
      } else {
        try {
          await axios.post(
            `${import.meta.env.VITE_MAIN_API_URL}/api/v1/items`,
            {
              ...item,
              price: totalPrice,
            }
          );
          window.location = "/";
        } catch (error) {
          console.error("Error creating the item:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "There was a problem creating the item.",
          });
        }
      }
    }
  };

  const Car = () => (
    <svg width="300" height="200" viewBox="0 0 300 200">
      <rect
        x="50"
        y="80"
        width="200"
        height="80"
        rx="20"
        ry="20"
        fill={item.color || "grey"}
      />

      <circle
        cx="90"
        cy="160"
        r="30"
        fill={
          item.wheels === "carbon fiber"
            ? "#333"
            : item.wheels === "aluminum"
            ? "#888"
            : "#555"
        }
      />
      <circle
        cx="210"
        cy="160"
        r="30"
        fill={
          item.wheels === "carbon fiber"
            ? "#333"
            : item.wheels === "aluminum"
            ? "#888"
            : "#555"
        }
      />

      <rect
        x="70"
        y="90"
        width="160"
        height="40"
        rx="10"
        ry="10"
        fill="#87CEEB"
      />

      <circle cx="60" cy="110" r="10" fill="yellow" />
      <circle cx="240" cy="110" r="10" fill="yellow" />

      <text x="150" y="50" textAnchor="middle" fill="black" fontSize="14">
        {item.engine || "Select Engine"}
      </text>

      <text x="150" y="190" textAnchor="middle" fill="black" fontSize="14">
        {item.package_type || "Select Package"}
      </text>
    </svg>
  );

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col pb-7">
        <h2 className="text-4xl font-bold text-center text-white drop-shadow-md">
          Create Your Car
        </h2>
      </div>
      <div className="flex flex-wrap justify-center space-x-8">
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg mb-8">
          <form onSubmit={createItem}>
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
            <div className="flex justify-center">
              <button
                className="bg-blue-600 text-white font-semibold py-3 px-6 rounded hover:bg-blue-700 transition duration-300"
                type="submit"
              >
                Create Car
              </button>
            </div>
          </form>
        </div>
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Car Preview
          </h3>
          <div className="mb-6 flex justify-center">
            <Car />
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-700 mb-2">
              Total Price
            </p>
            <p className="text-3xl font-bold text-blue-600">${totalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCar;
