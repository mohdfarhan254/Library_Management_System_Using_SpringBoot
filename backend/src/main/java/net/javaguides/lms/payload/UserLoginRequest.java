// src/main/java/net/javaguides/lms/payload/UserLoginRequest.java
package net.javaguides.lms.payload;

public class UserLoginRequest {
    private String username;
    private String password;

    // Getters & Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
