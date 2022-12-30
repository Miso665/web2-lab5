navigator.serviceWorker.register("./sw.js")
.then(r => console.log("Worker registered: ", r))
.catch(e => console.log("Error while registering worker! ", e));