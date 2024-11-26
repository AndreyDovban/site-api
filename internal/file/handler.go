package file

import (
	"net/http"
	"site-api/pkg/request"
	"site-api/pkg/response"
	"strconv"

	"gorm.io/gorm"
)

type FileHandlerDeps struct {
	FileRepository *FileRepository
}

type FileHandler struct {
	FileRepository *FileRepository
}

func NewFileHandler(router *http.ServeMux, deps *FileHandlerDeps) {
	handler := &FileHandler{
		FileRepository: deps.FileRepository,
	}
	router.HandleFunc("POST /file", handler.Create())
	router.HandleFunc("GET /file/{name}", handler.Read())
	router.HandleFunc("PATCH /file/{name}", handler.Update())
	router.HandleFunc("DELETE /file/{name}", handler.Delete())

	router.HandleFunc("GET /file", handler.GetProds())

}

func (handler *FileHandler) Create() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := request.HandleBody[FileCreateRequest](&w, r)
		if err != nil {
			return
		}

		file := NewFile(body.Name, body.Description)

		existedProd, _ := handler.FileRepository.FindByName(file.Name)
		if existedProd != nil {
			http.Error(w, existedProd.Name+" is already exists", http.StatusBadRequest)
			return
		}

		for {
			existedProd, _ = handler.FileRepository.FindByUid(file.Uid)
			if existedProd == nil {
				break
			}
			file.GenerateHash()
		}

		createdFile, err := handler.FileRepository.Create(file)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, createdFile.Name+" success added", http.StatusOK)

	}
}

func (handler *FileHandler) Read() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		name := r.PathValue("name")

		existedFile, err := handler.FileRepository.FindByName(name)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, existedFile, http.StatusOK)
	}
}

func (handler *FileHandler) Update() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := request.HandleBody[FileUpdateRequest](&w, r)
		if err != nil {
			return
		}

		name := r.PathValue("name")

		_, err = handler.FileRepository.FindByName(name)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		file, err := handler.FileRepository.Update(name, &File{
			Model:       gorm.Model{},
			Name:        body.Name,
			Description: body.Description,
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, file, http.StatusOK)
	}
}

func (handler *FileHandler) Delete() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		name := r.PathValue("name")

		_, err := handler.FileRepository.FindByName(name)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		_, err = handler.FileRepository.Delete(name)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, name+" success deleted", http.StatusOK)
	}
}

func (handler *FileHandler) GetProds() http.HandlerFunc {
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

		count, err := handler.FileRepository.Count()
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		files, err := handler.FileRepository.GetProds(limit, offset, columns)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, &GetFilesResponse{
			Files: files,
			Count: count,
		}, http.StatusOK)
	}
}
