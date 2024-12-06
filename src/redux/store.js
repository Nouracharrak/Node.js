import {configureStore} from '@reduxjs/toolkit'

// REDUCERS
import Article from '../redux/reducers/article.reducer'

export default configureStore ({
    reducer: {
        article: Article
    }
})