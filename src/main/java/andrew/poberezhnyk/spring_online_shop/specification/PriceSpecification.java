package andrew.poberezhnyk.spring_online_shop.specification;

import andrew.poberezhnyk.spring_online_shop.entity.Parts;
import andrew.poberezhnyk.spring_online_shop.filter.PriceCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class PriceSpecification implements Specification<Parts> {

    private PriceCriteria priceCriteria;

    public PriceSpecification(PriceCriteria priceCriteria) {
        this.priceCriteria = priceCriteria;
    }

    private Predicate findByPrice(Root<Parts> root, CriteriaBuilder criteriaBuilder) {
        return criteriaBuilder.between(root.get("price"), priceCriteria.getPriceFrom(), priceCriteria.getPriceTo());
    }

    @Override
    public Predicate toPredicate(Root<Parts> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        return criteriaBuilder.and(findByPrice(root, criteriaBuilder));
    }
}
