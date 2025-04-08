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

  app.post('/jobs', async (req, res) => {
    const { title, company, date, status, description } = req.body;
    try {
      const [result] = await db.query(
        'INSERT INTO jobs (title, company, date, status, description) VALUES (?, ?, ?, ?, ?)',
        [title, company, date, status, description]
      );
      res.status(201).json({ id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: 'Failed to create job' });
    }
  });
    
  app.delete('/jobs/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await db.query('DELETE FROM jobs WHERE id = ?', [id]);
      res.json({ message: 'Job deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete job' });
    }
  });
  
  // Get job by ID
app.get('/jobs/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await db.query('SELECT * FROM jobs WHERE id = ?', [id]);
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch job' });
    }
  });
  
  // Update job by ID
  app.put('/jobs/:id', async (req, res) => {
    const jobId = req.params.id;
    const { title, company, date, status, description } = req.body;
  
    try {
      const [result] = await db.query(
        'UPDATE jobs SET title = ?, company = ?, date = ?, status = ?, description = ? WHERE id = ?',
        [title, company, date, status, description, jobId]
      );
  
      if (result.affectedRows > 0) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: 'Job not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update job' });
    }
  });
  
  
  

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
