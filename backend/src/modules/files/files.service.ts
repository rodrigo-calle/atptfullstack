import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './files.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
  ) {}

  async create(file: Omit<File, 'id' | 'createdAt' | 'status'>): Promise<File> {
    return await this.filesRepository.save(file);
  }

  async findManyByUser(userId: number) {
    const files = await this.filesRepository.find({
      where: { user: { id: userId } },
      select: {
        user: {
          id: true,
          username: true,
        },
      },
      relations: {
        user: true,
        clients: true,
      },
    });
    return files;
  }
}
