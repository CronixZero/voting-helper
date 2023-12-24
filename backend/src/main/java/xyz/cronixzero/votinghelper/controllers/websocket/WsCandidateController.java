package xyz.cronixzero.votinghelper.controllers.websocket;

import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;
import java.util.logging.Level;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import xyz.cronixzero.votinghelper.models.Candidate;
import xyz.cronixzero.votinghelper.models.messages.CandidateAddMessage;
import xyz.cronixzero.votinghelper.models.messages.CandidateEditMessage;
import xyz.cronixzero.votinghelper.models.messages.CandidateRemoveMessage;
import xyz.cronixzero.votinghelper.services.CandidateService;

@Controller
@MessageMapping("/candidates")
@Log
public class WsCandidateController {

  private final CandidateService candidateService;

  @Autowired
  public WsCandidateController(CandidateService candidateService) {
    this.candidateService = candidateService;
  }

  @MessageMapping("/add/{sessionId}")
  @SendTo("/topic/candidates/{sessionId}")
  public Collection<Candidate> addCandidate(@DestinationVariable String sessionId,
      CandidateAddMessage message) {
    Candidate candidate = new Candidate(
        message.candidateId().isPresent()
            ? UUID.fromString(message.candidateId().get())
            : UUID.randomUUID(),
        message.name(),
        message.firstName(),
        new ArrayList<>()
    );

    candidateService.addCandidate(sessionId, candidate);
    return candidateService.getCandidates(sessionId);
  }

  @MessageMapping("/remove/{sessionId}")
  @SendTo("/topic/candidates/{sessionId}")
  public Collection<Candidate> removeCandidate(@DestinationVariable String sessionId,
      CandidateRemoveMessage message) {
    candidateService.removeCandidateById(sessionId, message.candidateId());

    return candidateService.getCandidates(sessionId);
  }

  @MessageMapping("/edit/{sessionId}")
  @SendTo("/topic/candidates/{sessionId}")
  public Collection<Candidate> editCandidate(@DestinationVariable String sessionId,
      CandidateEditMessage message) {
    candidateService.editCandidate(sessionId, message.candidateId(), message.name(),
        message.firstName());

    return candidateService.getCandidates(sessionId);
  }
}
