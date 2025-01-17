const page = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen flex justify-center items-center py-10">
        <div className="max-w-lg w-full bg-white border border-gray-200 rounded-lg shadow-md p-6">
          <div className="flex justify-center items-center">
            <div className="w-28 h-10 overflow-hidden flex justify-center items-center rounded-lg">
              <img
                className="object-cover "
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT-Bi_XCuqLB4Jw4KzdbqSbJA8Ex62VDes1g&s"
              />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-center text-blue-600">
            Payment Receipt
          </h2>
          <p className="text-lg text-gray-800 mt-4">Dear ABC,</p>
          <p className="text-sm text-gray-600 mt-2">
            Thank you for your fee payment. Below are the details of your
            transaction:
          </p>

          {/* Transaction Details Table */}
          <div className="overflow-x-auto mt-6">
            <table className="w-full border-collapse border border-gray-200 text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border border-gray-200 font-medium">
                    Details
                  </th>
                  <th className="px-4 py-2 border border-gray-200 font-medium">
                    Information
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border border-gray-200">
                    MR Number
                  </td>
                  <td className="px-4 py-2 border border-gray-200">4587</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200">Name</td>
                  <td className="px-4 py-2 border border-gray-200">ABC</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200">
                    Amount Paid
                  </td>
                  <td className="px-4 py-2 border border-gray-200">₹20000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-600 mt-4">
            Your payment receipt is attached for your reference.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            If you have any questions or concerns, feel free to contact our
            support team at{' '}
            <a href="tel:9123456789" className="text-blue-600 hover:underline">
              9123456789
            </a>
            .
          </p>

          <p className="text-lg text-gray-800 mt-6">
            Best Regards,
            <br />
            Accounts Department
            <br />
            Trident Group of Institutions
          </p>
        </div>
      </div>
    </>
  );
};

export default page;
