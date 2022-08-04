const axios = require('axios').default;


describe("Fetch product in sorted order by dropdown menu", () => {
        test('SortProductByDistanceLowToHighTest', () => {
            axios.get(`http://localhost:3001/dropdown/0`).then((res) => {
                let checkIfNextDistanceIsBigger = true;
                let allProducts = res.data.allProducts
                for (let i = 0; i < allProducts.length -1; i++) {
                    if (allProducts[i].distance > allProducts[i + 1].distance) {
                        checkIfNextDistanceIsBigger = false;
                    }
                }
                expect(checkIfNextDistanceIsBigger)
            })
        })
    test('SortProductByDistanceHighToLowTest', () => {
        axios.get(`http://localhost:3001/dropdown/1`).then((res) => {
            let checkIfNextDistanceIsSmaller = true;
            let allProducts = res.data.allProducts
            for (let i = 0; i < allProducts.length - 1; i++) {
                if (allProducts[i].distance < allProducts[i + 1].distance) {
                    checkIfNextDistanceIsBigger = false;
                }
            }
            expect(checkIfNextDistanceIsSmaller)
        })
    })

        })
test('SortProductByCreatedAtDateTest', () => {
    axios.get(`http://localhost:3001/dropdown/2`).then((res) => {
        let checkIfNextCreatedAtDateIsSmaller = true;
        for (let i = 0; i < allProducts.length - 1; i++) {
            if (allProducts[i].createdAt < allProducts[i + 1].createdAt) {
                checkIfNextCreatedAtDateIsSmaller = false;
            }
        }
        expect(checkIfNextCreatedAtDateIsSmaller)
    })
})

        test('SortProductByExpDateTest', () => {
            axios.get(`http://localhost:3001/dropdown/3`).then((res) => {
                let checkIfNextExpDateIsBigger = true;
                for (let i = 0; i < allProducts.length - 1; i++) {
                    if (allProducts[i].date < allProducts[i + 1].date) {
                        checkIfNextExpDateIsBigger = false;
                    }
                }
                expect(checkIfNextExpDateIsBigger)

        })
    })