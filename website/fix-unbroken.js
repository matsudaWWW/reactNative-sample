/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const versions = require('./versions.json');

const stringIsAValidUrl = (s, protocols = ['http', 'https']) => {
    try {
        url = new URL(s);
        return protocols
            ? url.protocol
                ? protocols.map(x => `${x.toLowerCase()}:`).includes(url.protocol)
                : false
            : true;
    } catch (err) {
        return false;
    }
};

const normalizePath = str => path.normalize(str).replace(/\\/g, '/');

console.log('Scanning asset files...');
var assetFiles = fs.readdirSync('../docs/assets');

console.log('Scanning versioned docs...');
var versionedDocs = {};

const addFileToVersionedDocs = (file, version) => {
  if (!versionedDocs.hasOwnProperty(version)) {
      versionedDocs[version] = [];
  }
  const versionDir = `versioned_docs\\version-${version}`;
  versionedDocs[version].push(file);
};

versions.forEach(version => {
    const versionDir = `versioned_docs\\version-${version}`;
    var files = fs.readdirSync(versionDir);
    files.forEach(filePath => {
      const fullPath = path.join(versionDir, filePath);
      if (fs.statSync(fullPath).isFile()) {
        addFileToVersionedDocs(fullPath, version);
      } else {
        console.log(`Directory: ${fullPath} - ${filePath}`);
        fs.readdirSync(fullPath).forEach(addFileToVersionedDocs);
      }
    });
});

console.log('Processing file redirections...');

var redirectedFiles = [];

for (let i = 0; i < versions.length; i++) {
    const docs = versionedDocs[versions[i]];

    docs.forEach(doc => {
        const contents = fs.readFileSync(doc).toString();
    
        // Look for asset references
        assetFiles.forEach(assetFile => {
            const assetPath = `assets/${assetFile}`;
            if (contents.includes(`(${assetPath})`) || contents.includes(`src="${assetPath}"`)) {
                redirectedFiles.push({ source: doc, target: assetPath });
            }
        });
    
        // Look for references to docs in prior versions
        for (let j = i + 1; j < versions.length; j++) {
            const earlierDocs = versionedDocs[versions[j]];
            earlierDocs.forEach(earlierDoc => {
                const edFile = path.basename(earlierDoc);
                if (contents.search(`(${edFile})`) >= 0) {
                    redirectedFiles.push({ source: doc, target: edFile });
                }
            });
        }
    
    });

}

console.log('Generating exclusions...');

var exclusions = [];

// Load existing base exclusions
const existingExclusions = fs.readFileSync('.unbroken_exclusions').toString().split(/\r?\n/) || [];

for (let exclusion of existingExclusions) {
    exclusion = exclusion.trim();

    if (exclusion === '') {
        exclusions.push(exclusion);
    }
    else if (exclusion.startsWith('#fix-unbroken.js')) {
        exclusions.push(exclusion);
        break;
    }
    else
    {
        let clean = ''
        for (const part of exclusion.split(' ')) {
            clean += `${stringIsAValidUrl(part) ? part : normalizePath(part)} `;
        }
        exclusions.push(clean.trimEnd());
    }
}

// Redirected files exclusions
redirectedFiles.forEach(redirectedFile => {
    exclusions.push(`File not found ${normalizePath(redirectedFile.target)} while parsing ${normalizePath(redirectedFile.source)}`);
});

console.log('Updating .unbroken_exclusions...')
var exclusions_file = fs.createWriteStream('.unbroken_exclusions');
exclusions_file.on('error', function(err) { /* error handling */ });
exclusions.forEach(function(v) {
    console.log('Excluding: ' + v);
    exclusions_file.write(v + '\r\n');
});
exclusions_file.end();
