package com.example.library.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import com.example.library.model.Book;

public interface BookRepository extends MongoRepository<Book, String> {
    List<Book> findByPublicationYear(int publicationYear);

    List<Book> findByAuthor(String author); // example extra query

    void deleteByPublicationYear(int publicationYear);

}
