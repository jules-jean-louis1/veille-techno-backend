```
curl -X POST http://localhost:8080/api/v1/auth/register \
-H "Content-Type: application/json" \
-d '{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

## Start :

```

./api/kanban/mvnw spring-boot:run -f ./api/kanban/pom.xml
```


```
http://localhost:8080/swagger-ui/index.html#/
```
