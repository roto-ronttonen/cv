import axios from 'axios';
import {
  Media,
  MediaList,
  MediaListOptions,
  MediaStore,
  MediaUploadOptions,
} from 'tinacms';

export class MyMediaStore implements MediaStore {
  accept: string;
  async persist(files: MediaUploadOptions[]): Promise<Media[]> {
    const fd = new FormData();
    fd.append('file', files[0].file);
    const res = await axios.post<{ file: string; url: string }>(
      '/api/images',
      fd,
      { headers: { 'content-type': 'multipart/form-data' } }
    );
    return [
      {
        id: res.data.file,
        type: 'file',
        filename: res.data.file,
        previewSrc: res.data.url,
        directory: '_media',
      },
    ];
  }
  async delete(media: Media): Promise<void> {
    await axios.delete(`/api/images/${media.filename}`);
  }
  previewSrc(
    src: string,
    fieldPath?: string,
    formValues?: any
  ): string | Promise<string> {
    return src;
  }
  async list(options?: MediaListOptions): Promise<MediaList> {
    const res = await axios.get<{ files: { file: string; url: string }[] }>(
      '/api/images'
    );
    return {
      limit: res.data.files.length,
      offset: 0,
      totalCount: res.data.files.length,
      items: res.data.files.map((f) => ({
        id: f.file,
        type: 'file',
        filename: f.file,
        previewSrc: f.url,
        directory: '_media',
      })),
    };
  }
}
