package client

import (
	"fmt"
	"net/http"
	"site-api/pkg/request"
	"site-api/pkg/response"

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
	router.HandleFunc("POST /api/client", handler.Create())
	router.HandleFunc("GET /api/client/{name}", handler.Read())
	router.HandleFunc("PATCH /api/client/{name}", handler.Update())
	router.HandleFunc("DELETE /api/client/{name}", handler.Delete())

	router.HandleFunc("POST /api/clients", handler.GetClients())

}

func (handler *ClientHandler) Create() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := request.HandleBody[ClientCreateRequest](&w, r)
		if err != nil {
			return
		}

		client := NewClient(body.Name, body.Telephone, body.Mail, body.Company)

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

		createdClient, err := handler.ClientRepository.Create(body.Name, body.Telephone, body.Mail, body.Company)
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

		fmt.Println(existedClient.CreatedAt.Format("02.01.2006/04:04:03"))

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
			Model:     gorm.Model{},
			Name:      body.Name,
			Telephone: body.Telephone,
			Mail:      body.Mail,
			Company:   body.Company,
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

func (handler *ClientHandler) GetClients() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := request.HandleBody[GetClientsRequest](&w, r)
		if err != nil {
			return
		}

		count, err := handler.ClientRepository.Count()
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		clients, err := handler.ClientRepository.GetClients(body.Limit, body.Offset, body.Columns)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, &GetClientsResponse{
			Columns: []string{"name", "telephone", "mail", "company", "created_at", "updated_at"},
			Data:    clients,
			Count:   count,
		}, http.StatusOK)
	}
}
