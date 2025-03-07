async function login(email: string): Promise<any> {

    const body = {
        email: email
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/to-do/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
        })

        if (!response.ok) {
            throw new Error(`Error in request: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error in data", error)
        throw error
    }

}

async function createTask(email: string, title: string, token: string) {
    const body = {
        user_email: email,
        title: title
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/to-do/tasks/create`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        })

        if (!response.ok) {
            throw new Error(`Error in request: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error in data", error)
        throw error
    }
}

async function getTask(token: string, id: string) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/to-do/tasks/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })

        if (!response.ok) {
            throw new Error(`Error in request: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error in data", error)
        throw error
    }
}

async function getTaskList(token: string, limit: string, order: string, page: string) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/to-do/tasks?limit=${limit}&order=${order}&page=${page}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })

        if (!response.ok) {
            throw new Error(`Error in request: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error in data", error)
        throw error
    }
}

async function updateTask(token: string, id: string) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/to-do/tasks/update/${id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })

        if (!response.ok) {
            throw new Error(`Error in request: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error in data", error)
        throw error
    }
}

async function deleteTask(token: string, id: string) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_HOST}/to-do/tasks/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })

        if (!response.ok) {
            throw new Error(`Error in request: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error in data", error)
        throw error
    }
}

export default {
    login,
    createTask,
    getTask,
    getTaskList,
    updateTask,
    deleteTask
}
