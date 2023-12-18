package xyz.cronixzero.votinghelper.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {

  @RequestMapping("/{page:^(?!.*[.].*$).*$}")
  public String requestOther(@PathVariable("page") String page) {
    return "/"+page+".html";
  }

}
