export const cktool = {
    get: key => {
        const cstring = document.cookie
        const cookies = (cstring)? cstring
            .split("; ")
            .map(v => v.split("="))
            .reduce((acc, v) => {
                acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
                return acc;
            }, {}) : {}
        return cookies[key]
    },
    set: (key, value) => {
        if(value != null) document.cookie = key+"="+value
        else document.cookie = key+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC"
    }
}