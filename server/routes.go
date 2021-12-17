package main

import (
	"github.com/gin-gonic/gin"
)

func (app *application) routes() *gin.Engine {
	r := gin.Default()

	// corsConfig := cors.DefaultConfig()

	// To be able to send tokens to the server.

	// OPTIONS method for ReactJS
	// corsConfig.AddAllowMethods("OPTIONS")
	// corsConfig.AddAllowHeaders(true)
	// corsConfig.AddAllowHeaders()

	r.Use(app.enableCORS(r))
	r.GET("/status", app.statusHandler)
	r.GET("/v1/family/:family_id", app.getOneFamily)
	r.GET("/v1/validate/:secret_code/:family_name", app.validateFamily)
	r.GET("/v1/event/:id", app.getOneEvent)
<<<<<<< Updated upstream
	r.GET("/v1/family/events/:family_id", app.getEventsForFamily)
=======
	r.GET("/v1/family/events/:id", app.getEventsForFamily)

>>>>>>> Stashed changes
	r.PUT("/v1/family/events/:family_id/:event_id/:attending", app.rsvpToEvent)
	// back end querying urls
	r.GET("/v1/count/events/:event_id", app.getAttendingForEvent)
	// r.PUT("/v1/family/:family_name/:members", app.addFamily)

	// back end querying urls
	r.GET("/v1/count/events/:event_id", app.getAttendingForEvent)

	r.NoRoute(func(c *gin.Context) {
		c.JSON(400, gin.H{"code": "PAGE_NOT_FOUND", "message": "Hmm, hi friend. I think you're trying to access something not available :)"})
	})

	r.Run("0.0.0.0:8080")

	return r
}
