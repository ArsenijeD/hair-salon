package com.example.hairsalon.service;

import com.example.hairsalon.model.User;

public interface UserService {
    User getByUserName(String username);
    User createUser(User user);

}
