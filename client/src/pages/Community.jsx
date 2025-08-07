import React, { useEffect, useState } from "react";
import { dummyPublishedCreationData } from "../assets/assets";
import { useUser } from "@clerk/clerk-react";
import { HeartIcon, SparklesIcon } from "lucide-react";

const Community = () => {
  const [creation, setCreation] = useState([]);
  const { user } = useUser();

  const fetchCreation = async () => {
    setCreation(dummyPublishedCreationData);
  }; 

  useEffect(() => {
    if (user) {
      fetchCreation();
    }
  }, [user]);



  return (
    <div className="flex-1 min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Community Creations</h1>
            <p className="text-gray-600 mt-2">Explore and get inspired by creations from our community</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <select className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent">
              <option>Sort by: Newest</option>
              <option>Most Liked</option>
              <option>Trending</option>
            </select>
            <button className="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
              Upload
            </button>
          </div>
        </div>

        {creation.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creation.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
              >
                <div className="relative aspect-square">
                  <img
                    src={item.content}
                    alt={item.prompt || 'Community creation'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <p className="text-white text-sm line-clamp-2">
                      {item.prompt}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                        <span className="text-xs text-gray-200">{item.user}</span>
                      </div>
                      <button 
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                          item.likes?.includes(user?.id) 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <HeartIcon className="w-4 h-4" />
                        <span>{item.likes?.length || 0}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <SparklesIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No creations yet</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Be the first to share your creation with the community!
            </p>
            <button className="mt-6 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
              Upload Your First Creation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
