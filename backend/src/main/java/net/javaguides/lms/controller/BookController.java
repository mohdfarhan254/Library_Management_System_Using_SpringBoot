package net.javaguides.lms.controller;

import net.javaguides.lms.entity.Book;
import net.javaguides.lms.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:3000")  // Change if needed
public class BookController {

    @Autowired
    private BookService bookService;

    // ✅ Get all books for a specific user
    @GetMapping
    public ResponseEntity<?> getBooksByUser(@RequestParam Long userId) {
        List<Book> books = bookService.findByUserId(userId);
        return ResponseEntity.ok(books);
    }

    // ✅ Get one book by ID for a user
    @GetMapping("/{id}")
    public ResponseEntity<?> getBook(@PathVariable Long id, @RequestParam Long userId) {
        Book book = bookService.findById(id);
        if (book == null || !book.getUser().getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can't access this book.");
        }
        return ResponseEntity.ok(book);
    }

    // ✅ Add book for a specific user
    @PostMapping
    public ResponseEntity<?> addBook(@RequestBody Book book, @RequestParam Long userId) {
        try {
            Book savedBook = bookService.save(book, userId);
            return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // ✅ Update existing book — only by owner
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBook(@PathVariable Long id, @RequestParam Long userId, @RequestBody Book book) {
        Book existingBook = bookService.findById(id);
        if (existingBook == null || !existingBook.getUser().getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can't update this book.");
        }

        book.setId(id);
        book.setUser(existingBook.getUser()); // Preserve ownership
        Book updated = bookService.update(book);
        return ResponseEntity.ok(updated);
    }

    // ✅ Delete a book — only by owner
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id, @RequestParam Long userId) {
        Book book = bookService.findById(id);
        if (book == null || !book.getUser().getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can't delete this book.");
        }

        bookService.deleteById(id);
        return ResponseEntity.ok("Book deleted successfully");
    }

    // ✅ Borrow a book — only by owner
   @PostMapping("/{bookId}/borrow")
public ResponseEntity<?> borrowBook(@PathVariable Long bookId, @RequestParam Long userId) {
    try {
        Book borrowed = bookService.borrowBook(bookId, userId);
        return ResponseEntity.ok(borrowed);
    } catch (RuntimeException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}

@PostMapping("/{bookId}/return")
public ResponseEntity<?> returnBook(@PathVariable Long bookId, @RequestParam Long userId) {
    try {
        Book returned = bookService.returnBook(bookId, userId);
        return ResponseEntity.ok(returned);
    } catch (RuntimeException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}

}
