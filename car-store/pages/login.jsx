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
        email: '',
        password: '',
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

        api.post('/api/users/login', formData).then((res) => {
            setUser(res.data);
            router.push('/');
        }).catch((error) => {
            const resErrors = error.response.data.errors;
            const errors = {};
            errors.email = resErrors.find((error) => error.path === 'email')?.msg;
            errors.password = resErrors.find((error) => error.path === 'password')?.msg;
            setErrors(errors);

        });
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-40 w-auto" src="/logo.png" alt="Logo" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
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
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`block w-full rounded-md border-0  p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 ${errors.password ? 'border-red-500' : ''}`}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Sign in</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Don't have an account yet?{' '}
                    <Link href="/register" className="font-semibold leading-6 text-red-600 hover:text-red-500">Register</Link>
                </p>
            </div>
        </div>
    );
}
