package xyz.cronixzero.votinghelper.services;

import java.util.Collection;
import java.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xyz.cronixzero.votinghelper.models.Candidate;
import xyz.cronixzero.votinghelper.models.Session;

@Service
public class CandidateService {

  private final SessionService sessionService;

  @Autowired
  public CandidateService(SessionService sessionService) {
    this.sessionService = sessionService;
  }

  public Candidate getCandidate(String session, String candidateId) {
    return sessionService.getSession(session).candidates().stream()
        .filter(candidate -> candidate.id().toString().equals(candidateId))
        .findFirst()
        .orElse(null);
  }

  public void addCandidate(String sessionId, Candidate candidate) {
    Session session = sessionService.getSession(sessionId);

    if(session == null) {
      throw new IllegalArgumentException("Session with id " + sessionId + " does not exist");
    }

    session.candidates().add(candidate);
  }

  public void editCandidate(String session, String candidateId, String name, String firstName) {
    Candidate candidate = getCandidate(session, candidateId);
    candidate = new Candidate(candidate.id(), name, firstName, candidate.votes());
    removeCandidateById(session, candidateId);
    addCandidate(session, candidate);
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
  public Collection<Candidate> getCandidates(String sessionId) {
    Session session = sessionService.getSession(sessionId);

    if(session == null) {
      throw new IllegalArgumentException("Session with id " + sessionId + " does not exist");
    }

    return Collections.unmodifiableCollection(session.candidates());
  }
}
