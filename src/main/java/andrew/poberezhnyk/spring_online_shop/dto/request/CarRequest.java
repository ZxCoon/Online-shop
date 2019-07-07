package andrew.poberezhnyk.spring_online_shop.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarRequest {

    private String model;

    private Short year;

    private Long idCarBrand;


}
