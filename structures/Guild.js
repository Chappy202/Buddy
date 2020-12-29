const { Structures } = require('discord.js');
const config = require("../config.js");

Structures.extend('Guild', Guild => {
    class GuildExt extends Guild {
        constructor(...args) {
            super(...args);
        }

        // Returns the Guild Prefix
        // <Guild>.prefix
        get prefix() {
            return this.get('prefix', config.defaultPrefix);
        }

        // The following methods are all namespaced by Guild ID
        // Examples:
        // <Guild>.get('loggingChannelID', [fallback]);
        // <Guild>.set('loggingChannelID', '782218398846287912')
        get(key, fallback) {
            return this.client.db.get(`${this.id}.${key}`) || fallback;
        }

        set(key, data) {
            return this.client.db.set(`${this.id}.${key}`, data);
        }

        delete(key) {
            return this.client.db.delete(`${this.id}.${key}`);
        }

        setChat(id) {
            return this.client.db.set(`chat.${this.id}`, id)
        }

        deleteChat(id) {
            return this.client.db.delete(`chat.${this.id}`)
        }
    }

    return GuildExt;
});