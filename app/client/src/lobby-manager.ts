import config from '../config.default';
import Dispatcher from './dispatcher';

export default class LobbyManager {

    public lobbyId: string;

    constructor(private dispatcher: Dispatcher) {
        document.getElementById("create-lobby-btn").addEventListener('click', () => {
            this.createLobby();
        });
    }

    createLobby() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${config.url}/room?password=test`);

        const self = this;
        xhr.onloadend = function(e) {
            self.setLobbyId(this.responseText);
        };

        xhr.send();
    }

    setLobbyId(id: string) {
        this.lobbyId = id;
        this.dispatcher.joinRoom(id);
        document.getElementById('create-lobby-btn').style.display = 'hidden';
        document.getElementById('id-display').innerHTML = id;
        window.history.pushState("", "", window.location.href + '?room=' + this.lobbyId);
    }

    joinLobby(lobbyKey: string) {

    }

}