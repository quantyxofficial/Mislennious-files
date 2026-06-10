import fs from 'fs';

// 1. Fix GeminiStrategist
let file = 'src/components/agency/GeminiStrategist.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace("from '../../../services/geminiService'", "from '../../services/geminiService'");
fs.writeFileSync(file, content, 'utf8');

// 2. Fix AIContext
file = 'src/context/AIContext.tsx';
content = fs.readFileSync(file, 'utf8');
content = content.replace("toggleTheme,\n        }}>", "toggleTheme,\n          setTheme,\n        }}>");
fs.writeFileSync(file, content, 'utf8');

// 3. Fix FollowerScene (scale as style instead of prop)
file = 'src/components/agency/oss/FollowerScene.tsx';
content = fs.readFileSync(file, 'utf8');
// replace:
// <motion.div
//   scale={scale}
//   rotation-y={y}
//   rotation-x={x}
//   position-y={yPos}
content = content.replace(/<motion\.div\s+scale=\{scale\}\s+rotation-y=\{y\}\s+rotation-x=\{x\}\s+position-y=\{yPos\}/g, "<motion.div style={{ scale, rotateY: y, rotateX: x, y: yPos }}");
fs.writeFileSync(file, content, 'utf8');

console.log('Fixed final 3 errors');
