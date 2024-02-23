import React from 'react';

const CardList = ({ collection, CardComponent }) => {


    return (
        <>
            <div className="grid grid-cols-5 gap-4">

                {collection.map(item => (
                    <CardComponent key={item._id} {...item} />
                ))}
            </div>
        </>
    );
};

export default CardList;
