const { Client } = require("pg")

const getPgClient = async () => {
	const client = new Client({
		user: "snir",
		host: "localhost",
		database: "tikal",
		password: "tikalpass",
	})
	await client.connect()
	const res = await client.query("SELECT $1::text as message", ["Hello world!"])
	console.log(res.rows[0].message) // Hello world!
	await client.end()
}

module.exports = getPgClient