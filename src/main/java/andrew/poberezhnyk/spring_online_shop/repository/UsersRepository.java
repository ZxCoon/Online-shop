package andrew.poberezhnyk.spring_online_shop.repository;

import andrew.poberezhnyk.spring_online_shop.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
}
