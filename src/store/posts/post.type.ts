export interface Post {
  id: number;
  isDeleted: boolean;
  isWriter: boolean;
  applied: boolean;
  myState?: string;
  title: string;
  content: string;
  recruited: number;
  state: boolean;
  target: string;
  createdAt: string;
  updatedAt: string;
}
