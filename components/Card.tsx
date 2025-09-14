"use client";

import { FC, useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core";

interface CardProps {
  children?: React.ReactNode;
  id: string;
  parent: string;
  taskName: string;
}

const Card: FC<CardProps> = ({ taskName, id, parent }) => {
  const [mounted, setMounted] = useState(false);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: {
      id: id,
      parent: parent,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-4 bg-amber-400 rounded text-zinc-700 w-36 h-36"
    >
      {taskName}
    </div>
  );
};

export default Card;
