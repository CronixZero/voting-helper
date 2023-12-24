package xyz.cronixzero.votinghelper.models.messages;


import java.util.Optional;

public record CandidateAddMessage(Optional<String> candidateId, String name, String firstName) {

}
