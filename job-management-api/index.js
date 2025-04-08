const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/jobs', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM jobs');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

app.get('/jobs/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await db.query('SELECT * FROM jobs WHERE id = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Job not found' });
      }
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch job detail' });
    }
  });
  
  
  

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
