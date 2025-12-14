package com.example.library.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.library.repository.BookRepository;
import com.example.library.model.Book;
import com.example.library.service.BookService;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository repo;

    @Override
    public Book saveBook(Book book) {
        return repo.save(book);
    }

    @Override
    public List<Book> getAllBooks() {
        return repo.findAll();
    }

    @Override
    public Optional<Book> getBookById(String id) {
        return repo.findById(id);
    }

    @Override
    public Book updateBook(String id, Book book) {
        book.setId(id);
        return repo.save(book);
    }

    @Override
    public void deleteBook(String id) {
        repo.deleteById(id);
    }

    @Override
    public List<Book> getBooksByPublicationYear(int year) {
        return repo.findByPublicationYear(year);
    }

    @Override
    public String getGenreByBookId(String id) {
        return repo.findById(id).map(Book::getGenre).orElse(null);
    }

    @Override
    public void deleteBooksByPublicationYear(int year) {
        repo.deleteByPublicationYear(year);
    }
}
