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

  const containers = [
    {
      id: "0",
      headlineDetails: {
        name: "Whishlist",
        bgColor: "bg-gray-200",
        color: "text-black",
      },
    },
    {
      id: "1",
      headlineDetails: {
        name: "Applied",
        bgColor: "bg-blue-500",
        color: "text-white",
      },
    },
    {
      id: "2",
      headlineDetails: {
        name: "Interview",
        bgColor: "bg-yellow-200",
        color: "text-black",
      },
    },
    {
      id: "3",
      headlineDetails: {
        name: "Offer",
        bgColor: "bg-green-600",
        color: "text-white",
      },
    },
    {
      id: "4",
      headlineDetails: {
        name: "Rejected",
        bgColor: "bg-red-400",
        color: "text-white",
      },
    },
  ];

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
    <div className="bg-gray-100 h-screen flex flex-col items-center pt-16 pb-8">
      <div>
        <p className="self-start text-4xl font-semibold">Job Tracker</p>
        <button
          onClick={onButtonClick}
          className="bg-gray-200 mt-12 h-14 w-full text-2xl text-gray-500 rounded-xl text-left pl-4 hover:cursor-pointer"
        >
          + Add job
        </button>
        <DndContext onDragEnd={handleDragEnd}>
          <div className="flex gap-4 mt-8 flex-1 overflow-y-auto h-full">
            {containers.map((container) => (
              <div className="flex flex-1 flex-col" key={container.id}>
                <Droppable
                  key={container.id}
                  id={container.id}
                  headlineDetails={container.headlineDetails}
                >
                  {findCards(container.id).map((card) => (
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

        <Modal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          isOpen={isModalOpen}
        />
      </div>
    </div>
  );
};

export default Home;
