package controllers;

import de.knxamk.util.factories.StageFactory;
import play.mvc.*;
import de.knxamk.controller.BackendController;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class HomeController extends Controller {

    BackendController controller = new BackendController(new StageFactory().createTestStages()[1]);


    /**
     * An action that renders an HTML page with a welcome message.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>/</code>.
     */
    public Result index() {
        return ok(views.html.index.render(controller.toJson()));
    }

}
