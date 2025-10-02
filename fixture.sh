# --- Inscription ---
# echo "--- Inscription ---"
# curl -X POST http://localhost:8080/api/v1/auth/register -H "Content-Type: application/json" -d '{
#   "firstName": "test",
#   "lastName": "Dev",
#   "email": "test.dev@example.com",
#   "password": "password123"
# }'


# --- Connexion ---
echo "--- Connexion ---"
TOKEN=$(curl -s -X POST http://localhost:8080/api/v1/auth/login -H "Content-Type: application/json" -d '{
  "email": "test.dev@example.com",
  "password": "password123"
}' | jq -r .token)

echo "Token: $TOKEN"

echo "--- boards ---"
curl -s -X POST http://localhost:8080/api/v1/boards \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
  "name": "test1",
  "description": "description_test1" 
}'

curl -s -X POST http://localhost:8080/api/v1/boards \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
  "name": "test2",
  "description": "description_test1" 
}'

echo "--- Liste ---"
LIST_ID=$(curl -s -X POST http://localhost:8080/api/v1/boards/1/lists \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
  "name": "Liste des choses à faire"
}' | jq .id)

echo "List ID: $LIST_ID"

echo "--- Liste ---"
curl -s -X POST http://localhost:8080/api/v1/boards/1/lists \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
  "name": "Done"
}'

# curl -s -X GET http://localhost:8080/api/v1/boards?userId=1 \
# -H "Content-Type: application/json" \
# -H "Authorization: Bearer $TOKEN" \

# # --- Modification Liste ---
# curl -X PUT http://localhost:8080/api/v1/list/$LIST_ID \
# -H "Content-Type: application/json" \
# -H "Authorization: Bearer $TOKEN" \
# -d '{
#   "name": "Liste des choses URGENTES à faire"
# }'

echo "--- Tâche ---"
curl -X POST http://localhost:8080/api/v1/task \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
  "name": "Finir le projet Kanban",
  "description": "Rédiger le README et le rapport de veille.",
  "list": {
    "id": '$LIST_ID'
  },
  "status": "IN_PROGRESS",
}'

# # --- Liste ---
# echo "--- Suppression de la liste ---"
# curl -X DELETE http://localhost:8080/api/v1/list/$LIST_ID \
# -H "Authorization: Bearer $TOKEN"

# curl -X GET http://localhost:8080/api/v1/users/me \
# -H "Content-Type: application/json" \
# -H "Authorization: Bearer $TOKEN" \