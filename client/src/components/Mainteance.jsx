import React, { useEffect, useRef } from "react";
import { AlertTriangle, Clock, Wrench, Zap, EraserIcon } from "lucide-react";

const Maintenance = ({ name }) => {
  const maintenanceItems = [
    {
      id: 1,
      title: "Image Generation",
      status: "In Development",
      message: "Enhancing image quality and adding new styles",
      icon: <Wrench className="w-4 h-4" />,
    },
    {
      id: 2,
      title: "Remove Background",
      status: "IN Development",
      message: "Removing background from images",
      icon: <EraserIcon className="w-4 h-4" />,
    },
    {
      id: 3,
      title: "Remove Object",
      status: "In Development",
      message: "Removing objects from images",
      icon: <EraserIcon className="w-4 h-4" />,
    },
    {
      id: 4,
      title: "Review Resume",
      status: "In Development",
      message: "Reviewing resumes and providing feedback",
      icon: <Zap className="w-4 h-4" />,
    },
  ];

  const scrollContainer = useRef(null);

  useEffect(() => {
    const scroll = () => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollLeft += 1;
        if (
          scrollContainer.current.scrollLeft >=
          scrollContainer.current.scrollWidth -
            scrollContainer.current.clientWidth
        ) {
          scrollContainer.current.scrollLeft = 0;
        }
      }
    };

    const scrollInterval = setInterval(scroll, 30);
    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="top-0 left-0 right-0 z-50 bg-yellow-50 border-t border-yellow-200 py-2">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 flex items-center">
            <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium text-yellow-800">
              {name} Feature is under Maintenance:
            </span>
          </div>
          <div
            ref={scrollContainer}
            className="flex-1 overflow-hidden whitespace-nowrap"
          >
            <div className="inline-flex space-x-8 px-2">
              {[...maintenanceItems, ...maintenanceItems].map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="inline-flex items-center space-x-4"
                >
                  <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full border border-yellow-200 text-xs">
                    <div className="text-yellow-600">{item.icon}</div>
                    <span className="font-medium text-gray-800">
                      {item.title}
                    </span>
                    <span className="text-yellow-700">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
