const axios = require('axios').default;

describe("Fetch all products on hold test", () => {
    test('GetProductsOnHoldTest', () => {
        axios.get("http://localhost:3001/home/onhold").then((res) => {
            expect(res.status).toBe(200)
        })
    })
})