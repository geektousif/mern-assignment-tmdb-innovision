export interface Cast {
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  description: string;
  casts: Cast[];
  trailer: string | null;
}
