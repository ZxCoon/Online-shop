package andrew.poberezhnyk.spring_online_shop.dto.response;

import andrew.poberezhnyk.spring_online_shop.entity.Car;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarResponse {

    private Long id;

    private String model;

    private Short year;

    private CarBrandResponse carBrandResponse;

    public CarResponse(Car car) {
        this.id = car.getId();
        this.model = car.getModel();
        this.year = car.getYear();
        this.carBrandResponse = new CarBrandResponse(car.getCarBrand());
    }
}
