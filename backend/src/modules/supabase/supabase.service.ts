import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  private supabase;
  constructor(private readonly configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('SUPABASE_URL and SUPABASE_KEY are required.');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async uploadFile(
    file: Express.Multer.File,
    destinationPath: string,
  ): Promise<string> {
    const { error } = await this.supabase.storage
      .from('atp-test')
      .upload(destinationPath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }

    const { error: errorStorage, publicUrl } = this.supabase.storage
      .from('atp-test')
      .getPublicUrl(destinationPath).data;

    if (errorStorage) {
      throw new Error(`Error getting public URL: ${errorStorage}`);
    }
    return publicUrl;
  }
}
