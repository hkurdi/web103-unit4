import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewCars = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_MAIN_API_URL}/api/v1/items`);
                setItems(response.data);
            } catch (error) {
                console.error("Error fetching cars:", error);
            }
        };

        fetchItems();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            {items && items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item) => (
                        <div key={item.id} className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-4 text-white">{item.name}</h2>
                                <div className="space-y-2 text-gray-100">
                                    <p><span className="font-semibold">Color:</span> {item.color}</p>
                                    <p><span className="font-semibold">Engine:</span> {item.engine}</p>
                                    <p><span className="font-semibold">Package:</span> {item.package_type}</p>
                                    <p><span className="font-semibold">Wheels:</span> {item.wheels}</p>
                                    <p><span className="font-semibold">Interior:</span> {item.interior}</p>
                                </div>
                                <div className="mt-6">
                                    <Link
                                        to={`/customcars/${item.id}`}
                                        className="inline-block bg-white text-blue-600 font-bold py-2 px-4 rounded-full hover:bg-gray-200 transition duration-300"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                    <h3 className="text-xl font-semibold">No Cars Available</h3>
                    <p className="mt-2">Check back later for our amazing car selection!</p>
                </div>
            )}
        </div>
    );
};

export default ViewCars;