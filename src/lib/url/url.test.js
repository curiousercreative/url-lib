import { generateUrl, reverseUrl } from './';

test('reverseUrl should gracefully handle "/" template', () => {
  expect(reverseUrl('/', '/')).toEqual({});
})
