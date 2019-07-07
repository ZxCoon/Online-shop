package andrew.poberezhnyk.spring_online_shop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HtmlPageController {

    @RequestMapping("/")
    public String mainPage(){
        return "main.html";
    }


}
