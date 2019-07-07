package andrew.poberezhnyk.spring_online_shop.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;


@Getter
@Setter

public class PartsRequest {

    private Short partId;

    @NotBlank
    private String fullName;

    @Min(0)
    private Integer quantity;

    @Min(0)
    private Integer price;

    private String description;

    private Long idCars;


//    private Car car;


}
