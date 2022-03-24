<script>
	import { cktool } from "./cktool.js"

	let user = cktool.get("user")

	let id = ""
	let password = ""
	let msg = ""

	function auth(){
		if(!id || !password) msg = "Input must be filled"
		else if(password.length < 8) msg = "Password must be more 8 character"
		else getdata()
	}

	function getdata(){
		fetch("/api?for=login&&id="+id+"&&pw="+password)
		.then(res => res.json())
		.then(data => {
			if(data.id){
				cktool.set("user", data.id)
				location.href = "/"
			}
			else msg = "Input incorrect"
		})
		.catch(err => { throw err })
	}
</script>
{ #if !user }
<h1>Login</h1>
<strong>{msg}</strong><br />
<strong>Username</strong><br />
<input type="text" bind:value={id}><br />
<strong>Password</strong><br />
<input type="password" bind:value={password}><br />
<button on:click={auth}>Submit</button>
{ :else }
<script>
	location.href = "/"
</script>
{ /if }