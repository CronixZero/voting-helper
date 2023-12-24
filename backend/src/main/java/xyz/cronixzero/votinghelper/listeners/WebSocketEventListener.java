package xyz.cronixzero.votinghelper.listeners;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import xyz.cronixzero.votinghelper.services.CandidateService;
import xyz.cronixzero.votinghelper.services.SessionService;

@Component
public class WebSocketEventListener {

  private final SessionService sessionService;
  private final CandidateService candidateService;

  @Autowired
  public WebSocketEventListener(SessionService sessionService, CandidateService candidateService) {
    this.sessionService = sessionService;
    this.candidateService = candidateService;
  }

  @EventListener
  private void handleSessionConnected(SessionConnectedEvent event) {

  }

}
