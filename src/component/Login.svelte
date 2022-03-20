<script>
	import { cktool } from "./cktool.js"
	const cjs = require("cryptojs")

	let user = cktool.get("user")

	let name = ""
	let password = ""
	let msg = ""

	function auth(data){
		let enpw = cjs.AES.encrypt(password, "justlnh")
		if(!name || !password) msg = "Input must be filled"
		else if(password.length < 8) msg = "Password musd be more 8 character"
		else if(name != data.id && enpw != data.password) msg = "Input incorrect"
		else {
			cktool.set("user", name)
			location.href = "/"
		}
	}

	function submit(){
		fetch("/api?for=login&&user="+name+"&&pw=")
		.then(res => res.json())
		.then(data => auth(data))
		.catch(err => { throw err })
	}
</script>
{ #if !user }
<h1>Login</h1>
<strong>{msg}</strong><br />
<strong>Name</strong><br />
<input type="text" bind:value={name}><br />
<strong>Password</strong><br />
<input type="password" bind:value={password}><br />
<button on:click={submit}>Submit</button>
{ :else }
<script>
	location.href = "/"
</script>
{ /if }