import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const APP_URL = 'https://kaizenstat.com'; // Replace with actual domain
const CONTENT_DIR = path.join(__dirname, '../public/content');
const STUDY_DIR = path.join(CONTENT_DIR, 'study');
const PRACTICE_DIR = path.join(CONTENT_DIR, 'practice');
const PUBLIC_DIR = path.join(__dirname, '../public');

// Helper to parse frontmatter simple way (node script)
function parseFrontmatter(content) {
    const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
    if (!match) return {};
    const frontmatter = match[1];
    const data = {};
    const lines = frontmatter.split('\n');
    for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) continue;
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();

        // Handle arrays (check this first before type coercion)
        if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
            try {
                // Try to parse as JSON first if possible, or simple split
                const inner = value.slice(1, -1);
                if (inner.trim() === '') {
                    value = [];
                } else {
                    value = inner.split(',').map(s => {
                        const trimmed = s.trim();
                        // Remove quotes if present
                        if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
                            (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
                            return trimmed.slice(1, -1);
                        }
                        return trimmed;
                    });
                }
            } catch (e) {
                // keep as string if parsing fails
            }
        }
        // Handle numbers
        else if (!isNaN(Number(value)) && value !== '') {
            value = Number(value);
        }
        // Handle boolean
        else if (value === 'true') value = true;
        else if (value === 'false') value = false;

        data[key] = value;
    }
    return data;
}

// Generate Study Manifests
async function generateStudyManifests() {
    console.log(`Checking Study Directory: ${STUDY_DIR}`);
    if (!fs.existsSync(STUDY_DIR)) {
        console.warn(`Study Directory not found: ${STUDY_DIR}`);
        return;
    }

    try {
        const topics = fs.readdirSync(STUDY_DIR).filter(f => fs.statSync(path.join(STUDY_DIR, f)).isDirectory());
        for (const topic of topics) {
            const topicDir = path.join(STUDY_DIR, topic);
            const files = fs.readdirSync(topicDir).filter(f => f.endsWith('.md'));
            const chapters = [];

            for (const file of files) {
                try {
                    const content = fs.readFileSync(path.join(topicDir, file), 'utf-8');
                    const data = parseFrontmatter(content);

                    chapters.push({
                        id: data.id || file.replace('.md', ''),
                        title: data.title || file.replace(/-/g, ' ').replace('.md', ''),
                        description: data.description || '',
                        file: file,
                        order: data.order || 99
                    });
                } catch (err) {
                    console.error(`Error processing file ${file} in topic ${topic}:`, err);
                }
            }
            chapters.sort((a, b) => a.order - b.order);

            const manifest = {
                topic: topic.charAt(0).toUpperCase() + topic.slice(1),
                description: `${topic} Study Material`,
                chapters: chapters
            };

            fs.writeFileSync(path.join(topicDir, 'curriculum.json'), JSON.stringify(manifest, null, 2));
            console.log(`Generated curriculum.json for ${topic}`);
        }
    } catch (error) {
        console.error("Fatal error in generateStudyManifests:", error);
    }
}

// Generate Practice Manifests & Master Topic List
async function generatePracticeManifests() {
    console.log(`Checking Practice Directory: ${PRACTICE_DIR}`);
    if (!fs.existsSync(PRACTICE_DIR)) {
        console.warn(`Practice Directory not found: ${PRACTICE_DIR}`);
        return [];
    }

    const allTopics = [];
    const allProblemUrls = [];

    try {
        const topicDirs = fs.readdirSync(PRACTICE_DIR).filter(f => fs.statSync(path.join(PRACTICE_DIR, f)).isDirectory());

        for (const topicDirName of topicDirs) {
            const topicPath = path.join(PRACTICE_DIR, topicDirName);
            const files = fs.readdirSync(topicPath).filter(f => f.endsWith('.md'));

            // Read metadata.json if exists
            let metadata = {
                title: topicDirName.charAt(0).toUpperCase() + topicDirName.slice(1),
                description: `${topicDirName} practice problems`,
                icon: '📚',
                color: 'from-gray-500 to-gray-700'
            };

            const metadataPath = path.join(topicPath, 'metadata.json');
            if (fs.existsSync(metadataPath)) {
                try {
                    const metaContent = fs.readFileSync(metadataPath, 'utf-8');
                    metadata = { ...metadata, ...JSON.parse(metaContent) };
                } catch (e) {
                    console.error(`Error reading metadata for ${topicDirName}`, e);
                }
            }

            const problems = [];
            for (const file of files) {
                try {
                    const content = fs.readFileSync(path.join(topicPath, file), 'utf-8');
                    const data = parseFrontmatter(content);
                    const problemId = data.id || file.replace('.md', '');

                    problems.push({
                        id: problemId,
                        file: file,
                        difficulty: data.difficulty || 'Basic',
                        title: data.title || file.replace('.md', '')
                    });

                    // Add to sitemap URLs
                    allProblemUrls.push(`/practice/${topicDirName}/${problemId}`);
                } catch (err) {
                    console.error(`Error processing practice problem ${file}:`, err);
                }
            }

            // Check for study material
            let hasStudyMaterial = false;
            try {
                const studyTopicPath = path.join(STUDY_DIR, topicDirName);
                if (fs.existsSync(studyTopicPath) && fs.statSync(studyTopicPath).isDirectory()) {
                    const studyFiles = fs.readdirSync(studyTopicPath).filter(f => f.endsWith('.md'));
                    if (studyFiles.length > 0) {
                        hasStudyMaterial = true;
                    }
                }
            } catch (e) {
                // ignore error, default to false
            }

            // Write individual topic manifest
            const manifest = {
                topic: metadata.title,
                problems: problems
            };
            fs.writeFileSync(path.join(topicPath, 'practice.json'), JSON.stringify(manifest, null, 2));
            console.log(`Generated practice.json for ${topicDirName}`);

            // Add to master topic list
            allTopics.push({
                id: topicDirName, // Directory name is the ID
                title: metadata.title,
                description: metadata.description,
                icon: metadata.icon,
                color: metadata.color,
                count: problems.length,
                hasStudyMaterial: hasStudyMaterial
            });
        }

        // Write master topics.json
        fs.writeFileSync(path.join(PRACTICE_DIR, 'topics.json'), JSON.stringify(allTopics, null, 2));
        console.log(`Generated topics.json with ${allTopics.length} topics`);
    } catch (error) {
        console.error("Fatal error in generatePracticeManifests:", error);
    }

    return allProblemUrls;
}

// Generate Sitemap
function generateSitemap(problemUrls) {
    try {
        const urls = [
            '/',
            '/about',
            '/agency',
            '/blog',
            '/careers',
            '/practice',
            ...problemUrls
        ];

        const sitemapContext = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${APP_URL}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

        fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapContext);
        console.log('Generated sitemap.xml');
    } catch (error) {
        console.error("Error generating sitemap:", error);
    }
}

async function main() {
    console.log('Starting content manifest generation...');
    console.log(`Content Directory: ${CONTENT_DIR}`);

    try {
        await generateStudyManifests();
        const problemUrls = await generatePracticeManifests();
        generateSitemap(problemUrls);
        console.log('Manifest generation completed successfully!');
    } catch (error) {
        console.error('CRITICAL ERROR in manifest generation script:', error);
        process.exit(1);
    }
}

main();
