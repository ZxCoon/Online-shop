package andrew.poberezhnyk.spring_online_shop.controller;

import andrew.poberezhnyk.spring_online_shop.dto.request.CarBrandRequest;
import andrew.poberezhnyk.spring_online_shop.dto.response.CarBrandResponse;
import andrew.poberezhnyk.spring_online_shop.exceptions.WrongInputDataException;
import andrew.poberezhnyk.spring_online_shop.service.CarBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/carBrands")
public class CarBrandController {

    @Autowired
private CarBrandService carBrandService;

    @PostMapping
    public void saveCar(@RequestBody CarBrandRequest carBrandRequest) throws WrongInputDataException {
        carBrandService.save(carBrandRequest);
    }

    @GetMapping
    public List<CarBrandResponse> findAll() {
        return carBrandService.findAll();
    }
}
