import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File, FileStatus } from './files.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FileCreatedEvent } from './events/fileCreated.event';
import { Readable } from 'stream';
import * as csvParser from 'csv-parser';
import { FileUpdatedEvent } from './events/fileUpdated.event';

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

  async findOne({ id }: { id: number }) {
    const file = await this.filesRepository.findOne({
      where: { id },
      select: {
        id: true,
        user: {
          id: true,
          username: true,
          lastMedal: true,
          medals: true,
        },
        fileUrl: true,
        status: true,
      },
      relations: {
        user: true,
        clients: true,
      },
    });
    return file;
  }

  async findManyByUser(userId: number) {
    const files = await this.filesRepository.find({
      where: { user: { id: userId } },
      select: {
        id: true,
        user: {
          id: true,
          username: true,
          lastMedal: true,
          medals: true,
        },
        fileUrl: true,
        status: true,
      },
      relations: {
        user: true,
        clients: true,
      },
    });

    return Promise.all(
      files.map(async (file) => ({
        ...file,
        clientsInFile: await this.countCsvRecords(file.fileUrl),
      })),
    );
  }

  async findManyByUserNoAdmin(): Promise<File[]> {
    const files = await this.filesRepository.find({
      where: { user: { isAdmin: false } },
    });
    return files;
  }

  async update(id: number, updatedBy: number, file: Partial<File | null>) {
    const fileToUpdate = await this.filesRepository.findOne({
      where: { id },
      select: {
        status: true,
        id: true,
        user: {
          medals: true,
          clientsRegistered: true,
          id: true,
          lastMedal: true,
        },
      },
      relations: {
        user: true,
      },
    });

    if (fileToUpdate && Object.keys(file).length === 1 && file.status) {
      const updatedFile = await this.filesRepository.update(id, file);

      const totalClientsInFile = await this.countCsvRecords(
        fileToUpdate.fileUrl,
      );
      const fileUpdatedEvent = new FileUpdatedEvent();
      fileUpdatedEvent.user = fileToUpdate.user;
      fileUpdatedEvent.status = file.status;
      fileUpdatedEvent.updatedBy = updatedBy;
      fileUpdatedEvent.updatedDate = new Date();
      fileUpdatedEvent.totalClients = totalClientsInFile;
      fileUpdatedEvent.fileId = fileToUpdate.id;

      if (file.status === FileStatus.APPROVED) {
        this.eventEmitter.emit(
          'file.updated.status.approved',
          fileUpdatedEvent,
        );
      }

      if (file.status === FileStatus.REJECTED) {
        console.log('REJECTED');
        this.eventEmitter.emit(
          'file.updated.status.rejected',
          fileUpdatedEvent,
        );
      }

      return updatedFile.raw[0];
    }

    const updatedFile = await this.filesRepository.update(id, file);

    return updatedFile.raw[0];
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

  async findAll(): Promise<File[]> {
    const files = await this.filesRepository.find({
      select: {
        id: true,
        fileUrl: true,
        status: true,
        createdAt: true,
        user: {
          id: true,
          username: true,
          lastMedal: true,
          medals: true,
        },
      },
      relations: {
        user: true,
      },
    });
    const newFiles = Promise.all(
      files?.map(async (file) => {
        const totalClientsInFile = await this.countCsvRecords(file.fileUrl);
        return {
          ...file,
          clientsInFile: totalClientsInFile,
        };
      }),
    );

    return newFiles;
  }
}
