package xyz.cronixzero.votinghelper.controllers;

import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import xyz.cronixzero.votinghelper.models.Candidate;
import xyz.cronixzero.votinghelper.services.CandidateService;

@RestController
@RequestMapping("/api/candidates")
@CrossOrigin(originPatterns = "*")
public class CandidateController {

  private final CandidateService candidateService;

  @Autowired
  public CandidateController(CandidateService candidateService) {
    this.candidateService = candidateService;
  }

  @GetMapping("/{sessionId}")
  public ResponseEntity<Collection<Candidate>> getCandidates(@PathVariable String sessionId) {
    try {
      return ResponseEntity.ok(candidateService.getCandidates(sessionId));
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().build();
    }
  }
}
