"use client";
import { useDroppable } from "@dnd-kit/core";
import { FC } from "react";

interface DroppableProps {
  children?: React.ReactNode;
  id: string;
  headlineDetails: {
    name: string;
    bgColor: string;
    color: string;
  };
}

const Droppable: FC<DroppableProps> = ({ children, id, headlineDetails }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-50 flex flex-col items-center rounded-2xl bg-white"
    >
      <p
        className={`font-semibold text-3xl p-4 ${headlineDetails.bgColor} ${headlineDetails.color} w-full rounded-t-2xl`}
      >
        {headlineDetails.name}
      </p>
      <div className=" flex flex-col gap-2 py-4 min-h-50">{children}</div>
    </div>
  );
};

export default Droppable;
