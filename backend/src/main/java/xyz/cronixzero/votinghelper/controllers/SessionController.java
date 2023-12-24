package xyz.cronixzero.votinghelper.controllers;

import java.util.Optional;
import java.util.logging.Level;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import xyz.cronixzero.votinghelper.exceptions.SessionDuplicateException;
import xyz.cronixzero.votinghelper.models.Candidate;
import xyz.cronixzero.votinghelper.models.dto.SessionCreateDto;
import xyz.cronixzero.votinghelper.services.CandidateService;
import xyz.cronixzero.votinghelper.services.SessionService;

@RestController()
@RequestMapping("/api/sessions")
@CrossOrigin(originPatterns = "*")
@Log
public class SessionController {

  private final SessionService sessionService;
  private final CandidateService candidateService;

  @Autowired
  public SessionController(SessionService sessionService, CandidateService candidateService) {
    this.sessionService = sessionService;
    this.candidateService = candidateService;
  }

  @PostMapping("/create/{sessionId}")
  public ResponseEntity<Void> createSession(@PathVariable String sessionId,
      @RequestBody Optional<SessionCreateDto> createDto) {
    try {
      sessionService.createSession(sessionId);
    } catch (SessionDuplicateException e) {
      return ResponseEntity.status(409).build();
    }

    if (createDto.isEmpty()) {
      return ResponseEntity.ok().build();
    }

    for (Candidate candidate : createDto.get().initialState()) {
      candidateService.addCandidate(sessionId, candidate);
    }

    return ResponseEntity.ok().build();
  }
}
