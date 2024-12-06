import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: null, 
    error: false
}

export const Article = createSlice({
    name: "Article",
    initialState,
    reducers: {
        FETCH_ARTICLE_START: (store) => {
            store.loading = true
        },
        FETCH_ARTICLE_SUCCESS: (store, actions) => {
            store.loading = false
            store.data = actions.payload
        }
    }
})

export const {FETCH_ARTICLE_START, FETCH_ARTICLE_SUCCESS} = Article.actions

export default Article.reducer