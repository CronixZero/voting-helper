package xyz.cronixzero.votinghelper.services;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xyz.cronixzero.votinghelper.models.Candidate;

@Service
public class CandidateService {

  private final SessionService sessionService;

  @Autowired
  public CandidateService(SessionService sessionService) {
    this.sessionService = sessionService;
    sessionService.createSession("1");
  }

  public Candidate getCandidate(String session, String candidateId) {
    return sessionService.getSession(session).candidates().stream()
        .filter(candidate -> candidate.id().toString().equals(candidateId))
        .findFirst()
        .orElse(null);
  }

  public void addCandidate(String session, Candidate candidate) {
    sessionService.getSession(session).candidates().add(candidate);
  }

  public Candidate editCandidate(String session, String candidateId, String name,
      String firstName) {
    Candidate candidate = getCandidate(session, candidateId);
    candidate = new Candidate(candidate.id(), name, firstName, candidate.votes());
    removeCandidateById(session, candidateId);
    addCandidate(session, candidate);
    return candidate;
  }

  public void removeCandidate(String session, Candidate candidate) {
    sessionService.getSession(session).candidates()
        .remove(candidate);
  }

  public void removeCandidateById(String session, String candidateId) {
    sessionService.getSession(session).candidates()
        .removeIf(candidate -> candidate.id().toString().equals(candidateId));
  }

  /**
   * @return Unmodifiable View of all Candidates inside a Session
   * */
  public Collection<Candidate> getCandidates(String session) {
    return Collections.unmodifiableCollection(sessionService.getSession(session).candidates());
  }
}
