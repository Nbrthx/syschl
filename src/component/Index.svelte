<script>
	import { cktool } from "./cktool.js"
	let user = cktool.get("user")

	let userid = {
		name: "null",
		attend: 0,
		score: 0,
		tiers: "null"
	}
	let tasks = []

	function getUserid(){
		fetch("/api?for=data&&id="+user)
		.then(res => res.json())
		.then(data => {
			userid = data
			getTask(data.tiers)
		})
	}

	function getTask(tier){
		fetch("/api?for=list-task&&tier="+tier+"&&id="+user)
		.then(res => res.json())
		.then(data => {
			tasks = data
		})
	}

	if(user) getUserid()
</script>
{ #if user }
<h1>Hello {userid.name}!</h1>
<strong>Username:</strong> {user}<br />
<strong>Kehadiran:</strong> {userid.attend}<br />
<strong>Skor:</strong> {userid.score}<br />
<strong>Kelas:</strong> {userid.tiers}<br />
<br />
<h2>Kerjaanmu</h2>
{ #each tasks as task }
<a href="/task?id={task.id}">{task.name}</a><br />
{ /each }
{ :else }
<script>
	location.href = "/login"
</script>
{ /if }