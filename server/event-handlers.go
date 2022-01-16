package main

import (
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/pascaldekloe/jwt"
)

var (
	familyCode                   = "secret_code"
	lastName                     = "family_name"
	httpSuccess                  = 200
	httpClientError              = 400
	httpServerError              = 500
	ErrTemplateGetFamily         = "Unexpected error retrieving a family"
	ErrTemplateGetFamilyEvents   = "SQL failure while retrieving events for family. Family id is: %d"
	ErrTemplateAddFamily         = "SQL failure while adding family. Family name is: %s"
	ErrTemplateAttendingCount    = "SQL failure while retrieving number attending. Event id is %s"
	ErrTemplateRSVPClient        = "Invalid operation! User tried to enter in attending number more than family members %s"
	ErrTemplateInvalidSecretCode = "Invalid Inputs - Secret Code for Validation"
	ErrTemplateInvalidFamilyName = "Invalid Inputs - Family Name for Validation"
	ErrTemplateInvalidFamilyID   = "Invalid Inputs - Family ID for Validation"
)

func (app *application) statusHandler(c *gin.Context) {
	currentStatus := AppStatus{
		Status:      "Available",
		Environment: app.config.env,
	}

	c.JSON(httpSuccess, gin.H{
		"Content-Type": "application/json",
		"message":      currentStatus,
	})
}

//getOneFamily will get the family information for one family
func (app *application) getOneFamily(c *gin.Context) {
	familyID, err := validateId(c.Params.ByName("family_id"))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"Content-Type": "application/json",
			"message":      ErrTemplateInvalidFamilyID,
			"error":        err,
		})
		return
	}
	app.logger.Printf("Id is: %d", familyID)

	family, err := app.models.DB.GetFamilies(familyID)
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"Content-Type": "application/json",
			"message":      ErrTemplateGetFamily,
			"error":        err,
		})
		return
	}

	c.JSON(httpSuccess, gin.H{
		"Content-Type": "application/json",
		"message":      family,
	})
	return
}

//validateFamily will validate the family information for one family against secret_code
func (app *application) validateFamily(c *gin.Context) {
	secretCode, err := validateSecretCode(c.Params.ByName(familyCode))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"Content-Type": "application/json",
			"valid":        false,
			"error":        ErrTemplateInvalidSecretCode,
		})
		return
	}

	familyName, err := validateFamilyName(c.Params.ByName(lastName))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"Content-Type": "application/json",
			"valid":        false,
			"error":        ErrTemplateInvalidFamilyName,
		})
		return
	}

	app.logger.Printf("secret-code is: %d", secretCode)
	app.logger.Printf("family-name is: %s", familyName)

	resp, err := app.models.DB.ValidateFamily(secretCode, familyName)
	if err != nil {
		app.logger.Printf("Unexpected error retrieving a family %v", err)
		c.JSON(httpServerError, gin.H{
			"Content-Type": "application/json",
			"valid":        false,
			"error":        ErrTemplateGetFamily,
		})
		return
	}

	var claims jwt.Claims
	claims.Subject = fmt.Sprint(familyName)
	claims.Issued = jwt.NewNumericTime(time.Now())
	claims.NotBefore = jwt.NewNumericTime(time.Now())
	claims.Expires = jwt.NewNumericTime(time.Now().Add(24 * time.Hour))
	claims.Issuer = "luvandkrishi.com"
	claims.Audiences = []string{"luvandkrishi.com"}

	jwtBytes, err := claims.HMACSign(jwt.HS256, []byte(app.config.jwt.secret))
	if err != nil {
		app.logger.Printf("Error signing request %v", err)
		c.JSON(httpServerError, gin.H{
			"Content-Type": "application/json",
			"valid":        false,
			"error":        "Error signing request",
		})
	}

	c.JSON(httpSuccess, gin.H{
		"Content-Type": "application/json",
		"response":     jwtBytes,
		"familyID":     resp.FamilyID,
		"valid":        resp.Exists,
	})
	return
}

