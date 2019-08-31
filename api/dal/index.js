const pgClient = require("./postgres_client")

const getDAL = async () => {
	const client = await pgClient()
	return {
		countriesByIsolation: require("./countries_by_isolation")(client)
	}
}

module.exports = getDAL