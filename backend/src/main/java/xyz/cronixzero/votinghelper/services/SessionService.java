package xyz.cronixzero.votinghelper.services;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;
import org.springframework.stereotype.Service;
import xyz.cronixzero.votinghelper.exceptions.SessionDuplicateException;
import xyz.cronixzero.votinghelper.models.Session;

@Service
public class SessionService {

  private final Cache<String, Session> sessions = CacheBuilder.newBuilder()
      .expireAfterAccess(Duration.ofHours(24))
      .build();

  public Session getSession(String sessionId) {
    return sessions.getIfPresent(sessionId);
  }

  public Cache<String, Session> getSessions() {
    return sessions;
  }

  public void createSession(String sessionName) throws SessionDuplicateException {
    if(sessions.getIfPresent(sessionName) != null) {
      throw new SessionDuplicateException("Session already exists");
    }

    sessions.put(sessionName, new Session(sessionName, new PriorityQueue<>()));
  }

  public void addSession(Session session) {
    sessions.put(session.sessionName(), session);
  }

  public Session editSession(String sessionId, String sessionName) {
    Session session = sessions.getIfPresent(sessionId);

    if(session == null) {
      throw new IllegalArgumentException("Session does not exist");
    }

    session = new Session(sessionName, session.candidates());
    sessions.put(sessionId, session);
    return session;
  }

  public void removeSession(Session session) {
    sessions.invalidate(session.sessionName());
  }

}
