package vn.project.affiliate.common.exception;

@SuppressWarnings("serial")
public class BaseException extends RuntimeException {

    public BaseException(String message) {
        super(message);
    }

    public BaseException() {
        super("Exception");
    }
}
