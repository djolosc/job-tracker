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
      className="bg-zinc-200 rounded w-40 flex flex-col items-center flex-1"
    >
      <p>Headline</p>
      <div className="flex-1 overflow-y flex flex-col gap-2">{children}</div>
    </div>
  );
};

export default Droppable;
