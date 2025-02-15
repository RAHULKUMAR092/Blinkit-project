import React, { useEffect, useState } from "react";

const useMobile = (breakPoint = 768) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakPoint);
    const handleResize = () => {
        const check = window.innerWidth < breakPoint;
        setIsMobile(check);
    }
    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])
    return [isMobile]

}

export default useMobile;