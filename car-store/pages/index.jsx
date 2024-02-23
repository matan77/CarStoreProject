import React, { useState, useEffect } from 'react';


import CardList from '../components/cardList';
import CarCard from '../components/carCard';
import Pagination from '../components/pagination';

import api from '../utils/api';

import { useRouter } from 'next/router';

export default function Page() {
    const router = useRouter();
    const [cars, setCars] = useState([]);

    const [page, setPage] = useState({ page: 1, totalPages: 1 });

    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        api.get(`/api/cars/?${router.query.search ? `search=${router.query.search}&` : ''}page=${page}`).then((res) => {
            setCars(res.data.cars || []);
            setPage(
                {
                    ...page,
                    totalPages: res.data.totalPages
                });
        }).catch((error) => {
            console.log(error);
            router.push('/');
        });
    }, [router.isReady, router.query]);

    return (
        <>
            <div className="flex flex-col h-full items-center mt-8">
                <h1 className="text-3xl font-bold text-center">Cars</h1>
                {(!cars || cars.length === 0) && <h1 className="text-2xl font-bold">No Cars</h1>}

                <div className='align-bottom'>

                    <CardList collection={cars} CardComponent={CarCard} />
                    {cars && cars.length > 0 && <Pagination className={'mt-3'} page={page.page} totalPages={page.totalPages} setPage={setPage} />}
                </div>
            </div>

        </>

    );
};
