import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyCreationData } from "../assets/assets";
import {
  Gem,
  Sparkles,
  FileText,
  Image as ImageIcon,
  Clock,
  HardDrive,
  Eye,
  Eraser,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  CheckCircle2,
  TrendingUp,
  FileQuestion,
  Lightbulb,
} from "lucide-react";
import { Protect, useUser } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";

// Mock data for the dashboard
const stats = {
  totalCreations: 24,
  storageUsed: "1.2 GB",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [creation, setCreation] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  // Get dashboard data
  const getDashboardData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setCreation(dummyCreationData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  // Quick actions
  const quickActions = [
    {
      title: "New Article",
      icon: FileText,
      action: () => navigate("/ai/write-article"),
      color: "text-blue-500 bg-blue-50 hover:bg-blue-100",
    },
    {
      title: "Generate Image",
      icon: ImageIcon,
      action: () => navigate("/ai/generate-images"),
      color: "text-purple-500 bg-purple-50 hover:bg-purple-100",
    },
    {
      title: "Remove Background",
      icon: Eraser,
      action: () => navigate("/ai/remove-background"),
      color: "text-green-500 bg-green-50 hover:bg-green-100",
    },
    {
      title: "Review Resume",
      icon: FileText,
      action: () => navigate("/ai/review-resume"),
      color: "text-amber-500 bg-amber-50 hover:bg-amber-100",
    },
  ];

  // Stats cards
  const statCards = [
    {
      title: "Total Creations",
      value: stats.totalCreations,
      icon: Sparkles,
      change: "+12%",
      trend: "up",
      color: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
      borderColor: "border-blue-100",
    },

    {
      title: "Storage Used",
      value: stats.storageUsed,
      icon: HardDrive,
      change: "25%",
      trend: "up",
      color: "bg-gradient-to-br from-green-50 to-green-100",
      iconColor: "text-green-600",
      borderColor: "border-green-100",
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-6 bg-gray-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">
            Welcome back, {user?.firstName || "User"}
          </p>
        </div>
        <div
          className="mt-4 md:mt-0
        flex items-center space-x-2"
        >
          <button
            onClick={() => navigate("/ai/write-article")}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Creation
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`p-6 bg-white rounded-xl border ${stat.borderColor} shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
                <div
                  className={`mt-2 inline-flex items-center text-sm ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-amber-500" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${action.color}`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      action.color.replace("text-", "bg-").split(" ")[0] +
                      "-100"
                    }`}
                  >
                    <action.icon
                      className={`w-5 h-5 ${action.color.split(" ")[0]}`}
                    />
                  </div>
                  <span className="ml-3 font-medium text-gray-700">
                    {action.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Creations */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Creations and activities</h3>
              <button
                onClick={() => navigate("/ai/creations")}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                View All <ArrowUpRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : creation.length > 0 ? (
              <div className="space-y-4">
                {creation.slice(0, 4).map((item) => (
                  <CreationItem key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileQuestion className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <h4 className="text-gray-500 font-medium">No creations yet</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Get started by creating something new
                </p>
                <button
                  onClick={() => navigate("/ai/write-article")}
                  className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                >
                  Create Now
                </button>
              </div>
            )}
          </div>

          {/* Tips & Resources */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 rounded-lg mr-4">
                <Lightbulb className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Pro Tip</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Use keyboard shortcuts to work faster. Press{" "}
                  <kbd className="px-2 py-1 bg-white rounded border border-gray-200 text-xs font-mono">
                    ⌘ + N
                  </kbd>{" "}
                  to create a new article.
                </p>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Learn more shortcuts →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
