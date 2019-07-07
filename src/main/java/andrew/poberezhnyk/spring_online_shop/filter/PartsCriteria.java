package andrew.poberezhnyk.spring_online_shop.filter;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PartsCriteria {

    private String partName;
    private Integer partId;
    private Integer price;
    private Integer quantity;
    private String filterCode;

    public PartsCriteria() {
    }

    public PartsCriteria(String partName, Integer partId, Integer price, Integer quantity) {
        this.partName = partName;
        this.partId = partId;
        this.price = price;
        this.quantity = quantity;
        this.filterCode = checkFilter(partName, partId, price, quantity);
    }

    public String checkFilter(String partName, Integer partId, Integer price, Integer quantity){
        String filterCode = "";//1111 if every key exists
        if (partName != null && !partName.equals("")) {
            filterCode = filterCode + "1";
        } else {
            filterCode = filterCode + "0";
        }
        if (partId != null && !partId.equals("")) {
            filterCode = filterCode + "1";
        } else {
            filterCode = filterCode + "0";
        }
        if (price != null && !price.equals("")) {
            filterCode = filterCode + "1";
        } else {
            filterCode = filterCode + "0";
        }
        if (quantity != null && !quantity.equals("")) {
            filterCode = filterCode + "1";
        } else {
            filterCode = filterCode + "0";
        }
        return filterCode;
    }
}
