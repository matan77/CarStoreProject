import React, { useEffect, useState } from 'react';
import BuyerWithMostOrdersStats from '../components/statistics/BuyerWithMostOrdersStats';
import TotalSalesByCompanyStats from '../components/statistics/TotalSalesByCompanyStats';
import AveragePriceOfCarsSoldStats from '../components/statistics/AveragePriceOfCarsSoldStats';
import api from '../utils/api';

export default function Page() {
    const [buyerWithMostOrders, setBuyerWithMostOrders] = useState([]);
    const [totalSalesByCompany, setTotalSalesByCompany] = useState([]);
    const [averagePriceOfCarsSold, setAveragePriceOfCarsSold] = useState([]);

    // Fetch statistics data
    useEffect(() => {
        api.get('/api/statistics/BuyerWithMostOrders').then((res) => {
            setBuyerWithMostOrders(res.data);
        });


        api.get('/api/statistics/TotalSalesByCompany').then((res) => {
            setTotalSalesByCompany(res.data);
        });

        api.get('/api/statistics/AveragePriceOfCarsSold').then((res) => {
            setAveragePriceOfCarsSold(res.data);
        });

    }, []);

    return (
        <div className="container mx-auto mt-8">
            <div className="grid grid-cols-3 gap-8">
                <div>
                    <BuyerWithMostOrdersStats stats={buyerWithMostOrders} />
                </div>
                <div>
                    <TotalSalesByCompanyStats stats={totalSalesByCompany} />
                </div>
                <div>
                    <AveragePriceOfCarsSoldStats stats={averagePriceOfCarsSold} />
                </div>
            </div>
        </div>
    );
};

