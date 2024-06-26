import { app } from "@/app"
import request from "supertest"

describe("Create Plateau [E2E]", () => {
  beforeAll(async() => {
    await app.ready()
  })

  afterAll(async() => {
    await app.close()
  })

  it("It should be able to create plateau", async() => {
    const response = await request(app.server)
      .post("/plateau")
      .send({
        "width": 4,
        "height": 6
      })
    
    expect(response.status).toBe(201)
  })

})