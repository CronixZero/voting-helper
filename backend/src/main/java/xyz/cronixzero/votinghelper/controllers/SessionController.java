package xyz.cronixzero.votinghelper.controllers;

import java.util.Collection;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xyz.cronixzero.votinghelper.models.Candidate;
import xyz.cronixzero.votinghelper.models.dto.SessionCreateDto;
import xyz.cronixzero.votinghelper.services.CandidateService;
import xyz.cronixzero.votinghelper.services.SessionService;

@RestController()
@RequestMapping("/api/sessions")
public class SessionController {

  private final SessionService sessionService;
  private final CandidateService candidateService;

  @Autowired
  public SessionController(SessionService sessionService, CandidateService candidateService) {
    this.sessionService = sessionService;
    this.candidateService = candidateService;
  }

  @PostMapping("/create")
  public void createSession(@RequestBody SessionCreateDto createDto) {
    String sessionName = createDto.sessionName();
    Optional<Collection<Candidate>> initialState = createDto.initialState();

    sessionService.createSession(sessionName);

    if (initialState.isEmpty()) {
      return;
    }

    for (Candidate candidate : initialState.get()) {
      candidateService.addCandidate(sessionName, candidate);
    }
  }
}
