import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Gets the request log
    const info = {
      host: req.headers.host,
      origin: req.headers.origin,
      originalUrl: req.originalUrl,
      path: req.path,
      body: req.body,
      ipClient: req.ip,
      appEnv: req.app.settings.env,
      cookies: req.cookies,
      method: req.method,
      protocol: req.protocol,
      subdomains: req.subdomains,
      //socket: req.socket.getPeerCertificate(),
    }
    console.log(`general logger : `, info.method, info.path);
    //console.log(`general logger : `, info.method, info.path, info.body);
    // Ends middleware function execution, hence allowing to move on 
    if (next) {
      next();
    }
  }
}