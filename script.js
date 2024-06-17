function downloadVideo() {
    const videoUrl = document.getElementById('videoUrl').value.trim();

    if (!videoUrl) {
        alert('Please enter a valid YouTube video URL');
        return;
    }

    // Example URL: https://www.youtube.com/watch?v=video_id
    const videoId = extractVideoId(videoUrl);
    const downloadUrl = `https://your-download-server.com/download?url=${videoId}`;

    // Assuming your server returns direct download links for different formats
    fetch(downloadUrl)
        .then(response => response.json())
        .then(data => {
            const downloadLinksDiv = document.getElementById('downloadLinks');
            downloadLinksDiv.innerHTML = '';

            data.forEach(link => {
                const anchor = document.createElement('a');
                anchor.href = link.url;
                anchor.textContent = `Download ${link.format}`;
                anchor.download = `video.${link.format}`;
                anchor.classList.add('download-link');
                downloadLinksDiv.appendChild(anchor);
                downloadLinksDiv.appendChild(document.createElement('br'));
            });
        })
        .catch(error => {
            console.error('Error fetching download links:', error);
            alert('Failed to fetch download links. Please try again later.');
        });
}

function extractVideoId(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
}
