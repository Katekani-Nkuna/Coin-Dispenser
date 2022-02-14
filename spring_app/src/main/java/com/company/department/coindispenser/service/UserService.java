package com.company.department.coindispenser.service;

import com.company.department.coindispenser.config.Constant;
import com.company.department.coindispenser.model.User;
import com.company.department.coindispenser.model.UserDto;
import com.company.department.coindispenser.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;
    Logger log  = LoggerFactory.getLogger(MyUserDetailsService.class);

    public void createUser(UserDto newUser){
        User user = new User();

        user.setUsername(newUser.getUsername());
        user.setPassword(newUser.getPassword());
        user.setRoles(Constant.USER);
        user.setActive(true);


        log.info("Registering new user with username: {} ", newUser.getUsername());

        userRepository.save(user);
    }
}
