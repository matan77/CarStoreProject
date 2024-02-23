import React from 'react';

const AveragePriceOfCarsSoldStats = ({ stats }) => {
    return (
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-2">Average Price of Cars Sold</h2>
            <p>Average Price: {stats.averagePrice}</p>
        </div>
    );
};

export default AveragePriceOfCarsSoldStats;
