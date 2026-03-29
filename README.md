# Daily Journal App 📖

A Node.js web application for logging your daily activities and thoughts, built with Express and EJS.

## Features

✨ **Core Features:**
- Create, read, update, and delete journal entries
- Track your mood with each entry
- Tag activities for better organization
- Search through your entries
- Beautiful, responsive web interface
- Auto-save drafts while writing

🎨 **Design:**
- Modern glassmorphism design
- Mobile-responsive layout
- Emoji mood indicators
- Activity tags with color coding
- Clean typography and spacing

🔍 **Search & Organization:**
- Full-text search through titles, content, and activities
- Chronological entry listing
- Activity-based filtering
- Entry statistics

## Installation

1. **Clone or download** this project to your local machine

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the application:**
   ```bash
   npm start
   ```

   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

### Creating Entries
1. Click "New Entry" or the ✏️ button
2. Fill in:
   - **Title**: A brief description of your day
   - **Mood**: How you're feeling (optional)
   - **Activities**: Comma-separated list of what you did
   - **Content**: Detailed description of your day
3. Click "Save Entry"

### Managing Entries
- **View**: Click on any entry title to read the full content
- **Edit**: Use the "Edit" button on any entry
- **Delete**: Use the "Delete" button (with confirmation)
- **Search**: Use the search box to find specific entries

### Search Tips
- Search for activities: "exercise", "work", "cooking"
- Search for moods: "happy", "sad", "excited"
- Search for specific events or people mentioned in entries
- Use keywords to find patterns in your daily life

## File Structure

```
daily-journal-app/
├── app.js                 # Main application server
├── package.json           # Project dependencies
├── README.md              # This file
├── data/
│   └── journal.json       # Your journal entries (auto-created)
└── views/
    ├── layout.ejs         # Main layout template
    ├── index.ejs          # Home page (entry list)
    ├── new-entry.ejs      # New entry form
    ├── edit-entry.ejs     # Edit entry form
    ├── entry.ejs          # Single entry view
    └── search.ejs         # Search page
```

## Data Storage

- Journal entries are stored in `data/journal.json`
- Data persists between application restarts
- Each entry includes:
  - Unique ID
  - Title and content
  - Mood and activities
  - Creation and modification timestamps

## Customization

### Changing the Port
Set the `PORT` environment variable:
```bash
set PORT=8080
npm start
```

### Adding New Moods
Edit the mood options in:
- `views/new-entry.ejs`
- `views/edit-entry.ejs`
- Update the mood colors in both templates

### Styling
- All styles are in `views/layout.ejs`
- Modify the CSS variables at the top to change colors
- The design uses CSS Grid and Flexbox for layout

## Dependencies

- **express**: Web framework
- **ejs**: Template engine
- **body-parser**: Form data parsing

## Development

For development with auto-restart on file changes:
```bash
npm run dev
```

This uses `nodemon` to automatically restart the server when you make changes.

## Tips

1. **Regular Backups**: Copy your `data/journal.json` file regularly
2. **Privacy**: This app runs locally - your data stays on your machine
3. **Consistency**: Try to write entries regularly for the best experience
4. **Activities**: Use consistent activity names for better searchability

## Troubleshooting

**App won't start:**
- Make sure Node.js is installed (`node --version`)
- Run `npm install` to install dependencies

**Can't access the app:**
- Check that it's running on the correct port
- Try accessing `http://127.0.0.1:3000` instead

**Lost entries:**
- Check if `data/journal.json` exists
- Look for backup files in the data directory

## Future Enhancements

Some ideas for extending the app:
- Export entries to PDF or text files
- Add photos to entries
- Calendar view of entries
- Data visualization (mood trends, activity patterns)
- Import/export functionality
- Multiple journals/categories

Enjoy journaling! 🌟