import { expect } from 'chai';
import { getUpdatedHistory } from './update-history';

describe('updateHistory', () => {
  describe('getUpdatedHistory', () => {
    it('should add a new item in an empty history', () => {
      const query = "new_query"
      const currentHistory: string[] = [];
      const expected = ["new_query"];
      const actual = getUpdatedHistory(query, currentHistory)
      expect(actual).to.deep.equal(expected)
    });
    it('should add a new item in front of the history when ', () => {
      const query = "new_query"
      const currentHistory: string[] = ["old_query", "a very old query"];
      const expected = ["new_query", "old_query", "a very old query"];
      const actual = getUpdatedHistory(query, currentHistory)
      expect(actual).to.deep.equal(expected)
    });
    it('should move an existing item in front of the history', () => {
      const query = "new_query"
      const currentHistory: string[] = ["old_query", "new_query", "a very old query"];
      const expected = ["new_query", "old_query", "a very old query"];
      const actual = getUpdatedHistory(query, currentHistory)
      expect(actual).to.deep.equal(expected)
    });
    it('should expunge the last item if the size is >= 5', () => {
      const query = "new_query"
      const currentHistory: string[] = ["item1", "item2", "item3", "item4", "item5"];
      const expected = ["new_query", "item1", "item2", "item3", "item4"];
      const actual = getUpdatedHistory(query, currentHistory)
      expect(actual).to.deep.equal(expected)
    });
    it('should leave the history unchanged if the only item in the history is the same ', () => {
      const query = "new_query"
      const currentHistory: string[] = ["new_query"];
      const expected = ["new_query"];
      const actual = getUpdatedHistory(query, currentHistory)
      expect(actual).to.deep.equal(expected)
    });

  });
});