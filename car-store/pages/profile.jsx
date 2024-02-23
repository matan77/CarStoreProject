import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../utils/userContext';
import { useRouter } from 'next/router';
import api from '../utils/api';

export default function Page() {
    const router = useRouter();
    const { user, setUser } = useContext(UserContext);

    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (user !== null) {
            setFormData(user);
        }
    }, [user]);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDeleteAccount = () => {
        if (confirm('Are you sure you want to delete your account?')) {
            api.delete('/api/users/')
                .then(() => {
                    api.get('/api/users/logout').then((res) => {
                        setUser(null);
                        router.push('/login');
                    }).catch((error) => {
                        console.log(error);
                        router.push('/login');
                    });

                })
                .catch((error) => {
                    console.error('Error deleting account:', error);
                });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        api.patch('/api/users/', formData)
            .then((res) => {
                setUser({
                    ...user,
                    firstName: formData.firstName,
                    lastName: formData.lastName
                });
                router.push('/');
            })
            .catch((error) => {
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
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Update Profile</h2>
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


                    <button type="submit" className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Update</button>

                    <button type="button" onClick={handleDeleteAccount} className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">Delete Account</button>
                </form>
            </div>
        </div>
    );
}
