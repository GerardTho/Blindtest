const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const videosDir = path.join(__dirname, 'public/videos');

// Serve static files
app.use(express.static('public'));

// Endpoint to list videos
app.get('/api/videos', (req, res) => {
    fs.readdir(videosDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read video directory' });
        }
        const mp4Files = files.filter(file => file.endsWith('.mp4'));
        res.json(mp4Files);
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
