export default class ProjectService {
    constructor() {
        const config = useRuntimeConfig()
        this.apiBase = config.public.apiBase
    }

    getUnverifiedProjects() {
        return fetch(`${this.apiBase}/api/listUnreviewedBlocklists`, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'valid-key',
            },
        })
    }

    getVerifiedProjects() {
        return fetch(`${this.apiBase}/api/listVerifiedBlocklists`, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'valid-key',
            },
        })
    }

    getDisapprovedProjects() {
        return fetch(`${this.apiBase}/api/listDisprovedBlocklists`, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'valid-key',
            }
        })
    }

    verify(projectId) {
        return fetch(`${this.apiBase}/api/verifyBlocklist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'valid-key',
            },
            body: JSON.stringify({
                'uuid': projectId,
            }),
        })
    }

    disapprove(projectId) {
        return fetch(`${this.apiBase}/api/disproveBlocklist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'valid-key',
            },
            body: JSON.stringify({
                'uuid': projectId,
            })
        })
    }
}