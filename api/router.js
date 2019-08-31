const Router = require("koa-router")

const apiRouter = async (DAL) => {
	const router = new Router({
		prefix: "/api/v1"
	})
    
	router.use(async (ctx, next) => {
		ctx.DAL = DAL || await require("./dal")()
		await next()
	})
    
	router.get("/countries-by-isolation", require("./countries-by-isolation"))

	router.get("/find-closest-and-furthest", (ctx, next) => {
		ctx.body = "wow"
	})

	return router
}

module.exports = apiRouter