import { generateUrl, reverseUrl, test as testUrl } from './';

test('reverseUrl should gracefully handle "/" template', () => {
  expect(reverseUrl('/', '/')).toEqual({});
});

test('test should handle urls with "-"', () => {
  expect(testUrl('/blah/:blah', '/blah/blah-blah')).toBe(true);
})
