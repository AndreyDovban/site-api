package link

import (
	"net/http"
	"site-api/pkg/request"
	"site-api/pkg/response"
	"time"
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

	router.HandleFunc("POST /links", handler.GetLinks())
	router.HandleFunc("GET /link/{hash}", handler.Download())

}

func (handler *LinkHandler) GetLinks() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := request.HandleBody[GetLinksRequest](&w, r)
		if err != nil {
			return
		}

		count, err := handler.LinkRepository.Count()
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		links, err := handler.LinkRepository.GetLinks(body.Limit, body.Offset, body.Columns)
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

func (handler *LinkHandler) Download() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		hash := r.PathValue("hash")

		link, err := handler.LinkRepository.FindByHash(hash)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		link.Count++

		if link.Valid == -1 {
			response.Json(w, "ссылка не действительна", http.StatusForbidden)
			return
		}

		if link.Count > 9 {
			link.Valid = -1
		}

		created := link.CreatedAt
		n := time.Now()
		def := int(n.Sub(created) / time.Minute)

		if def > 2880 {
			link.Valid = -1
			_, err = handler.LinkRepository.Update(hash, link)
			if err != nil {
				http.Error(w, err.Error(), http.StatusBadRequest)
				return
			}
		}

		_, err = handler.LinkRepository.Update(hash, link)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, "download file", http.StatusOK)
	}
}
