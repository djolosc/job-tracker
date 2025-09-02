"use client";
import Card from "@/components/Card";
import Droppable from "@/components/Droppable";
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { useState } from "react";

const Home = () => {
  const [droppableId, setDroppableId] = useState<UniqueIdentifier | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id) {
      setDroppableId(event.over.id);
    }
  };

  const draggableMarkup = (
    <div>
      <Card>Drag me</Card>
    </div>
  );

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd}>
        {!droppableId ? draggableMarkup : null}
        <Droppable id="1">
          {droppableId && droppableId === "1" ? draggableMarkup : "Drop here 1"}
        </Droppable>
        <Droppable id="2">
          {droppableId && droppableId === "2" ? draggableMarkup : "Drop here 2"}
        </Droppable>
      </DndContext>
    </div>
  );
};

export default Home;
