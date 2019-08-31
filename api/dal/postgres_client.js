const { Client } = require("pg")

const getPgClient = async () => {
	const client = new Client({
		user: "snir",
		host: "localhost",
		database: "tikal",
		password: "tikalpass",
	})
	await client.connect()
	return client
}

module.exports = getPgClient