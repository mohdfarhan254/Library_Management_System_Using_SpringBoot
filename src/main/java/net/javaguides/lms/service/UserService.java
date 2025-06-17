package net.javaguides.lms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import net.javaguides.lms.entity.Book;
import net.javaguides.lms.entity.User;
import net.javaguides.lms.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // ✅ Get all users (for Admin)


public List<Book> getUserBooks(Long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));

    return user.getBooks();  // Get books from the mapped relation
}


    // ✅ Save user after encoding password
    public User save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Set default role if none provided
        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("COLLEGE"); // default
        }

        return userRepository.save(user);
    }

    // ✅ Check if username already exists
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    // ✅ Login (match encoded password)
    public User findByUsernameAndPassword(String username, String rawPassword) {
        return userRepository.findByUsername(username)
            .filter(user -> passwordEncoder.matches(rawPassword, user.getPassword()))
            .orElse(null);
    }

    // ✅ Delete user by ID (only Admin should call this)
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    // ✅ Fetch one user by ID
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
}
