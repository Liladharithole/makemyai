import React from "react";
import { Wrench, Clock, Zap, Mail } from "lucide-react";

const Creations = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-2xl w-full text-center bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <Wrench className="w-12 h-12 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Under Maintenance
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          This page is currently under maintenance. We'll be back soon with
          exciting new features.
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center space-x-3">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700">
              Estimated completion: 3-4 Days
            </span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Zap className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700">
              New features and improvements in progress
            </span>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center justify-center">
            <Mail className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex items-center justify-center">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Stay Updated
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                We'll notify you when we're back. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creations;
