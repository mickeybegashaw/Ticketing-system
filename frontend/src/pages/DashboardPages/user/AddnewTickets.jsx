import { useState } from "react";
import UseTicket from "../../../hooks/useTicket";

const AddnewTickets = () => {
  const { addTicket } = UseTicket();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Both fields are required!");
      return;
    }

    const newTicket = {
      title,
      description,
    };

    addTicket(newTicket);

    setTitle("");
    setDescription("");
  };

  return (
    <div className="flex flex-col mt-24 p-5 w-full h-screen m-2">
      <h1 className="text-2xl font-semibold">Add New Ticket</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 mt-5 w-full">
          <div className="flex flex-col gap-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter title"
              className="p-2 border border-gray-300 rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter description"
              className="p-2 border border-gray-300 rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-md"
            >
              Add Ticket
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddnewTickets;
