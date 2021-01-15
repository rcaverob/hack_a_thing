var express = require("express");
var { graphqlHTTP } = require("express-graphql");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const professors = [
  { id: 1, name: "Jack Freeman" },
  { id: 2, name: "Braydon Hinton" },
  { id: 3, name: "Archibald Barker" },
  { id: 4, name: "Suzanne Donaldson" },
];

const courses = [
  { id: 1, name: "Math 50", professorId: 1 },
  { id: 2, name: "CS 10", professorId: 2 },
  { id: 3, name: "Biology 1", professorId: 3 },
  { id: 4, name: "Physics 3", professorId: 4 },
  { id: 5, name: "Writing 5", professorId: 3 },
  { id: 6, name: "CS 1", professorId: 2 },
  { id: 7, name: "CS 30", professorId: 2 },
];

var CourseType = new GraphQLObjectType({
  name: "Course",
  description: "This represents a course",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    professorId: { type: GraphQLNonNull(GraphQLInt) },
    professor: {
      type: ProfessorType,
      resolve: (course) => {
        return professors.find(
          (professor) => professor.id === course.professorId
        );
      },
    },
  }),
});

const ProfessorType = new GraphQLObjectType({
  name: "Professor",
  description: "This represents a professor who teaches a course",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    courses: {
      type: new GraphQLList(CourseType),
      resolve: (professor) => {
        return courses.filter((course) => course.professorId === professor.id);
      },
    },
  }),
});

// The root provides a resolver function for each API endpoint

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    course: {
      type: CourseType,
      description: "A Single Course",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        courses.find((course) => course.id === args.id),
    },
    courses: {
      type: new GraphQLList(CourseType),
      description: "List of All Courses",
      resolve: () => courses,
    },
    professors: {
      type: new GraphQLList(ProfessorType),
      description: "List of All Professors",
      resolve: () => professors,
    },
    professor: {
      type: ProfessorType,
      description: "A Single Professor",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        professors.find((professor) => professor.id === args.id),
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addCourse: {
      type: CourseType,
      description: "Add a course",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        professorId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const course = {
          id: courses.length + 1,
          name: args.name,
          professorId: args.professorId,
        };
        courses.push(course);
        return course;
      },
    },
    addProfessor: {
      type: ProfessorType,
      description: "Add a professor",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const professor = { id: professors.length + 1, name: args.name };
        professors.push(professor);
        return professor;
      },
    },
  }),
});

var app = express();

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));
