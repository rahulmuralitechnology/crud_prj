import React, { useState, useEffect } from 'react'

export default function View() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title : '',
    description : ''
  });

  const apiUrl = 'http://127.0.0.1:8000/api/todos/';

  const getData = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    setData(data);
  };

    const createData = async () => {
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    getData();
  };

    const updateData = async (id) => {
    await fetch(`${apiUrl}${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    getData();
  };

    const deleteData = async (id) => {
    await fetch(`${apiUrl}${id}/`, {
      method: 'DELETE'
    });
    getData();
  };

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createData();
  };

    useEffect(() => {
    getData();
  }, []);



  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
        <input  type="text" name="title" placeholder="  title" value={formData.title} onChange={handleChange} />
        </label>
        <label>
          Description:
          <input  type="text" name="description" placeholder="  description" value={formData.description} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />

      </form>
      <table>
        <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
            </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                <button onClick={() => updateData(item.id)}>Update</button>
                <button onClick={() => deleteData(item.id)}>Delete</button>
              </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
