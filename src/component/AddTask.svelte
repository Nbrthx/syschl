<script>
	import User from "./User"
	let user = User()

	let id = ""
	let name = ""
        let forms = []
	let question = []
	let mchoice = []
        
        function addForm(){
            forms.push("none")
            forms = forms
        }
	//if(user) getTask()
</script>
{ #if user }
<h1>Create Task</h1>
<strong>Task ID</strong>
<input type="text" bind:value={id}><br />
<strong>Task Name</strong>
<input type="text" bind:value={name}>
{ #each forms as form, i }
Quest: <input type="text" bind:value={question[i][0]}/><br />
Answer: <br />
a. <input type="text" bind:value={question[i][1]}/><br />
b. <input type="text" bind:value={question[i][2]}/><br />
c. <input type="text" bind:value={question[i][3]}/><br />
d. <input type="text" bind:value={question[i][4]}/><br />
Key = <input type="text" bind:value={mchoice[i]}/><br />
{ /each }
<button on:click={addForm}>Add Question</button>
{ :else }
<script>
	location.href = "/login"
</script>
{ /if }
