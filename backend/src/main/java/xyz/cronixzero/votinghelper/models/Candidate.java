package xyz.cronixzero.votinghelper.models;

import java.util.List;
import java.util.UUID;

public record Candidate(UUID id, String name, String firstName, List<Integer> votes) implements
    Comparable<Candidate> {

  @Override
  public int compareTo(Candidate o) {
    return o.name.compareTo(this.name);
  }
}
