<script>
	import Index from "./component/Index.svelte"
	import Login from "./component/Login.svelte"
	import Register from "./component/Register.svelte"
	import Task from "./component/Task.svelte"
	import AddTask from "./component/AddTask.svelte"

	let path = location.pathname
</script>
{ #if path === "/" }
<Index />
{ :else if path === "/login" }
<Login />
{ :else if path === "/register" }
<Register />
{ :else if path === "/task" }
<Task />
{ :else if path === "/addtask" }
<AddTask />
{ :else }
Error 404 Not Found
{ /if }