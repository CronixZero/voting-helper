package xyz.cronixzero.votinghelper.models.dto;

import java.util.Collection;
import java.util.Optional;
import xyz.cronixzero.votinghelper.models.Candidate;

public record SessionCreateDto(Collection<Candidate> initialState) {

}
