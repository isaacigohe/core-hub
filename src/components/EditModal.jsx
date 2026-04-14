import { useState } from "react";

function EditModal({ movie, onSave }) {
  const [rating, setRating] = useState(movie.rating);
  const [notes, setNotes] = useState(movie.notes);

  return (
    <div className="modal">
      <h2>Edit Movie</h2>

      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button onClick={() => onSave({ rating, notes })}>
        Save
      </button>
    </div>
  );
}

export default EditModal;