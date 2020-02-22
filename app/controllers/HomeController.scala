package controllers

import de.knxamk.controller.Controller
import de.knxamk.util.factories.StageFactory
import javax.inject._
import play.api.mvc._

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

    val controller: Controller = new Controller(new StageFactory().createTestStages()(1))

    /**
     * Create an Action to render an HTML page.
     *
     * The configuration in the `routes` file means that this method
     * will be called when the application receives a `GET` request with
     * a path of `/`.
     */
    def index() = Action { implicit request: Request[AnyContent] =>
        Ok(views.html.index(getGameString()))
    }

    def getGameString(): String = {
        controller.toJson
    }

}
