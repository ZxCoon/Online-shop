package andrew.poberezhnyk.spring_online_shop.controller;

import andrew.poberezhnyk.spring_online_shop.dto.request.CarRequest;
import andrew.poberezhnyk.spring_online_shop.dto.response.CarResponse;
import andrew.poberezhnyk.spring_online_shop.exceptions.WrongInputDataException;
import andrew.poberezhnyk.spring_online_shop.service.CarsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/cars")
public class CarController {

    @Autowired
    private CarsService carsService;

    @PostMapping
    public void saveCar(@RequestBody CarRequest carRequest) throws WrongInputDataException {
        carsService.save(carRequest);
    }

    @PostMapping("/{brand}")
    public List<CarResponse> getAllCarsByBrand(@PathVariable String brand) throws WrongInputDataException {
        return carsService.getCarsByBrandId(brand);
    }

    @GetMapping
    public List<CarResponse> findAll() {
        return carsService.findAll();
    }
}
