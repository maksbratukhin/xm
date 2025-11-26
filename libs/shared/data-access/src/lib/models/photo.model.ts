export interface Photo {
  id: string;
  url: string;
  thumbnailUrl: string;
  width: number;
  height: number;
}

export interface PhotoApiResponse {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}


