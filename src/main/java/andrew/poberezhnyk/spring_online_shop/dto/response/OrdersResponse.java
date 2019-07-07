package andrew.poberezhnyk.spring_online_shop.dto.response;

import andrew.poberezhnyk.spring_online_shop.entity.Orders;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrdersResponse {

    private Long id;

    private UsersResponse user;
    private PartsResponse part;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private String status;
    private Integer amount;
    private String note;
    private String delivery;

    public OrdersResponse(Orders orders) {
        this.id = orders.getId();
        this.firstName = orders.getFirstName();
        this.lastName = orders.getLastName();
        this.amount = orders.getAmount();
        this.phone = orders.getPhone();
        this.address = orders.getAddress();
        this.part = new PartsResponse(orders.getProduct());
        this.status = orders.getStatus();
        if (orders.getNote()!=null){
            this.note = orders.getNote();
        }else{
            this.note ="";
        }
        if (orders.getDelivery()!=null){
            this.delivery = orders.getDelivery();
        }else{
            this.delivery ="";
        }
        if (orders.getUser()!=null){
            if (orders.getUser().getId()==0){
            }else{
                this.user = new UsersResponse(orders.getUser());
            }
        }
    }
}
