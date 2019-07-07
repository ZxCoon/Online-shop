package andrew.poberezhnyk.spring_online_shop.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class OrdersRequest {
    @NotBlank
    @NotNull
    private Long productId;
    private Long userId;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private String status;
    private String note;
    private String delivery;
    private Integer amount;
}
