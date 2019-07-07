package andrew.poberezhnyk.spring_online_shop.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class UsersRequest {

    @NotBlank
    @Size(min=5,max=20)
    private String login;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @Email
    private String email;

    @Size(min=5,max=20)
    private String password;

    @NotBlank
    private String phone;

    @NotBlank
    private String address;


}
