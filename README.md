# Incentro Assessment

## Installation
```
npm i
```

## Usage
```
npm start // Will run webpack in watch mode and start the node server. (Please wait until webpack build is finished before attempting to visit url)
npm run test // Will run jest test suites.
```

## Stuff I would add to this if given more time.
1. Convert all code to Typescript, not just Input and Button components.
2. Write unit tests for all components, helper functions, etc, not just Input and Button components.
3. Implement GraphQL for easier data fetching.
4. Implement Redis for caching instead of using an in-memory solution.
5. Implement pagination, right now, the app will only show the first 20 items.