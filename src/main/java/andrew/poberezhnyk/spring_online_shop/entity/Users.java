package andrew.poberezhnyk.spring_online_shop.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String login;
    private String firstName;
    private String lastName;

    @Column(unique = true, nullable = false)  //uniq value of email & cant be null
    private String email;
    private String password;
    private String phone;
    private String address;

    @OneToMany(mappedBy = "user")
    private List<Orders> orders = new ArrayList<Orders>();
}
