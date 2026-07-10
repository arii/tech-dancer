import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(async (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    try {
      const modulePath = path.join(__dirname, 'api', req.path.replace('/api/', '') + '.ts');
      const route = await import(modulePath);
      const handler = route.default;

      const vReq = {
        method: req.method,
        query: req.query
      };

      const vRes = {
        setHeader: (k, v) => res.setHeader(k, v),
        status: (code) => {
          res.status(code);
          return {
            json: (data) => res.json(data),
            end: () => res.end()
          };
        },
        json: (data) => res.json(data),
        end: () => res.end()
      };
      await handler(vReq, vRes);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  } else {
    next();
  }
});

app.listen(3003, () => console.log('Listening on 3003'));
