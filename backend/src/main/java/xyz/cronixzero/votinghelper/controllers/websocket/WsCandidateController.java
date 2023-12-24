package xyz.cronixzero.votinghelper.controllers.websocket;

import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import xyz.cronixzero.votinghelper.models.Candidate;
import xyz.cronixzero.votinghelper.models.messages.CandidateAddMessage;
import xyz.cronixzero.votinghelper.models.messages.CandidateEditMessage;
import xyz.cronixzero.votinghelper.models.messages.CandidateRemoveMessage;
import xyz.cronixzero.votinghelper.services.CandidateService;

@Controller
@MessageMapping("/candidates")
public class WsCandidateController {

  private final CandidateService candidateService;

  @Autowired
  public WsCandidateController(CandidateService candidateService) {
    this.candidateService = candidateService;
  }

  @MessageMapping("/add")
  @SendTo("/topic/candidates")
  public Collection<Candidate> addCandidate(CandidateAddMessage message) {
    Candidate candidate = new Candidate(UUID.randomUUID(),
        message.name(), message.firstName(), new ArrayList<>());

    candidateService.addCandidate(message.session(), candidate);
    return candidateService.getCandidates(message.session());
  }

  @MessageMapping("/remove")
  @SendTo("/topic/candidates")
  public Collection<Candidate> removeCandidate(CandidateRemoveMessage message) {
    candidateService.removeCandidateById(message.session(), message.candidateId());

    return candidateService.getCandidates(message.session());
  }

  @MessageMapping("/edit")
  @SendTo("/topic/candidates")
  public Collection<Candidate> editCandidate(CandidateEditMessage message) {
    candidateService.editCandidate(message.session(), message.candidateId(), message.name(),
        message.firstName());

    return candidateService.getCandidates(message.session());
  }
}
