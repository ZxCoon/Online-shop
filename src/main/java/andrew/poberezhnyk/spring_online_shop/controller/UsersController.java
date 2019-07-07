package andrew.poberezhnyk.spring_online_shop.controller;

import andrew.poberezhnyk.spring_online_shop.dto.request.LoginRequest;
import andrew.poberezhnyk.spring_online_shop.dto.request.UsersRequest;
import andrew.poberezhnyk.spring_online_shop.dto.response.UsersResponse;
import andrew.poberezhnyk.spring_online_shop.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UsersService usersService;

    @GetMapping
    public List<UsersResponse> getUsers() {
        System.out.println("getUsers");
        return usersService.findAll();
    }

    @PostMapping("/login")
    public UsersResponse loginUserInfo(@RequestBody LoginRequest loginRequest){
        return usersService.findBySignInInformation(loginRequest.getLogin(), loginRequest.getPassword());
    }

    @GetMapping("/{id}")
    public UsersResponse getUserById(@PathVariable Long id) {
        System.out.println("Find user with id " + id);
        return usersService.findOne(id);
    }

    @PostMapping
    public Long createUser(@RequestBody @Valid UsersRequest usersRequest) {
        System.out.println("Create user with name " + usersRequest.getFirstName() + " " + usersRequest.getLastName());
        return usersService.save(usersRequest);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        System.out.println("Delete user by id: " + id);
        usersService.delete(id);
    }
}
