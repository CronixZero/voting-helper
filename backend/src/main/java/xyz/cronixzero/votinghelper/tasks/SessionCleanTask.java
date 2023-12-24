package xyz.cronixzero.votinghelper.tasks;

import com.google.common.util.concurrent.AbstractScheduledService;
import java.time.Duration;
import java.time.Instant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import xyz.cronixzero.votinghelper.models.Session;
import xyz.cronixzero.votinghelper.services.SessionService;

@Component
public class SessionCleanTask extends AbstractScheduledService {

  private final SessionService sessionService;

  @Autowired
  public SessionCleanTask(SessionService sessionService) {
    this.sessionService = sessionService;

    startAsync();
  }

  @Override
  protected void runOneIteration() throws Exception {
    for (Session session : sessionService.getSessions().values()) {

      // Remove sessions that are older than 1 day
      if (session.lastUpdate().plus(Duration.ofDays(1)).isBefore(Instant.now())) {
        sessionService.removeSession(session);
      }
    }
  }

  @Override
  protected Scheduler scheduler() {
    return Scheduler.newFixedDelaySchedule(Duration.ofHours(24), Duration.ofHours(24));
  }
}
