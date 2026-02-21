import { execSync } from 'child_process';
import fs from 'fs';
import path from 'fs';

console.log('Iniciando build personalizado...');

try {
  // Tenta dar permissão manualmente
  try {
    execSync('chmod +x node_modules/.bin/vite', { stdio: 'inherit' });
  } catch (e) {
    console.log('Ignorando chmod (Windows)');
  }

  // Executa o vite diretamente pelo node
  execSync('node node_modules/vite/bin/vite.js build', { 
    stdio: 'inherit',
    env: { ...process.env, PATH: process.env.PATH }
  });
  
  console.log('Build concluído com sucesso!');
} catch (error) {
  console.error('Erro no build:', error);
  process.exit(1);
}