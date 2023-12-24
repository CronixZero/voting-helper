package xyz.cronixzero.votinghelper.models;

import java.time.Instant;
import java.util.Collection;

public record Session(String sessionName, Collection<Candidate> candidates, Instant lastUpdate) {

}
