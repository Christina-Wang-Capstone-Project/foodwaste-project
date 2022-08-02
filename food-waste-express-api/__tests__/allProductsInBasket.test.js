const axios = require('axios').default;

describe("Fetch all products in basket test", () => {
    test('GetAllProductsInBasketTest ', () => {
        axios.get("http://localhost:3001/addtobasket").then((res) => {
           expect(res.status).toBe(200)
      })
    });
})