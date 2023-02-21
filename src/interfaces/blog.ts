export default interface BlogInterface {
  id?: string;
  _id?: string;
  title: string;
  author: string;
  likes: number;
  url: string;
  user?: string;
}
