import { FaFileAlt, FaCheckCircle, FaClock } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
// import LogoutButton from "../components/LogoutButton";

const Dashboard = () => {
  // Sample data for cards
  const totalTenders = 50;
  const publishedTenders = 35;
  const ongoingTenders = 15;

  // Sample data for Pie Chart
  const tenderData = [
    { name: "Published", value: 35 },
    { name: "Ongoing", value: 10 },
    { name: "Completed", value: 5 },
  ];
  const COLORS = ["#4CAF50", "#FF9800", "#2196F3"];

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Tenders */}
        <div className="bg-blue-500 text-white p-5 rounded-lg flex items-center space-x-3">
          <FaFileAlt size={30} />
          <div>
            <h2 className="text-xl font-semibold">Total Tenders</h2>
            <p className="text-2xl">{totalTenders}</p>
          </div>
        </div>

        {/* Published Tenders */}
        <div className="bg-green-500 text-white p-5 rounded-lg flex items-center space-x-3">
          <FaCheckCircle size={30} />
          <div>
            <h2 className="text-xl font-semibold">Published Tenders</h2>
            <p className="text-2xl">{publishedTenders}</p>
          </div>
        </div>

        {/* Ongoing Tenders */}
        <div className="bg-orange-500 text-white p-5 rounded-lg flex items-center space-x-3">
          <FaClock size={30} />
          <div>
            <h2 className="text-xl font-semibold">Ongoing Tenders</h2>
            <p className="text-2xl">{ongoingTenders}</p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-10 flex justify-center">
        <PieChart width={400} height={300}>
          <Pie
            data={tenderData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {tenderData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default Dashboard;
