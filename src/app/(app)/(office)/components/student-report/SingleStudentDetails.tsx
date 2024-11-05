import { StudentReport, StudentOnly, StudentAdmissionDetailsOnly, PersonalDetailsOnly, CareerOnly, HostelOnly, TransportOnly, Documents } from '@/app/(app)/(office)/office-schemas/schema';
import React from 'react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import StudentOnlyForm from '@/app/(app)/(office)/components/student-report/student-only-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import StudentPersonalDetailsForm from '@/app/(app)/(office)/components/student-report/student-personal-details-form';
import StudentDocsForm from '@/app/(app)/(office)/components/student-report/student-docs-form';
import StudentAdmissionDetailsForm from '@/app/(app)/(office)/components/student-report/student-admission-details-form';

const SingleStudentDetails = ({ studentData }: { studentData: StudentReport }) => {
  return (
    <>
      <div>
        <StudentComponent studentOnly={studentData?.studentOnlyDTO}/>
        <PersonalDetailsComponent personalDetails={studentData?.personalDetailsOnlyDTO}/>
        <AdmissionDetailsComponent admissionDetails={studentData?.studentAdmissionDetailsOnlyDTO}/>
        <CareerDetailComponent careerDetails={studentData?.studentCareerOnlyDTO}/>
        <HostelDetailComponent hostelDetails={studentData?.hostelOnlyDTO}/>
        <TransportDetailComponent transportDetails={studentData?.transportOnlyDTO}/>
        <StudentDocumentsComponent documents={studentData?.studentDocsOnlyDTOS} registrationNo={studentData?.studentOnlyDTO?.regdNo}/>
      </div>
    </>
  );
};

const formatValue = (value: any) => (value ? value : 'N/A');
const DataField = ({ label, value }: any) => (
  <div className="flex justify-start px-1 py-0 bg-zinc-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group">
    <div>
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-800">{formatValue(value)}</p>
    </div>
  </div>
);

const StudentComponent = ({studentOnly}: {studentOnly: StudentOnly}) =>{
  return (
    <>
      <div className='flex flex-row justify-between p-1'>
        <h1 className="text-lg">Student Details</h1>
        <Dialog>
          <DialogTrigger>
            <div className='bg-[#fb923c] text-stone-50 shadow hover:bg-[#f97316] dark:bg-[#fb923c] dark:text-stone-950 dark:hover:bg-[#f97316] font-bold rounded-lg px-2 py-1'>Update</div>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Update Student Details</DialogTitle>
            </DialogHeader>
            <ScrollArea>
              <StudentOnlyForm table={'student'} data={studentOnly}/>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 border rounded-lg p-2 gap-3 mb-8">
        <DataField label="Name" value={studentOnly?.studentName} />
        <DataField label="Branch" value={studentOnly?.branchCode} />
        <DataField label="Course" value={studentOnly?.course} />
        <DataField label="Section" value={studentOnly?.section} />
        <DataField label="D.O.B" value={studentOnly?.dob} />
        <DataField label="Admission Year" value={studentOnly?.admissionYear} />
        <DataField label="Current Year" value={studentOnly?.currentYear} />
        <DataField label="Year Of Passing" value={studentOnly?.degreeYop} />
        <DataField label="Student Type" value={studentOnly?.studentType} />
        <DataField label="Status" value={studentOnly?.status} />
        <DataField label="Payment Mode" value={studentOnly?.cfPayMode} />
        <DataField label="Aadhaar No." value={studentOnly?.aadhaarNo} />
        <DataField label="Batch ID" value={studentOnly?.batchId} />
        <DataField label="Phone No." value={studentOnly?.phNo} />
        <DataField label="Email" value={studentOnly?.email} />
        <DataField label="Religion" value={studentOnly?.religion} />
        <DataField label="Gender" value={studentOnly?.gender} />
        <DataField label="Placement Pool Availed" value={studentOnly?.plpoolm} />
        <DataField label="Hostelier" value={studentOnly?.hostelier} />
        <DataField label="Industrial Training" value={studentOnly?.indortrng} />
      </div>
    </>
  )
}

