package com.task2.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.task2.backend.DTO.UserLoginDto;
import com.task2.backend.DTO.UserRegistrationDto;
import com.task2.backend.model.UserEntity;
import com.task2.backend.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // create
    public UserEntity registerUser(UserRegistrationDto userRegistrationDto) {
        System.out.println("Registering user: " + userRegistrationDto.getUsername());
        UserEntity user = new UserEntity();
        user.setName(userRegistrationDto.getName());
        user.setUsername(userRegistrationDto.getUsername());
        user.setEmail(userRegistrationDto.getEmail());
        user.setAge(userRegistrationDto.getAge());
        String encodedPassword = passwordEncoder.encode(userRegistrationDto.getPassword());
        System.out.println("Encoded password: " + encodedPassword);
        user.setPassword(encodedPassword);
        user.setRole("USER");
        UserEntity savedUser = userRepository.save(user);
        System.out.println("User saved: " + savedUser.getUsername());
        return savedUser;
    }

    // read
    public Optional<UserEntity> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<UserEntity> findById(Long id) {
        return userRepository.findById(id);
    }

    public List<UserEntity> findAllUsers() {
        return userRepository.findAll();
    }

    // update
    public UserEntity updateUser(Long id, UserRegistrationDto userRegistrationDto) {
        Optional<UserEntity> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            UserEntity user = optionalUser.get();
            user.setName(userRegistrationDto.getName());
            user.setUsername(userRegistrationDto.getUsername());
            user.setEmail(userRegistrationDto.getEmail());
            user.setAge(userRegistrationDto.getAge());
            if (userRegistrationDto.getPassword() != null && !userRegistrationDto.getPassword().isEmpty()) {
                String encodedPassword = passwordEncoder.encode(userRegistrationDto.getPassword());
                user.setPassword(encodedPassword);
            }
            return userRepository.save(user);
        }
        return null;
    }

    // delete
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    //authenticate
    public boolean authenticateUser(UserLoginDto userLoginDto) {
        Optional<UserEntity> userOptional = userRepository.findByUsername(userLoginDto.getUsername());
        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            return passwordEncoder.matches(userLoginDto.getPassword(), user.getPassword());
        }
        return false;
    }

}
