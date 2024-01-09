package xyz.cronixzero.votinghelper.models;

import java.util.Set;
import java.util.UUID;

public record VoteBallot(UUID id, Set<Vote> votes) {

}
