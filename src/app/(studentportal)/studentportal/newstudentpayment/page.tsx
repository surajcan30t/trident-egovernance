import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Building2, CreditCard, Info } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

interface CoursePayment {
  course: string;
  semesterWise: {
    first: string;
    second: string;
  };
  yearly: string;
}

const page = async() => {
  const courses: CoursePayment[] = [
    {
      course: "MBA",
      semesterWise: {
        first: "1,04,000",
        second: "95,500",
      },
      yearly: "1,94,500",
    },
    {
      course: "MCA",
      semesterWise: {
        first: "94,000",
        second: "85,500",
      },
      yearly: "1,74,500",
    },
  ];
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">Payment Details</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Course Fees Section */}
            <div className="space-y-6">
              {courses.map((course) => (
                <Card key={course.course} className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building2 className="h-5 w-5" />
                      <span>{course.course} Course Fees</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="semester" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="semester">Semester Wise</TabsTrigger>
                        <TabsTrigger value="yearly">Yearly</TabsTrigger>
                      </TabsList>
                      <TabsContent value="semester" className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">1st Semester</span>
                            <span className="font-semibold">₹{course.semesterWise.first}/-</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">2nd Semester</span>
                            <span className="font-semibold">₹{course.semesterWise.second}/-</span>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="yearly" className="mt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">1st Year</span>
                          <span className="font-semibold">₹{course.yearly}/-</span>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Payment Instructions Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Info className="h-5 w-5" />
                  <span>Payment Instructions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Trident Academy of Creative Technology</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account Name</span>
                      <span>TRIDENT ACADEMY OF CREATIVE TECHNOLOGY</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account Number</span>
                      <span className="font-mono">50100096955018</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bank</span>
                      <span>HDFC BANK</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Branch</span>
                      <span>INFOCITY BRANCH, BBSR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IFSC Code</span>
                      <span className="font-mono">HDFC0004013</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Trident Academy of Technology</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account Name</span>
                      <span>TRIDENT ACADEMY OF TECHNOLOGY</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account Number</span>
                      <span className="font-mono">50100190228118</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bank</span>
                      <span>HDFC BANK</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Branch</span>
                      <span>INFOCITY BRANCH, BBSR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IFSC Code</span>
                      <span className="font-mono">HDFC0004013</span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <p className="text-sm">
                    After payment, please send the transaction slip to{" "}
                    <Link href="mailto:accounts@tact.ac.in" className="font-semibold text-primary hover:underline">
                      accounts@tact.ac.in
                    </Link>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Please mention your JEE Application number in the email subject.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Online Payment Gateway</h3>
                  <p className="text-sm text-muted-foreground">
                    Pay through Internet Banking/Credit Card/Debit Card using our E-Pay system
                  </p>
                  <Link
                    href="https://ais.tact.ac.in"
                    className="block w-full"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="https://ais.tact.ac.in/ais/studportal/newstudreporting/epaysteps1.jpg"
                      alt="E-Pay Steps"
                      className="w-full rounded-lg border"
                      width = {1000}
                      height = {1000}
                    />
                  </Link>
                  <Link
                    href="https://ais.tat.ac.in/ais/forgotpassword.jsp?forgotuser=100DEMOMCA"
                    className="text-sm text-primary hover:underline block mt-2"
                  >
                    Click here to get Trident e-Governance userid and password via email
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
export default page