<script>
	import Index from "./component/Index.svelte"
	import Login from "./component/Login.svelte"

	let path = location.pathname
</script>
{ #if path === "/" }
<Index />
{ :else if path === "/login" }
<Login />
{ :else }
Error 404 Not Found
{ /if }