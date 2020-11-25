export type FileType = 'png' | 'jpeg';
export type Theme = 'default' | 'moonlit' | 'dawn';

export interface ParsedRequest {
    fileType: FileType;
    text: string;
    theme: Theme;
    md: boolean;
    fontSize: string;
    images: string[];
    widths: string[];
    heights: string[];
}
