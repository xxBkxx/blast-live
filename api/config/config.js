var config = function() { 

	var SERVICE_CLIENT	   = "466738665859-sgs6ruq0k75p5p6a6v00866i8ipgl4m3.apps.googleusercontent.com";
	var PRIVATE_KEY        = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC0U8MJm48bg/7Q\nFteXpkcDcfeUPXfVx7VFnVonhDoi0X90wClaXzG1fPwRuK9OaM3CL8ZFXv/wQp/F\nx/jv/85pdWDIpO4iQSm6lF2/ABusBUwT7s4T3xAz+VDfxyNl8EvRA5amrSootBlu\nw46X4N1aRZ8x8lus7k+U7MizmSQxYLqNbtluTDlr6eSHN7/XSoWMB4RQAA8l7HE1\ngXXW1mk4YYnJoA//JmhPb2niWu1v2Pl5ny6b0Al+xOv+w8eO9Yo1NMGmCksCNnDY\nC0YVtpqD6mMNveQ91DqdDTrbpSXlWaWemOR/hsnbZ8ExLqq8FzIfmJFsIo5MdY6M\nDD2oRvUlAgMBAAECggEAEns6NEgf6uFEkpWgu29kfE8oIWaKW1voMW4O0Rl9bteb\nUT8njdZPTSs112ge+XGG0wXb83yozPo7D0VvN0O3pznLNU0oBdU5XmC52es8Ks1x\nLmLNdp5oNfdxqTmq4FX4I0ATptn9BeZta9t5iAnZDdkwV2lgKXFUMS5yZGvH2JKF\n5O6VI9tT1zgPUL7PPudA9+OIo6g36thAB4jHx5t01Zq1Z6OwsMSsLjZOIoXjHE7n\nS8foEJEvsBe2PqwfTo7MQvAoFf6CaVMQ8pCSmr8WsxwctUGBouBaI28JvxLg3Rbq\n4SeITNg49Svr5TTIMZbGjZ+FtOfZMjIMcUN6YehdcQKBgQDo4opRJFnkI1InIeZ6\ngBs+eQeZg1ex2ONkObygjTy4d3PxT2xhAfd1in/MotrCXa8P/yhYc3PmOgcJi2IA\nKyB5NyE1UfjMXMYRzI6i0KYhl4iucAIDN9MnOpbbq8RMymuEWoydU2l7lPn00iuz\npld4l6TN89DQH8gLMv5jPQSpkQKBgQDGOcM/MtxJUGjqdoyzL4IkQu/jqjfGGgEZ\naq/ZYSVGQv+344jw12r/lHJIhLRoT+q3MJx6zNlU2nJPtTznmUN/g1zs80jZUMLA\nzSuVJWJwF60rAwNHkC+OBgU+W3wxNzgIlZ/FJvfgSulvwAN+OM4d42JPKMsERf63\n8T66eXwoVQKBgGXf+/vk+AHJxb1iog1Cjyh0D3QDNdCR/V8xtqdRQZe8gZa1VMbW\n8maT0LY3I5VVICjSSNbwomm7RqrRM2y5cPo1uKw3kKvthaPxpQ/qUFJvlJYiX28C\n87a8dZPg/v1Mq135snt8Kq+qCvIjIoTzJl6Vj72cg+MXlA36H7hP0ANRAoGAdaMg\nAOiBHK0wpjxWgZxnInfq/3QsB0+1aU0MMPha85idQ5cv1KYy5JxHOkwu+Fy9EZwy\nsRnSvG2rOyx2iYdGLG1b/27dw8IO4fagr7Fw+s7CQO1Xy+eAoUtnXztRt69qfIW3\nPHxEzIIIiP4t1IGHqOshk5LE8LNNWAI+VNH14cUCgYBfA3NO0grRKnvmID+qk4py\nse0P+jQsTzb1LgZTqWlvmP3+BSoEjaBjTwwkrVjtrJlx4VT16hdJyE84Pb/li9rP\nSMZv8tsVsDnbDVEf6/8Mt/xwB0gcDbnzTHckpqrMAQUfYcDUv/P90BxjPpsn7jSX\nBdWPKKlx4tnjlpSHKi/IqQ==\n-----END PRIVATE KEY-----\n";
	var CLIENT_SECREsT     = "brhQ0RlT51_bEmTwisCbVLQN";
	var REFRESH_TOKEN      = "1/8PShrUHWRkl_3reaYx0vKVSm3RtNyEIbD6QQyyJYeFdHHVIPyHEEiZhhecBlT2E6";
	var ACCESS_TOKEN       = "ya29.GltkBDyVYqbkACcYGRaka-S3oX-oG518exc4FZBDRX5u2CbbbShHTL6SkFe2wAMPlM_pGcYMs0kAIGyam9FnH6WQo-aRSH3dYzhLALHax7pmCHo4onqFKu6jVKDY";
	var ACCESS_URL         = "https://accounts.google.com/o/oauth2/v2/auth";

	// this.SERVICE_CLIENT = SERVICE_CLIENT;c

	function getData(data){

		console.log("service client %s", this.SERVICE_CLIENT);
		return this.data;

	}

  return{
    getData:getData
  }

		// function get(value){
		// 	console.log(value);
		// return this.value;
}();

module.exports = config;