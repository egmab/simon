import React from 'react';

const Error = ({tryAgain}) => {
    const style={
        padding: '3px',
        borderRadius: '16px'
    }
    return ( 
        <div className="error">
            <img src="error.png" alt="error"/>
            <button style={style} onClick={()=>tryAgain()}>Try again</button>
        </div>
     );
}
 
export default Error;