# url library
library of functions for generating, reversing and testing urls against templates

## usage
```javascript
import {
  generateUrl,
  importTemplates,
  objectToQueryString,
  queryStringToObject,
  reverseUrl,
  test,
} from '@curiouser/url-lib';

// import url templates for future shorthand
importTemplates({
  article: '/blog/article/:publish_date/:author/:slug',
});

// test a url against a template
test('article', '/blog/article/2020-07-17/curiousercreative/url-lib-released');
// true

// get params from a url
reverseUrl('article', '/blog/article/2020-07-17/curiousercreative/url-lib-released');
// { publish_date: '2020-07-17', author: 'curiousercreative', slug: 'url-lib-released' }

// generate url from named params
reverseUrl('article', { publish_date: '2020-07-17', author: 'curiousercreative', slug: 'url-lib-released' });
// '/blog/article/2020-07-17/curiousercreative/url-lib-released'

// generate url from indexed params
reverseUrl('article', '2020-07-17', 'curiousercreative', 'url-lib-released');
// '/blog/article/2020-07-17/curiousercreative/url-lib-released'

// encode to query string
objectToQueryString({ page: 1, query: 'url lib', sort: 'name', visited: true });
// 'page=1&query=url%20&sort=name&visited=true'

// decode query string
queryStringToObject('page=1&query=url%20&sort=name&visited=true');
// { page: 1, query: 'url lib', sort: 'name', visited: true }
```
