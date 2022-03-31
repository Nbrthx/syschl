const cstring = document.cookie
const cookies = cstring ? cstring
    .split("; ")
    .map(v => v.split("user=")) : ""

function User(){ return cookies }

export default User
