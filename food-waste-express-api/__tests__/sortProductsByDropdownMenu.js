const axios = require('axios').default;


describe("Fetch product in sorted order by dropdown menu", () => {
        test('SortProductTest', () => {
            axios.get(`http://localhost:3001/dropdown/0`).then((res) => {
                expect(res.status).toBe(200)
                expect(res.data.length > 0) // expect return.length > 0
            })
        })
        test('SortProductTest', () => {
            axios.get(`http://localhost:3001/dropdown/1`).then((res) => {
                expect(res.status).toBe(200)
                expect(res.data.length > 0) // expect return.length > 0
            })

        })
        test('SortProductTest', () => {
            axios.get(`http://localhost:3001/dropdown/2`).then((res) => {
                expect(res.status).toBe(200)
                expect(res.data.length > 0) // expect return.length > 0
            })

        })
        test('SortProductTest', () => {
            axios.get(`http://localhost:3001/dropdown/3`).then((res) => {
                expect(res.status).toBe(200)
                expect(res.data.length > 0) // expect return.length > 0
            })

        })
    })