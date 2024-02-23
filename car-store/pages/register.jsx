import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { UserContext } from '../utils/userContext';
import { useRouter } from 'next/router';
import api from '../utils/api';

export default function Page() {
    const { user, setUser } = useContext(UserContext);
    const router = useRouter();
    if (user) {
        router.push('/');
    }

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'Buyer',
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

        api.post('/api/users/register', formData).then((res) => {
            setUser(res.data);

            api.post('/api/users/login', formData).then((res) => {
                setUser(res.data);
                router.push('/');
            });
        }).catch((error) => {
            if (error.response.data.message) {
                setErrors(error.response.data);
            }
            else {
                const resErrors = error.response.data.errors;
                setErrors(Object.fromEntries(resErrors.map(error => [error.path, error.msg])))
            }
        });


    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register for an account</h2>
                {errors.message && <p className="bg-red-300 border-red-500 border-4 text-center p-4 rounded-md text-red-950 text-xl mt-1">{errors.message}</p>}
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                        <div className="mt-2">
                            <input
                                id="firstName"
                                name="firstName"
                                autoComplete="given-name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 ${errors.firstName ? 'border-red-500' : ''}`}
                            />
                            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                        <div className="mt-2">
                            <input
                                id="lastName"
                                name="lastName"
                                autoComplete="family-name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 ${errors.lastName ? 'border-red-500' : ''}`}
                            />
                            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 ${errors.email ? 'border-red-500' : ''}`}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 ${errors.password ? 'border-red-500' : ''}`}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Role</label>
                        <div className="mt-2 flex items-center">
                            <input
                                id="seller"
                                name="role"
                                type="radio"
                                value="Seller"
                                checked={formData.role === 'Seller'}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label htmlFor="seller" className="mr-4">Seller</label>
                            <input
                                id="buyer"
                                name="role"
                                type="radio"
                                value="Buyer"
                                checked={formData.role === 'Buyer'}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label htmlFor="buyer">Buyer</label>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Register</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold leading-6 text-red-600 hover:text-red-500">Login</Link>
                </p>
            </div>
        </div>
    );
}
