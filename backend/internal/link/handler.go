package link

import (
	"net/http"
	"os"
	"site-api/pkg/request"
	"site-api/pkg/response"
)

type LinkHandlerDeps struct {
	LinkRepository *LinkRepository
	LinkService    *LinkService
}

type LinkHandler struct {
	LinkRepository *LinkRepository
	LinkService    *LinkService
}

func NewLinkHandler(router *http.ServeMux, deps *LinkHandlerDeps) {
	handler := &LinkHandler{
		LinkRepository: deps.LinkRepository,
		LinkService:    deps.LinkService,
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
			Columns: []string{"uid", "hash", "valid", "count", "product_name", "file_name", "client_name", "created_at", "updated_at"},
			Data:    links,
			Count:   count,
		}, http.StatusOK)
	}
}

func (handler *LinkHandler) Download() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		hash := r.PathValue("hash")

		path, name, err := handler.LinkService.Download(hash)
		if err != nil {
			status := http.StatusBadRequest
			if err.Error() == "ссылка не действительна" {
				status = http.StatusForbidden
			}
			http.Error(w, err.Error(), status)
			return
		}

		fileByte, err := os.ReadFile(path)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadGateway)

		}

		w.Header().Set("File-Name", name)
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(fileByte))

	}
}
