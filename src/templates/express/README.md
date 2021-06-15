# Project

Express TypeScript REST API boilerplate.

## Dependencies

- **debug** is a module that we will use to avoid calling console.log() while developing our application. This way, we can easily filter debug statements during troubleshooting. They can also be switched off entirely in production instead of having to be removed manually.
- **winston** is responsible for logging requests to our API and the responses (and errors) returned. **express-winston** integrates directly with Express.js, so that all standard API-related winston logging code is already done.
- **cors** is a piece of Express.js middleware that allows us to enable cross-origin resource sharing. Without this, our API would only be usable from front ends being served from the exact same subdomain as our back end.

## Project structure

- **Route configuration** to define the requests our API can handle.
- **Services** for tasks such as connecting to our database models, doing queries, or connecting to external services that are required by the specific request. Make our code cleaner by encapsulating business logic operations into functions that middleware and controllers can call.
- **Middleware** for running specific request validations before the final controller of a route handles its specifics.
- **Models** for defining data models matching a given database schema, to facilitate data storage and retrieval.
- **Controllers** for separating the route configuration from the code that finally (after any middleware) processes a route request, calls the above service functions if necessary, and gives a response to the client.

## Routes

For *'/users/:userId'*, we’ve also added generic middleware using the **all()** function, which will be run before any of the *get()*, *put()*, *patch()*, or *delete()* functions. This function will be beneficial when we create routes that are meant to be accessed only by authenticated users.
You might have noticed that in our .all() function—as with any piece of middleware—we have three types of fields: Request, Response, and NextFunction.

- The **Request** is the way Express.js represents the HTTP request to be handled. This type upgrades and extends the native Node.js request type.
- The **Response** is likewise how Express.js represents the HTTP response, again extending the native Node.js response type.
- No less important, the **NextFunction** serves as a callback function, allowing control to pass through any other middleware functions. Along the way, all middleware will share the same request and response objects before the controller finally sends a response back to the requester.

## Scripts

- The tsc in the ***start*** script belongs to TypeScript. It’s responsible for transpiling our TypeScript code into JavaScript, which it will output into the dist folder. Then, we just run the built version with node ./dist/app.js.
We pass *--unhandled-rejections=strict* to Node.js (even with Node.js v16+) because in practice, debugging using a straight "crash and show the stack" approach is more straightforward than fancier logging with an *expressWinston.errorLogger* object. This is most often true even in production, where letting Node.js continue to run despite an unhandled rejection is likely to leave the server in an unexpected state, allowing further (and more complicated) bugs to occur.

- The ***dev*** script calls the start script but first defines a **DEBUG** environment variable. This has the effect of enabling all of our *debugLog()* statements (plus similar ones from Express.js itself, which uses the same debug module we do) to output useful details to the terminal—details that are (conveniently) otherwise hidden when running the server in production mode with a standard npm start.
You can limit the debug output to our app.ts file's own *debugLog()* statements using *DEBUG=app* instead of **DEBUG=***. The debug module is generally quite flexible, and this feature is no exception.
