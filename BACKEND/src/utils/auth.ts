import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

function extractTokenFromHeader(request: Request): string | undefined {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}

async function verifyJWT(token: string, jwtService: JwtService) {
  const payload = jwtService.verifyAsync(
    token // TODO if KO=> , {secret: process.env.JWT_SECRET}
  );

  return payload;
}

export { extractTokenFromHeader, verifyJWT }