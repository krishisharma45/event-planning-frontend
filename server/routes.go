package main

import "github.com/gin-gonic/gin"

func (app *application) routes() *gin.Engine {
	r := gin.Default()
	r.GET("/status", app.statusHandler)
	r.GET("/v1/movie/:id", app.getOneMovie)

	r.Run("localhost:8080")

	return r
}
