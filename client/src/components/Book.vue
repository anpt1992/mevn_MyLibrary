<template lang="html">
  <div>
    <form v-on:submit='addBook($event)'>
      <input type='text' placeholder='Enter Title' v-model='newBook'/>
      <!-- <input type='text' placeholder='Enter Author' v-model='newTodo'/> -->
      <input type='submit' />
    </form>
    <ul>
      <li v-for='book in books' :key='book._id'>
        <input type='checkbox' @click='deleteTodo(book._id)'> {{book.title}}
      </li>
    </ul>
  </div>
</template>

<script>
import BookAPI from "@/services/BookAPI.js";
export default {
  data() {
    return {
      newBook: "",
      books: []
    };
  },
  mounted() {
    this.loadBooks();
  },
  methods: {
    async addBook(evt) {
      evt.preventDefault(); // prevents the form's default action from redirecting the page
      const response = await BookAPI.addBook(this.newBook);
      this.books.push(response.data);
      this.newBook = ""; // clear the input field
    },
    async loadBooks() {
      const response = await BookAPI.getBooks();
      this.books = response.data;
    },
    deleteTodo(bookID) {
      BookAPI.deleteBook(bookID);
      // remove the array element with the matching id
      this.books = this.books.filter(function(obj) {
        return obj._id !== bookID;
      });
    }
  }
};
</script>

<style lang="css">
</style>