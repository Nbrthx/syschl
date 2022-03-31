const cstring = document.cookie
const cookies = cstring ? cstring
  .split(';')
  .map(v => v.split('='))
  .reduce((acc, v) => {
    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
    return acc;
  }, {}) : ""

function User(){ return cookies.user }

export default User
