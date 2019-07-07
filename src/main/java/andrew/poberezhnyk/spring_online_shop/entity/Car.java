package andrew.poberezhnyk.spring_online_shop.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private CarBrand carBrand;

    private String model;

    private Short year;

    @OneToMany(mappedBy = "car")
    private List<Parts> partsList = new ArrayList<Parts>();
}
