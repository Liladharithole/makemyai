import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyCreationData } from "../assets/assets";
import { GemIcon, SparkleIcon } from "lucide-react";
import { Protect } from "@clerk/clerk-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const [creation, setCreation] = useState([]);

  // get dashboard data
  const getDashboardData = async () => {
    setCreation(dummyCreationData);
  };

  // get dashboard data on component mount
  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        {/* Total Creations */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600 ">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-2xl font-semibold">{creation.length}</h2>
          </div>
          <div className="p-2 bg-[var(--color-primary)] rounded">
            <SparkleIcon className="w-6 h-6 text-white" />
          </div>
        </div>
        {/* Active Plans */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600 ">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-2xl font-semibold">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="p-2 bg-[var(--color-primary)] rounded">
            <GemIcon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
      {/* Recent Creations */}
      <div className="space-y-3">
        <p className="mt-6 mb-4">Recent Creations</p>
      </div>
    </div>
  );
};

export default Dashboard;
