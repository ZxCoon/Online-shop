package andrew.poberezhnyk.spring_online_shop.filter;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryCriteria {

    private Short partIdFrom;
    private Short partIdTo;
    private Integer quantity;

    public CategoryCriteria() {
    }

    public CategoryCriteria(Short partIdFrom, Short partIdTo, Integer quantity) {
        this.partIdFrom = partIdFrom;
        this.partIdTo = partIdTo;
        this.quantity = quantity;
    }
}
