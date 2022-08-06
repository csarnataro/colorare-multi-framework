import { catchError, concatAll, flatMap, map, mergeAll, mergeMap, Observable, of, switchMap, tap, toArray } from "rxjs";
import { ajax } from 'rxjs/ajax';
import { ResultItem, Image } from "../types";
import Base64 from "../utils/base64";

const API_URL = "https://api.qwant.com/v3/search/images";
const COLORING_PAGE_SUFFIX = 'da colorare';

function params(query: string, offset = 0) {
  return `?count=12&q=${query}+${COLORING_PAGE_SUFFIX}&t=images&safesearch=1&locale=it_IT&offset=${offset}&device=desktop&color=monochrome`;
};

function arrayBufferToBase64( buffer: any ) {
	var binary = '';
	var bytes = new Uint8Array( buffer );
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode( bytes[ i ] );
	}
	return Base64.encode( binary );
}

const convertItem = (item: ResultItem): Image => {

  const slimmedItem: Partial<ResultItem> = {
    title: item.title,
    media: item.media,
    thumbnail: item.thumbnail,
    media_preview: item.media_preview,
  }

  const tmp: Partial<Image> = {
    title: item.title,
    media: new URL(item.media),
    thumbnail: new URL(item.thumbnail),
    media_preview: new URL(item.media_preview),
  }

  const encodedData = Base64.encode(JSON.stringify(slimmedItem));

  tmp.id = encodedData;
  return tmp as Image;
}

const fetchImages = (query: string): Observable<Image[]> => {
  if (query === '') {
    return of([]);
  }
  const fullUrl = `${API_URL}${params(query)}`;
  return ajax.getJSON(fullUrl).pipe(
    map(userResponse => (userResponse as any).data.result.items),
    tap(res => {
      console.dir('******** BEGIN: image-fetcher:52 ********');
      console.dir(res, { depth: null, colors: true });
      console.dir('********   END: image-fetcher:52 ********');
    }),
    concatAll<ResultItem[]>(),
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
