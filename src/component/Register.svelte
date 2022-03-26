<script>
	import { cktool } from "./cktool.js"

	let user = cktool.get("user")

	let id = ""
	let name = ""
	let password = ""
	let repassword = ""
	let tiers = []
	let tier
	let msg = ""

	function getTiers(){
		fetch("/api?for=list-tiers")
		.then(res => res.json())
		.then(data => {
			tiers = data
			tier = data[0].id
		})
	}
	if(!user) getTiers()

	function submit(){
		if(!id || !name || !password || !repassword) msg = "Input must be filled"
		else if(id.length < 6) msg = "Username must be more 6 character"
		else if(password.length < 8) msg = "Password must be more 8 character"
		else if(password != repassword) msg = "Password and repassword must be same"
		else {
			auth()
		}
	}

	function auth(){
		fetch("/api?for=exist&&id="+id)
		.then(res => res.json())
		.then(data => {
			if(data.id) msg = "Username already used"
			else add()
		})
		.catch(err => { throw err })
	}
	function add(){
		fetch("/api?for=register&&id="+id+"&&pw="+password+"&&name="+name+"&&tier="+tier)
		.then(res => res.json())
		.then(data => {
			if(data.succes){
				location.href = "/"
			}
		})
		.catch(err => { throw err })
	}
</script>
{ #if !user }
<h1>Register</h1>
<strong>{msg}</strong><br />
<strong>Username</strong><br />
<input type="text" bind:value={id}><br />
<strong>Name</strong><br />
<input type="text" bind:value={name}><br />
<strong>Password</strong><br />
<input type="password" bind:value={password}><br />
<strong>Re-Password</strong><br />
<input type="password" bind:value={repassword}><br />
<strong>Tiers</strong>
<select bind:value={tier}>
{ #each tiers as tir }
<option value={tir.id}>{tir.name}</option>
{ /each }
</select>
<button on:click={submit}>Submit</button>
{ :else }
<script>
	location.href = "/"
</script>
{ /if }
