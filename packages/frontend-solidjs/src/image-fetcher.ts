const URL = "https://api.qwant.com/v3/search/images";
const COLORING_PAGE_SUFFIX = 'da colorare';

function params(query, offset = 0) {
  return `?count=12&q=${query}+${COLORING_PAGE_SUFFIX}&safesearch=1&locale=it_it&offset=${offset}&device=desktop&&color=monochrome`;
};


const fetchImages = async (query): Promise<any> => {
  if (query === '') {
    return [];
  }
  const fullUrl = `${URL}${params(query)}`;
  return (await (await fetch(fullUrl)).json()).data.result.items;
}


export { fetchImages };
