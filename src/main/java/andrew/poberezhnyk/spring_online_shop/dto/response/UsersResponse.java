package andrew.poberezhnyk.spring_online_shop.dto.response;

import andrew.poberezhnyk.spring_online_shop.entity.Users;
import lombok.Getter;
import lombok.Setter;

import javax.transaction.Transactional;

@Getter
@Setter
@Transactional
public class UsersResponse {

    private Long id;

    private String firstName;
    private String lastName;
    private String login;
    private String email;
    private String password;
    private String address;
    private String phone;

    public UsersResponse(Users users) {
        this.id = users.getId();
        this.firstName = users.getFirstName();
        this.lastName = users.getLastName();
        this.login = users.getLogin();
        this.address = users.getAddress();
        this.email = users.getEmail();
        this.password = users.getPassword();
        this.phone = users.getPhone();
    }
}
