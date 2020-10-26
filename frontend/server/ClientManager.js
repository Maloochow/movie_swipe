module.exports = function(currentConnection) {
    currentConnection.clients = new Map()

    function registerClient(client, username) {
        currentConnection.clients.set(client.id, { client, user: {username}})
        return currentConnection.clients.get(client.id)
    }
    
    function removeClient(client) {
    currentConnection.clients.delete(client.id)
    }

    function getUserByClientId(clientId) {
        return currentConnection.clients.get(clientId) || {}
      }

    function getAll() {
        return Array.from(currentConnection.clients.values())
    }

    return {
        registerClient,
        removeClient,
        getUserByClientId,
        getAll
    }
    
}