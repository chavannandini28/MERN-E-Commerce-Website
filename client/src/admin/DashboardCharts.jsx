import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const DashboardCharts = ({
  salesData = [],
  orderData = [],
  userData = [],
}) => {
  const COLORS = [
    "#0d6efd",
    "#198754",
    "#ffc107",
    "#dc3545",
    "#6f42c1",
    "#20c997",
  ];

  return (
    <div className="container-fluid mt-4">
      <div className="row">

        {/* Monthly Sales */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-header bg-white">
              <h5 className="fw-bold mb-0">
                Monthly Sales
              </h5>
            </div>

            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Bar
                    dataKey="sales"
                    fill="#0d6efd"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Monthly Orders */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-header bg-white">
              <h5 className="fw-bold mb-0">
                Monthly Orders
              </h5>
            </div>

            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={orderData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#198754"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* User Distribution */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-header bg-white">
              <h5 className="fw-bold mb-0">
                User Distribution
              </h5>
            </div>

            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {userData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[index % COLORS.length]
                        }
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-header bg-white">
              <h5 className="fw-bold mb-0">
                Revenue Trend
              </h5>
            </div>

            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#dc3545"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardCharts;