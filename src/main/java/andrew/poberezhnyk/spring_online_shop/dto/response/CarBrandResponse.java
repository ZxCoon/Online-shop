package andrew.poberezhnyk.spring_online_shop.dto.response;

import andrew.poberezhnyk.spring_online_shop.entity.CarBrand;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarBrandResponse {

    private Long id;

    private String brand;

    public CarBrandResponse(CarBrand carBrand) {
        this.id = carBrand.getId();
        this.brand = carBrand.getBrand();
    }
}
