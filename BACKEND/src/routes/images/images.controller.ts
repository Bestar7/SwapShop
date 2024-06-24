import { Controller, Post, UploadedFiles, UseInterceptors, Param, Headers, UseGuards } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { storage } from '~/lib/multiFile-Multer.config';
import { ImagesService } from './images.service';
import { UserRole } from '~/entities/users/User.entity';
import { AuthGuard } from '~/decorator/guards/auth.guard';
import { Roles } from '~/decorator/role.decorator';

@Controller("images") // TODO is this controller really useful ?
class ImagesController {

  constructor(private readonly imagesServices: ImagesService) {}

  @Roles([UserRole.ADMIN, UserRole.SHOP])
  @UseGuards(AuthGuard)
  @Post('upload/article/:id')
  @UseInterceptors(
    FilesInterceptor(
      'file', 
      Number(process.env.BACKEND_MAX_IMAGE_UPLOAD), // TODO use Number or parseInt ? + use default value
      { storage } // TODO remove 'uploads' from filename or put it in config file, or smthing else ?
    )
  )
  async uploadManyImages(@UploadedFiles() files: Express.Multer.File[], @Param('id') id: number, @Headers() headers: Headers ): Promise<Express.Multer.File[]>{
    if (!id){
      console.log("id is not defined");
    }
    const serverUrl = headers['host'];
    console.log("serverUrl : ", serverUrl);
    console.log("id", id);
    this.imagesServices.createManyImages(files, id, serverUrl);
    // TODO headers['host'] shows this server url (198.162.16.17:4000)
    // TODO call articles modules and add these files to the article (id) ?
    return files;
  }
}

export { ImagesController };