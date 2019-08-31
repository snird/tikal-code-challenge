const getPgClient = require("./helper")

const createDBTable = async () => {
	const client = await getPgClient()
	await dropTables(client)

	const createAgentsTableQuery = `
		CREATE TABLE agents (
			id TEXT PRIMARY KEY
		)
	`
	await client.query(createAgentsTableQuery)
	const createMissionsTableQuery = `
        CREATE TABLE missions (
            id SERIAL PRIMARY KEY,
            agent_id TEXT REFERENCES agents(id),
			country TEXT,
			address TEXT,
			date TIMESTAMP
        );
        `
	await client.query(createMissionsTableQuery)
	await client.end()
}

const dropTables = async (client) => {
	try {
		await client.query("DROP TABLE agents CASCADE;")
	} catch (err) {
		console.log("No previous agents table to drop.")
	}
	try {
		await client.query("DROP TABLE missions CASCADE;")
	} catch (err) {
		console.log("No previous missions table to drop.")
	}
}

if (require.main === module) {
	createDBTable()
		.then(() => {
			console.log("Done")
		})
		.catch((err) => {
			if (err.code === "3D000") {
				console.error("Please create the DB first.")
			} else {
				console.error("Failed to create table. ", err)
			}
		})
}
