const dummyData = require("./dummy_data.json")

const getPgClient = require("./helper")

const fillDummyData = async () => {
	const client = await getPgClient()
	for (let mission of dummyData) {
		await findOrCreateAgent(client, mission.agent)
		await createMission(client, mission)
	}
	await client.end()
}


const createMission = async (client, mission) => {
	const createMissionQuery = `
        INSERT INTO missions(agent_id, country, address, date) VALUES('${mission.agent}', '${mission.country}', '${mission.address}', '${mission.date}') RETURNING *
    `
	const missionCreationQuery = await client.query(createMissionQuery)
	return missionCreationQuery.rows[0]
}

const findOrCreateAgent = async (client, agentId) => {
	const getAgentQuery = `
        SELECT id FROM agents WHERE id = '${agentId}'
    `
	const agentQuery = await client.query(getAgentQuery)
	if (agentQuery.rows.length === 0) {
		const createAgentQuery = `
            INSERT INTO agents(id) VALUES('${agentId}') RETURNING *
        `
		const agentCreationQuery = await client.query(createAgentQuery)
		return agentCreationQuery.rows[0]
	} else {
		return agentQuery.rows[0]
	}
}

if (require.main === module) {
	fillDummyData()
		.then(() => {
			console.log("Done")
		})
		.catch((err) => {
			console.error("Failed to create table. ", err)
		})
}
