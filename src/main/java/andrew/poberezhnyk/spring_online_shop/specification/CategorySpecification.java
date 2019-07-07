package andrew.poberezhnyk.spring_online_shop.specification;

import andrew.poberezhnyk.spring_online_shop.entity.Parts;
import andrew.poberezhnyk.spring_online_shop.filter.CategoryCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class CategorySpecification implements Specification<Parts> {

    private CategoryCriteria categoryCriteria;

    public CategorySpecification(CategoryCriteria categoryCriteria) {
        this.categoryCriteria = categoryCriteria;
    }

    private Predicate findCategory(Root<Parts> root, CriteriaBuilder criteriaBuilder) {
        return criteriaBuilder.between(root.get("partId"), categoryCriteria.getPartIdFrom(), categoryCriteria.getPartIdTo());
    }

    @Override
    public Predicate toPredicate(Root<Parts> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        return criteriaBuilder.and(findCategory(root, criteriaBuilder));
    }
}


