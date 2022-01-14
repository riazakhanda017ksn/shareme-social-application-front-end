import React from 'react';
import Masonary from 'react-masonry-css'
import Pin from './Pin';


const MasonryLayout = ({pins}) => {
    const breakpointObj={
        default:4,
        3000:6,
        2000:5,
        1200:3,
        1000:2,
        500:1
    }
    return (
        <Masonary className='flex animated-slide-fwd ' breakpointCols={breakpointObj}>
            {
                pins?.map((pin)=><Pin key={pin._id} pin={pin} className='w-max'/>)
            }
        </Masonary>
    );
};

export default MasonryLayout;