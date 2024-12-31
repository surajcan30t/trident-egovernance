import React from 'react';
import { GraduationCap, IdCard, User, Phone, Mail, Home, Award, Link2 } from 'lucide-react';
import { FaVenusMars, FaBus, FaUniversity, FaCity, FaAsterisk, FaRoad, FaBed } from "react-icons/fa";
import { PiRankingBold, PiStudentBold } from "react-icons/pi";
import { MdEditSquare } from 'react-icons/md';
import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import Link from 'next/link';

interface Document {
	docType: string;
	docLink: string;
}
interface Student {
	jeeApplicationNo: string;
	regdNo: string;
	admissionDate: string | null;
	ojeeCouncellingFeePaid: string | null;
	studentName: string;
	gender: string;
	branchCode: string;
	admissionYear: number | null;
	degree_yop: number | null;
	phNo: string;
	email: string;
	rollNo: string | null;
	hostelier: string | null;
	hostelOption: string;
	hostelChoice: string | null;
	transportAvailed: string | null;
	status: string | null;
	batchId: string | null;
	currentYear: number | null;
	aadhaarNo: number;
	indortrng: string | null;
	plpoolm: string | null;
	cfPayMode: string;
	religion: string;
	rank: number;
	rankType: string;
	course: string;
	tfw: string;
	admissionType: string;
	studentType: string;
	tenthPercentage: number;
	tenthYOP: number;
	twelvthPercentage: number;
	twelvthYOP: number;
	diplomaPercentage: number | null;
	diplomaYOP: number | null;
	graduationPercentage: number;
	graduationYOP: number;
	lgName: string;
	permanentAddress: string;
	permanentCity: string;
	permanentState: string;
	permanentPincode: number;
	parentContact: string;
	parentEmailId: string;
	presentAddress: string | null;
	district: string;
	ojeeCounsellingFeePaid: string;
	ojeeRollNo: string | null;
	ojeeRank: string;
	aieeeRank: string | null;
	caste: string;
	reportingDate: string | null;
	categoryCode: string | null;
	categoryRank: string | null;
	allotmentId: string;
	transportOpted: string;
	pickUpPoint: string;
	step: number;
	fname: string;
	mname: string;
	studentDocsData: Document[];
}


