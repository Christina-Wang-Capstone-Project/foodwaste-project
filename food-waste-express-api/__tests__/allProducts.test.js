const axios = require('axios').default;

describe("Fetch all products test", () => {
    test('GetAllProductsTest ', () => {
        axios.get("http://localhost:3001/makeapost").then((res) => {
            expect(res.status).toBe(200)
            expect(res.data.products.length > 0) // expect return.length > 0
      })
    });
})
   