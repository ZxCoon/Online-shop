package andrew.poberezhnyk.spring_online_shop.filter;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PriceCriteria {

    private Integer priceFrom;
    private Integer priceTo;
    private Integer quantity;

    public PriceCriteria() {}

    public PriceCriteria(Integer priceFrom, Integer priceTo, Integer quantity) {
        this.priceFrom = priceFrom;
        this.priceTo = priceTo;
        this.quantity = quantity;
    }
}
