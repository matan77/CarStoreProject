import React, { useContext } from 'react';
import { UserContext } from '../utils/userContext';
import { CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';


export default function OrderCard({ car, buyer, saleDate }) {
    const { user } = useContext(UserContext);
    const seller = car.seller;
    if (!user) return;
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-xl">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{car.company} {car.model}</div>
                <p className="text-gray-700 text-base">
                    <CalendarIcon className="h-5 w-5 inline mr-1" />
                    Sale Date: {new Date(saleDate).toLocaleDateString()}<br />
                    <CurrencyDollarIcon className="h-5 w-5 inline mr-1" />
                    Price: {`${car.price} $`}
                </p>
            </div>
            <div className="px-6 py-4">{

            }
                {user.role === 'Seller' && <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {`Buyer: ${buyer.firstName} ${buyer.lastName}`}
                </span>
                }
                {seller && <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {`Seller: ${seller.firstName} ${seller.lastName}`}
                </span>}

            </div>
        </div >
    );
};

