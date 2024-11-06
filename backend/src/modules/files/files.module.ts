import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './files.entity';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [TypeOrmModule.forFeature([File]), SupabaseModule, UsersModule],
  exports: [FilesService],
})
export class FilesModule {}
