package andrew.poberezhnyk.spring_online_shop.dto.response;

import andrew.poberezhnyk.spring_online_shop.entity.Parts;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PartsResponse {

    private Long id;

    private Short partId;

    private String fullName;

    private Integer quantity;

    private String description;

    private String image;

    private String brand;

    private Integer price;

    private CarResponse carResponse;


    public PartsResponse(Parts parts) {
        this.id = parts.getId();
        this.partId = parts.getPartId();
        this.fullName = parts.getFullName();
        this.quantity = parts.getQuantity();
        this.description = parts.getDescription();
        this.image = parts.getImage();
        this.price = parts.getPrice();

        if (parts.getCar()!=null){
            if (parts.getCar().getId()==0){
            }else{
                this.carResponse = new CarResponse(parts.getCar());
            }
        }



//        if (carResponse.getId()!=null && carResponse.getCarBrandResponse().getBrand()!=null){
//            this.brand = carResponse.getCarBrandResponse().getBrand();
//            this.carResponse
//        }
    }
}
