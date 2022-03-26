export const cktool = {
    get: async key => {
        const cstring = document.cookie
        const cookies = (cstring)? cstring
            .split("; ")
            .map(v => v.split("="))
            .reduce((acc, v) => {
                acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
                return acc;
            }, {}) : {}
        
        const option = {
            method: "POST",
            body: JSON.stringify({ value: cookies[key] }),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        var decc = await fetch("/decrypt", option).json() || {}
        console.log(decc)
        return decc
    },
    set: (key, value) => {
        if(value != null) document.cookie = key+"="+value+"; secure"
        else document.cookie = key+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC"
    }
}
