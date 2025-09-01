module.exports = {
  schema: './src/graphql/schema.graphql',
  documents: [
    './src/graphql/**/*.graphql',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  extensions: {
    codegen: {
      generates: {
        './src/types/graphql.ts': {
          plugins: ['typescript', 'typescript-resolvers']
        }
      }
    }
  }
};
