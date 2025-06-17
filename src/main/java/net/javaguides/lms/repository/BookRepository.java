package net.javaguides.lms.repository;

import net.javaguides.lms.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    // 🔍 Fetch all books that belong to a specific user (college)
    List<Book> findByUserId(Long userId);
}
