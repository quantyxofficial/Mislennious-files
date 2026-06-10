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

  // Fix components
  // If we are in src/pages/agency, ../components/X should become ../../components/agency/X
  // If we are in src/components/agency, ../components/X should become ../X
  if (filePath.includes('src/pages/agency')) {
    content = content.replace(/from\s+['"]\.\.\/components\/([^'"]+)['"]/g, "from '../../components/agency/$1'");
  } else if (filePath.includes('src/components/agency')) {
    content = content.replace(/from\s+['"]\.\.\/components\/([^'"]+)['"]/g, "from '../$1'");
  }

  // Fix utils in pages
  if (filePath.includes('src/pages/agency')) {
     content = content.replace(/from\s+['"]\.\.\/\.\.\/\.\.\/utils\/([^'"]+)['"]/g, "from '../../utils/$1'");
     content = content.replace(/from\s+['"]\.\.\/\.\.\/utils\/([^'"]+)['"]/g, "from '../../utils/$1'");
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${filePath}`);
  }
}

['src/components/agency', 'src/pages/agency'].forEach(dir => {
  if (fs.existsSync(dir)) walkDir(dir, fixImports);
});

console.log('Done.');
