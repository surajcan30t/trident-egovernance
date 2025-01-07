import React from 'react';
import StudentDuesDetailsTable from '../../components/student-dues-table';

const page = (props: any) => {
	const { searchParams } = props;
	const today = new Date();

	// Ensure searchParams has the correct shape and defaults
	const query = {
		from: searchParams?.from === 'null' ? null : (searchParams?.from || today.toISOString()),
		to: searchParams?.to === 'null' ? null : (searchParams?.to || today.toISOString()),
		sessionId: searchParams?.sessionId === 'null' ? null : (searchParams.sessionId || null)
	};

	console.log('query', query);
	return (
		<>
			<main className="flex flex-col items-center border">

				<div className="flex flex-row justify-center">
					<StudentDuesDetailsTable query={query} />
				</div>
			</main>
		</>
	);
};

export default page;
