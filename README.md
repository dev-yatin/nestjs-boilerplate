# NestJS Boilerplate APIs

I have assumed a basic car parking application and created CURD APIs based on that.

### App Details

- **Port:** 3005
- **Swagger Documentation Link:** http://localhost:3005/api
- **Authentication Supported:** Yes
- **Authorization Supported:** Yes
- **Rate Limiting Supported:** Yes
- **Parking APIs(Park/Unpark/Find by slot):** Yes
- **Unit Testing for Parking APIs:** Yes
- **Integration Testing for Parking APIs:** Yes

### Steps to start application

Run `npm run start:dev` on command prompt and open _http://localhost:3005/api_ on browser.

### Authentication

Cookie based authentication is implemented. In order to authenticate hit `/api/login` API with details
`username:yatin@dummy.com` and `password` can be anything for now. If API hit successfully, you will be returned access token. This access token is JWT secret signed user information. You need not to copy this token anywhere. Your browser must have cookie available containing this information, now which will be automatically injected in all upcoming requests. You can hit `/api/logout` to clear this cookie and get unauthenticated.

### Authorization

Only 2 routes are public that are `/api/health` and `/api/login`. `/api/health` is just to know backend application health, can be used by load balancers.
Remaining routes are protected and can be accessed only if user is logged in. If user try to access them without login, they will be thrown `401-Unauthorized` exception.

### Rate Limiting

For now rate limiting ttl is 60s that is 1min and 20 request limit. You can update and test it from `src/config/configuration.ts` file. If there will more than 20 request in 1min, then it will throw `429-Too many requests` exception.

### Parking APIs

- `/api/park` : POST Request to add car in parking. Returns added car parking details. Return 400 if parking is full.
- `/api/unpark/:licensePlateNumber` : DELETE Request to remove car from parking. Returns removed car parking details. Throw 404 if car not found.
- `/api/slot/:slotNumber` : GET Request to get car parking detail on provided slot. Return 404 if car not found on provided slot.

### Testing

To run unit test run: `npm run test:watch --p parking` and
To run integration test run: `npm run test:e2e --p parking`
