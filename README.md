# Hack-a-thing: GraphQL

## What I did
I coded a simple implementation of GraphQL. I created a schema to define courses and professors and how they relate. I created a list of courses and professors and made it so that the server responds to queries about these (both viewing and adding). 

## How to Use

Clone this repo and then run `npm install` in the command line to install all dependencies.

Do `npm run start` to start the server. 

Navigate to localhost:4000/graphql to test the server.

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
