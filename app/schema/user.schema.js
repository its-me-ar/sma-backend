const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

const UserModel = require("../models/users.model");
const PostModel = require("../models/posts.model");
const CommentModel = require("../models/comment.model");

const CommentType = new GraphQLObjectType({
    name: "Comment",
    fields: () => ({
      _id: { type: GraphQLID },
      post_id: { type: GraphQLID },
      userId: {
        type: UserType,
        resolve(parent, args) {
          return UserModel.findById(parent.userId);
        },
      },
      comment: { type: GraphQLString },
      createdAt: { type: GraphQLString },
      updatedAt: { type: GraphQLString },
    }),
  });
  
const MediaType = new GraphQLObjectType({
  name: "Media",
  fields: () => ({
    _id: { type: GraphQLID },
    post_id: { type: GraphQLID },
    url: { type: GraphQLString },
    type: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    _id: { type: GraphQLID },
    userId: { type: GraphQLID },
    data: { type: GraphQLString },
    media: { type: new GraphQLList(MediaType) },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent, args) {
        return CommentModel.find({ post_id: parent._id });
      },
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLID },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    bio: { type: GraphQLString },
    image: { type: GraphQLString },
    friendsList: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return UserModel.find({ _id: { $in: parent.friendsList } });
      },
    },
    requestList: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return UserModel.find({ _id: { $in: parent.requestList } });
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return PostModel.find({ userId: parent._id })
          .populate("media")
          .populate({
            path: "comments",
            populate: {
              path: "userId",
              model: "User",
            },
          })
          .sort({ createdAt: -1 });
      },
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getUser: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Retrieve user by ID
        return UserModel.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
