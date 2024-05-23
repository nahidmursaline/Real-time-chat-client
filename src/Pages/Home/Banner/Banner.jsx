import React from 'react';

import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import banner1 from "../../../Image/Banner/Banner-00.jpg";
import banner2 from "../../../Image/Banner/Banner-001.jpg";
import banner3 from "../../../Image/Banner/Banner-002.jpg";

const Banner = () => {
    return (
        <div >
             <Carousel>
                <div className='h-10'>
                    <img  src={banner1} />
                    
                </div>
                <div>
                    <img src={banner2} />
                    
                </div>
                <div>
                    <img src={banner3} />
                    
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;