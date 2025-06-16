package net.javaguides.lms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import net.javaguides.lms.entity.User;
import net.javaguides.lms.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // ✅ Get all users
    public List<User> findAll() {
        return userRepository.findAll();
    }

    // ✅ Save user after encoding password
    public User save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // ✅ Check if username already exists (used in /signup)
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    // ✅ Used in /login (controller)
    public User findByUsernameAndPassword(String username, String rawPassword) {
        return userRepository.findByUsername(username)
            .filter(user -> passwordEncoder.matches(rawPassword, user.getPassword()))
            .orElse(null);
    }
    public void deleteUserById(Long id) {
    userRepository.deleteById(id);
}

}
