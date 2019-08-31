
const countriesByIsolation = (client) => {
	return async () => {
		const results = await client.query(`
			SELECT COUNT(country) AS isolated_agents_in_country, country
			-- Subquery for getting isolated agents and their countries
			FROM   (SELECT agent_id                AS agent_id,
						Count(DISTINCT country) AS countries_operated_in,
						Max(country)            AS country
					FROM   missions
					GROUP  BY agent_id) AS agents_country_operations
			WHERE  agents_country_operations.countries_operated_in = 1
			GROUP  BY country
			ORDER  BY isolated_agents_in_country DESC
		`)

		console.log(results)
		return results.rows
	}
}

module.exports = countriesByIsolation