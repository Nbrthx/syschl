<script>
	import { cktool } from "./cktool.js"

	let user = cktool.get("user")

	let name = ""
	let password = ""
	let msg = ""

	function submit(){
		if(!name || !password) msg = "Input must be filled"
		else if(password.length < 8) msg = "Password must be more 8 character"
                else auth()
	}

	function auth(){
		fetch("/api?for=login&&user="+name+"&&pw="+password)
		.then(res => res.json())
		.then(data => {
                        if(data.id) {
                                cktool.set("user", data.id)
                                location.href = "/"
                        }
                        else msg = "Username or password incorrect"
                })
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