const PersonalDetailsComponent = ({
  personalDetails,
}: {
  personalDetails: PersonalDetailsOnly;
}) => {
  return (
    <>
      <div className="flex flex-row justify-between p-1">
        <h1 className="text-lg">Personal Details</h1>
        <Dialog>
          <DialogTrigger>
            <div className='bg-[#fb923c] text-stone-50 shadow hover:bg-[#f97316] dark:bg-[#fb923c] dark:text-stone-950 dark:hover:bg-[#f97316] font-bold rounded-lg px-2 py-1'>Update</div>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Update Personal Details</DialogTitle>
            </DialogHeader>
            <ScrollArea>
              <StudentPersonalDetailsForm table={'personal-details'} data={personalDetails}/>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 border rounded-lg p-2 gap-3 mb-8">
        <DataField label="Father Name" value={personalDetails?.fname} />
        <DataField label="Mother's Name" value={personalDetails?.mname} />
        <DataField
          label="Legal Guardian's Name"
          value={personalDetails?.lgName}
        />
        <DataField
          label="Parent Contact"
          value={personalDetails?.parentContact}
        />
        <DataField
          label="Parent Email"
          value={personalDetails?.parentEmailId}
        />
        <DataField
          label="Permanent Address"
          value={personalDetails?.permanentAddress}
        />
        <DataField
          label="Permanent City"
          value={personalDetails?.permanentCity}
        />
        <DataField
          label="District"
          value={personalDetails?.district}
        />
        <DataField
          label="Permanent State"
          value={personalDetails?.permanentState}
        />
        <DataField
          label="Permanent Pincode"
          value={personalDetails?.permanentPincode}
        />
        <DataField
          label="Present Address"
          value={personalDetails?.presentAddress}
        />
      </div>
    </>
  );
};

const AdmissionDetailsComponent = ({
  admissionDetails,
}: {
  admissionDetails: StudentAdmissionDetailsOnly;
}) => {
  return (
    <>
      <div className="flex flex-row justify-between p-1">
        <h1 className="text-lg">Admission Details</h1>
        <Dialog>
          <DialogTrigger>
            <div className='bg-[#fb923c] text-stone-50 shadow hover:bg-[#f97316] dark:bg-[#fb923c] dark:text-stone-950 dark:hover:bg-[#f97316] font-bold rounded-lg px-2 py-1'>Update</div>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Update Admission Details</DialogTitle>
            </DialogHeader>
            <ScrollArea>
              <StudentAdmissionDetailsForm table={'admission-details'} data={admissionDetails} />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 border rounded-lg p-2 gap-3 mb-8">
        <DataField
          label="Admission Date"
          value={admissionDetails?.admissionDate}
        />
        <DataField
          label="Ojee Counseling Fee Paid"
          value={admissionDetails?.ojeeCounsellingFeePaid}
        />
        <DataField label="TFW" value={admissionDetails?.tfw} />
        <DataField
          label="Admission Type"
          value={admissionDetails?.admissionType}
        />
        <DataField
          label="JEE Application No"
          value={admissionDetails?.jeeApplicationNo}
        />
        <DataField label="JEE MAIN Rank" value={admissionDetails?.aieeeRank} />
        <DataField label="Ojee Rank" value={admissionDetails?.ojeeRank} />
        <DataField
          label="Reporting Date"
          value={admissionDetails?.reportingDate}
        />
        <DataField label="Caste" value={admissionDetails?.caste} />
        <DataField
          label="Category Code"
          value={admissionDetails?.categoryCode}
        />
        <DataField
          label="Category Rank"
          value={admissionDetails?.categoryRank}
        />
        <DataField label="Allotment ID" value={admissionDetails?.allotmentId} />
      </div>
    </>
  );
};

