import {
    useState,
    useEffect,
    useMemo
} from 'react';

import * as articleService from '../services/articlesService';

const useArticleState = (articleId) => {
    const [article, setArticle] = useState({});

    const controller = useMemo(() => {
        const controller = new AbortController();

        return controller;
    }, [])

    useEffect(() => {
        articleService.getArticleById(articleId)
            .then((res) => {
                let result ={...res.result,likes:[]}
                setArticle(result);
            })
            .catch((err) =>
            console.log(err)
            );
        return () => {
            controller.abort();
        }
    }, [articleId, controller]);

    return [
        article,
        setArticle
    ]
};

export default useArticleState;