//getOneEvent will get the event information for one event
func (app *application) getOneEvent(c *gin.Context) {
	//TODO: luv add validation
	id, err := validateId(c.Params.ByName("id"))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"Content-Type": "application/json",
			"message":      err.Error(),
		})
		return
	}
	app.logger.Printf("Id is: %d", id)

	event, err := app.models.DB.GetEvents(id)
	if err != nil {
		app.logger.Printf("Unexpected error retrieving a event %s", err)
		c.JSON(httpServerError, gin.H{
			"Content-Type": "application/json",
			"message":      err.Error(),
		})
		return
	}

	c.JSON(httpSuccess, gin.H{
		"Content-Type": "application/json",
		"message":      event,
	})
	return
}

//getEventsForFamily will get the event details that a family is invited for
func (app *application) getEventsForFamily(c *gin.Context) {
	familyID, err := validateId(c.Params.ByName("family_id"))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"Content-Type": "application/json",
			"message":      "Invalid family id",
			"error":        err.Error(),
		})
		return
	}
	app.logger.Printf("Family ID is: %d", familyID)

	familyEvents, err := app.models.DB.GetEventsForFamily(familyID)
	if err != nil {
		app.logger.Printf("Something went wrong with sql query to get events for family %s", err)
		c.JSON(httpServerError, gin.H{
			"Content-Type": "application/json",
			"message":      fmt.Sprintf(ErrTemplateGetFamilyEvents, familyID),
		})
		return
	}

	c.JSON(httpSuccess, gin.H{
		"Content-Type": "application/json",
		"message":      familyEvents,
	})
	return
}

func (app *application) getAttendingForEvent(c *gin.Context) {
	eventID, err := validateId(c.Params.ByName("event_id"))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"Content-Type": "application/json",
			"message":      "Invalid event id",
			"error":        err.Error(),
		})
		return
	}
	app.logger.Printf("EventID is: %d", eventID)

	attending, err := app.models.DB.GetAttendingForEvent(eventID)
	if err != nil {
		app.logger.Printf("Something went wrong with sql query to get attending families %s", err)
		c.JSON(httpServerError, gin.H{
			"Content-Type": "application/json",
			"message":      fmt.Sprintf(ErrTemplateAttendingCount, eventID),
			"error":        err.Error(),
		})
		return
	}

	c.JSON(httpSuccess, gin.H{
		"Content-Type": "application/json",
		"message":      attending,
	})
	return
}

//rsvpToEvent will put information for how many people are attending from a family
func (app *application) rsvpToEvent(c *gin.Context) {
	//TODO: luv add validation
	familyID, err := validateId(c.Params.ByName("family_id"))
	if err != nil {
		c.JSON(httpServerError, gin.H{
			"Content-Type": "application/json",
			"message":      "The family ID sent in is messed up. Should not appear",
			"error":        err.Error(),
		})
		return
	}
	eventID, err := validateId(c.Params.ByName("event_id"))
	if err != nil {
		c.JSON(httpServerError, gin.H{
			"Content-Type": "application/json",
			"message":      "The event ID sent in is messed up. Should not appear",
			"error":        err.Error(),
		})
		return
	}
	attending, err := validateAttending(c.Params.ByName("attending"))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"Content-Type": "application/json",
			"message":      "Hi family! The number of people attending seems to be incorrectly inputted with at least one of the events in your family. Remember, ths is total people in party. Try again!",
			"error":        err.Error(),
		})
		return
	}

	attendingChildren, err := validateAttending(c.Params.ByName("attending_children"))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"Content-Type": "application/json",
			"message":      "Hi family! The number of children attending seems to be incorrectly inputted with at least one of the events in your family. Try again!",
			"error":        err.Error(),
		})
		return
	}

	// There shouldn't be more children than number attending
	if attendingChildren > attending {
		c.JSON(httpClientError, gin.H{
			"Content-Type": "application/json",
			"message":      "Hi! It seems that you've entered in more children than adults in your party for one of the events! If this is true, please contact us @luvandkrishi@gmail.com",
			"error":        "User is being silly!",
		})
		return
	}

	//check attending vs number of members
	family, err := app.models.DB.GetFamilies(familyID)
	if err != nil {
		c.JSON(httpServerError, gin.H{
			"Content-Type": "application/json",
			"message":      "The familyID sent in is messed up to look up number attending. Should not appear",
			"error":        err.Error(),
		})
		return
	}
	if (attending+attendingChildren > family.Members) || (attending > family.Members) {
		c.JSON(httpClientError, gin.H{
			"Content-Type": "application/json",
			"message":      "Hi! It seems that you've entered in more people than we have listed in your party! If this is true, and you are bringing someone that we may not have accounted for, please contact us @luvandkrishi@gmail.com",
			"error":        "User is bringing more people than they should",
		})
		return
	}

	app.logger.Printf("Family %d will have %d total people and %d children attending %d event id", familyID, attending, attendingChildren, eventID)

	_, err = app.models.DB.RsvpToEvent(familyID, eventID, attending, attendingChildren)
	if err != nil {
		app.logger.Printf("Something went wrong with sql query to put rsvp %s", err)
		app.logger.Printf("Family id is %v \n", familyID)
		app.logger.Printf("Event id is %v \n", eventID)
		app.logger.Printf("Number attending is %v \n", attending)
		app.logger.Printf("Number of children attending is %v \n", attendingChildren)

		c.JSON(httpServerError, gin.H{
			"Content-Type": "application/json",
			"message":      fmt.Sprintf(ErrTemplateAttendingCount, eventID),
		})
	}

	c.JSON(httpSuccess, gin.H{
		"Content-Type": "application/json",
		"message":      true,
	})
}

