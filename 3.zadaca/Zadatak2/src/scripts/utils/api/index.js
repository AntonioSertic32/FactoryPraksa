/**
 * Get gitHub user by username
 * @param {*string} username
 */
export async function getUser(username) {
    try {
        const response = await $.ajax(`https://api.github.com/users/${username}`)
        return response
    } catch (e) {
        throw e
    }
}
