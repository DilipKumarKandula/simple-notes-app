# simple-notes-app


fetch("http://localhost:3000/notes", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title: "Test Note via Browser",
    description: "This was created using fetch() from console"
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
