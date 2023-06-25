export default class ProjectService {
    getUnverifiedProjects() {
        return fetch('http://localhost:8080/api/listUnreviewedBlocklists', {
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'valid-key',
            },
        })
    }

    getVerifiedProjects() {
        return fetch('http://localhost:8080/api/listVerifiedBlocklists', {
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'valid-key',
            },
        })
    }

    getDisapprovedProjects() {
        return fetch('http://localhost:8080/api/listDisprovedBlocklists', {
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'valid-key',
            }
        })
    }

    verify(projectId) {
        return fetch('http://localhost:8080/api/verifyBlocklist', {
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
        return fetch('http://localhost:8080/api/disproveBlocklist', {
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