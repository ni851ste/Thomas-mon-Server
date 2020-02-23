package actors;

import akka.actor.AbstractActor;
import akka.actor.ActorRef;
import akka.actor.Props;

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
            case "test":
                return "test";
            case "home":
                return "home";
            case "game":
                return "game";
            case "jaronthekid":
                return "jaronthekid";
            case "gamepicker":
                return "gamepicker";
            default:
                return "unknown command";
        }
    }
}