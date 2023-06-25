export default class DiscordService {
    getAppliance() {
        return fetch('http://localhost:8080/discord/appliances', {
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'valid-key',
            }
        })
    }

    getChannels() {
        return fetch('http://localhost:8080/discord/channels', {
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'valid-key',
            }
        })
    }

    approve(applianceId, isApproved) {
        return fetch(`http://localhost:8080/discord/approve/${applianceId}`, {
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
}