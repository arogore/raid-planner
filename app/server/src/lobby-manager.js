const crypto = require('crypto');

module.exports = class LobbyManager {
    constructor() {
        this.lobbies = new Map();
    }

    createLobby() {
        const id = crypto.randomBytes(6).toString('hex');

        if (!this.lobbies.get(id)) {
            this.lobbies.set(id, {
                id: id,
                lines: []
            });
        } else {
            return this.createLobby();
        }

        return this.lobbies.get(id);
    }
}