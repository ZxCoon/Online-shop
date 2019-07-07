package andrew.poberezhnyk.spring_online_shop.service;

import andrew.poberezhnyk.spring_online_shop.dto.request.PartsRequest;
import andrew.poberezhnyk.spring_online_shop.dto.response.DataResponse;
import andrew.poberezhnyk.spring_online_shop.dto.response.PartsResponse;
import andrew.poberezhnyk.spring_online_shop.entity.Car;
import andrew.poberezhnyk.spring_online_shop.entity.Parts;
import andrew.poberezhnyk.spring_online_shop.exceptions.WrongInputDataException;
import andrew.poberezhnyk.spring_online_shop.filter.CategoryCriteria;
import andrew.poberezhnyk.spring_online_shop.filter.PriceCriteria;
import andrew.poberezhnyk.spring_online_shop.repository.CarRepository;
import andrew.poberezhnyk.spring_online_shop.repository.PartsRepository;
import andrew.poberezhnyk.spring_online_shop.filter.PartsCriteria;
import andrew.poberezhnyk.spring_online_shop.specification.CategorySpecification;
import andrew.poberezhnyk.spring_online_shop.specification.PartsSpecification;
import andrew.poberezhnyk.spring_online_shop.specification.PriceSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PartsService {

    @Autowired
    private PartsRepository partsRepository;

    @Autowired
    private CarRepository carRepository;

    public Long save(PartsRequest partsRequest) throws WrongInputDataException{
        Parts parts = new Parts();
        parts.setFullName(partsRequest.getFullName());
        parts.setPartId(partsRequest.getPartId());
        parts.setPrice(partsRequest.getPrice());
        parts.setImage(parts.getId().toString());
        parts.setDescription(partsRequest.getDescription());
        parts.setQuantity(partsRequest.getQuantity());
        if (partsRequest.getIdCars()==0){
        } else{
            parts.setCar(findCarById(partsRequest.getIdCars()));
        }
        parts = partsRepository.save(parts);
        return parts.getId();
    }

    public DataResponse<PartsResponse> findAll(PartsCriteria partsCriteria, Integer page, Integer size, String sortFieldName, Sort.Direction direction){
        Sort sort = Sort.by(direction, sortFieldName);
        PageRequest pageRequest = PageRequest.of(page,size, sort);
        Page<Parts> pageParts;// = partsRepository.findAll(pageRequest);

            PartsSpecification partsSpecification = new PartsSpecification(partsCriteria); // filter parts by a filterCode from partsCriteria
            pageParts=partsRepository.findAll(partsSpecification,pageRequest);

        return new DataResponse<>(pageParts.stream().map(PartsResponse::new).collect(Collectors.toList()),pageParts);
    }

    public DataResponse<PartsResponse> findAllByCategory(CategoryCriteria categoryCriteria, Integer page, Integer size, String sortFieldName, Sort.Direction direction){
        Sort sort = Sort.by(direction, sortFieldName);
        PageRequest pageRequest = PageRequest.of(page,size, sort);
        Page<Parts> pageParts;// = partsRepository.findAll(pageRequest);

        CategorySpecification categorySpecification = new CategorySpecification(categoryCriteria); // filter parts by a filterCode from partsCriteria
        pageParts=partsRepository.findAll(categorySpecification,pageRequest);

        return new DataResponse<>(pageParts.stream().map(PartsResponse::new).collect(Collectors.toList()),pageParts);
    }

    public DataResponse<PartsResponse> findAllByPrice(PriceCriteria priceCriteria, Integer page, Integer size, String sortFieldName, Sort.Direction direction){
        Sort sort = Sort.by(direction, sortFieldName);
        PageRequest pageRequest = PageRequest.of(page,size, sort);
        Page<Parts> pageParts;// = partsRepository.findAll(pageRequest);

        PriceSpecification priceSpecifitaion = new PriceSpecification(priceCriteria); // filter parts by a filterCode from partsCriteria
        pageParts=partsRepository.findAll(priceSpecifitaion,pageRequest);

        return new DataResponse<>(pageParts.stream().map(PartsResponse::new).collect(Collectors.toList()),pageParts);
    }

    @Transactional
    public PartsResponse findOne(Long id){
        Optional<Parts> partsOptional = partsRepository.findById(id);
        if (partsOptional.isPresent()){
            return new PartsResponse(partsOptional.get());
        }else{
            throw new IllegalArgumentException("Parts with this id " + id + " not found!");
        }
    }

    public List<PartsResponse> findAllByPartId(Short partId){
        return partsRepository.findAll().stream()
                .filter(pr -> pr.getPartId().equals(partId))
                .map(PartsResponse::new)
                .collect(Collectors.toList());
    }

    public List<PartsResponse> findAllByPartIdAndPrice(Short partId, Integer price){
        return partsRepository.findAll().stream()
                .filter(pr -> pr.getPartId().equals(partId))
                .filter(pr -> pr.getPrice().equals(price))
                .map(PartsResponse::new)
                .collect(Collectors.toList());
    }

    public void delete(Long id){
        partsRepository.deleteById(id);
    }


    private Car findCarById(Long id) throws WrongInputDataException {
        Optional<Car> optionalCar = carRepository.findById(id);
        if (optionalCar.isPresent()) {
            return optionalCar.get();
        }
        throw new WrongInputDataException("Car with id : " + id + " not found");
    }

}
