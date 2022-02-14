package com.company.department.coindispenser.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CoinDispenserService {

    Logger log  = LoggerFactory.getLogger(CoinDispenserService.class);

    //Using dynamic programming approach
    public int getMin(List<Integer> coins, Integer change){

        //Initialize table of size change required +1
        List<Integer> table = new ArrayList<Integer>(Collections.nCopies(change+1, change+1));

        //to make change for 0, you only need 0 coins
        table.set(0,0);

        //Calculate minimum number of coins required for all coins from 1 to V
        for (int i=1; i<=change; i++)
        {
            // Go through all coins smaller than the current value you need change for on the table
            for (Integer coin : coins) {
                if (coin <= i) {

                    int subResult = table.get(i - coin);
                    if (subResult != (change + 1) && subResult + 1 < table.get(i))
                        table.set(i, subResult + 1);
                }
            }
        }

        //Answer is the last element of the programming table
        log.info("Result: {}", table.get(table.size()-1));
        return table.get(table.size()-1);
    }



}
