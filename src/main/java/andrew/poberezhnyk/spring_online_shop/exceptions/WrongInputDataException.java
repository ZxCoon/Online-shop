package andrew.poberezhnyk.spring_online_shop.exceptions;

public class WrongInputDataException extends Exception {
    public WrongInputDataException(String message) {
        super(message);
    }
}
