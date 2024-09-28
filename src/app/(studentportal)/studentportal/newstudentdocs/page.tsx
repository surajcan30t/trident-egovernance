import React from 'react'
import NsrUploadFile from '../../components/NSR/NsrUploadFile'

const page = () => {
	return (
		<div className='w-screen h-full my-5 p-0 flex flex-col justify-center items-center'>
			<h1 className='text-2xl text-slate-600 font-bold'>Upload Documents</h1>
			<NsrUploadFile />
		</div>
	)
}
export default page