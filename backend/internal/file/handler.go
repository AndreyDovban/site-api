package file

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"site-api/configs"
	"site-api/pkg/request"
	"site-api/pkg/response"

	"gorm.io/gorm"
)

type FileHandlerDeps struct {
	FileRepository *FileRepository
	Config         *configs.Config
}

type FileHandler struct {
	FileRepository *FileRepository
	Config         *configs.Config
}

func NewFileHandler(router *http.ServeMux, deps *FileHandlerDeps) {
	handler := &FileHandler{
		FileRepository: deps.FileRepository,
		Config:         deps.Config,
	}
	router.HandleFunc("POST /api/file", handler.Create())
	router.HandleFunc("GET /api/file/{uid}", handler.Read())
	router.HandleFunc("PATCH /api/file/{uid}", handler.Update())
	router.HandleFunc("DELETE /api/file/{uid}", handler.Delete())

	router.HandleFunc("POST /api/files", handler.GetFiles())

}

func (handler *FileHandler) Create() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		if err := r.ParseMultipartForm(1024); err != nil {
			fmt.Println(w, "Ошибка анализа multipart формы: %v", err)
			return
		}

		fileM, _, err := r.FormFile("file")
		if err != nil {
			fmt.Println(w, "Не удалось получить файл: %v", err)
			return
		}
		defer fileM.Close()

		name := r.FormValue("name")
		description := r.FormValue("description")
		product_uid := r.FormValue("product_uid")

		data, err := io.ReadAll(fileM)
		if err != nil {
			fmt.Fprintf(w, "Error reading data from file: %v\n", err)
			return
		}

		f, err := os.Create(handler.Config.Db.FilesFolder + "/" + name)
		if err != nil {
			log.Fatal(err)
		}
		defer f.Close()

		f.Write(data)

		file := NewFile(name, description, product_uid)

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

		response.Json(w, createdFile.Name+" has been added successfully", http.StatusOK)

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
		uid := r.PathValue("uid")

		oldFile, err := handler.FileRepository.FindByUid(uid)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		name := r.FormValue("name")
		description := r.FormValue("description")

		if err := r.ParseMultipartForm(1024); err != nil {
			fmt.Println(w, "Ошибка анализа multipart формы: %v", err)
			return
		}

		r.Form.Get("file")

		fileM, _, err := r.FormFile("file")
		if err != nil {
			fmt.Println(w, "Не удалось получить файл: %v", err)
			err := os.Rename(handler.Config.Db.FilesFolder+"/"+oldFile.Name, handler.Config.Db.FilesFolder+"/"+name)

			if err != nil {
				fmt.Println(err)
				return
			}
		} else {
			defer fileM.Close()

			err := os.Remove(handler.Config.Db.FilesFolder + "/" + oldFile.Name)

			if err != nil {
				fmt.Println(err)
				return
			}
			data, err := io.ReadAll(fileM)
			if err != nil {
				fmt.Fprintf(w, "Error reading data from file: %v\n", err)
				return
			}

			f, err := os.Create(handler.Config.Db.FilesFolder + "/" + name)
			if err != nil {
				log.Fatal(err)
			}
			defer f.Close()

			f.Write(data)
		}

		_, err = handler.FileRepository.Update(uid, &File{
			Model:       gorm.Model{},
			Name:        name,
			Description: description,
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, oldFile.Name+" has been modified", http.StatusOK)
	}
}

func (handler *FileHandler) Delete() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		uid := r.PathValue("uid")

		file, err := handler.FileRepository.FindByUid(uid)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		err = os.Remove(handler.Config.Db.FilesFolder + "/" + file.Name)
		if err != nil {
			fmt.Println(err)
		}

		err = handler.FileRepository.Delete(uid)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		response.Json(w, "The File has been successfully removed", http.StatusOK)
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
