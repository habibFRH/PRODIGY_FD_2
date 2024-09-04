package com.task2.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.task2.backend.DTO.UserLoginDto;
import com.task2.backend.DTO.UserRegistrationDto;
import com.task2.backend.model.UserEntity;
import com.task2.backend.services.UserService;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    private UserService userService;
    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationDto registrationDto) {
        Optional<UserEntity> existingUser = userService.findByUsername(registrationDto.getUsername());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Username already taken");
        }
        userService.registerUser(registrationDto);
        return ResponseEntity.ok("User registered successfully");
    }
    
    @PostMapping()
    public ResponseEntity<?> loginUser(@RequestBody UserLoginDto userLoginDto) {
        boolean isAuthenticated = userService.authenticateUser(userLoginDto);
        if (isAuthenticated) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
    
    // get user by ID
    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<UserEntity> user = userService.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    // get all users
    @GetMapping("/users")
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        List<UserEntity> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    // update user by ID
    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserRegistrationDto userRegistrationDto) {
        UserEntity updatedUser = userService.updateUser(id, userRegistrationDto);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    // delete user by ID
    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        Optional<UserEntity> user = userService.findById(id);
        if (user.isPresent()) {
            userService.deleteUser(id);
            return ResponseEntity.ok("User deleted successfully");
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }
}
