import requestMethod from '@/utils/request'

// Get Articles
export function getArticleList() {
    return requestMethod.get('/api/article/list')
}

// update Article
export function updateArticle(data) {
    return requestMethod.post('/api/article/update', data)
}

// create Article
export function createArticle(data) {
    return requestMethod.post('/api/article/create', data)
}

// delete Article
export function deleteArticle(id) {
    return requestMethod.post(`/api/article/delete/${id}`)
}

// get detail Article
export function getArticleDetail(id) {
    return requestMethod.get(`/api/article/detail/${id}`)
}