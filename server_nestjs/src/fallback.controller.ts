import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';
import * as fs from 'node:fs';

@Controller()
export class FallbackController {
  @Get('*')
  serveUi(@Req() req: Request, @Res() res: Response) {
    const angularDistPath = join(__dirname, '../../', 'dist', 'ui', 'browser');
    const indexHtmlPath = join(angularDistPath, 'index.html');

    if (req.url.startsWith('/api/')) {
      return res.status(404).json({ message: 'API endpoint not found' });
    }

    if (req.url.includes('.')) {
      const filePath = join(angularDistPath, req.url);

      if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
      } else {
        return res.status(404).json({ message: 'File not found' });
      }
    }

    if (fs.existsSync(indexHtmlPath)) {
      return res.sendFile(indexHtmlPath);
    } else {
      return res.status(404).send('Angular app not found. Run `ng build`.');
    }
  }
}
