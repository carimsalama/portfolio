export interface IProject {
  _id:string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveDemo?: string;
  sourceCode?: string;
}
