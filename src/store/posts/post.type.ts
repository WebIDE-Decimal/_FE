export interface Post {
  id: number;
  isDeleted: boolean;
  isWriter: boolean;
  title: string;
  content: string;
  recruited: number;
  state: boolean;
  target: string;
  createdAt: string;
  updatedAt: string;
}
