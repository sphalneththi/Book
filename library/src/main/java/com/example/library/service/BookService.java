package com.example.library.service;

import com.example.library.model.Book;
import java.util.List;
import java.util.Optional;

public interface BookService {

    Book saveBook(Book book);

    List<Book> getAllBooks();

    Optional<Book> getBookById(String id);

    Book updateBook(String id, Book book);

    void deleteBook(String id);

    List<Book> getBooksByPublicationYear(int year);

    String getGenreByBookId(String id); // returns genre or null

    void deleteBooksByPublicationYear(int year);
}
