// rdpHandler.js
const fs = require('fs');
const path = require('path');

// Function to read RDP file and extract a value
function getRDPValue(filePath, valueName) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    for (let line of lines) {
        if (line.toLowerCase().startsWith(valueName.toLowerCase())) {
            return line.substring(valueName.length).trim();
        }
    }
    return '';
}

module.exports = { getRDPValue };