export const refreshAuthor = (component, id, authors) => {
  const author = authors.filter(author =>
      author.login.uuid === id)[0];
  component.setState({author: author});
};