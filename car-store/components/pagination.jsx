import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function Pagination({ page, totalPages, setPage }) {
    return (
        <div className="flex justify-center mt-4">
            <button
                className={`me-2 px-3 py-1 rounded ${page === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'}`}
                onClick={() => setPage({ page: page - 1, totalPages })}
                disabled={page === 1}
            >
                <ChevronLeftIcon className='size-6' />
            </button>
            <span className="px-3 py-1 bg-red-500 rounded">
                Page {page} of {totalPages}
            </span>
            <button
                className={`ms-2 px-3 py-1 rounded ${page === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'}`}

                onClick={() => setPage({ page: page + 1, totalPages })}
                disabled={page === totalPages}
            >
                <ChevronRightIcon className='size-6' />
            </button>
        </div>
    );
};