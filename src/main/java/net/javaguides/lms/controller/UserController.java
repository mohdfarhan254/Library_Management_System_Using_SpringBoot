package net.javaguides.lms.controller;

import net.javaguides.lms.entity.Book;
import net.javaguides.lms.entity.User;
import net.javaguides.lms.service.UserService;

//import org.hibernate.mapping.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend access
public class UserController {

    @Autowired
    private UserService userService;

    // ✅ Admin-only: Get all users
// ✅ Get all books of a specific user
@GetMapping("/{userId}/books")
public ResponseEntity<?> getUserBooks(@PathVariable Long userId) {
    try {
        return ResponseEntity.ok(userService.getUserBooks(userId));
    } catch (RuntimeException e) {
        return ResponseEntity.status(404).body(e.getMessage());
    }
}


    // ✅ Signup: Register a new user
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        if (userService.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        User savedUser = userService.save(user);
        return ResponseEntity.ok(savedUser);
    }

    // ✅ Login: Return user info
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User existingUser = userService.findByUsernameAndPassword(user.getUsername(), user.getPassword());
        if (existingUser != null) {
            return ResponseEntity.ok(
                Map.of(
                    "message", "Login successful",
                    "userId", existingUser.getId(),
                    "username", existingUser.getUsername(),
                    "role", existingUser.getRole()
                )
            );
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
}
