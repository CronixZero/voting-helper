package xyz.cronixzero.votinghelper.models.messages;

import java.util.Map;

public record VoteBallotMessage(Map<String, int[]> votes) {

}
