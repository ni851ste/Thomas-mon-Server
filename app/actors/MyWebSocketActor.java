package actors;

import akka.actor.AbstractActor;
import akka.actor.ActorRef;
import akka.actor.Props;
import controllers.HomeController;

import java.util.Arrays;

public class MyWebSocketActor extends AbstractActor
{

    public static Props props(ActorRef out)
    {
        return Props.create(MyWebSocketActor.class, out);
    }

    private final ActorRef out;

    public MyWebSocketActor(ActorRef out)
    {
        this.out = out;
    }

    @Override
    public Receive createReceive()
    {
        return receiveBuilder()
                .match(String.class, message -> {
                    System.out.println(message);
                    out.tell(processInput(message), self());
                })
                .build();
    }

    private String processInput(String message)
    {
        switch (message)
        {
            case "game":
                return HomeController.controller.toJson();
            default:
                return "unknown command";
        }
    }
}