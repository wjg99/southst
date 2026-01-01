const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory database (will use file for persistence)
const DB_FILE = path.join(__dirname, 'lenders.json');
const QUOTES_FILE = path.join(__dirname, 'quotes.json');

// Initialize database
let lenders = [];
let quotes = [];

// Load lenders from file
function loadLenders() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      lenders = JSON.parse(data);
      console.log(`Loaded ${lenders.length} lenders from database`);
    }
  } catch (error) {
    console.error('Error loading lenders:', error);
  }
}

// Load quotes from file
function loadQuotes() {
  try {
    if (fs.existsSync(QUOTES_FILE)) {
      const data = fs.readFileSync(QUOTES_FILE, 'utf8');
      quotes = JSON.parse(data);
      console.log(`Loaded ${quotes.length} quotes from database`);
    }
  } catch (error) {
    console.error('Error loading quotes:', error);
  }
}

// Save lenders to file
function saveLenders() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(lenders, null, 2));
  } catch (error) {
    console.error('Error saving lenders:', error);
  }
}

// Save quotes to file
function saveQuotes() {
  try {
    fs.writeFileSync(QUOTES_FILE, JSON.stringify(quotes, null, 2));
  } catch (error) {
    console.error('Error saving quotes:', error);
  }
}

// Initialize on startup
loadLenders();
loadQuotes();

// API Routes

// Get all lenders
app.get('/api/lenders', (req, res) => {
  res.json(lenders);
});

// Add new lender
app.post('/api/lenders', (req, res) => {
  const newLender = {
    ...req.body,
    id: Date.now()
  };
  lenders.push(newLender);
  saveLenders();
  res.json(newLender);
});

// Update lender
app.put('/api/lenders/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = lenders.findIndex(l => l.id === id);
  
  if (index !== -1) {
    lenders[index] = { ...req.body, id };
    saveLenders();
    res.json(lenders[index]);
  } else {
    res.status(404).json({ error: 'Lender not found' });
  }
});

// Delete lender
app.delete('/api/lenders/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = lenders.findIndex(l => l.id === id);
  
  if (index !== -1) {
    lenders.splice(index, 1);
    saveLenders();
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Lender not found' });
  }
});

// Bulk import lenders
app.post('/api/lenders/import', (req, res) => {
  const newLenders = req.body.lenders.map((lender, index) => ({
    ...lender,
    id: Date.now() + index
  }));
  lenders = newLenders;
  saveLenders();
  res.json({ count: lenders.length });
});

// QUOTE ROUTES

// Get all quotes
app.get('/api/quotes', (req, res) => {
  res.json(quotes);
});

// Add new quote
app.post('/api/quotes', (req, res) => {
  const newQuote = {
    ...req.body,
    id: Date.now()
  };
  quotes.push(newQuote);
  saveQuotes();
  res.json(newQuote);
});

// Update quote
app.put('/api/quotes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = quotes.findIndex(q => q.id === id);
  
  if (index !== -1) {
    quotes[index] = { ...req.body, id };
    saveQuotes();
    res.json(quotes[index]);
  } else {
    res.status(404).json({ error: 'Quote not found' });
  }
});

// Delete quote
app.delete('/api/quotes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = quotes.findIndex(q => q.id === id);
  
  if (index !== -1) {
    quotes.splice(index, 1);
    saveQuotes();
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Quote not found' });
  }
});

// Bulk import quotes
app.post('/api/quotes/import', (req, res) => {
  const newQuotes = req.body.quotes.map((quote, index) => ({
    ...quote,
    id: Date.now() + index
  }));
  quotes = newQuotes;
  saveQuotes();
  res.json({ count: quotes.length });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

