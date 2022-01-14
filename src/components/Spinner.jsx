import React from 'react';
import Loader from 'react-loader-spinner'

const Spinner = ({message}) => {
    return (
        <div className='Spinner'>
            <Loader
            type="Circles"
            color='#FD0155'
            height={50}
            width={200}
            className='m-5'
            />
            <p>{message}</p>
        </div>
    );
};

export default Spinner;