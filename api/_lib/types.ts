export type FileType = 'png' | 'jpeg';
export type Theme = 'default' | 'moon' | 'dawn';

export interface ParsedRequest {
    fileType: FileType;
    text: string;
    theme: Theme | string;
    md: boolean;
}
