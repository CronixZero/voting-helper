package xyz.cronixzero.votinghelper.web;

public class ExtensionAppendInterceptor extends PathForwardHandlerInterceptor {

  @Override
  protected String provideAlternative(String path) {
    return ("/".equals(path) || path.contains(".")) ? null : path + ".html";
  }

}
