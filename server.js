const express = require('express');
const app = express();
const cors = require('cors');
const ytdl = require('ytdl-core');

app.use(cors());

app.get('/download', async (req, res) => {
    const videoId = req.query.url;
    try {
        const info = await ytdl.getInfo(videoId);
        const formats = ytdl.filterFormats(info.formats, 'audioandvideo');

        const downloadLinks = formats.map(format => ({
            format: format.container,
            url: format.url
        }));

        res.json(downloadLinks);
    } catch (error) {
        console.error('Error fetching video info:', error);
        res.status(500).json({ error: 'Failed to fetch download links' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
