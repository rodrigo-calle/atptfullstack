import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';

@Injectable()
export class CsvFileValidationPipe implements PipeTransform {
  async transform(file: Express.Multer.File): Promise<Express.Multer.File> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (file.mimetype !== 'text/csv') {
      throw new BadRequestException('Only CSV files are allowed');
    }

    const requiredHeaders = ['dni', 'nombre', 'apellidos', 'correo'];
    const fileContent = file.buffer.toString();

    const stream = Readable.from(fileContent);

    return new Promise((resolve, reject) => {
      const headers = new Set<string>();
      let hasContent = false;

      stream
        .pipe(csvParser())
        .on('headers', (parsedHeaders) => {
          requiredHeaders.forEach((header) => {
            if (!parsedHeaders.includes(header)) {
              reject(
                new BadRequestException(`Missing required header: ${header}`),
              );
            }
          });

          parsedHeaders.forEach((header) => headers.add(header));
        })
        .on('data', () => {
          hasContent = true;
        })
        .on('end', () => {
          if (!hasContent) {
            reject(new BadRequestException('The CSV file has no content'));
          } else {
            resolve(file);
          }
        })
        .on('error', () => {
          reject(new BadRequestException('Error processing CSV file'));
        });
    });
  }
}
