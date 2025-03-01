package file

import (
	"fmt"
	"net/http"
	"site-api/pkg/request"
	"site-api/pkg/response"

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
	router.HandleFunc("GET /file/{uid}", handler.Read())
	router.HandleFunc("PATCH /file/{uid}", handler.Update())
	router.HandleFunc("DELETE /file/{uid}", handler.Delete())

	router.HandleFunc("POST /files", handler.GetFiles())

}

func (handler *FileHandler) Create() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := request.HandleBody[FileCreateRequest](&w, r)
		if err != nil {
			return
		}

		file := NewFile(body.Name, body.Description, body.ProductUid)

		existedFile, _ := handler.FileRepository.FindByName(file.Name)
		if existedFile != nil {
			http.Error(w, existedFile.Name+" is already exists", http.StatusBadRequest)
			return
		}

		for {
			existedFile, _ = handler.FileRepository.FindByUid(file.Uid)
			if existedFile == nil {
				break
			}
			file.GenerateHash()
		}

		fmt.Println("!", file.ProductUid)
		createdFile, err := handler.FileRepository.Create(file)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, createdFile, http.StatusOK)

	}
}

func (handler *FileHandler) Read() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		uid := r.PathValue("uid")

		existedFile, err := handler.FileRepository.FindByUid(uid)
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

		uid := r.PathValue("uid")

		_, err = handler.FileRepository.FindByUid(uid)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		file, err := handler.FileRepository.Update(uid, &File{
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
		uid := r.PathValue("uid")

		_, err := handler.FileRepository.FindByUid(uid)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		_, err = handler.FileRepository.Delete(uid)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, uid+" success deleted", http.StatusOK)
	}
}

func (handler *FileHandler) GetFiles() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := request.HandleBody[GetFilesRequest](&w, r)
		if err != nil {
			return
		}

		count, err := handler.FileRepository.Count()
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		files, err := handler.FileRepository.GetFiles(body.Limit, body.Offset, body.Columns)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, &GetFilesResponse{
			Columns: []string{"uid", "name", "description", "product_name", "product_description", "product_uid", "created_at", "updated_at"},
			Data:    files,
			Count:   count,
		}, http.StatusOK)
	}
}
