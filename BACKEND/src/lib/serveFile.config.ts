import { join } from "path";

const config = {
  rootPath: join(process.cwd(), 'uploads'),
  serveRoot: '/uploads',
  exclude: ['/api*']
}

export { config }