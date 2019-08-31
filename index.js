const Koa = require("koa")
const Router = require("koa-router")

const app = new Koa()
const PORT = process.env.PORT || 8081
const siteRouter = new Router()
const apiRouter = require("./api/router")


siteRouter.get("/", (ctx) => {
	ctx.body = "Site"
})


const server = (DAL) => {
	const apiRouterWithDAL = apiRouter(DAL)
	app
	// Initialize routes
		.use(siteRouter.routes())
		.use(siteRouter.allowedMethods())
		.use(apiRouterWithDAL.routes())
		.use(apiRouterWithDAL.allowedMethods())

	// Listen on port
	return app.listen(PORT).on("error", err => {
		console.error(err)
	})
}

if (require.main === module) {
	server()
}

module.exports = server