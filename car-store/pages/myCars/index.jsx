import React, { useState, useEffect } from 'react';


import CardList from '../../components/cardList';
import CarCard from '../../components/carCard';
import Pagination from '../../components/pagination';

import api from '../../utils/api';

import { useRouter } from 'next/router';

export default function Page() {
    const router = useRouter();

    const [cars, setCars] = useState([]);

    const [page, setPage] = useState({ page: 1, totalPages: 1 });


    useEffect(() => {
        api.get(`/api/cars/myCars?page=${page.page}`).then((res) => {
            console.log(res.data.totalPages);
            setCars(res.data.cars);
            setPage(
                {
                    ...page,
                    totalPages: res.data.totalPages
                });
        }).catch((error) => {
            if (error.response.request.status === 403) {
                router.push('/403');
            }
            router.push('/');
        });
    }, [page.page]);

    return (
        <>
            <div className="flex flex-col items-center mt-8">
                <h1 className="text-3xl font-bold text-center">My Cars</h1>
                <div className="flex justify-end w-full">
                    <button type="button" onClick={() => router.push('/myCars/addCar')} className="flex items-center mx-8 justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                        Add Car
                    </button>
                </div>
                {(!cars || cars.length === 0) && <h1 className="text-3xl font-bold">No Cars, add one</h1>}


                <CardList collection={cars} CardComponent={CarCard} />
            </div>
            {cars && cars.length > 0 && <Pagination className={'mt-3'} page={page.page} totalPages={page.totalPages} setPage={setPage} />}

        </>

    );
};
