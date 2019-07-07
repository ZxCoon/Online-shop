package andrew.poberezhnyk.spring_online_shop.service;

import andrew.poberezhnyk.spring_online_shop.dto.request.CarRequest;
import andrew.poberezhnyk.spring_online_shop.dto.response.CarResponse;
import andrew.poberezhnyk.spring_online_shop.entity.Car;
import andrew.poberezhnyk.spring_online_shop.entity.CarBrand;
import andrew.poberezhnyk.spring_online_shop.exceptions.WrongInputDataException;
import andrew.poberezhnyk.spring_online_shop.repository.CarBrandRepository;
import andrew.poberezhnyk.spring_online_shop.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CarsService {


    @Autowired
    private CarRepository carRepository;

    @Autowired
    private CarBrandRepository carBrandRepository;

    @Transactional
    public CarResponse save(CarRequest carRequest) throws WrongInputDataException {
        Car car = new Car();
        car.setModel(carRequest.getModel());
        car.setYear(carRequest.getYear());
        car.setCarBrand(findCarBrandById(carRequest.getIdCarBrand()));
        return new CarResponse(carRepository.save(car));
    }

    @Transactional
    public List<CarResponse> getCarsByBrandId(String brand){
        return carRepository.findAll().stream()
                .filter(model -> model.getCarBrand().getBrand().equals(brand))
                .map(CarResponse::new)
                .collect(Collectors.toList());
    }

    public List<CarResponse> findAll(){
        return carRepository.findAll().stream().map(CarResponse::new).collect(Collectors.toList());
    }

    @Transactional
    public CarResponse findOne(Long id){
        Optional<Car> carOptional = carRepository.findById(id);
        if (carOptional.isPresent()){
            return new CarResponse(carOptional.get());
        }else{
            throw new IllegalArgumentException("Car with this id " + id + " not found!");
        }
    }

    public void delete(Long id){
        carRepository.deleteById(id);
    }


    private CarBrand findCarBrandById(Long id) throws WrongInputDataException {
        Optional<CarBrand> optionalCarBrands= carBrandRepository.findById(id);
        if (optionalCarBrands.isPresent()) {
            return optionalCarBrands.get();
        }
        throw new WrongInputDataException("CarBrand with id : " + id + " not found");
    }
}
