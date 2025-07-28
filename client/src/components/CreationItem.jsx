import React, { useState } from "react";
import Markdown from "react-markdown";

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer "
    >
      <div className="flex items-center justify-between gap-4 ">
        <div>
          <h2>{item.prompt}</h2>
          <p className="text-gray-500">
            {item.type} -{" "}
            {(() => {
              try {
                const date = new Date(item.createdAt);
                return isNaN(date.getTime())
                  ? "Invalid date"
                  : date.toDateString();
              } catch {
                return "Invalid date";
              }
            })()}
          </p>
        </div>
        <button className="bg-[var(--color-primary)] text-white px-4 py-2 rounded">
          {item.type}
        </button>
      </div>
      {expanded && (
        <div>
          {item.type === "image" ? (
            <div className="mt-3 w-full max-w-md">
              <img src={item.content} alt="image" />
            </div>
          ) : (
            <div className="reset-tw">
              <Markdown>{item.content}</Markdown>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
