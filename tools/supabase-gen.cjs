require('dotenv').config();
require('dotenv').config({ path: `.env.local`, override: true });

const { exec } = require('child_process');

const url = process.env.SUPABASE_DATABASE_URL;

if (!url) {
  console.error('SUPABASE_DATABASE_URL не установлен');
  process.exit(1);
}

const cmd = `supabase gen types typescript --db-url ${url} --schema public > src/shared/lib/supabase/database.types.ts`;

exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`Ошибка выполнения команды: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(stderr);
  }

  console.log(stdout);
});
