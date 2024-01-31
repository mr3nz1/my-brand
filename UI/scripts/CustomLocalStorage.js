const customLocalStorage = {
    setItem(key, value) {
        localStorage.setItem(key, value)

        const event = new Event("localStorageChange")
        event.key = key
        event.newValue = value
        window.dispatchEvent(event)
    },
    getItem(key) {
        return localStorage[key]
    }
}

export default customLocalStorage