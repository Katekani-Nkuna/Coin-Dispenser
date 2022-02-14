package com.company.department.coindispenser.service;

import com.company.department.coindispenser.model.MyUserDetails;
import com.company.department.coindispenser.model.User;
import com.company.department.coindispenser.repository.UserRepository;
import com.company.department.coindispenser.web.rest.CoinDispenserResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    Logger log  = LoggerFactory.getLogger(MyUserDetailsService.class);

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        //Get user details from database
        Optional<User> user = userRepository.findByUsername(username);

        //Check if username is not on database, then user is not registered
        if (!user.isPresent())
        {
            log.info("username: {} not found", username);
            throw new UsernameNotFoundException("User not found: " + username);
        }

        log.info("username: {} is registered ",user.get().getUsername());
        //Pass the User details to Spring Security UserDetails
        return new MyUserDetails(user.get());
    }
}
