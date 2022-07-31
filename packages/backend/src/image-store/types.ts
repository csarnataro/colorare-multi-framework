export type ItemState = {
  items: Image[];
  history: string[];
  loading: boolean;
  query?: string;
}


export type ResultItem = {
  media: string,
  title: string,
  thumbnail: string,
  thumb_width: number,
  thumb_height: number,
  width: number,
  height: number,
  url: string,
  _id: string,
  media_fullsize: string,
  media_preview: string,
  size: string,
  thumb_type: string,
}

export type Image = {
  id: string;
  title: string;
  media: URL;
  thumbnail: URL;
  media_preview: URL;
  data: string;
}

