package xyz.cronixzero.votinghelper.models.messages;

public record CandidateEditMessage(String session, String candidateId, String name, String firstName) {

}
