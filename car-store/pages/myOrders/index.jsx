import React, { useState, useEffect } from 'react';


import CardList from '../../components/cardList';
import OrderCard from '../../components/orderCard';
import Pagination from '../../components/pagination';

import api from '../../utils/api';

import { useRouter } from 'next/router';

export default function Page() {
    const router = useRouter();
    const [orders, setOrders] = useState([]);

    const [page, setPage] = useState({ page: 1, totalPages: 1 });


    useEffect(() => {
        api.get(`/api/orders/myOrders?page=${page}`).then((res) => {
            setOrders(res.data.orders);
            setPage(
                {
                    ...page,
                    totalPages: res.data.totalPages
                });
        }).catch((error) => {
            console.log(error);
            router.push('/');
        });
    }, []);

    return (
        <>
            <div className="flex flex-col items-center mt-8">
                <h1 className="text-3xl font-bold text-center">My Orders</h1>
                {(!orders || orders.length === 0) && <h2 className="text-2xl font-bold">No Orders</h2>}


                <CardList collection={orders} CardComponent={OrderCard} />
            </div>
            {orders && orders.length > 0 && <Pagination className={'mt-3'} page={page.page} totalPages={page.totalPages} setPage={setPage} />}

        </>

    );
};
