import requestMethod from '@/utils/request'

// Get Pricings
export function getPricingList(params) {
    return requestMethod.get('/api/pricing/list', params)
}

// update Pricing
export function updatePricing(data) {
    return requestMethod.post('/api/pricing/update', data)
}

// create Pricing
export function createPricing(data) {
    return requestMethod.post('/api/pricing/create', data)
}

// delete Pricing
export function deletePricing(id) {
    return requestMethod.post(`/api/pricing/delete/${id}`)
}

// get detail Pricing
export function getPricingDetail(id) {
    return requestMethod.get(`/api/pricing/detail/${id}`)
}