package com.labs.SpringBootWeb;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @RequestMapping("/api/users/{id}")
    public User get(@PathVariable("id") int id) {
        if(id==1){
            return new User(id, "danilo");
        } else if(id==123) {
            return new User(id, "admin");
        } else {
            return new User(id, "shipper");
        }
    }

    @RequestMapping("/api/users")
    public User[] list() {
        User[] users = new User[] {new User(1, "danilo"),new User(2, "admin"),new User(3, "shipper")};
        return users;
    }
}