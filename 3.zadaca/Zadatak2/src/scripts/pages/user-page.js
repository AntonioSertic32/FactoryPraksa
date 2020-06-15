import { getUser as fetchData } from 'scripts/utils/api'

async function getUserData(username) {
    try {
        // Get response from API
        const response = await fetchData(username)

        // Logic goes here..
        console.log(response)
    } catch (e) {
        console.error('Fetching data error!',e)
    }
}

// Init function
// getUserData('EqualString')
