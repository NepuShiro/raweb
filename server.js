// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const os = require('os');
const app = express();
const { getRDPValue } = require('./rdpHandler');
const { generateXMLFeed } = require('./generateXML');

const PORT = process.env.PORT || 3000;

let baseDir;

if (process.pkg) {
    baseDir = path.dirname(process.execPath);
} else {
    baseDir = __dirname;
}

app.use(express.static(path.join(baseDir, 'public')));

app.get('/', (req, res) => {
    const rdpFolderPath = path.join(baseDir, 'public', 'rdp');
    const files = fs.readdirSync(rdpFolderPath);
    let htmlContent = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');

    files.forEach(file => {
        if (path.extname(file).toLowerCase() === '.rdp') {
            const filePath = path.join(rdpFolderPath, file);
            const fullAddress = getRDPValue(filePath, 'full address:s:');
            if (fullAddress) {
                const basefilename = path.basename(file, '.rdp');
                const appname = getRDPValue(filePath, "remoteapplicationname:s:") || basefilename;
                const pngname = basefilename + ".ico";
                const pngpath = fs.existsSync(path.join(baseDir, 'public', 'icon', pngname)) ? `icon/${pngname}` : "rdpicon.png";

                const appTile = `
                <div class="app-tile">
                    <a href="/rdp/${file}">
                        <img alt="${appname}" border="0" height="64" width="64" src="${pngpath}">
                        <h3>${appname}</h3>
                    </a>
                </div>
                <!-- Dynamic content will be inserted here -->
                `;

                htmlContent = htmlContent.replace('<!-- Dynamic content will be inserted here -->', appTile);
            }
        }
    });

    res.send(htmlContent);
});

// Route to generate the XML feed for /webfeed.aspx
app.get('/webfeed.aspx', (req, res) => {
    generateXMLFeed(res);
});

// Route to generate the XML feed for /rdweb/feed/webfeed.aspx
app.get('/rdweb/feed/webfeed.aspx', (req, res) => {
    generateXMLFeed(res);
});

// Route to generate the XML feed for /api/feeddiscovery/webfeeddiscovery.aspx
app.get('/api/feeddiscovery/webfeeddiscovery.aspx', (req, res) => {
    generateXMLFeed(res);
});

// Route to serve RDP files
app.get('/rdp/:filename', (req, res) => {
    const rdpFolderPath = path.join(baseDir, 'public', 'rdp');
    const filePath = path.join(rdpFolderPath, req.params.filename);

    if (fs.existsSync(filePath)) {
        res.setHeader('Content-Type', 'application/x-rdp');
        res.sendFile(filePath);
    } else {
        res.status(404).send('File not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});