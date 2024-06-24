# What is in package.json ?
Many dependencies, but do we even use them ? What do they do **in this project** ?

## Content
- Dependencies
- DevDependencies
- ORM
- Testing
- Others ???

## Dependencies
#### @nestjs/core
Nest is the framework. core is the base for it. Too much to list here, pretty much used everywhere
#### @nestjs/common
Nest is the framework. common are common stuff used. Too much to list here, pretty much used everywhere
#### @nestjs/platform-express
Nest can work on top of many plateform (ex: Express, Fastify). We currently use Express. Should not be **too** hard to swap (hopefully)
#### dotenv
Load environment variables from a .env file to be available in process.env.EXEMPLE
.env files are used to configure your app, e.g: it's port, ...
#### class-transformer
Parse your return js object to JSON objects and vice versa.
Needed by ValidationPipe
#### class-validator
Validate object and nested objects using TypeScript decorators like @IsEmail() or @Min().
Needed by ValidationPipe

## DevDependencies

## ORM

## Testing
First, testing is recommended to ensure EVERY features implemented works as intended. Even after someone changes the code in any way.
**Please** do add test, so your feature will never be broken unknowingly

## Others
Nothing so far...