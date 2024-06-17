const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/download', async (req, res) => {
    try {
        const videoUrl = req.query.url;
        if (!ytdl.validateURL(videoUrl)) {
            throw new Error('Invalid YouTube URL');
        }

        const info = await ytdl.getInfo(videoUrl);
        const formats = ytdl.filterFormats(info.formats, 'audioandvideo');

        if (formats.length === 0) {
            throw new Error('No video formats available');
        }

        const videoStream = ytdl(videoUrl, {
            quality: 'highest'
        });

        res.setHeader('Content-Disposition', `attachment; filename="${info.title}.mp4"`);
        videoStream.pipe(res);
    } catch (err) {
        console.error('Error downloading video:', err.message);
        res.status(500).send('Failed to fetch video');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