func (app *application) declineEvents(c *gin.Context) {
	familyID, err := validateId(c.Params.ByName("family_id"))
	if err != nil {
		c.JSON(httpClientError, gin.H{
			"Content-Type": "application/json",
			"message":      "Invalid family id",
			"error":        err.Error(),
		})
		return
	}
	app.logger.Printf("Family ID is: %d", familyID)
	app.logger.Printf("Declining all events")

	eventsAffected, err := app.models.DB.DeclineAllEvents(familyID, -1)
	if err != nil {
		app.logger.Printf("Something went wrong with sql query to update declination for family_id: %d %s", familyID, err)
		c.JSON(httpServerError, gin.H{
			"Content-Type": "application/json",
			"message":      fmt.Sprintf(ErrTemplateGetFamilyEvents, familyID),
		})
		return
	}
	app.logger.Printf("Updated declination for family id: %d for: %d events.", familyID, eventsAffected)
	c.JSON(httpSuccess, gin.H{
		"Content-Type": "application/json",
		"message":      eventsAffected,
	})
	return
}

// func (app *application) addFamily(c *gin.Context) {
// 	familyName, err := validateFamilyName(c.Params.ByName("family_name"))
// 	if err != nil {
// 		c.JSON(httpClientError, gin.H{
// 			"Content-Type": "application/json",
// 			"message":      "Invalid family name",
// 			"error":        err.Error(),
// 		})
// 		return
// 	}
// 	attending, err := validateAttending(c.Params.ByName("attending"))
// 	if err != nil {
// 		c.JSON(httpClientError, gin.H{
// 			"Content-Type": "application/json",
// 			"message":      "Invalid number of attending",
// 			"error":        err.Error(),
// 		})
// 	}

// 	_, err = app.models.DB.RsvpToEvent(familyID, eventID, attending)

// 	if err != nil {
// 		app.logger.Printf("Something went wrong with sql query to add family %s", err)
// 		app.logger.Printf("Family name is %s \n", familyName)
// 		app.logger.Printf("Number attending in family is %v \n", attending)

// 		c.JSON(httpServerError, gin.H{
// 			"Content-Type": "application/json",
// 			"message":      fmt.Sprintf(ErrTemplateAddFamily, familyName),
// 		})
// 	}

// 	c.JSON(httpSuccess, gin.H{
// 		"Content-Type": "application/json",
// 		"message":      true,
// 	})
// }
