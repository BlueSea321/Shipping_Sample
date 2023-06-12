import { API } from "./API"

export const getAllOffers = async () => {
    const res = await API.get(
        '/offer/getAllOffers'
    )
    return res.data
}

export const getOffersById = async (id) => {
    const res = await API.get(
        `/offer/getOffersById/${id}`
    )
    return res.data
}

export const createOffer = async (data) => {
    const res = await API.post(
        '/offer/createOffer', data
    )
    return res.data
}

export const deleteOffer = async (id) => {
    const res = await API.get(`/offer/deleteOffer/${id}`)
    return res.data
}