package com.company.department.coindispenser.web.rest;

import com.company.department.coindispenser.model.UserDto;
import com.company.department.coindispenser.service.CoinDispenserService;
import com.company.department.coindispenser.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
public class CoinDispenserResource {

    @Autowired
    public CoinDispenserService coinDispenserService;

    @Autowired
    public UserService userService;

    Logger log  = LoggerFactory.getLogger(CoinDispenserResource.class);

    //endpoint for getting the minimum number of coins
    @GetMapping("/api/coindispenser/getcoin")
    public ResponseEntity<Integer> getMin( @RequestParam("change") Integer change, @RequestParam("coins") String coins ){

        //Remove any whitespaces
        coins = coins.trim();
        coins = coins.replaceAll(" ","");

        //Check if passed string is valid (does not contain non digits, with exception of commas)
        boolean isValid = coins.matches("^[0-9]+(,[0-9]*)*$");
        log.info("Validity: {}",isValid);

        //return if the string is not valid
        if (!isValid){
            return new ResponseEntity<>(-1,HttpStatus.BAD_REQUEST);
        }

        //Convert coins string to List<Integer>
        List<String> coinsList = Arrays.asList(coins.split(","));
        List<Integer> coinsList2 = coinsList.stream().map(Integer::parseInt).collect(Collectors.toList());

        log.info("Call to getMin() for change = {} and coins = {}", change, coins);

        //at least 1 must be present in order to make change for any value
        if (!coinsList2.contains(1))
            coinsList2.add(1);

        return new ResponseEntity<>( coinDispenserService.getMin(coinsList2,change), HttpStatus.OK );
    }

    //endpoint for registering a new user to th database
    @PostMapping("/api/coindispenser/createuser")
    public void add(@Validated @RequestBody UserDto user) {
        userService.createUser(user);
    }

    //endpoint for Authenticating a user
    @GetMapping("/api/coindispenser/login")
    ResponseEntity<String> login(){
        return new ResponseEntity<>("Logged in",HttpStatus.OK);
    }

}
