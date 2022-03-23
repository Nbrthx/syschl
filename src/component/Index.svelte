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
		fetch("/api?for=list-task&&tier="+tier)
		.then(res => res.json())
		.then(data => {
			tasks = data
		})
	}

	if(user) getUserid()
</script>
{ #if user }
<h1>Hello {user}!</h1>
<strong>Name:</strong> {userid.name}<br />
<strong>Kehadiran:</strong> {userid.attend}<br />
<strong>Skor:</strong> {userid.score}<br />
<strong>Kelas:</strong> {userid.tiers}<br />
<br />
<h2>Kerjaanmu</h2>
{ #each tasks as task }
<a href="/tasks?id={task.id}">{task.name}</a><br />
{ /each }
{ :else }
<script>
	location.href = "/login"
</script>
{ /if }