package xyz.cronixzero.votinghelper.web;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;

public abstract class PathForwardHandlerInterceptor implements HandlerInterceptor {

  protected abstract String provideAlternative(String path);

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {
    final String alternative = provideAlternative(request.getServletPath());
    if (alternative != null) {
      request.getRequestDispatcher(alternative).forward(request, response);
      return false;
    }
    return HandlerInterceptor.super.preHandle(request, response, handler);
  }

}
