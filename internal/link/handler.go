package link

import (
	"net/http"
	"site-api/pkg/request"
	"site-api/pkg/response"
	"strconv"

	"gorm.io/gorm"
)

type LinkHandlerDeps struct {
	LinkRepository *LinkRepository
}

type LinkHandler struct {
	LinkRepository *LinkRepository
}

func NewLinkHandler(router *http.ServeMux, deps *LinkHandlerDeps) {
	handler := &LinkHandler{
		LinkRepository: deps.LinkRepository,
	}
	router.HandleFunc("POST /link", handler.Create())
	router.HandleFunc("GET /link/{name}", handler.Read())
	router.HandleFunc("PATCH /link/{name}", handler.Update())
	router.HandleFunc("DELETE /link/{name}", handler.Delete())

	router.HandleFunc("GET /link", handler.GetProds())

}

func (handler *LinkHandler) Create() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := request.HandleBody[LinkCreateRequest](&w, r)
		if err != nil {
			return
		}

		link := NewLink(body.Name, body.Description)

		existedLink, _ := handler.LinkRepository.FindByName(link.Name)
		if existedLink != nil {
			http.Error(w, existedLink.Name+" is already exists", http.StatusBadRequest)
			return
		}

		for {
			existedLink, _ = handler.LinkRepository.FindByUid(link.Uid)
			if existedLink == nil {
				break
			}
			link.GenerateHash()
		}

		createdLink, err := handler.LinkRepository.Create(link)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, createdLink.Name+" success added", http.StatusOK)

	}
}

func (handler *LinkHandler) Read() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		name := r.PathValue("name")

		existedLink, err := handler.LinkRepository.FindByName(name)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, existedLink, http.StatusOK)
	}
}

func (handler *LinkHandler) Update() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := request.HandleBody[LinkUpdateRequest](&w, r)
		if err != nil {
			return
		}

		name := r.PathValue("name")

		_, err = handler.LinkRepository.FindByName(name)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		link, err := handler.LinkRepository.Update(name, &Link{
			Model:       gorm.Model{},
			Name:        body.Name,
			Description: body.Description,
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, link, http.StatusOK)
	}
}

func (handler *LinkHandler) Delete() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		name := r.PathValue("name")

		_, err := handler.LinkRepository.FindByName(name)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		_, err = handler.LinkRepository.Delete(name)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, name+" success deleted", http.StatusOK)
	}
}

func (handler *LinkHandler) GetProds() http.HandlerFunc {
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

		count, err := handler.LinkRepository.Count()
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		links, err := handler.LinkRepository.GetLinks(limit, offset, columns)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, &GetLinksResponse{
			Links: links,
			Count: count,
		}, http.StatusOK)
	}
}
