package xyz.cronixzero.votinghelper.models;

import java.util.UUID;

public record Vote(UUID ballotId, UUID candidateId, int rating) {

}
