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

  // Fix AgencyAuthContext
  content = content.replace(/from\s+['"]([^'"]+)AuthContext['"]/g, "from '$1AgencyAuthContext'");
  content = content.replace(/useAuth/g, "useAgencyAuth");

  // A couple specific missing imports from the earlier logs
  content = content.replace(/from\s+['"]\.\.\/lib\/supabase\/client['"]/g, "from '../../lib/supabase/client'");
  
  if (filePath.includes('src/pages/agency/Home.tsx') || filePath.includes('src/pages/agency/AgencyHome.tsx')) {
     content = content.replace(/import \{ Contact \} from '\.\.\/\.\.\/components\/agency\/index';/g, "");
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed Auth context: ${filePath}`);
  }
}

['src/components/agency', 'src/pages/agency'].forEach(dir => {
  if (fs.existsSync(dir)) walkDir(dir, fixImports);
});

console.log('Done.');
