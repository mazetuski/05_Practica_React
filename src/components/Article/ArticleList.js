import React from 'react';
import Article from './Article';
import {connect} from 'react-redux';

const ArticleList = (props) => {
  return <React.Fragment>
    {props.articles.map(article =>
        article.user === props.userId &&
        <Article key={article.id} title={article.title} description={article.description}/>
    )}
  </React.Fragment>
};

export default connect(state => ({
  articles: state.article.articles
}))(ArticleList);