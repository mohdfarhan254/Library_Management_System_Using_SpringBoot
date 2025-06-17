package net.javaguides.lms.service;

import net.javaguides.lms.entity.Book;
import net.javaguides.lms.entity.User;
import net.javaguides.lms.repository.BookRepository;
import net.javaguides.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    public List<Book> findByUserId(Long userId) {
        return bookRepository.findByUserId(userId);
    }

    public Book findById(Long id) {
        return bookRepository.findById(id).orElse(null);
    }

  public Book save(Book book, Long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User with ID " + userId + " not found"));

    book.setUser(user);
    return bookRepository.save(book);
}


    // ✅ Update book (keep user same)
 public Book update(Book book) {
    Book existing = findById(book.getId());
    if (existing != null) {
        book.setUser(existing.getUser()); // keep same user
        return bookRepository.save(book);
    }
    return null;
}


    public void deleteById(Long id) {
        bookRepository.deleteById(id);
    }

    // ✅ Borrow
public Book borrowBook(Long bookId, Long userId) {
    Book book = bookRepository.findById(bookId).orElse(null);

    if (book == null) {
        throw new RuntimeException("Book not found");
    }

    // Only allow if book belongs to the same user
    if (!book.getUser().getId().equals(userId)) {
        throw new RuntimeException("You can't borrow this book. It doesn't belong to you.");
    }

    if (book.isBorrowed()) {
        throw new RuntimeException("Book already borrowed");
    }

    book.setBorrowed(true);
    return bookRepository.save(book);
}



    // ✅ Return
public Book returnBook(Long bookId, Long userId) {
    Book book = bookRepository.findById(bookId).orElse(null);

    if (book == null) {
        throw new RuntimeException("Book not found");
    }

    if (!book.getUser().getId().equals(userId)) {
        throw new RuntimeException("You can't return this book. It doesn't belong to you.");
    }

    if (!book.isBorrowed()) {
        throw new RuntimeException("Book is not currently borrowed");
    }

    book.setBorrowed(false);
    return bookRepository.save(book);
}

}
