package andrew.poberezhnyk.spring_online_shop.entity;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Parts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Short partId;
    @NotNull
    private String fullName;

    private String description;

    private String image;

    private Integer price;

    private Integer quantity;

    @ManyToOne
    private Car car;

    @OneToMany(mappedBy = "product")
    private List<Orders> orders = new ArrayList<Orders>();

    public Parts() {
    }

}
