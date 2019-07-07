package andrew.poberezhnyk.spring_online_shop.service;

import andrew.poberezhnyk.spring_online_shop.dto.request.OrdersRequest;
import andrew.poberezhnyk.spring_online_shop.dto.response.OrdersResponse;
import andrew.poberezhnyk.spring_online_shop.entity.Orders;
import andrew.poberezhnyk.spring_online_shop.entity.Parts;
import andrew.poberezhnyk.spring_online_shop.entity.Users;
import andrew.poberezhnyk.spring_online_shop.exceptions.WrongInputDataException;
import andrew.poberezhnyk.spring_online_shop.repository.OrdersRepository;
import andrew.poberezhnyk.spring_online_shop.repository.PartsRepository;
import andrew.poberezhnyk.spring_online_shop.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrdersService {

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private PartsRepository partsRepository;

    @Transactional
    public OrdersResponse save(OrdersRequest ordersRequest) throws WrongInputDataException{
        Orders order = new Orders();
        order.setStatus(ordersRequest.getStatus());
        if (ordersRequest.getUserId()==0){
            order.setFirstName(ordersRequest.getFirstName());
            order.setLastName(ordersRequest.getLastName());
            order.setPhone(ordersRequest.getPhone());
            order.setAddress(ordersRequest.getAddress());
        } else{
            order.setUser(findUserById(ordersRequest.getUserId()));
            order.setFirstName(findUserById(ordersRequest.getUserId()).getFirstName());
            order.setLastName(findUserById(ordersRequest.getUserId()).getLastName());
            order.setPhone(findUserById(ordersRequest.getUserId()).getPhone());
            order.setAddress(findUserById(ordersRequest.getUserId()).getAddress());
        }
        order.setProduct(findPartById(ordersRequest.getProductId()));
        order.setAmount(ordersRequest.getAmount());
        order.setNote(ordersRequest.getNote());
        order.setDelivery(ordersRequest.getDelivery());
        return new OrdersResponse(ordersRepository.save(order));
    }

    @Transactional
    public void updateAmount(Long userId, Long itemId, Integer amount) throws WrongInputDataException{
        List<Orders> ordersByUser = ordersRepository.findAll().stream()
                .filter(or -> or.getUser()!=null && or.getUser().getId().equals(userId))
                .filter(or -> or.getProduct().getId().equals(itemId))
                .collect(Collectors.toList());
        for (Orders order : ordersByUser) {
            if (order.getUser().getId() == userId && order.getProduct().getId()== itemId){
                order.setAmount(amount);
                ordersRepository.save(order);
            }
        }
    }

    @Transactional
    public void updateStatus(Long orderId, String status, String note, String delivery) throws WrongInputDataException{
        Optional<Orders> orderOptional = ordersRepository.findById(orderId);
        if (orderOptional.isPresent()){
            Orders order = orderOptional.get();
            order.setStatus(status);
            order.setDelivery(delivery);
            order.setNote(note);
            ordersRepository.save(order);
        }else{
            throw new IllegalArgumentException("Order with this id " + orderId + " not found!");
        }


    }
    public List<OrdersResponse> findAllOrdersFromUserById(Long userId){
//        ordersRepository.findAll().stream()
//                .filter(or -> or.getUser().getId().equals(userId) && or.getStatus().equals("cart"))
//                .forEach(System.out::println);
        return ordersRepository.findAll().stream()
//                .filter(Objects::nonNull)
                .filter(or -> or.getUser()!=null && or.getUser().getId().equals(userId) && or.getStatus().equals("cart"))
                .map(OrdersResponse::new)
                .collect(Collectors.toList());
    }


    public void delete(Long id){
        ordersRepository.deleteById(id);
    }


    private Users findUserById(Long id) throws WrongInputDataException {
        Optional<Users> optionalUser= usersRepository.findById(id);
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        }
        throw new WrongInputDataException("User with id : " + id + " not found");
    }

    private Parts findPartById(Long id) throws WrongInputDataException {
        Optional<Parts> optionalPart= partsRepository.findById(id);
        if (optionalPart.isPresent()) {
            return optionalPart.get();
        }
        throw new WrongInputDataException("User with id : " + id + " not found");
    }
}
