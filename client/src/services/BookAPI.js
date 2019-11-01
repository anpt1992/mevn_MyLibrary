import API from '@/services/API'
export default {
    addBook(book) {
        return API().post('addBook', {
            book: book // add our data to the request body
        })
    },
    deleteBook(bookID) {
        return API().post('deleteBook', {
            bookID: bookID // add our data to the request body
        })
    },
    getBooks() {
        return API().get('Books')
    }
}