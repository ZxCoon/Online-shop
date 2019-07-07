package andrew.poberezhnyk.spring_online_shop.service;


import andrew.poberezhnyk.spring_online_shop.dto.request.UsersRequest;
import andrew.poberezhnyk.spring_online_shop.dto.response.UsersResponse;
import andrew.poberezhnyk.spring_online_shop.entity.Users;
import andrew.poberezhnyk.spring_online_shop.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;


    public Long save(UsersRequest usersRequest){
        Users users = new Users();
        users.setLogin(usersRequest.getLogin());
        users.setFirstName(usersRequest.getFirstName());
        users.setLastName(usersRequest.getLastName());
        users.setEmail(usersRequest.getEmail());
        users.setPassword(usersRequest.getPassword());
        users.setPhone(usersRequest.getPhone());
        users.setAddress(usersRequest.getAddress());
        users = usersRepository.save(users);
        return users.getId();
    }

    public List<UsersResponse> findAll(){
        return usersRepository.findAll().stream().map(UsersResponse::new).collect(Collectors.toList());
    }

    @Transactional
    public UsersResponse findOne(Long id){
        Optional<Users> usersOptional = usersRepository.findById(id);
        if (usersOptional.isPresent()){
            return new UsersResponse(usersOptional.get());
        }else{
            throw new IllegalArgumentException("User with this id " + id + " not found!");
        }
    }

    @Transactional
    public UsersResponse findBySignInInformation(String login, String password){
        List<UsersResponse> users =  findAll();
        for (UsersResponse ur: users) {
            if (ur.getLogin().equals(login)&&ur.getPassword().equals(password)){
                return ur;
            }
        }
        throw new IllegalArgumentException("Неправильне Імя або Пароль");
    }

    public List<UsersResponse> findUserByName(String firstName, String lastName){
        return usersRepository.findAll().stream()
                .filter(pr -> pr.getFirstName().equals(firstName))
                .filter(pr -> pr.getLastName().equals(lastName))
                .map(UsersResponse::new)
                .collect(Collectors.toList());
    }

    public void delete(Long id){
        usersRepository.deleteById(id);
    }
}
