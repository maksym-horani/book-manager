export enum ReadingStatus {
  None = 'None',
  InProgress = 'In Progress',
  Finished = 'Finished'
};

export enum BookSize {
  Magazine = 'Magazine',
  Novel = 'Novel',
  Textbook = 'Textbook',
  Other = 'Other'
}
export interface Book {
  id: number;
  title: string;
  author?: string;
  iban?: string;
  publishedDate?: string;
  addedDate: string;
  readingStatus: ReadingStatus;
  category?: string[];
  bookSize?: BookSize;
  description?: string;
  price?: number;
  quantity: number;
  rating: number;
}