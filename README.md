### To create and api route

1. goto src/routes/routes.tags.ts and create a tag group in which you want to add route like `task: ["Task"]`
2. make a folder like `task`
3. make task.delete.route.ts and make route and handler
4. make task.index.ts and initalized `createRouter` with `openapi()` and add route and handler to it
5. goto app.ts and register this router by adding it to routes array
