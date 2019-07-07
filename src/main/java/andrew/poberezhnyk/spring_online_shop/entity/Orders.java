package andrew.poberezhnyk.spring_online_shop.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String phone;
    private String address;

    @ManyToOne
    private Users user; // user's id

    @ManyToOne
    private Parts product; // part's id
    private Integer amount;
    private String status;
    private String note;
    private String delivery;
}
