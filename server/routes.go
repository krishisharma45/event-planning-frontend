package main

import "github.com/gin-gonic/gin"

func (app *application) routes() *gin.Engine {
	r := gin.Default()
	r.GET("/status", app.statusHandler)
	r.GET("/v1/family/:id", app.getOneFamily)
	r.GET("/v1/validate/:secret_code/:family_name", app.validateFamily)
	r.GET("/v1/event/:id", app.getOneEvent)
	r.GET("/v1/family/events/:id", app.getEventsForFamily)
	//r.GET("/v1/family/events/:event_id", app.getAttendingForEvent)

	r.PUT("/v1/family/events/:family_id/:event_id/:attending", app.rsvpToEvent)

	r.NoRoute(func(c *gin.Context) {
		c.JSON(400, gin.H{"code": "PAGE_NOT_FOUND", "message": "Hmm, hi friend. I think you're trying to access something not available :)"})
	})

	r.Run("0.0.0.0:8080")

	return r
}
