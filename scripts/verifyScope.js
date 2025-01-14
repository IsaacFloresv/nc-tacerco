const { execSync } = require('child_process');

// Obtener el scope como argumento (frontend o backend)
const scope = process.argv[2];
const allowedDirectory = `${scope}`;

// Agrega aquí los archivos permitidos en el root
const allowedRootFiles = [
   'scripts/verifyScope.js',
   '.eslintrc',
   '.eslintignore',
   '.lintstagedrc',
   '.prettierrc',
   'README.md',
   '.github/PULL_REQUEST_TEMPLATE.md',
   '.github/ISSUE_TEMPLATE/user_story.md',
   '.husky/commit-msg',
   '.husky/pre-commit',
   '.vscode/settings.json',
   'scripts',
   'commitlint.config.js',
   '.gitignore',
   'package-lock.json',
   'package.json',
   'vercel.json',
   'docker-compose.yml',
   '.npmrc',
   '.nvmrc'
];

// Comando para obtener una lista de archivos en staging
const getStagedFilesCommand = 'git diff --cached --name-only';

try {
   // Ejecutar el comando y obtener la lista de archivos
   const stagedFiles = execSync(getStagedFilesCommand).toString().trim().split('\n');

   // Verificar cada archivo
   for (const file of stagedFiles) {
      if (
         file &&
         !file.startsWith(allowedDirectory) &&
         !allowedRootFiles.includes(file)
      ) {
         console.error(`Error: Archivo "${file}" no permitido en el scope "${scope}".`);
         process.exit(1);
      }
   }

   console.log(
      `Todos los archivos en el commit están permitidos para el scope "${scope}".`
   );
} catch (error) {
   console.error('Ocurrió un error al verificar los archivos:', error);
   process.exit(1);
}
