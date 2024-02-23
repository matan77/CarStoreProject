import React, { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../utils/api';

export default function CarRegistrationPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        company: '',
        model: '',
        year: '',
        price: '',
        mileage: '',
        transmissionType: 'Automatic',
        fuelType: 'Gasoline',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        api.post('/api/cars/', formData)
            .then((res) => {
                router.push('/myCars'); 
            })
            .catch((error) => {
                console.log(error);
                if (error.response.data.message) {
                    setErrors({ message: error.response.data.message });

                }
                else {
                    const resErrors = error.response.data.errors;
                    console.log(resErrors);
                    setErrors(Object.fromEntries(resErrors.map(error => [error.path, error.msg])))
                }

            });
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Add a Car</h2>
                {errors.message && (
                    <p className="bg-red-300 border-red-500 border-4 text-center p-4 rounded-md text-red-950 text-xl mt-1">
                        {errors.message}
                    </p>
                )}
            </div>



            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>

                    <div className="flex flex-wrap -mx-2">
                        <div className='me-3'>
                            <label htmlFor="company" className="block text-sm font-medium leading-6 text-gray-900">
                                Company
                            </label>
                            <div className="mt-2">
                                <input
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                />
                                {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900">
                                Model
                            </label>
                            <div className="mt-2">
                                <input
                                    id="model"
                                    name="model"
                                    value={formData.model}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                />
                                {errors.model && <p className="text-red-500 text-xs mt-1">{errors.model}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-2">
                        <div className='me-3'>
                            <label htmlFor="year" className="block text-sm font-medium leading-6 text-gray-900">
                                Year
                            </label>
                            <div className="mt-2">
                                <input
                                    id="year"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                />
                                {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                Price
                            </label>
                            <div className="mt-2">
                                <input
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                />
                                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="mileage" className="block text-sm font-medium leading-6 text-gray-900">
                            Mileage
                        </label>
                        <div className="mt-2">
                            <input
                                id="mileage"
                                name="mileage"
                                value={formData.mileage}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                            />
                            {errors.mileage && <p className="text-red-500 text-xs mt-1">{errors.mileage}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="transmissionType" className="block text-sm font-medium leading-6 text-gray-900">
                            Transmission Type
                        </label>
                        <div className="mt-2">
                            <select
                                id="transmissionType"
                                name="transmissionType"
                                value={formData.transmissionType}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                            >
                                <option value="Automatic">Automatic</option>
                                <option value="Manual">Manual</option>
                            </select>
                            {errors.transmissionType && <p className="text-red-500 text-xs mt-1">{errors.transmissionType}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="fuelType" className="block text-sm font-medium leading-6 text-gray-900">
                            Fuel Type
                        </label>
                        <div className="mt-2">
                            <select
                                id="fuelType"
                                name="fuelType"
                                value={formData.fuelType}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                            >
                                <option value="Gasoline">Gasoline</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electric">Electric</option>
                            </select>
                            {errors.fuelType && <p className="text-red-500 text-xs mt-1">{errors.fuelType}</p>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
