package andrew.poberezhnyk.spring_online_shop.service;


import andrew.poberezhnyk.spring_online_shop.dto.request.CarBrandRequest;
import andrew.poberezhnyk.spring_online_shop.dto.response.CarBrandResponse;
import andrew.poberezhnyk.spring_online_shop.entity.CarBrand;
import andrew.poberezhnyk.spring_online_shop.exceptions.WrongInputDataException;
import andrew.poberezhnyk.spring_online_shop.repository.CarBrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarBrandService {

    @Autowired
    private CarBrandRepository carBrandRepository;

    @Transactional
    public CarBrandResponse save(CarBrandRequest carBrandRequest) throws WrongInputDataException {
        CarBrand carBrand = new CarBrand();
        carBrand.setBrand(carBrandRequest.getBrand());
        return new CarBrandResponse(carBrandRepository.save(carBrand));
    }

    @Transactional
    public CarBrandResponse findIdByBrandName(String brand){
        List<CarBrandResponse> carBrandResponses =  findAll();
        for (CarBrandResponse cbr: carBrandResponses) {
            if (cbr.getBrand().equals(brand)){
                return cbr;
            }
        }
        throw new IllegalArgumentException("Такої марки не існує");
    }

    public List<CarBrandResponse> findAll() {
        return carBrandRepository.findAll().stream().map(CarBrandResponse::new).collect(Collectors.toList());
    }

    public void delete(Long id){
        carBrandRepository.deleteById(id);
    }
}
