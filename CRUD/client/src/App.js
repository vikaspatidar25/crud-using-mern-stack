import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  // Fetch all items initially
  useEffect(() => {
    fetchItems();
  }, []);

  // Function to fetch all items
  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/userroutes/getuser');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  // Create new item
  const handleCreate = async () => {
    const newItem = { name, description };

    try {
      // POST request to create new item
      await fetch('http://localhost:5000/api/userroutes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      fetchItems();

      // Reset form fields
      setName('');
      setDescription('');
    } catch (err) {
      console.error('Error creating item:', err);
    }
  };

  // Update existing item
  const handleUpdate = async () => {
    const updatedItem = { name, description };

    try {
      // PUT request to update the item
      await fetch(`http://localhost:5000/api/userroutes/update/${editItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      fetchItems();

      // Reset form fields
      setName('');
      setDescription('');
      setEditMode(false);
      setEditItemId(null);
    } catch (err) {
      console.error('Error updating item:', err);
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    try {
      // DELETE request to delete item
      await fetch(`http://localhost:5000/api/userroutes/delete/${id}`, {
        method: 'DELETE',
      });
      fetchItems();
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  // Set the form for editing an item
  const handleEdit = (item) => {
    setName(item.name);
    setDescription(item.description);
    setEditMode(true);
    setEditItemId(item._id);
  };

  return (
    <div className="container">
      <div className='justify-content-center'>
        <h1 className='d-flex justify-content-center mt-2'>CRUD Application</h1>
        <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Item Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} class="form-control" id="exampleFormControlInput1" placeholder="Enter Item Name"/>
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Item Name</label>
        <input type="text"  value={description} onChange={(e) => setDescription(e.target.value)}  class="form-control" id="exampleFormControlInput1" placeholder="Enter Item Name"/>
      </div>
      {editMode ? (
          <button className='btn btn-primary' onClick={handleUpdate}>Update Item</button>
        ) : (
          <button className='btn btn-primary' onClick={handleCreate}>Add Item</button>
        )}
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <button className='btn btn-primary mx-1' onClick={() => handleEdit(item)}>Edit</button>
                <button className='btn btn-danger' onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;
