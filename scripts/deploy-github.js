const ghpages = require('gh-pages');

ghpages.publish(
    'public',
    {
      repo: 'https://github.com/arctype/demo-sql-client.git',
    },
    () => {
      console.log('Deploy Complete!');
    },
);
