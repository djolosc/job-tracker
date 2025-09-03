"use client";
import Card from "@/components/Card";
import Droppable from "@/components/Droppable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";

const Home = () => {
  const [cards, setCards] = useState([{ parent: "0", id: "0" }]);
  const containers = ["0", "1", "2", "3"];

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;

    const cardId = event.active.data.current?.id as string;
    const contiainerId = over?.id as string;

    if (!cardId || !contiainerId) return;
    setCards((cards) =>
      cards.map((card) =>
        card.id === cardId ? { ...card, parent: contiainerId } : card
      )
    );
  };

  const findCards = (id: string) => cards.filter((card) => card.parent === id);

  const onButtonClick = () => {
    const newCardId = cards.length.toString();
    setCards((cards) => [...cards, { id: newCardId, parent: "0" }]);
  };

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 mb-4">
          {containers.map((id) => (
            <Droppable key={id} id={id}>
              {findCards(id).map((card) => (
                <Card id={card.id} key={card.id} parent={card.parent} />
              ))}
            </Droppable>
          ))}
        </div>
      </DndContext>
      <button onClick={onButtonClick}>Add a new card</button>
    </div>
  );
};

export default Home;
