package andrew.poberezhnyk.spring_online_shop.controller;


import andrew.poberezhnyk.spring_online_shop.dto.request.PartsRequest;
import andrew.poberezhnyk.spring_online_shop.dto.response.DataResponse;
import andrew.poberezhnyk.spring_online_shop.dto.response.PartsResponse;
import andrew.poberezhnyk.spring_online_shop.exceptions.WrongInputDataException;
import andrew.poberezhnyk.spring_online_shop.filter.CategoryCriteria;
import andrew.poberezhnyk.spring_online_shop.filter.PriceCriteria;
import andrew.poberezhnyk.spring_online_shop.service.PartsService;
import andrew.poberezhnyk.spring_online_shop.filter.PartsCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/parts")
public class PartsController {

    @Autowired
    private PartsService partsService;

    @GetMapping
    public DataResponse<PartsResponse> getPart(@RequestParam(required = false) String partName,
                                               @RequestParam(required = false) Integer partId,
                                               @RequestParam(required = false) Integer price,
                                               @RequestParam(required = false) Integer quantity,
                                               @RequestParam Integer page,
                                               @RequestParam Integer size,
                                               @RequestParam String sortFieldName,
                                               @RequestParam Sort.Direction direction) {

        PartsCriteria partsCriteria = new PartsCriteria(partName,partId,price,quantity);

        System.out.println("getPart");

        return partsService.findAll(partsCriteria, page, size, sortFieldName, direction);
    }

    @GetMapping("/{id}")
    public PartsResponse getPartById(@PathVariable Long id) {
        System.out.println("Search part by id " + id);
        return partsService.findOne(id);
    }

    @GetMapping("/category/from={partIdFrom}/to={partIdTo}")
    public DataResponse<PartsResponse> getCategoryPartsById(
                                     @PathVariable Short partIdFrom,
                                     @PathVariable Short partIdTo,
                                     @RequestParam(required = false) Integer quantity,
                                     @RequestParam Integer page,
                                     @RequestParam Integer size,
                                     @RequestParam String sortFieldName,
                                     @RequestParam Sort.Direction direction) {

        CategoryCriteria categoryCriteria = new CategoryCriteria(partIdFrom ,partIdTo ,quantity);

        System.out.println("getAllPartsByCategory");

        return partsService.findAllByCategory(categoryCriteria, page, size, sortFieldName, direction);
    }

    @GetMapping("/price/from={priceFrom}/to={priceTo}")
    public DataResponse<PartsResponse> getPartsByPrice(
            @PathVariable Integer priceFrom,
            @PathVariable Integer priceTo,
            @RequestParam(required = false) Integer quantity,
            @RequestParam Integer page,
            @RequestParam Integer size,
            @RequestParam String sortFieldName,
            @RequestParam Sort.Direction direction) {

        PriceCriteria priceCriteria = new PriceCriteria(priceFrom ,priceTo ,quantity);

        System.out.println("getAllPartsByCategory");

        return partsService.findAllByPrice(priceCriteria, page, size, sortFieldName, direction);
    }

    @GetMapping("/search/{partId}/{price};")
    public List<PartsResponse> getAllPartsByPartIdAndPrice(@PathVariable Short partId, @PathVariable Integer price) {
        System.out.println("getAllPartsByPartId " + partId + " AndPrice " + price);
        System.out.println(partsService.findAllByPartIdAndPrice(partId, price));
        return partsService.findAllByPartIdAndPrice(partId, price);
    }

    @GetMapping("/search/pId={partId}")
    public List<PartsResponse> getAllPartsByPartId(@PathVariable Short partId) {
        System.out.println("getAllPartsByPartId");
        return partsService.findAllByPartId(partId);
    }

    @PostMapping
    public Long createPart(@RequestBody @Valid PartsRequest partsRequest) throws WrongInputDataException {
        System.out.println("Create part with full name " + partsRequest.getFullName());
        return partsService.save(partsRequest);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        System.out.println("Delete part by id: " + id);
        partsService.delete(id);
    }
}
