import React from 'react';

import { create } from '../services/articlesService';

export const ArticleContext = React.createContext();

async function createArticle(articleData){
    let result = await create();
    return result;
}

export const articleContextValues = {
    createArticle,
  };