<script>
	import User from "./User"
	let user = User()

	let id = ""
	let password = ""
	let msg = ""
	let pend = false

	function submit(){
		if(!id || !password) msg = "Input must be filled"
		else if(password.length < 8) msg = "Password must be more 8 character"
		else auth()
	}

	function auth(){
		pend ? null : fetch("/api?for=login&&id="+id+"&&pw="+password)
		.then(res => res.json())
		.then(data => {
			pend = false
			if(data.id){
				location.href = "/"
			}
			else msg = "Input incorrect"
		})
		.catch(err => { throw err })
		pend = true
	}
	document.onkeydown = (e) => {
		if(e.which == 13) submit()
	}
</script>
{ #if !user }
<h1>Login</h1>
<strong>{msg}</strong><br />
<strong>Username</strong><br />
<input type="text" bind:value={id}><br />
<strong>Password</strong><br />
<input type="password" bind:value={password}><br />
<input type="submit" on:click={submit} value="Submit" />
{ :else }
<script>
	location.href = "/"
</script>
{ /if }
