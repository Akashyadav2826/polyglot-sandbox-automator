import express from 'express';
import { exec } from 'child_process';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const TEMP_DIR = path.join(__dirname, '../temp');

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

app.post('/execute', (req, res) => {
  const { language, code } = req.body;

  if (!language || !code) {
    return res.status(400).json({ error: 'Language and code are required' });
  }

  const fileId = uuidv4();
  let ext = '';
  let image = '';

  if (language === 'python') {
    ext = '.py';
    image = 'python-runner';
  } else if (language === 'nodejs') {
    ext = '.js';
    image = 'nodejs-runner';
  } else {
    return res.status(400).json({ error: 'Unsupported language' });
  }

  const fileName = `${fileId}${ext}`;
  const filePath = path.join(TEMP_DIR, fileName);

  fs.writeFileSync(filePath, code);

  const dockerCmd = `docker run --rm --memory=256m --cpus=0.5 -v ${TEMP_DIR}:/app ${image} /app/${fileName}`;

  exec(dockerCmd, (error, stdout, stderr) => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    if (error) {
      return res.status(500).json({ error: stderr || error.message });
    }
    res.json({ output: stdout });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});