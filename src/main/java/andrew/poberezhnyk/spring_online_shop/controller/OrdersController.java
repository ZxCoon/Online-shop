package andrew.poberezhnyk.spring_online_shop.controller;

import andrew.poberezhnyk.spring_online_shop.dto.request.OrdersRequest;
import andrew.poberezhnyk.spring_online_shop.dto.response.OrdersResponse;
import andrew.poberezhnyk.spring_online_shop.exceptions.WrongInputDataException;
import andrew.poberezhnyk.spring_online_shop.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/orders")
public class OrdersController {

    @Autowired
    private OrdersService ordersService;

    @PostMapping
    public void addItem(@RequestBody OrdersRequest ordersRequest) throws WrongInputDataException {
        ordersService.save(ordersRequest);
    }

    @PostMapping("/update/{userId}/{itemId}")  //update/amount/{orderId}
    public void changeAmount(@PathVariable Long userId,@PathVariable Long itemId, @RequestParam Integer amount) throws WrongInputDataException {
        ordersService.updateAmount(userId,itemId,amount);
    }

    @PostMapping("/update/status/{orderId}")          //update/status/{orderId}
    public void updateStatus(@PathVariable Long orderId, @RequestParam String status, @RequestParam String note, @RequestParam String delivery) throws WrongInputDataException {
        ordersService.updateStatus(orderId,status,note,delivery);
    }

    @GetMapping("/id/{userId}")
    public List<OrdersResponse> getOrdersByUserId(@PathVariable Long userId) {
        System.out.println("Search orders by user id " + userId);
        return ordersService.findAllOrdersFromUserById(userId);
    }

}
