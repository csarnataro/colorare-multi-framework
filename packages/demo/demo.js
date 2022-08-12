import { SearchResultsViewModel } from '@colorare/backend';


const vm = new SearchResultsViewModel();
initPageListeners();
console.log('**** view model created ****');

function h(selector, content) {
  document.querySelector(selector).innerHTML = content;  
}

function handleQueryChange(event) {
  const value = event.target.value;
  console.log(`****1 ${value}`);
  vm.updateQuery(value);
}

function triggerSearch() {
  const value = document.querySelector('#input-query').value;
  console.log(`****2 ${value}`);
  vm.updateQuery(value);
}


function initPageListeners() {
  document.querySelector('#input-query').addEventListener('change', handleQueryChange); 
  document.querySelector('#button-search').addEventListener('click', triggerSearch); 
}

vm.data$.subscribe((data) => {
  let html = JSON.stringify(data, null, 2);

  h('#data-debug-panel', `<pre>${html}</pre>`);

})

vm.history$.subscribe((history) => {
  let html = '<ul>';
  history.forEach((historyItem) => {
    html += `<li>${historyItem}</li>`;
  })
  html += '</ul>'
  h('#history-debug-panel', html);
});

vm.items$.subscribe((items) => {
  let html = `found ${items.length} item(s)<br>`;
  for (let i= 0; i<items.length; i += 1) {
    html += `<img src="${items[i].media_preview}" width="80">`;
  }
  h('#items-debug-panel', html);
});

export { handleQueryChange }