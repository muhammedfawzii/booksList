export interface Search {
  id: number;
  title: string;
  authors: Author[];
  translators: Translator[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean;
  media_type: string;
  formats: Formats;
  download_count: number;
}

interface Formats {
  'text/html': string;
  'text/html; charset=utf-8': string;
  'application/epub+zip': string;
  'application/x-mobipocket-ebook': string;
  'text/plain; charset=utf-8': string;
  'application/rdf+xml': string;
  'image/jpeg': string;
  'application/octet-stream': string;
  'text/plain; charset=us-ascii': string;
}

interface Translator {
  name: string;
  birth_year: null;
  death_year: null;
}

interface Author {
  name: string;
  birth_year: number;
  death_year: number;
}
