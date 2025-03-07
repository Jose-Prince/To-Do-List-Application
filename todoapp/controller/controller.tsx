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
            throw new Error(`Error en la solicitud: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error in data", error)
        throw error
    }

}

export default login
