"use client";
import Modal from "@/components/AddNewCardModal";
import Card from "@/components/Card";
import Droppable from "@/components/Droppable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cards, setCards] = useState([
    { parent: "0", id: "0", taskName: "Test" },
  ]);
  const containers = ["0", "1", "2", "3", "4", "5"];

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
    setIsModalOpen(true);
  };

  const handleModalSubmit = (formData: { taskName: string }) => {
    const newCardId = cards.length.toString();
    setCards((cards) => [
      ...cards,
      { id: newCardId, parent: "0", taskName: formData.taskName },
    ]);
  };

  return (
    <div className="bg-white h-screen flex flex-col items-center justify-center">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 mt-32 bg-amber-400 flex-1 overflow-y-auto h-96">
          {containers.map((id) => (
            <div className="bg-cyan-700 flex flex-1 h-full flex-col" key={id}>
              <Droppable key={id} id={id}>
                {findCards(id).map((card) => (
                  <Card
                    id={card.id}
                    key={card.id}
                    parent={card.parent}
                    taskName={card.taskName}
                  />
                ))}
              </Droppable>
            </div>
          ))}
        </div>
      </DndContext>
      <button onClick={onButtonClick} className="text-black">
        Add a job
      </button>
      <Modal
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        isOpen={isModalOpen}
      />
    </div>
  );
};

export default Home;
