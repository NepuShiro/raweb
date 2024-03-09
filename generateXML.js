// xmlFeedGenerator.js
const fs = require('fs');
const path = require('path');
const os = require('os');
const { getRDPValue } = require('./rdpHandler');

let baseDir;
if (process.pkg) {
    baseDir = path.dirname(process.execPath);
} else {
    baseDir = __dirname;
}

// Function to generate the XML feed
function generateXMLFeed(res) {
    const rdpFolderPath = path.join(baseDir, 'public', 'rdp');
    const files = fs.readdirSync(rdpFolderPath);
    const serverName = os.hostname();
    const datetime = new Date().toISOString();

    let xmlContent = `<?xml version="1.0" encoding="utf-8"?>
<ResourceCollection PubDate="${datetime}" SchemaVersion="1.1" xmlns="http://schemas.microsoft.com/ts/2007/05/tswf">
<Publisher LastUpdated="${datetime}" Name="${serverName}" ID="${serverName}" Description="">
<Resources>`;

    files.forEach(file => {
        if (path.extname(file).toLowerCase() === '.rdp') {
            const filePath = path.join(rdpFolderPath, file);
            const fullAddress = getRDPValue(filePath, 'full address:s:');
            if (fullAddress) {
                const basefilename = path.basename(file, '.rdp');
                const appalias = getRDPValue(filePath, 'remoteapplicationprogram:s:') || basefilename;
                const apptitle = getRDPValue(filePath, 'remoteapplicationname:s:') || basefilename;
                const appresourceid = appalias;
                const rdptype = appalias ? "RemoteApp" : "Desktop";
                const filedatetime = new Date(fs.statSync(filePath).mtime).toISOString();

                xmlContent +=`
                <Resource ID="${appresourceid}" Alias="${appalias}" Title="${apptitle}" LastUpdated="${filedatetime}" Type="${rdptype}">
                <Icons>
                <IconRaw FileType="Ico" FileURL="icon/${basefilename}.ico" />
                <Icon32 Dimensions="32x32" FileType="Png" FileURL="icon/${basefilename}.ico" />
                </Icons>
                <HostingTerminalServers>
                <HostingTerminalServer>
                <ResourceFile FileExtension=".rdp" URL="rdp/${file}" />
                <TerminalServerRef Ref="${serverName}" />
                </HostingTerminalServer>
                </HostingTerminalServers>
                </Resource>`;
            }
        }
    });

    xmlContent += `
</Resources>
<TerminalServers>
<TerminalServer ID="${serverName}" Name="${serverName}" LastUpdated="${datetime}" />
</TerminalServers>
</Publisher>
</ResourceCollection>`;

    res.setHeader('Content-Type', 'application/xml');
    res.send(xmlContent);
}

module.exports = { generateXMLFeed };