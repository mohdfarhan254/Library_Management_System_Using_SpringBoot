package net.javaguides.lms.repository;

import net.javaguides.lms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    
    // ✅ Used in login and service layer
    Optional<User> findByUsername(String username);
    
    // ✅ Used in signup to check if username already exists
    boolean existsByUsername(String username);
}
