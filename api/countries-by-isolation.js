

const countriesByIsolation = async (ctx) => {
	const data = await ctx.DAL.countriesByIsolation()
	// eslint-disable-next-line require-atomic-updates
	ctx.body = {
		data
	}
}


module.exports = countriesByIsolation