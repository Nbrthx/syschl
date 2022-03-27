<script>
	import User from "./User"
	let user = User()

	let id = ""
	let name = ""
	let question = []
	let mchoice = []

	if(user) getTask()
</script>
{ #if user }
<h1>Create Task</h1>
<strong>Task ID</strong>
<input type="text" bind:value={id}>
<strong>Task Name</strong>
<input type="text" bind:value={name}>
<button>Add Question</button>
{ :else }
<script>
	location.href = "/login"
</script>
{ /if }