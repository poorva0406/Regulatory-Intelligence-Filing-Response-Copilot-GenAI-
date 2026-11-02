import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '25mb' }));

// Initialize GoogleGenAI if key is present
const geminiApiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (geminiApiKey) {
  try {
    aiClient = new GoogleGenAI();
    console.log('[+] GoogleGenAI client initialized.');
  } catch (err) {
    console.warn('[-] GoogleGenAI initialization warning:', err);
  }
}

// 1. Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    geminiConfigured: !!geminiApiKey,
    nodeEnv: process.env.NODE_ENV || 'development'
  });
});

// 2. Server-side Gemini enhancement proxy (Model: gemini-3.8-flash)
app.post('/api/gemini/generate', async (req: Request, res: Response) => {
  const { prompt, systemInstruction } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt parameter.' });
  }

  if (!aiClient) {
    return res.json({
      enhanced: false,
      message: 'GEMINI_API_KEY not configured. Falling back to local deterministic reasoning engine.'
    });
  }

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || 'You are an expert commercial insurance regulatory filing compliance analyst.'
      }
    });

    return res.json({
      enhanced: true,
      text: response.text
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({
      enhanced: false,
      error: error?.message || 'Gemini generation error'
    });
  }
});

// Setup Vite middleware in development or static serving in production
async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[+] Regulatory Intelligence Copilot server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
