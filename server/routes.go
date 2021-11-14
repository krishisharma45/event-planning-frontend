package main

import "github.com/gin-gonic/gin"

func (app *application) routes() *gin.Engine {
	r := gin.Default()
	r.GET("/status", app.statusHandler)
	r.GET("/v1/family/:id", app.getOneFamily)
	r.GET("/v1/event/:id", app.getOneEvent)
	r.GET("/v1/family/events/:id", app.getEventsForFamily)

	r.Run("localhost:8080")

	return r
}
