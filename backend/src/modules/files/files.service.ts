import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './files.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FileCreatedEvent } from './events/fileCreated.event';
import { Readable } from 'stream';
import * as csvParser from 'csv-parser';

@Injectable()
export class FilesService {
  constructor(
    private eventEmitter: EventEmitter2,
    @InjectRepository(File)
    private filesRepository: Repository<File>,
  ) {}

  async create(file: Omit<File, 'id' | 'createdAt' | 'status'>): Promise<File> {
    const newFile = await this.filesRepository.save(file);

    const fileCreatedEvent = new FileCreatedEvent();
    fileCreatedEvent.fileUrl = newFile.fileUrl;
    fileCreatedEvent.uploadDate = newFile.createdAt;
    fileCreatedEvent.userId = newFile.user.id;
    fileCreatedEvent.username = newFile.user.username;

    this.eventEmitter.emit('file.created', fileCreatedEvent);

    return newFile;
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

  async countCsvRecords(url: string): Promise<number> {
    try {
      const response = await fetch(url);
      const csvBuffer = Buffer.from(await response.arrayBuffer());

      const readableStream = new Readable();
      readableStream.push(csvBuffer);
      readableStream.push(null);

      return new Promise((resolve, reject) => {
        let recordCount = 0;

        readableStream
          .pipe(csvParser())
          .on('data', () => {
            recordCount++;
          })
          .on('end', () => {
            resolve(recordCount);
          })
          .on('error', (error) => {
            reject(error);
          });
      });
    } catch (error) {
      console.error('Error al leer el archivo CSV:', error);
      return 0;
    }
  }
}
