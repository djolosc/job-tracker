import { FC, useState } from "react";

interface AddNewCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: { taskName: string }) => void;
}

const AddNewCardModal: FC<AddNewCardModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({ taskName: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.taskName) return;
    onSubmit(formData);
    setFormData({ taskName: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="bg-gray-100 p-6 rounded-xl shadow-lg relative w-[400px]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black hover:text-black hover:cursor-pointer"
        >
          ✕
        </button>
        <h2 className="text-lg font-bold mb-4 text-black">Fill in your data</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task name"
            className="border rounded p-2"
            value={formData.taskName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, taskName: e.target.value }))
            }
          />

          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewCardModal;
