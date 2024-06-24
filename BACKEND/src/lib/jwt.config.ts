import type { JwtModuleOptions } from '@nestjs/jwt';


const config: JwtModuleOptions = {
  global: true, // true to import it in one module and make it available everywhere, false for default module import behaviour
  secret: process.env.JWT_SECRET, // TODO put a default secret
  signOptions: { expiresIn: Number(process.env.JWT_EXPIRATION_SECOND) ?? 120 },
  /*verifyOptions: {
    // TODO check the options here ( same as signOptions)
    algorithms: ['HS512', 'ES512', 'PS512', 'RS512'],
  },*/
}

export { config }