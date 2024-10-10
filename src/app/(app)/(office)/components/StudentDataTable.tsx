import React from 'react'
import { studentcolumns, Students } from './studentDataColumns'
import { DataTable } from './DataTable'

async function getData(): Promise<Students[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      regdNo: 100,
      name: "John Doe",
      email: "m@example.com",
    },
    {
      id: "728er54f",
      regdNo: 101,
      name: "Rohan Kumar",
      email: "rk@example.com",
    },
    {
      id: "728ed52f",
      regdNo: 102,
      name: "Swayam Prakash",
      email: "sp@m.com",
    },
    {
      id: "726yd82f",
      regdNo: 103,
      name: "Suran Kumar",
      email: "sk@m.com",
    },
    {
      id: "72ace31g",
      regdNo: 104,
      name: "Arun Singh",
      email: "arun.singh@m.com",
    },
    {
      id: "72dfb49j",
      regdNo: 105,
      name: "Ravi Verma",
      email: "ravi.verma@m.com",
    },
    {
      id: "72jnd62k",
      regdNo: 106,
      name: "Meera Reddy",
      email: "meera.reddy@m.com",
    },
    {
      id: "72pbc53h",
      regdNo: 107,
      name: "Sonal Gupta",
      email: "sonal.gupta@m.com",
    },
    {
      id: "72klf98l",
      regdNo: 108,
      name: "Karthik Nair",
      email: "karthik.nair@m.com",
    },
    {
      id: "72wge45m",
      regdNo: 109,
      name: "Sneha Das",
      email: "sneha.das@m.com",
    },
    {
      id: "72bfg76n",
      regdNo: 110,
      name: "Ankit Mehta",
      email: "ankit.mehta@m.com",
    },
    {
      id: "72qie34o",
      regdNo: 111,
      name: "Priya Sharma",
      email: "priya.sharma@m.com",
    },
    {
      id: "72tju97p",
      regdNo: 112,
      name: "Vikas Rao",
      email: "vikas.rao@m.com",
    },
    {
      id: "72rfc81q",
      regdNo: 113,
      name: "Nisha Jain",
      email: "nisha.jain@m.com",
    },
    {
      id: "72dhl45r",
      regdNo: 114,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@m.com",
    },
    {
      id: "72uyp36s",
      regdNo: 115,
      name: "Pooja Agarwal",
      email: "pooja.agarwal@m.com",
    },
    {
      id: "72wqs54t",
      regdNo: 116,
      name: "Amitabh Roy",
      email: "amitabh.roy@m.com",
    },
    {
      id: "72bhe72u",
      regdNo: 117,
      name: "Neha Chopra",
      email: "neha.chopra@m.com",
    },
    {
      id: "72plx93v",
      regdNo: 118,
      name: "Rohan Patel",
      email: "rohan.patel@m.com",
    },


  ]
}

const StudentDataTable = async () => {
  const data = await getData()
  return (
    <div className="container mx-auto w-[70vw]">
      <DataTable columns={studentcolumns} data={data} />
    </div>
  )
}

export default StudentDataTable