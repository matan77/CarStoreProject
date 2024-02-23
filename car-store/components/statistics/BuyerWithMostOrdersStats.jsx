import React from 'react';

const BuyerWithMostOrdersStats = ({ stats }) => {
    return (
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-2">Buyer with Most Orders</h2>
            <ul>
                {stats.map((buyer, index) => (
                    <li key={index}>
                        {`${buyer.buyer.firstName} ${buyer.buyer.lastName}`} - {buyer.totalOrders} orders
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BuyerWithMostOrdersStats;
