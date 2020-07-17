const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const Router = require('koa-router');
const koaStatic = require('koa-static');
//const json = require('koa-json');

const app = new Koa();
const router = new Router();

app.use(bodyParser())
app.use(koaStatic('public'))

//app.use(json())

// Setup handlebars
app.use(views(`${__dirname}/views`, 
	{ extension: 'handlebars'}, 
	{ map: { handlebars: 'handlebars' } }
))

// Simple templating middleware
app.use(async (ctx, next) => {
	// gets called after handlebars does it stuff
	// on every request...
	
	// prepare a data object, so we can use it later.
	// this should be what is used when rendering a page template
	ctx.data = {}
	// Await rest of middleware stack
	await next();
	
	// After all other middleware is finished:
	// See if a '.handlebars' template was rendered,
	if (ctx.data.filename && ctx.data.filename.endsWith(".handlebars")) {
		// if it was, stick its body inside of the 'main' template.
		ctx.data.body = ctx.body
		await ctx.render("layouts/main", ctx.data);
	}
});

router.get("/", async (ctx, next) => {
	ctx.data.title = "Test Page"
	ctx.data.name = "World"
	// Let handlebars render index template with whatever data it has...
	await ctx.render("index", ctx.data);
	
}).get("/something", async (ctx, next) => {
	ctx.body = { test: "value" }
	
	
}).get("/tests/:id", async (ctx, next) => {
	ctx.body = `You requested id ${ctx.params.id}
${ctx.query.thing||'nothing' } ${new Date()}
${JSON.stringify(ctx.query, null, 4)}
`;
	
})


app.use(router.routes())
	.use(router.allowedMethods())
	
app.listen(3000);
