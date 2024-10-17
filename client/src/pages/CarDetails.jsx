import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CarDetails = () => {
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
                if (error.response && error.response.status === 409) {
                    console.error("Conflict: The requested item conflicts with the current state of the resource.");
                } else {
                    console.error("Failed to fetch the item with ID:", id);
                }
            }
        };

        fetchItemById();
    }, [id]);

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            await axios.delete(`/api/v1/items/${id}`);
            navigate("/");
        } catch (error) {
            console.error("Failed to delete the item:", error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold pb-12">Car Details</h1>
            <div className="bg-white shadow-md rounded-lg p-6 mb-40">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p className="text-gray-700"><span className="font-semibold">Name:</span> {item.name}</p>
                    <p className="text-gray-700"><span className="font-semibold">Color:</span> {item.color}</p>
                    <p className="text-gray-700"><span className="font-semibold">Engine:</span> {item.engine}</p>
                    <p className="text-gray-700"><span className="font-semibold">Package:</span> {item.package_type}</p>
                    <p className="text-gray-700"><span className="font-semibold">Wheels:</span> {item.wheels}</p>
                    <p className="text-gray-700"><span className="font-semibold">Interior:</span> {item.interior}</p>
                </div>
                <div className="mt-6 flex justify-between">
                    <Link 
                        to={`/edit/${id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Edit
                    </Link>
                    <button 
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;