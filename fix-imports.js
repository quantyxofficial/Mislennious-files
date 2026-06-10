import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function fixImports(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Fix contexts
  content = content.replace(/from\s+['"]\.\.\/contexts\/([^'"]+)['"]/g, "from '../../context/$1'");
  content = content.replace(/from\s+['"]\.\.\/\.\.\/contexts\/([^'"]+)['"]/g, "from '../../../context/$1'");
  content = content.replace(/from\s+['"]\.\/contexts\/([^'"]+)['"]/g, "from '../context/$1'");

  // Fix services
  content = content.replace(/from\s+['"]\.\.\/services\/([^'"]+)['"]/g, "from '../../services/$1'");
  content = content.replace(/from\s+['"]\.\.\/\.\.\/services\/([^'"]+)['"]/g, "from '../../../services/$1'");

  // Fix utils
  content = content.replace(/from\s+['"]\.\.\/utils\/([^'"]+)['"]/g, "from '../../utils/$1'");
  content = content.replace(/from\s+['"]\.\.\/\.\.\/utils\/([^'"]+)['"]/g, "from '../../../utils/$1'");

  // Fix types
  content = content.replace(/from\s+['"]\.\.\/types['"]/g, "from '../../types/agency-types'");
  content = content.replace(/from\s+['"]\.\.\/\.\.\/types['"]/g, "from '../../../types/agency-types'");

  // Fix siteConstants
  content = content.replace(/from\s+['"]\.\.\/siteConstants['"]/g, "from '../../data/siteConstants'");
  content = content.replace(/from\s+['"]\.\.\/\.\.\/siteConstants['"]/g, "from '../../../data/siteConstants'");

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${filePath}`);
  }
}

['src/components/agency', 'src/pages/agency', 'src/context', 'src/services'].forEach(dir => {
  if (fs.existsSync(dir)) walkDir(dir, fixImports);
});

// Also fix some specific files like src/components/agency/AuthModal.tsx
console.log('Done.');
