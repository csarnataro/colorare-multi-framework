// import { get, set } from 'idb-keyval';
// import { Image } from '../types';

// function storeImage(id: string, json: Image): void {
//   set(id, json);
// }

// async function find(id: string): Promise<Image | undefined> {
//   return get(id);
// }

// function cache(imageFetcher: (query: string) => Promise<any>) {
//   return async function cacheImageFetcher(query: string): Promise<any> {
//     const results: Image[] = await imageFetcher(query);
//     for(let i = 0; i < results.length; i++) {
//       const result = results[i];
//       storeImage(result._id, result);
//     }
//     return results;
//   }
// }

// export { cache, find };

export const something = 1;