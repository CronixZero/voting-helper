package xyz.cronixzero.votinghelper.tasks;

import com.google.common.util.concurrent.AbstractScheduledService;
import java.time.Duration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
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
    sessionService.getSessions().cleanUp();
  }

  @Override
  protected Scheduler scheduler() {
    return Scheduler.newFixedDelaySchedule(Duration.ofMinutes(1), Duration.ofHours(1));
  }
}
