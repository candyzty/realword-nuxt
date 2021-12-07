import { request } from "~/plugins/request";

// 获取公共文章列表
export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles',
        params
    })
}

export const getFeedArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles/feed',
        params
    })
}

// 提交文章
export const postArticles = data => {
    return request({
        method: 'POST',
        url: '/api/articles',
        data: { article: data}
    })
}

// 修改文章
export const putArticles = data => {
    return request({
        method: 'PUT',
        url: `/api/articles/${data.slug}`,
        data: { article: data.article}
    })
}

// 删除文章
export const deleteArticle = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}`,
    })
}

// 添加点赞
export const addFavorite = slug => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`
    })
}
// 删除点赞
export const deleteFavorite = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`
    })
}

// 获取文章详情
export const getArticle = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`
    })
}
// 获取文章的评论
export const getArticleComments = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}/comments`
    })
}
// 创建文章的评论
export const addArticleComments = data => {
    return request({
        method: 'POST',
        url: `/api/articles/${data.slug}/comments`,
        data: { comment: data.comment }
    })
}
// 删除文章的评论
export const deleteArticleComment = data => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${data.slug}/comments/${data.commentId}`,
    })
}
