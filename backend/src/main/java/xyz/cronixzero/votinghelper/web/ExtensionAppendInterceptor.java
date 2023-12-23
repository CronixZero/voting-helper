package xyz.cronixzero.votinghelper.web;

import lombok.extern.java.Log;

@Log
public class ExtensionAppendInterceptor extends PathForwardHandlerInterceptor {

  @Override
  protected String provideAlternative(String path) {
    if (path.startsWith("/api")
        || path.startsWith("/actuator")
        || path.startsWith("/ws")) {
      return null;
    }

    return path + ".html";
  }

}
