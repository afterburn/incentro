# Incentro Assessment

## Installation
```
npm i
```

## Usage
To run this project you will need a Spotify API client_id and client_secret obtainable through [Spotify For Developers](https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app).
Then, in the root of the project, you will need to create a config.json file that looks like this:
```json
{
  "client_id": "<your-client-id>",
  "client_secret": "<your-client-secret>"
}
```

```
npm start // Will run webpack in watch mode and start the node server. (Please wait until webpack build is finished before attempting to visit url)
npm run test // Will run jest test suites.
```

## Stuff I would do or add if given more time.
1. Convert all code to Typescript, not just Input and Button components.
2. Write unit tests for all components, helper functions, etc, not just Input and Button components.
3. Implement GraphQL for easier data fetching.
4. Implement Redis for caching instead of using an in-memory solution.
5. Implement pagination, right now, the app will only show the first 20 items.
6. Split up some of the components into seperate files (Carousel & List for example).