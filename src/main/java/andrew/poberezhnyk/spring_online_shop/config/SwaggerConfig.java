package andrew.poberezhnyk.spring_online_shop.config;

import com.google.common.collect.Sets;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket productApi(){
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("SpringBoot-Swagger-API")
                .select()
                .apis(RequestHandlerSelectors.basePackage("andrew.poberezhnyk.spring_online_shop.controller"))
                .build()
                .consumes(Sets.newHashSet(MediaType.APPLICATION_JSON_VALUE.toString()))
                .produces(Sets.newHashSet(MediaType.APPLICATION_JSON_VALUE.toString()));
    }

}

