const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Data storage file
const dataFile = path.join(__dirname, 'data', 'journal.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Initialize journal file if it doesn't exist
if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([]));
}

// Helper functions
function readJournalEntries() {
    try {
        const data = fs.readFileSync(dataFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading journal entries:', error);
        return [];
    }
}

function writeJournalEntries(entries) {
    try {
        fs.writeFileSync(dataFile, JSON.stringify(entries, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing journal entries:', error);
        return false;
    }
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Routes
app.get('/', (req, res) => {
    const entries = readJournalEntries();
    const sortedEntries = entries.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.render('index', { entries: sortedEntries, formatDate });
});

app.get('/new', (req, res) => {
    res.render('new-entry');
});

app.post('/new', (req, res) => {
    const { title, content, mood, activities } = req.body;
    
    if (!title || !content) {
        return res.render('new-entry', { 
            error: 'Title and content are required!',
            title,
            content,
            mood,
            activities
        });
    }

    const entries = readJournalEntries();
    const newEntry = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        mood: mood || 'neutral',
        activities: activities ? activities.split(',').map(a => a.trim()).filter(a => a) : [],
        date: new Date().toISOString(),
        createdAt: new Date().toISOString()
    };

    entries.push(newEntry);
    
    if (writeJournalEntries(entries)) {
        res.redirect('/');
    } else {
        res.render('new-entry', { 
            error: 'Failed to save entry. Please try again.',
            title,
            content,
            mood,
            activities
        });
    }
});

app.get('/entry/:id', (req, res) => {
    const entries = readJournalEntries();
    const entry = entries.find(e => e.id === req.params.id);
    
    if (!entry) {
        return res.status(404).send('Entry not found');
    }
    
    res.render('entry', { entry, formatDate });
});

app.get('/edit/:id', (req, res) => {
    const entries = readJournalEntries();
    const entry = entries.find(e => e.id === req.params.id);
    
    if (!entry) {
        return res.status(404).send('Entry not found');
    }
    
    res.render('edit-entry', { entry });
});

app.post('/edit/:id', (req, res) => {
    const { title, content, mood, activities } = req.body;
    
    if (!title || !content) {
        return res.render('edit-entry', { 
            error: 'Title and content are required!',
            entry: { id: req.params.id, title, content, mood, activities }
        });
    }

    const entries = readJournalEntries();
    const entryIndex = entries.findIndex(e => e.id === req.params.id);
    
    if (entryIndex === -1) {
        return res.status(404).send('Entry not found');
    }

    entries[entryIndex] = {
        ...entries[entryIndex],
        title: title.trim(),
        content: content.trim(),
        mood: mood || 'neutral',
        activities: activities ? activities.split(',').map(a => a.trim()).filter(a => a) : [],
        updatedAt: new Date().toISOString()
    };

    if (writeJournalEntries(entries)) {
        res.redirect(`/entry/${req.params.id}`);
    } else {
        res.render('edit-entry', { 
            error: 'Failed to update entry. Please try again.',
            entry: entries[entryIndex]
        });
    }
});

app.post('/delete/:id', (req, res) => {
    const entries = readJournalEntries();
    const filteredEntries = entries.filter(e => e.id !== req.params.id);
    
    if (writeJournalEntries(filteredEntries)) {
        res.redirect('/');
    } else {
        res.status(500).send('Failed to delete entry');
    }
});

app.get('/search', (req, res) => {
    const { q } = req.query;
    const entries = readJournalEntries();
    
    let filteredEntries = [];
    if (q) {
        const searchTerm = q.toLowerCase();
        filteredEntries = entries.filter(entry => 
            entry.title.toLowerCase().includes(searchTerm) ||
            entry.content.toLowerCase().includes(searchTerm) ||
            entry.activities.some(activity => activity.toLowerCase().includes(searchTerm))
        ).sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    res.render('search', { entries: filteredEntries, query: q, formatDate });
});

// Start server
app.listen(PORT, () => {
    console.log(`Daily Journal app is running on http://localhost:${PORT}`);
});