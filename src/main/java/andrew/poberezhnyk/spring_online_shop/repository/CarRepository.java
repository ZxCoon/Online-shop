package andrew.poberezhnyk.spring_online_shop.repository;

import andrew.poberezhnyk.spring_online_shop.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
}
