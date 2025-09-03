"use client";
import { useDroppable } from "@dnd-kit/core";
import { FC } from "react";

interface DroppableProps {
  children?: React.ReactNode;
  id: string;
}

const Droppable: FC<DroppableProps> = ({ children, id }) => {
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
      className="p-4 bg-zinc-200 rounded text-zinc-700 w-40 flex flex-col items-center justify-start gap-2"
    >
      {children}
    </div>
  );
};

export default Droppable;
