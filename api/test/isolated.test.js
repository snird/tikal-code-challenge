const request = require("supertest")
// require the Koa server
const server = require("../../index")
describe("routes: countries-by-isolation", () => {
	test("should respond as expected", async () => {
		const serverWithFakes = server()
        
		const response = await request(serverWithFakes).get("/api/v1/countries-by-isolation")
		expect(response.status).toEqual(200)
		expect(response.type).toEqual("application/json")
		expect(response.body.data).toEqual({
			"israel": 5
		})
        
		// Teardown
		serverWithFakes.close()
	})
})