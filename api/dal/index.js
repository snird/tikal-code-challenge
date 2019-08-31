const pgClient = require("./postgres_client")()

module.exports = {
	countriesByIsolation: require("./countries_by_isolation")
}