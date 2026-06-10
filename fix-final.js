import fs from 'fs';
import path from 'path';

function replace(file, search, replacement) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes(search)) {
      content = content.replace(search, replacement);
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Fixed ${file}`);
    }
  }
}

function replaceRegex(file, search, replacement) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(search, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed Regex ${file}`);
  }
}

replace('src/data/siteConstants.ts', "from './types'", "from '../types/agency-types'");

replace('src/pages/agency/admin/AdminDashboard.tsx', "from '../../components/certificate/CertificateDesign'", "from '../../../components/agency/certificate/CertificateDesign'");
replace('src/pages/agency/admin/AdminDashboard.tsx', "from '../../lib/supabase/client'", "from '../../../lib/supabase/client'");

replace('src/pages/agency/CertificateGenerator.tsx', "from '../lib/supabase/client'", "from '../../lib/supabase/client'");
replace('src/pages/agency/CertificateVerify.tsx', "from '../lib/supabase/client'", "from '../../lib/supabase/client'");

replace('src/pages/agency/KaizenAI.tsx', "from '../../../services/AIService'", "from '../../services/AIService'");

replace('src/services/AIService.ts', "from '../../context/AIContext'", "from '../context/AIContext'");

// Fix Contact imports in AgencyHome and Home
replaceRegex('src/pages/agency/AgencyHome.tsx', /import \{ Contact \} from '\.\.\/\.\.\/components\/agency\/index';\n/g, "");
replaceRegex('src/pages/agency/Home.tsx', /import \{ Contact \} from '\.\.\/\.\.\/components\/agency\/index';\n/g, "");

// FollowerScene hgroup error
replaceRegex('src/components/agency/oss/FollowerScene.tsx', /<motion\.group/g, "<motion.div");
replaceRegex('src/components/agency/oss/FollowerScene.tsx', /<\/motion\.group>/g, "</motion.div>");
