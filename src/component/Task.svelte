<script>
	import { cktool } from "./cktool.js"
	let user = cktool.get("user")

	let urlp = new URLSearchParams(location.search)

	let userid = {
		name: "null",
		attend: 0,
		score: 0,
		tiers: "null"
	}
	let task = {
		question: []
	}
	let mchoice = []

	function getUserid(){
		fetch("/api?for=data&&id="+user)
		.then(res => res.json())
		.then(data => {
			userid = data
		})
		.catch(err => { throw err })
	}

	function getTask(){
		fetch("/api?for=task&&id="+urlp.get("id"))
		.then(res => res.json())
		.then(data => {
			task = data
			for(let i of data.question) mchoice.push("_")
			getUserid()
		})
		.catch(err => { throw err })
	}

	function sendAnswer(){
		const answ = JSON.stringify(mchoice)
		fetch("/api?for=answer&&id="+user+"&&task="+urlp.get("id")+"&&answer="+answ)
		.then(res => res.json())
		.then(data => {
			if(data.succes) location.href = "/"
			else msg = "Something wrong, i can fill it"
		})
		.catch(err => { throw err })
	}

	if(user) getTask()
</script>
{ #if user }
<h1>{task.name}</h1>
{ #each task.question as quest, i }
{quest[0]}<br />
<input type="radio" bind:group={mchoice[i]} value="a"> {quest[1]} <br />
<input type="radio" bind:group={mchoice[i]} value="b"> {quest[2]} <br />
<input type="radio" bind:group={mchoice[i]} value="c"> {quest[3]} <br />
<input type="radio" bind:group={mchoice[i]} value="d"> {quest[4]} <br />
<br />
{ /each }
<input type="submit" on:click={sendAnswer}>
{ :else }
<script>
	location.href = "/login"
</script>
{ /if }