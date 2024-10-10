import React from 'react'

const loading = () => {
	return (
		<div className='w-full h-[90vh] flex justify-center items-center'>
			<div className='text-4xl font-bold flex flex-row'>
				loading
				<div className='animate-bounce delay-100'>
					.
				</div>
				<div className='animate-bounce delay-150'>
					.
				</div>
				<div className='animate-bounce delay-200'>
					.
				</div>
			</div>
		</div>
	)
}

export default loading