const CareerDetailComponent = ({
  careerDetails,
}: {
  careerDetails: CareerOnly;
}) => {
  return (
    <>
      <div className="flex flex-row justify-between p-1">
        <h1 className="text-lg">Career Details</h1>
        <Dialog>
          <DialogTrigger>
            <div className='bg-[#fb923c] text-stone-50 shadow hover:bg-[#f97316] dark:bg-[#fb923c] dark:text-stone-950 dark:hover:bg-[#f97316] font-bold rounded-lg px-2 py-1'>Update</div>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Update Career Details</DialogTitle>
            </DialogHeader>
            <ScrollArea>

            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 border rounded-lg p-2 gap-3 mb-8">
        <DataField
          label="Tenth Percentage"
          value={careerDetails?.tenthPercentage}
        />
        <DataField
          label="Tenth Year of Passing"
          value={careerDetails?.tenthYOP}
        />
        <DataField
          label="Twelfth Percentage"
          value={careerDetails?.twelvthPercentage}
        />
        <DataField
          label="Twelfth Year of Passing"
          value={careerDetails?.twelvthYOP}
        />
        <DataField
          label="Diploma Percentage"
          value={careerDetails?.diplomaPercentage}
        />
        <DataField
          label="Diploma Year of Passing"
          value={careerDetails?.diplomaYOP}
        />
        <DataField
          label="Graduation Percentage"
          value={careerDetails?.graduationPercentage}
        />
        <DataField
          label="Graduation Year of Passing"
          value={careerDetails?.graduationYOP}
        />
      </div>
    </>
  );
};

const HostelDetailComponent = ({
  hostelDetails,
}: {
  hostelDetails: HostelOnly;
}) => {
  return (
    <>
      <div className="flex flex-row justify-between p-1">
        <h1 className="text-lg">Hostel Details</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 border rounded-lg p-2 gap-3 mb-8">
        <DataField label="Hostelier" value={hostelDetails?.hostelier} />
        <DataField label="Hostel Option" value={hostelDetails?.hostelOption} />
        <DataField label="Hostel Choice" value={hostelDetails?.hostelChoice} />
        <DataField label="Legal Guardian Name" value={hostelDetails?.lgName} />
        <DataField label="Registration Year" value={hostelDetails?.regdyear} />
      </div>
    </>
  );
};

const TransportDetailComponent = ({
  transportDetails,
}: {
  transportDetails: TransportOnly;
}) => {
  return (
    <>
      <div className="flex flex-row justify-between p-1">
        <h1 className="text-lg">Transport Details</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 border rounded-lg p-2 gap-3 mb-8">
        <DataField
          label="Transport Opted"
          value={transportDetails?.transportOpted}
        />
        <DataField
          label="Transport Availed"
          value={transportDetails?.transportAvailed}
        />
        <DataField label="Route" value={transportDetails?.route} />
        <DataField
          label="Pick-Up Point"
          value={transportDetails?.pickUpPoint}
        />
        <DataField
          label="Registration Year"
          value={transportDetails?.regdYear}
        />
      </div>
    </>
  );
};

const StudentDocumentsComponent = ({ documents, registrationNo }: { documents: Documents, registrationNo: string }) => {
  return (
    <>
      <div className="flex flex-row justify-between p-1">
        <h1 className="text-lg">Uploaded Documents</h1>
        <Dialog>
          <DialogTrigger>
            <div className='bg-[#fb923c] text-stone-50 shadow hover:bg-[#f97316] dark:bg-[#fb923c] dark:text-stone-950 dark:hover:bg-[#f97316] font-bold rounded-lg px-2 py-1'>Update</div>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Update Documents</DialogTitle>
            </DialogHeader>
            <ScrollArea>
              <StudentDocsForm table={'student-docs'} data={documents} registrationNo={registrationNo}/>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 border rounded-lg p-2 gap-3 mb-8">
        {documents?.map((data: any, index: number) => (
          <Link
            href={data.docLink}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
          >
            <DataField label={data.docType} value={data.docType} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default SingleStudentDetails;
