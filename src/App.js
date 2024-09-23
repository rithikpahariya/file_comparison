import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFile1Change = (e) => setFile1(e.target.files[0]);
  const handleFile2Change = (e) => setFile2(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!file1 || !file2) {
      setError('Both file fields must be filled.');
      return;
    }

    if (!file1.name.endsWith('.json') || !file2.name.endsWith('.json')) {
      setError('Only .json files are allowed.');
      return;
    }

    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);

    try {
      const response = await axios.post('http://localhost:4999/compare', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (err) {
      setError('An error occurred while comparing the files.');
    }
  };

  return (
    <div>
      <h1>File Comparison</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFile1Change} />
        <input type="file" onChange={handleFile2Change} />
        <button type="submit">Compare Files</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
};

export default App;
