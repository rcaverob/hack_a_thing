# Hack-a-thing: GraphQL

## How to Use

Clone this repo and then run `npm install` in the command line to install all dependencies.
Do `npm run start` or to start the server. Navigate to localhost at port 3000 to test the server.

Here are some example queries to test the server:

```
{
  courses {
    name
  }
}
```

```
{
  courses {
    id
    professor {
        name
    }
  }
}
```

```
{
  course(id:1) {
    name
    professor {
        name
    }
  }
}
```

```
mutation {
    addCourse(name: "New Course", professorId:1){
        id
        name
    }
}
```
