const customLocalStorage = {
    setItem(key, value) {
        localStorage.setItem(key, value)

        const event = new Event("pageChange")
        event.key = key
        event.newValue = value
        window.dispatchEvent(event)
    },
    getItem(key) {
        return localStorage[key]
    },
    removeItem(key) {
        return removeItem(key)
    }
}

export default customLocalStorage