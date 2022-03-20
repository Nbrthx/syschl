<script>
	import { cktool } from "./cktool.js"
	let user = cktool.get("user")
</script>
{ #if user }
<h1>Hello {user}!</h1>
{ :else }
<script>
	location.href = "/login"
</script>
{ /if }