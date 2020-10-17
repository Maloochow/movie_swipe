module.exports = function() {
    const clients = new Map()

    function registerClient(client, username) {
        clients.set(client.id, { client, user: {username}})
    }
    
    function removeClient(client) {
    clients.delete(client.id)
    }

    function getUserByClientId(clientId) {
        return (clients.get(clientId) || {}).user
      }

    return {
        registerClient,
        removeClient,
        getUserByClientId
    }
    
}