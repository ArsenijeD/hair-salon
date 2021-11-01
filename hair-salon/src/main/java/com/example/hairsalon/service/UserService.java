package com.example.hairsalon.service;

import com.example.hairsalon.model.Role;
import com.example.hairsalon.model.User;

import java.util.List;

public interface UserService {
    User getByUserName(String username);
    User createUser(User user);
    List<User> getByRole(Role role);

}
