package net.javaguides.lms.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")  // optional, just good naming
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String username;  // used for login (can also use email instead)

    @Column(nullable = false)
    private String password;  // hashed in real apps

    // Optional: add role/permissions in future
    // private String role = "USER";
}
