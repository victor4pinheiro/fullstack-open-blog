import _ from "lodash";
import BlogInterface from "../interfaces/blog";

const totalLikes = (blogs: Array<BlogInterface>) => {
  let result = 0;

  for (const blog of blogs) {
    result += blog.likes;
  }

  return result;
};

const getIndexOfFavoriteBlog = (blogs: Array<BlogInterface>) => {
  let count = blogs[0].likes;
  let positionOfArray = 0;

  for (let index = 1; index < blogs.length; index++) {
    if (count < blogs[index].likes) {
      count = blogs[index].likes;
      positionOfArray = index;
    }
  }

  return positionOfArray;
};

const favoriteBlog = (blogs: Array<BlogInterface>) => {
  const position = getIndexOfFavoriteBlog(blogs);

  const blog = (({ title, author, likes }) => ({ title, author, likes }))(
    blogs[position]
  );

  return blog;
};

const mostBlogs = (blogs: Array<BlogInterface>) => {
  const result = _.values(_.groupBy(blogs, (blog) => blog.author)).map(
    (blog) => ({ author: blog[0].author, blogs: blog.length })
  );

  return result[result.length - 1];
};

const mostLikes = (blogs: Array<BlogInterface>) => {
  const result = _.values(_.groupBy(blogs, (blog) => blog.author)).map(
    (blog) => {
      const sum = _.sum(blog.map((info) => info.likes));
      return { author: blog[0].author, likes: sum };
    }
  );

  const teste = _.orderBy(result, (info) => info.likes);

  return teste[teste.length - 1];
};

export { totalLikes, favoriteBlog, mostBlogs, mostLikes };
