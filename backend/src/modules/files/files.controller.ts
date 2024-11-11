import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SupabaseService } from 'src/modules/supabase/supabase.service';
import { CsvFileValidationPipe } from 'src/utils/validators/clientsFileValidator.pipe';
import { FilesService } from './files.service';
import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from '../users/users.service';
import { FileStatus } from './files.entity';

@Controller('files')
export class FilesController {
  constructor(
    private readonly supabaseService: SupabaseService,
    private filesService: FilesService,
    private usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('clients/upload')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new CsvFileValidationPipe())
  async uploadFile(@Request() req, @UploadedFile() file: Express.Multer.File) {
    const destinationPath = `clients_csv/${Date.now()}_${file.originalname}`;
    const fileUrl = await this.supabaseService.uploadFile(
      file,
      destinationPath,
    );

    if (fileUrl && req.user.userId) {
      const user = await this.usersService.findOne({ id: req.user.userId });
      if (!user) throw new Error('User not found');

      await this.filesService.create({
        clients: [],
        fileUrl,
        user,
      });

      return {
        message: 'CSV file uploaded successfully',
        fileUrl,
      };
    }

    return {
      message: 'Error uploading file',
      error: 'File not uploaded',
    };
  }

  @UseGuards(AuthGuard)
  @Get('clients/:userId')
  async getFilesByUser(@Param('userId') userId: number) {
    const files = await this.filesService.findManyByUser(userId);
    return files;
  }

  @UseGuards(AuthGuard)
  @Patch('/approve/:fileId')
  async approveFile(@Request() req, @Param('fileId') fileId: number) {
    if (!req.user.userId) {
      throw new Error('User not found');
    }

    return this.filesService.update(fileId, req.user.userId, {
      status: FileStatus.APPROVED,
    });
  }
}