const studentData = async (): Promise<Student | null> => {
	try {
		const NSR_token = cookies().get("NSR-Authorization");
		const response: AxiosResponse<Student> = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/NSR/get`, {
			headers: {
				'NSR-Authorization': `Bearer ${NSR_token?.value}`,
			},
			timeout: 500
		},
		);
		if (response.status !== 200) {
			return null;
		}

		else return response.data; // Return the dashboard data
	} catch (error) {
		console.error(error);
		return null; // Return null if there's an error
	}
};
// Helper function to handle empty values
const formatValue = (value: any) => (value ? value : 'N/A');

// DataField component to display individual fields
const DataField = ({ icon, label, value }: any) => (
	<div className="flex items-center px-1 py-1 bg-cyan-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group">
		<div className="mr-4 text-2xl text-blue-500 group-hover:text-blue-600 transition-colors duration-300">
			{icon}
		</div>
		<div>
			<p className="text-sm font-medium text-gray-500">{label}</p>
			<p className="text-base font-semibold text-gray-800">{formatValue(value)}</p>
		</div>
	</div>
);

// Main component to display dashboard details
const NewStudentFinalView = async () => {
	const student = await studentData();
	return (
		<div className="min-h-screen py-5 px-4 sm:px-6 lg:px-8">
			<div className="max-w-full mx-auto">
				<h1 className="text-3xl font-semibold text-center text-gray-900 mb-2">Final Submit</h1>

				{/* Personal Information Section */}
				<div className='flex flex-row justify-between mb-4 text-gray-800'>
					<h2 className="text-xl font-semibold ">Personal Information</h2>
					<Link className='bg-yellow-400 text-sm font-semibold py-2 px-2 rounded-lg flex flex-row justify-center items-center text-zinc-600 text-center' href={'/studentportal/newstudentpersonaldetails'}><MdEditSquare />
						Edit Personal Information</Link>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 border rounded-lg p-2 gap-4 mb-8">
					<DataField icon={<IdCard />} label="JEE Application No." value={student?.jeeApplicationNo} />
					<DataField icon={<User />} label="Name" value={student?.studentName} />
					<DataField icon={<FaVenusMars />} label="Gender" value={student?.gender} />
					<DataField icon={<Phone />} label="Phone No." value={student?.phNo} />
					<DataField icon={<Mail />} label="Email" value={student?.email} />
					<DataField icon={<Home />} label="Permanent Address" value={student?.permanentAddress} />
					<DataField icon={<FaCity />} label="City" value={student?.permanentCity} />
					<DataField icon={<FaCity />} label="State" value={student?.permanentState} />
					<DataField icon={<FaAsterisk />} label="Pincode" value={student?.permanentPincode} />
					<DataField icon={<User />} label="Father's Name" value={student?.fname} />
					<DataField icon={<User />} label="Mother's Name" value={student?.mname} />
					<DataField icon={<User />} label="Local Guardian Name" value={student?.lgName} />
					<DataField icon={<Phone />} label="Parent Contact" value={student?.parentContact} />
					<DataField icon={<Mail />} label="Parent Email" value={student?.parentEmailId} />

				</div>

				{/* Academic Information Section */}
				<div className='flex flex-row justify-between mb-4 text-gray-800'>
					<h2 className="text-xl font-semibold">Academic Information</h2>
					<Link
						className='bg-yellow-400 text-sm font-semibold py-2 px-2 rounded-lg flex flex-row items-center gap-2 text-zinc-600'
						href={'/studentportal/newstudentacademicdetails'}
					>
						<MdEditSquare className="text-lg" />
						<span>Edit Academic Information</span>
					</Link>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 border rounded-lg p-2 gap-4 mb-8">
					<DataField icon={<GraduationCap />} label="Course" value={student?.course} />
					<DataField icon={<Award />} label="Branch Code" value={student?.branchCode} />
					<DataField icon={<PiRankingBold />} label="Rank" value={student?.rank} />
					<DataField icon={<PiStudentBold />} label="Admission Type" value={student?.admissionType} />
					<DataField icon={<GraduationCap />} label="Student Type" value={student?.studentType} />
					<DataField icon={<GraduationCap />} label="10th Percentage" value={student?.tenthPercentage} />
					<DataField icon={<GraduationCap />} label="10th Year of Passing" value={student?.tenthYOP} />
					<DataField icon={<GraduationCap />} label="12th Percentage" value={student?.twelvthPercentage} />
					<DataField icon={<GraduationCap />} label="12th Year of Passing" value={student?.twelvthYOP} />
					<DataField icon={<GraduationCap />} label="Graduation Percentage" value={student?.graduationPercentage} />
					<DataField icon={<GraduationCap />} label="Graduation Year of Passing" value={student?.graduationYOP} />
				</div>

				{/* Transport and Hostel Information Section */}
				<div className='flex flex-row justify-between mb-4 text-gray-800'>
					<h2 className="text-xl font-semibold ">Transport and Hostel Information</h2>
					<Link className='bg-yellow-400 text-sm font-semibold py-2 px-2 rounded-lg flex flex-row justify-center items-center text-zinc-600' href={'/studentportal/newstudentfacilities'}><MdEditSquare />Edit Optional Facility </Link>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 border rounded-lg p-2 gap-4 mb-8">
					<DataField icon={<FaBus />} label="Transport Opted" value={student?.transportOpted} />
					<DataField icon={<FaRoad />} label="Pick-up Point" value={student?.pickUpPoint} />
					<DataField icon={<FaBed />} label="Hostel Option" value={student?.hostelOption} />
				</div>

				{/* Documents Section */}
				<div className='flex flex-row justify-between mb-4 text-gray-800'>
					<h2 className="text-xl font-semibold">Documents</h2>
					<Link
						className='bg-yellow-400 text-sm font-semibold py-2 px-2 rounded-lg flex flex-row items-center gap-2 text-zinc-600'
						href={'/studentportal/newstudentdocs'}
					>
						<MdEditSquare className="text-lg" />
						<span>Edit Documents</span>
					</Link>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 border rounded-lg p-2 gap-4 mb-8">
					{
						student?.studentDocsData?.map((data: any, index: number) => (
							<Link href={data.docLink} key={index}>
								<DataField icon={<Link2 />} label={data.docType} value={data.docType} />
							</Link>
						))
					}
				</div>

			</div>
		</div>
	);
};

export default NewStudentFinalView