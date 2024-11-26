package client

import (
	"net/http"
	"site-api/pkg/request"
	"site-api/pkg/response"
	"strconv"

	"gorm.io/gorm"
)

type ClientHandlerDeps struct {
	ClientRepository *ClientRepository
}

type ClientHandler struct {
	ClientRepository *ClientRepository
}

func NewClientHandler(router *http.ServeMux, deps *ClientHandlerDeps) {
	handler := &ClientHandler{
		ClientRepository: deps.ClientRepository,
	}
	router.HandleFunc("POST /client", handler.Create())
	router.HandleFunc("GET /client/{name}", handler.Read())
	router.HandleFunc("PATCH /client/{name}", handler.Update())
	router.HandleFunc("DELETE /client/{name}", handler.Delete())

	router.HandleFunc("GET /client", handler.GetProds())

}

func (handler *ClientHandler) Create() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := request.HandleBody[ClientCreateRequest](&w, r)
		if err != nil {
			return
		}

		client := NewProduct(body.Name, body.Description)

		existedClient, _ := handler.ClientRepository.FindByName(client.Name)
		if existedClient != nil {
			http.Error(w, existedClient.Name+" is already exists", http.StatusBadRequest)
			return
		}

		for {
			existedClient, _ = handler.ClientRepository.FindByUid(client.Uid)
			if existedClient == nil {
				break
			}
			client.GenerateHash()
		}

		createdClient, err := handler.ClientRepository.Create(client)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, createdClient.Name+" success added", http.StatusOK)

	}
}

func (handler *ClientHandler) Read() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		name := r.PathValue("name")

		existedClient, err := handler.ClientRepository.FindByName(name)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, existedClient, http.StatusOK)
	}
}

func (handler *ClientHandler) Update() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := request.HandleBody[ClientUpdateRequest](&w, r)
		if err != nil {
			return
		}

		name := r.PathValue("name")

		_, err = handler.ClientRepository.FindByName(name)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		client, err := handler.ClientRepository.Update(name, &Client{
			Model:       gorm.Model{},
			Name:        body.Name,
			Description: body.Description,
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, client, http.StatusOK)
	}
}

func (handler *ClientHandler) Delete() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		name := r.PathValue("name")

		_, err := handler.ClientRepository.FindByName(name)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		_, err = handler.ClientRepository.Delete(name)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, name+" success deleted", http.StatusOK)
	}
}

func (handler *ClientHandler) GetProds() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		limit, err := strconv.Atoi(r.URL.Query().Get("limit"))
		if err != nil {
			http.Error(w, "invalid limit", http.StatusBadRequest)
			return
		}
		offset, err := strconv.Atoi(r.URL.Query().Get("offset"))
		if err != nil {
			http.Error(w, "invalid offset", http.StatusBadRequest)
			return
		}

		columns := r.URL.Query().Get("columns")

		count, err := handler.ClientRepository.Count()
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		clients, err := handler.ClientRepository.GetClients(limit, offset, columns)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, &GetClientsResponse{
			Clients: clients,
			Count:   count,
		}, http.StatusOK)
	}
}
