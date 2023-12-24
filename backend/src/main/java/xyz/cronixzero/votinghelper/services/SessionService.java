package xyz.cronixzero.votinghelper.services;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;
import org.springframework.stereotype.Service;
import xyz.cronixzero.votinghelper.models.Candidate;
import xyz.cronixzero.votinghelper.models.Session;

@Service
public class SessionService {

  private final Map<String, Session> sessions = new HashMap<>();

  public Session getSession(String sessionId) {
    return sessions.get(sessionId);
  }

  public Map<String, Session> getSessions() {
    return sessions;
  }

  public void createSession(String sessionName) {
    sessions.put(sessionName, new Session(sessionName, new PriorityQueue<>(), Instant.now()));
  }

  public void addSession(Session session) {
    sessions.put(session.sessionName(), session);
  }

  public Session editSession(String sessionId, String sessionName) {
    Session session = sessions.get(sessionId);
    session = new Session(sessionName, session.candidates(), Instant.now());
    sessions.put(sessionId, session);
    return session;
  }

  public void removeSession(Session session) {
    sessions.remove(session.sessionName());
  }

}
