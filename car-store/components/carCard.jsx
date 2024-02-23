import React, { useContext, useState } from 'react';
import { BoltIcon, CalendarIcon, CogIcon, CurrencyDollarIcon, PencilIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { UserContext } from '../utils/userContext';
import api from '../utils/api';

const CarCard = ({ _id, company, model, year, price, mileage, transmissionType, fuelType, seller, isOrdered }) => {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const [isEmail, setIsEmail] = useState(false);

    const isSeller = user.role === 'Seller' && seller.email === user.email;
    const canOrder = user.role === 'Buyer';

    const makeOrder = () => {
        api.post(`api/orders/buy/${_id}`).then(
            (res) => {
                router.push('/myOrders');
            }).catch((error) => {
                console.log(error);
                router.push('/');
            });

    }

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-xl">
            <div className="px-6 py-4 ">
                <div className="font-bold text-xl mb-2">{company} {model}</div>
                <p className="text-gray-700 text-base">
                    <CalendarIcon className="h-5 w-5 inline mr-1" />
                    Year: {year}<br />
                    <CurrencyDollarIcon className="h-5 w-5 inline mr-1" />
                    Price: {`${price} $`}<br />
                    <WrenchScrewdriverIcon className="h-5 w-5 inline mr-1" />
                    Mileage: {`${mileage} km`}<br />
                    <CogIcon className="h-5 w-5 inline mr-1" />
                    Transmission: {transmissionType}<br />
                    <BoltIcon className="h-5 w-5 inline mr-1" />
                    Fuel Type: {fuelType}<br />
                </p>
            </div>
            {(seller || isSeller) && <div className="px-6 py-4 ">
                {seller &&
                    <>
                        <span className="flex relative justify-center">
                            <span className="inline-block cursor-pointer bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 hover:bg-red-300"
                                onMouseEnter={() => setIsEmail(true)} onMouseLeave={() => setIsEmail(false)}>
                                {`Seller: ${seller.firstName} ${seller.lastName}`}
                            </span>
                            {isEmail && (
                                <span className="absolute bg-red-400 text-white text-xs py-1 px-2 rounded whitespace-no-wrap -mt-7 left-1/2 transform -translate-x-1/2 opacity-100 pointer-events-auto">
                                    {seller.email}
                                </span>
                            )}
                        </span>
                    </>



                }


                <div className='flex justify-center'>

                    {isSeller && !isOrdered &&
                        <button onClick={() => router.push(`myCars/${_id}`)} className="inline-block my-3 rounded-full items-center mx-auto justify-center bg-red-600 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                            <PencilIcon className="size-5 inline mr-1" />
                        </button>
                    }
                    {canOrder && !isOrdered &&
                        <button onClick={makeOrder} className="inline-block my-3 rounded-full items-center mx-auto justify-center bg-red-600 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                            Order
                        </button>
                    }
                </div>
            </div>}
        </div>
    );
};

export default CarCard;
