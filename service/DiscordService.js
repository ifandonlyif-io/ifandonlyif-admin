export default class DiscordService {
    constructor() {
        const config = useRuntimeConfig()
        this.apiBase = config.public.apiBase
    }

    getAppliance() {
        return fetch(`${this.apiBase}/api/discord/appliances`, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'valid-key',
            }
        })
    }

    getChannels() {
        return fetch(`${this.apiBase}/api/discord/channels`, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'valid-key',
            }
        })
    }

    approve(applianceId, isApproved) {
        return fetch(`${this.apiBase}/api/discord/approve/${applianceId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'valid-key',
            },
            body: JSON.stringify({
                is_approved: isApproved
            })
        })
    }

    lockChannel(channelId) {
        return fetch(`${this.apiBase}/api/discord/channel/lock/${channelId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'valid-key',
            }
        })
    }

    unlockChannel(channelId) {
        return fetch(`${this.apiBase}/api/discord/channel/unlock/${channelId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'valid-key',
            }
        })
    }
}