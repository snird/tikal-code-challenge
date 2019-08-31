const getPgClient = require("./helper")

const createDBTable = async () => {
	const client = await getPgClient()
	const createAgentsTableQuery = `
		CREATE TABLE agents (
			id INT PRIMARY KEY
		)
	`
	await client.query(createAgentsTableQuery)
	const createMissionsTableQuery = `
        CREATE TABLE missions (
            id INT PRIMARY KEY,
            agent_id INT REFERENCES agents(id),
			country TEXT,
			address TEXT
        );
        `
	await client.query(createMissionsTableQuery)
	await client.end()
}

if (require.main === module) {
	createDBTable()
		.then(() => {
			console.log("Done")
		})
		.catch((err) => {
			if (err.code === "42P07") {
				console.error("table already exists. Try removing it before re-creation.")
			} else if (err.code === "3D000") {
				console.error("Please create the DB first.")
			} else {
				console.error("Failed to create table. ", err)
			}
		})
}
