package xyz.cronixzero.votinghelper.models;

import java.util.Collection;

public record Session(String sessionName, Collection<Candidate> candidates) {

}
