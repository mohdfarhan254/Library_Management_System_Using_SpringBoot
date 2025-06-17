package net.javaguides.lms.repository;

import net.javaguides.lms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // 🔐 Used during login
    Optional<User> findByUsername(String username);

    // 🧾 Used during registration to prevent duplicates
    boolean existsByUsername(String username);
}
