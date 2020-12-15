package com.example.hairsalon.controller;

import com.example.hairsalon.dto.UserDTO;
import com.example.hairsalon.model.User;
import com.example.hairsalon.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
public class UserController {

    private final UserService userServiceImpl;

    private final ModelMapper modelMapper;

    public UserController(UserService userServiceImpl, ModelMapper modelMapper) {
        this.userServiceImpl = userServiceImpl;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public ResponseEntity<UserDTO> getUserByUsername(@RequestParam String username) {
        User user = userServiceImpl.getByUserName(username);
        return ResponseEntity.ok().body(modelMapper.map(user, UserDTO.class));
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        User user = modelMapper.map(userDTO, User.class);
        User created = userServiceImpl.createUser(user);
        return ResponseEntity.ok().body(modelMapper.map(created, UserDTO.class));
    }
}
