import React, { useEffect, useState } from 'react'
import './navBar.css';
const Time = () => {
    const [isTime, setIsTime] = useState('');

    const formatTime = (time)=>{
        const timeProp = {
            year:'numeric',
            month:'long',
            day:'numeric',
            hour:'2-digit',
            minute:'2-digit',
            second:'2-digit'
        };

        return time.toLocaleString('en-US', timeProp)
    };

    useEffect(()=>{
        const id = setInterval(()=>{
            const d = new Date();
            setIsTime(formatTime(d))
        }, 1000);
        // initialize immediately
        setIsTime(formatTime(new Date()));
        return ()=> clearInterval(id);
    }, [])
  return (
    <div className='container-time'>
        <h2 className="time">
            {isTime}
        </h2>
    </div>
  )
}

export default Time;
