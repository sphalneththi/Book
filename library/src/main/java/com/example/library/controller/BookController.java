package com.example.library.controller;

import com.example.library.model.Book;
import com.example.library.service.BookService;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/books")

public class BookController {

    @Autowired
    private BookService service;

    // ADMIN only
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        return new ResponseEntity<>(service.saveBook(book), HttpStatus.CREATED);
    }

    // ADMIN or USER
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(service.getAllBooks());
    }

    // ADMIN or USER
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<Book> getBookById(@PathVariable String id) {
        return service.getBookById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ADMIN only
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Book> updateBook(
            @PathVariable String id,
            @RequestBody Book book) {

        return ResponseEntity.ok(service.updateBook(id, book));
    }

    // ADMIN only
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteBook(@PathVariable String id) {
        service.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    // ADMIN or USER
    @GetMapping("/year/{year}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<List<Book>> getByPublicationYear(@PathVariable int year) {
        return ResponseEntity.ok(service.getBooksByPublicationYear(year));
    }

    // ADMIN or USER
    @GetMapping("/{id}/genre")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<String> getGenreById(@PathVariable String id) {
        String genre = service.getGenreByBookId(id);
        return genre != null
                ? ResponseEntity.ok(genre)
                : ResponseEntity.notFound().build();
    }

    // ADMIN only
    @DeleteMapping("/year/{year}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteByPublicationYear(@PathVariable int year) {
        service.deleteBooksByPublicationYear(year);
        return ResponseEntity.ok("Deleted books from year: " + year);
    }

}
