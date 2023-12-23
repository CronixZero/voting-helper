package xyz.cronixzero.votinghelper.web;

import lombok.extern.java.Log;

@Log
public class ExtensionAppendInterceptor extends PathForwardHandlerInterceptor {

  @Override
  protected String provideAlternative(String path) {
    if (path.split("/").length >= 1 && !path.startsWith("/actuator")) {
      return null;
    }

    return path + ".html";
  }

}
