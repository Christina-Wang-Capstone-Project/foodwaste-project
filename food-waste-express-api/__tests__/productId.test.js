const axios = require('axios').default;
let productId = ["KGkFbPOv2B", "8A0Dss2laD", "iv5nOoTmq6", "ireED71K8B", "U0fdPXIouR", "sCYpyZy8tp", "qohpkS4pPm", "8vA86XIEEa", "k2V5DWj76b", "nRzQQgUsyY", "vds5hpuYQ3"]

describe("Fetch product based on productId", () => {
    productId.map((objectId) => {
        test('GetProductTest ', () => {
            axios.get(`http://localhost:3001/${objectId}`).then((res) => {
                expect(res.status).toBe(200)
                expect(res.data.length > 0) // expect return.length > 0
            })

        })
    })
})