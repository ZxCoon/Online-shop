package andrew.poberezhnyk.spring_online_shop.repository;

import andrew.poberezhnyk.spring_online_shop.entity.Parts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PartsRepository extends JpaRepository<Parts, Long>, JpaSpecificationExecutor<Parts> {

}
