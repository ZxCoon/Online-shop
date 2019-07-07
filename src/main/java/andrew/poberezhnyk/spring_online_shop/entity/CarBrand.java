package andrew.poberezhnyk.spring_online_shop.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class CarBrand {

    @Id
    @GeneratedValue
    private Long id;

    private String brand;

    @OneToMany(mappedBy = "carBrand")
    private List<Car> cars = new ArrayList<Car>();
}
