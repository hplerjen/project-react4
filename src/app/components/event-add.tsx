import { useState } from "react";

export function EventAdd() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  return (
 <div className='container'>
    <form>
    <label>Enter your id:
      <input
        type="text" 
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
    </label>
    <label>Enter your title:
      <input
        type="text" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </label>
    <label>Enter your description:
      <input
        type="text" 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </label>
  </form>
  </div>
);
}

