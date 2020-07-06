# Notes from looking at code
## Assumptions about code before looking deeper:
- looks like a node.js project
	- has a `package.json` file
- `public/` folder holds client side resources.
- Everything else is server-side.
- in routes, the `api-routes.js` file describes routes (get/post/etc) that serve/expect json data
	- If not json, maybe xml or yml or some other common machine data format...
- the `routes/` folder probably holds definitions for server endpoints
	- the `html-routes.js` probably serves the html files in the `public/` folder.
	- No `views` or `.handlebars` files present, probably not using a view/rendering engine.
- the `models/` folder is probably included as a folder, because there is an `index.js` inside.
- `config/` folder likely deals with authentication configuration
	- Whatever is in the `config/middleware` directory is likely loaded as middleware inside of express (or some other server app)
- the `server.js` in the root is likely the starting point for the whole application

## Looking deeper
