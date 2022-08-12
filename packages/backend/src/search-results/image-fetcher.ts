import { catchError, concatAll, filter, map, Observable, of, tap, toArray } from "rxjs";
import { ajax } from 'rxjs/ajax';
import { Image, ResultItem } from "../types";

const API_URL = "https://api.qwant.com/v3/search/images";
const COLORING_PAGE_SUFFIX = 'da colorare';

function params(query: string, offset = 0) {
  return `?count=50&q=${query}+${COLORING_PAGE_SUFFIX}&t=images&safesearch=1&locale=it_IT&offset=${offset}&device=desktop&color=monochrome`;
};

const secure = (item : ResultItem) => item.media.startsWith('https://') 

const extractDomain = (url: string): string => {
  const possibleDomain = url.match(/.*\:\/\/(?:www.)?([^\/]+)/);
  if (possibleDomain) {
    return possibleDomain[1];
  }
  return "--";
}

const convertItem = (item: ResultItem): Image => {
  return {
    id: item._id,
    title: item.title,
    media: new URL(item.media_fullsize),
    thumbnail: new URL(item.thumbnail),
    media_preview: new URL(item.media_preview),
    thumb_width: item.thumb_width,
    thumb_height: item.thumb_height,
    width: item.width,
    height: item.height,
    domain: extractDomain(item.url)
  }

}

const fetchImages = (query: string): Observable<Image[]> => {
  if (query === '') {
    return of([]);
  }
  const fullUrl = `${API_URL}${params(query)}`;
  return ajax.getJSON(fullUrl).pipe(
    map(userResponse => (userResponse as any).data.result.items),
    concatAll<ResultItem[]>(),
    filter(secure),
    map(convertItem),
    toArray(),
    catchError(error => {
      console.log('error: ', error);
      return of(error);
    })
  );
  
  // (await (await fetch(fullUrl)).json()).data.result.items;
}


export { fetchImages };
