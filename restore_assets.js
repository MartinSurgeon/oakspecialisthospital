const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = __dirname;
const baseUrl = 'https://aonetheme.com/mediket/';

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

function checkHead(url) {
    return new Promise((resolve) => {
        const options = {
            method: 'HEAD',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        };
        const req = https.request(url, options, (res) => {
            if (res.statusCode === 200) {
                resolve(true);
            } else if (res.statusCode === 301 || res.statusCode === 302) {
                checkHead(res.headers.location).then(resolve);
            } else {
                resolve(false);
            }
        });
        req.on('error', () => resolve(false));
        req.end();
    });
}

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        };
        const dir = path.dirname(dest);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        https.get(url, options, (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => { file.close(); resolve(); });
            } else {
                reject(new Error(`Status ${res.statusCode}`));
            }
        }).on('error', reject);
    });
}

function replaceInFiles(oldStr, newStr) {
    const extensionsToSearch = ['.html', '.css', '.js'];
    const files = walk(targetDir).filter(f => extensionsToSearch.includes(path.extname(f)) && !f.includes('restore_assets.js'));
    for (const f of files) {
        let content = fs.readFileSync(f, 'utf8');
        if (content.includes(oldStr)) {
            const regex = new RegExp(oldStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            content = content.replace(regex, newStr);
            fs.writeFileSync(f, content, 'utf8');
            console.log(`  Updated references in ${path.relative(targetDir, f)}: "${oldStr}" -> "${newStr}"`);
        }
    }
}

async function run() {
    console.log(`Scanning ${targetDir} for zero-byte files...`);
    const files = walk(targetDir);
    let zeroByteFiles = files.filter(f => fs.statSync(f).size === 0 && !f.includes('.git') && !f.includes('.antigravity'));
    console.log(`Found ${zeroByteFiles.length} zero-byte files.`);

    const extensionsToTry = {
        'images': ['.jpg', '.jpeg', '.png', '.gif', '.svg'],
        'fonts': ['.woff2', '.woff', '.ttf', '.eot'],
        'venobox': ['.gif', '.svg', '.png'],
        'js': ['.js'],
        'css': ['.css']
    };

    for (const file of zeroByteFiles) {
        const relPath = path.relative(targetDir, file).replace(/\\/g, '/');
        const dir = path.dirname(relPath);
        const ext = path.extname(relPath);
        const base = path.basename(relPath, ext);

        console.log(`Processing corrupted file: ${relPath}`);

        // If it's a root-level HTML file like appointment.html, download it directly
        if (dir === '.' && ext === '.html') {
            const testUrl = baseUrl + relPath;
            console.log(`  Root page detected. Downloading directly from ${testUrl}...`);
            try {
                await download(testUrl, file);
                console.log(`  Successfully downloaded root page: ${relPath}`);
            } catch (err) {
                console.log(`  Failed to download root page ${relPath}: ${err.message}`);
            }
            continue;
        }

        let type = 'images';
        if (relPath.includes('fonts/') || relPath.includes('webfonts/')) type = 'fonts';
        else if (relPath.includes('venobox/')) type = 'venobox';
        else if (relPath.includes('js/')) type = 'js';
        else if (relPath.includes('css/')) type = 'css';

        let found = false;
        const tries = extensionsToTry[type] || ['.jpg', '.png', '.js', '.css'];

        for (const testExt of tries) {
            const testUrl = baseUrl + dir + '/' + base + testExt;
            console.log(`  Checking: ${testUrl}`);
            if (await checkHead(testUrl)) {
                console.log(`  Found valid remote file: ${testUrl}`);
                const destFile = path.join(targetDir, dir, base + testExt);
                try {
                    await download(testUrl, destFile);
                    console.log(`  Successfully downloaded to ${path.relative(targetDir, destFile)}`);

                    // If extension changed (e.g. logo3.html -> logo3.png)
                    if (testExt !== ext) {
                        console.log(`  Extension changed from ${ext} to ${testExt}. Updating references...`);
                        replaceInFiles(base + ext, base + testExt);
                        
                        // Delete the old 0-byte file if it's a different filename
                        if (file !== destFile) {
                            fs.unlinkSync(file);
                            console.log(`  Deleted old placeholder: ${relPath}`);
                        }
                    }
                    found = true;
                    break;
                } catch (downloadErr) {
                    console.log(`  Failed to download ${testUrl}: ${downloadErr.message}`);
                }
            }
        }

        if (!found) {
            console.log(`  [WARNING] Could not find a valid remote file for ${relPath} on the live site.`);
        }
    }

    console.log('\n--- Restoration complete! ---');
}

run();
