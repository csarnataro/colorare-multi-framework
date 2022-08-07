import { Observable } from "rxjs";

export type HomeState = {
  history: string[];
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
  thumb_width: number;
  thumb_height: number;
  width: number;
  height: number;
  domain?: string;
}

export type ResultsState = {
  items: Image[];
  history: string[];
  loading: boolean;
  query: string;
  errorMessage?: string;
  selectedImage?: Image;
  selectedImageId?: string;
}

export type ResultsFacade = {
  init: () => void;
  updateQuery: (query: string) => void;
  items$: Observable<Image[]>;
  query$: Observable<string | undefined>;
  history$: Observable<string[]>;
  errorMessage$: Observable<string | undefined>;
}

export type SingleResultState = {
  selectedImage?: Image;
  selectedImageId?: string;
}

export type SingleResultFacade = {
  init: () => void;
  updateSelectedImageId: (id: string) => void;
  selectedImageId$: Observable<string>;
  selectedImage$: Observable<Image>;
}