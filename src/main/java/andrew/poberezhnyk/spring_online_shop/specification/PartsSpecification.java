package andrew.poberezhnyk.spring_online_shop.specification;

import andrew.poberezhnyk.spring_online_shop.entity.Parts;
import andrew.poberezhnyk.spring_online_shop.filter.PartsCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class PartsSpecification implements Specification<Parts> {

    private PartsCriteria partsCriteria;

    public PartsSpecification(PartsCriteria partsCriteria) {
        this.partsCriteria = partsCriteria;
    }

    private Predicate findByName(Root<Parts> root, CriteriaBuilder criteriaBuilder) {
        return criteriaBuilder.like(root.get("fullName"), "%"+partsCriteria.getPartName()+"%");
    }

    private Predicate findByPartId(Root<Parts> root, CriteriaBuilder criteriaBuilder) {
        return criteriaBuilder.equal(root.get("partId"), partsCriteria.getPartId());
    }

    private Predicate findByPrice(Root<Parts> root, CriteriaBuilder criteriaBuilder) {
        return criteriaBuilder.equal(root.get("price"), partsCriteria.getPrice());
    }

    private Predicate findIfOnStorage(Root<Parts> root, CriteriaBuilder criteriaBuilder) {
        return criteriaBuilder.greaterThan(root.get("quantity"), 0);
    }

    @Override
    public Predicate toPredicate(Root<Parts> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
        String filterCode = partsCriteria.getFilterCode();

        switch (filterCode) {
            case "0001": {
                return criteriaBuilder.and(
                        findIfOnStorage(root, criteriaBuilder));
            }
            case "0010": {
                return criteriaBuilder.and(
                        findByPrice(root, criteriaBuilder));
            }
            case "0011": {
                return criteriaBuilder.and(
                        findByPrice(root, criteriaBuilder),
                        findIfOnStorage(root, criteriaBuilder));
            }
            case "0100": {
                return criteriaBuilder.and(
                        findByPartId(root, criteriaBuilder));
            }
            case "0101": {
                return criteriaBuilder.and(
                        findByPartId(root, criteriaBuilder),
                        findIfOnStorage(root, criteriaBuilder));
            }
            case "0110": {
                return criteriaBuilder.and(
                        findByPartId(root, criteriaBuilder),
                        findByPrice(root, criteriaBuilder));
            }
            case "0111": {
                return criteriaBuilder.and(
                        findByPartId(root, criteriaBuilder),
                        findByPrice(root, criteriaBuilder),
                        findIfOnStorage(root, criteriaBuilder));
            }
            case "1000": {
                return criteriaBuilder.and(
                        findByName(root, criteriaBuilder));
            }
            case "1001": {
                return criteriaBuilder.and(
                        findByName(root, criteriaBuilder),
                        findIfOnStorage(root, criteriaBuilder));
            }
            case "1010": {
                return criteriaBuilder.and(
                        findByName(root, criteriaBuilder),
                        findByPrice(root, criteriaBuilder));
            }
            case "1011": {
                return criteriaBuilder.and(
                        findByName(root, criteriaBuilder),
                        findByPrice(root, criteriaBuilder),
                        findIfOnStorage(root, criteriaBuilder));
            }
            case "1100": {
                return criteriaBuilder.and(
                        findByName(root, criteriaBuilder),
                        findByPartId(root, criteriaBuilder));
            }
            case "1101": {
                return criteriaBuilder.and(
                        findByName(root, criteriaBuilder),
                        findByPartId(root, criteriaBuilder),
                        findIfOnStorage(root, criteriaBuilder));
            }
            case "1110": {
                return criteriaBuilder.and(
                        findByName(root, criteriaBuilder),
                        findByPartId(root, criteriaBuilder),
                        findByPrice(root, criteriaBuilder));
            }
            case "1111": {
                return criteriaBuilder.and(
                        findByName(root, criteriaBuilder),
                        findByPartId(root, criteriaBuilder),
                        findByPrice(root, criteriaBuilder),
                        findIfOnStorage(root, criteriaBuilder));
            }
            case "0000": {
                return null;
            }
        }
        return null;
    }
}