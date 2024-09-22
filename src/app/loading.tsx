import React from 'react'

const loading = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='text-4xl font-bold flex flex-row'>
                loading
                <div className='animate-bounce delay-0'>
                    .
                </div>
                <div className='animate-bounce delay-500'>
                    .
                </div>
                <div className='animate-bounce delay-1000'>
                    .
                </div>
            </div>
        </div>
    )
}

export default loading