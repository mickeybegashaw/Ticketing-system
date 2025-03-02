import { FaTicketAlt } from "react-icons/fa";
import { FaTools } from "react-icons/fa";

const Features = () => {
  return (
    <div className="max-w-6xl px-3  mx-auto">
      <h1 className="text-2xl font-bold uppercase">
        Key Features in this ticketing system
      </h1>
      <div className="flex flex-col md:flex-row gap-10 mt-10">
        <div className="flex flex-col gap-3 w-full md:w-[30%] items-center bg-white p-10">
          <FaTicketAlt size={40} />
          <h1 className="text-xl font-bold text-center">Easy Ticket Creation</h1>
          <p className="text-center">
            Users can quickly submit support tickets with essential details,
            ensuring a smooth issue-reporting process.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-[30%] items-center bg-white p-10">
          <FaTools size={40} />
          <h1 className="text-xl font-bold text-center">Role-Based Management</h1>
          <p className="text-center">
            Admins have full control over ticket assignment, tracking, and
            resolution, while users can monitor their requests.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-[30%] items-center bg-white p-10">
          <FaTicketAlt size={40} />
          <h1 className="text-xl font-bold text-center">
            Real-Time Tracking
          </h1>
          <p className="text-center">
            Stay updated with instant notifications and real-time status updates
            for efficient issue resolution.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
