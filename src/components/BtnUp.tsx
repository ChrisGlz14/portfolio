
import React, { useEffect, useState } from 'react'
import { FaArrowAltCircleUp } from 'react-icons/fa'
import '../app/styles/btn.css'
import { setTimeout } from 'timers/promises';


const BtnUp = () => {

    const [showBtn, setShowBtn] = useState(false);

    useEffect(() => {
    
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowBtn( true );
            }
            else {
                setShowBtn( false );
            }
        }

        handleScroll()

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }

        
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    

    return (
        <>
            {showBtn && (
                <div className="top-btn-container z-20 sticky bottom-12 pr-11 justify-end flex">
                    <button  className={`up-btn-show ${showBtn ? '' : 'up-btn-hide'} transition-all duration-300 bg-[#ff5d44] p-3 rounded-full`} onClick={scrollToTop}>
                        <FaArrowAltCircleUp className="text-5xl" />
                    </button>
                </div>
            )}
        </>
    );
};

export default BtnUp