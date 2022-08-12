import { Observable, of } from "rxjs";

export const KEY = 'history';
const HISTORY_SIZE = 5;

/**
 * History is saved as a JSON string in the following format:
 * ```javascript
  [
    "myquery",
    "anotherQuery"
  ]
  ```


 * This array should behave like a FIFO queue, meaning that the older item (e.g. in position 5) 
 * should be expunged from the array.
 * On the other hand, if the item is already present, it will be removed from the current position
 * and put to the top of the queue.
 * 
 * @param query 
 */

function updateHistory(query: string): string[] | undefined {
  if (!query) return;
  const existingHistory= JSON.parse(window.localStorage.getItem(KEY) || '[]') as string[];
  const newHistory = getUpdatedHistory(query.toLowerCase(), existingHistory);
  if (newHistory) {
    window.localStorage.setItem(KEY, JSON.stringify(newHistory));
  }
  return newHistory;
}

function getUpdatedHistory(query: string, historyArray: string[]): string[] {
  if (!query) return [];
  if (historyArray.includes(query)) {
    const index = historyArray.indexOf(query);
    historyArray = [query, ...historyArray.slice(0, index), ...historyArray.slice(index + 1)]
  } else {
    historyArray = [query, ...historyArray];
  }
  return historyArray.slice(0, HISTORY_SIZE);
}

export { updateHistory, getUpdatedHistory};
