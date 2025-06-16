package net.javaguides.lms.controller;

import net.javaguides.lms.entity.User;
import net.javaguides.lms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // ✅ Get all users (optional)
    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
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

    // ✅ Login: Check username and password
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        User existingUser = userService.findByUsernameAndPassword(user.getUsername(), user.getPassword());
        if (existingUser != null) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
    
}
