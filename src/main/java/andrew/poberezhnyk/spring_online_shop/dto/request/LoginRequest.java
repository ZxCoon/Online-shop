package andrew.poberezhnyk.spring_online_shop.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class LoginRequest {
    @NotBlank
    @Size(min=5,max=20)
    private String login;

    @Size(min=5,max=20)
    private String password;
}
