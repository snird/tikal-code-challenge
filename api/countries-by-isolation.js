

const countriesByIsolation = (ctx) => {
	console.log("im here")
	const data = ctx.DAL.countriesByIsolation()
	ctx.body = {
		data
	}
}


module.exports = countriesByIsolation