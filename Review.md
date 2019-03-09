# Review Questions

## What is Node.js?
Node.js is a open-source, cross-platform JavaScript run-time environment that allows you to write javascript outside of the browser. Node lets developers use JavaScript to write command line tools and for server-side scripting(running scripts server-side to produce dynamic web page content before the page is sent to the user's browser.)

## What is Express?
Express is a web framework for Node.js, it's basically to Node.js what Ruby on Rails or Sinatra is to Ruby. It's a light-weight web framework that helps organize your web application into an MVC architecture on the server side. It allows you to use a database like MongoDB to provide a backend for your Node app

## Mention two parts of Express that you learned about this week.
express.Router() && async await. Async/await is a new way to write asynchronous code. Previous options for asynchronous code are callbacks and promises.
express.Router() is a new feature added in expressJS 4.0. It's similar to a mini express application, because it doesn't bring in views or settings but
provides us with the routing API like .use, .get

## What is Middleware?
Functions that get the request and response objects and can operate on them before passing them on. Useful for logging etc

## What is a Resource?
A Resource is pretty much any information we connect CRUD operations to.

## What can the API return to help clients know if a request was successful?
Status codes and messages, Typically you'd use res.status(code).json(message object)

## How can we partition our application into sub-applications?
By creating and importing routers and setting up a server.use() at the correct routes.

## What is express.json() and why do we need it?
express.json() is a method that comes out of the box with express that recognizes incoming request objects as strings or arrays. You need it for POST and PUT but not GET or DELETE because you are sending data objects to the server and asking it to store the data.