import React from 'react';
import Article from './Article';
import {connect} from 'react-redux';

const ArticleList = (props) => {
  return <div>
    {props.articles.map(article =>
        <Article title={article.title} description={article.description}/>
    )}
  </div>
};

export default connect(state => ({
  articles: state.article.articles
}))(ArticleList);