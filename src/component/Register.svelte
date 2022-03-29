<script>
	import User from "./User"
	let user = User()

	let id = ""
	let name = ""
	let password = ""
	let repassword = ""
	let tiers = []
	let tier
	let msg = ""
	let pend = false

	function getTiers(){
		pend ? null : fetch("/api?for=list-tiers")
		.then(res => res.json())
		.then(data => {
			pend = false
			tiers = data
			tier = data[0].id
		})
		pend = true
	}
	if(!user) getTiers()

	function submit(){
		if(!id || !name || !password || !repassword) msg = "Input must be filled"
		else if(id.length < 6) msg = "Username must be more 6 character"
		else if(password.length < 8) msg = "Password must be more 8 character"
		else if(password != repassword) msg = "Password and repassword must be same"
		else auth()
	}

	function auth(){
		pend ? null : fetch("/api?for=exist&&id="+id)
		.then(res => res.json())
		.then(data => {
			pend = false
			if(data.id) msg = "Username already used"
			else add()
		})
		.catch(err => { throw err })
		pend = true
	}
	function add(){
		pend ? null : fetch("/api?for=register&&id="+id+"&&pw="+password+"&&name="+name+"&&tier="+tier)
		.then(res => res.json())
		.then(data => {
			pend = false
			if(data.succes){
				location.href = "/"
			}
		})
		.catch(err => { throw err })
		pend = true
	}
	document.onkeydown = (e) => {
		if(e.which == 13) submit()
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
<input type="submit" on:click={submit} value="Submit" />
{ :else }
<script>
	location.href = "/"
</script>
{ /if }
